import React, { useState, useMemo } from "react";
import { useSelect } from "downshift";

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface DownshiftMultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  hideSelectedOptions?: boolean;
  OptionComponent?: (props: {
    item: Option;
    isSelected: boolean;
    isHighlighted: boolean;
    getItemProps?: (options: any) => any;
  }) => JSX.Element;
  MultiValueComponent?: React.FC<{ item: Option; onRemove: () => void }>;
  disabled?: boolean;
  inputValue?: string;
  onInputChange?: (val: string) => void;
  filterOption?: (option: Option, inputValue: string) => boolean;
  noOptionsMessage?: (inputValue: string) => string;
  isLoading?: boolean;

  DropdownIndicatorComponent?: React.FC;
  MenuWrapperComponent?: React.FC<{ children: React.ReactNode }>;
  menuIsAlwaysOpen?: boolean;
}

const DropDownSvg = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

const DownshiftMultiSelect: React.FC<DownshiftMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  hideSelectedOptions = false,
  OptionComponent,
  MultiValueComponent,
  disabled = false,
  inputValue,
  onInputChange,
  filterOption,
  noOptionsMessage,
  isLoading = false,
  DropdownIndicatorComponent,
  MenuWrapperComponent,
  menuIsAlwaysOpen = false,
}) => {
  const [internalInputValue, setInternalInputValue] = useState("");

  const searchValue = inputValue ?? internalInputValue;

  const setInput = (v: string) => {
    if (inputValue === undefined) setInternalInputValue(v);
    onInputChange?.(v);
  };

  const filteredOptions = useMemo(() => {
    let opts = options;

    if (hideSelectedOptions) {
      const selected = value.map((v) => v.value);
      opts = opts.filter((o) => !selected.includes(o.value));
    }

    if (searchValue.trim()) {
      opts = filterOption
        ? opts.filter((o) => filterOption(o, searchValue))
        : opts.filter((o) =>
            o.label.toLowerCase().includes(searchValue.toLowerCase())
          );
    }

    return opts;
  }, [options, hideSelectedOptions, searchValue, filterOption, value]);

  /** SELECTION HANDLING */
  const handleSelect = (item: Option | null) => {
    if (!item) return;

    const exists = value.some((v) => v.value === item.value);
    const next = exists
      ? value.filter((v) => v.value !== item.value)
      : [...value, item];

    onChange(next);
  };

  /** useSelect Hook */
  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps: hookMenuProps,
    getToggleButtonProps: hookToggleProps,
    selectItem,
    openMenu,
  } = useSelect<Option>({
    items: filteredOptions,
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) =>
      handleSelect(selectedItem ?? null),
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      // 1️. Keep dropdown always open when selecting an item
      if (type === useSelect.stateChangeTypes.ItemClick) {
        return {
          ...changes,
          isOpen: true, // Prevent closing when selecting
        };
      }

      // 2️. Your existing always-open mode logic
      if (menuIsAlwaysOpen) {
        if (type === useSelect.stateChangeTypes.ToggleButtonClick) {
          return { ...changes, isOpen: true };
        }
      }

      return changes;
    },
  });
  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* CONTROL */}
      <div
        {...getToggleButtonProps()}
        onClick={() => !disabled && openMenu()}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "40px",
          fontSize: "14px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          padding: "8px 40px 8px 12px",
          backgroundColor: "#ffffff",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          overflow: "auto",
          scrollbarWidth: "none",
          gap: "4px",
        }}
      >
        {/* PILLS */}
        {value.map((item) =>
          MultiValueComponent ? (
            <MultiValueComponent
              key={item.value}
              item={item}
              onRemove={() =>
                onChange(value.filter((v) => v.value !== item.value))
              }
            />
          ) : (
            <span
              key={item.value}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2px 6px",
                background: "#e5e5e5",
                borderRadius: "12px",
                backgroundColor: "#F8EBF2",
                color: "#C93D80",
                width: "fit-content",
                height: "32px",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {item?.color && (
                <div
                  style={{
                    backgroundColor: item?.color || "",
                    width: 14,
                    height: 14,
                    margin: "0 8px",
                    borderRadius: 4,
                  }}
                />
              )}
              {item.label}
              <button
                className="pill-close-btn"
                style={{
                  marginLeft: 6,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#C93D80",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((v) => v.value !== item.value));
                }}
              >
                ×
              </button>
            </span>
          )
        )}

        {/* INPUT */}
        <input
          value={searchValue}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
          onKeyDown={(e) => {
            // BACKSPACE remove last selected item
            if (
              e.key === "Backspace" &&
              searchValue.length === 0 &&
              value.length > 0
            ) {
              // remove LAST selected element
              const updated = value.slice(0, value.length - 1);
              onChange(updated);
              e.stopPropagation();
            }
          }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
          }}
        />

        {/* LOADING */}
        {isLoading && <span style={{ marginLeft: 4 }}>⏳</span>}
      </div>
      {/* DROPDOWN INDICATOR */}
      <div
        onClick={openMenu}
        style={{
          position: "absolute",
          top: 1,
          right: 1,
          backgroundColor: disabled ? "#f0f0f0" : "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95%",
          width: "32px",
          borderRadius: "6px",
        }}
      >
        {DropdownIndicatorComponent ? (
          <DropdownIndicatorComponent />
        ) : (
          <div
            style={{
              transition: "transform 0.4s ease-in-out",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropDownSvg />
          </div>
        )}
      </div>
      {/* MENU */}
      <ul
        {...getMenuProps()}
        style={{
          position: "absolute",
          zIndex: 10,
          width: "100%",
          maxHeight: "200px",
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #c7c0c0",
          borderRadius: "6px",
          marginTop: "2px",
          padding: 0,
          listStyle: "none",
          display: isOpen || menuIsAlwaysOpen ? "block" : "none",
          fontSize: "14px",
          scrollbarWidth: "thin",
        }}
      >
        {filteredOptions.length === 0 && (
          <li
            style={{
              padding: "8px",
              color: "#777",
              whiteSpace: "nowrap",
            }}
          >
            {noOptionsMessage ? noOptionsMessage(searchValue) : "No options"}
          </li>
        )}

        {MenuWrapperComponent && !!filteredOptions.length ? (
          <MenuWrapperComponent>
            {filteredOptions.map((item, index) => {
              const isSelected = value.some((v) => v.value === item.value);
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={item.value}
                  {...getItemProps({ item, index })}
                  style={{
                    // padding: "6px 8px",
                    cursor: "pointer",
                    // background: isHighlighted
                    //   ? "#FCE4F0"
                    //   : isSelected
                    //   ? "#BC3D80"
                    //   : "#fff",
                    // border: isHighlighted
                    //   ? "2px solid #BC3D80"
                    //   : isSelected
                    //   ? "2px solid #BC3D80"
                    //   : "",
                    whiteSpace: "nowrap",
                  }}
                >
                  {OptionComponent ? (
                    <OptionComponent
                      item={item}
                      isSelected={isSelected}
                      isHighlighted={isHighlighted}
                    />
                  ) : (
                    item.label
                  )}
                </li>
              );
            })}
          </MenuWrapperComponent>
        ) : (
          filteredOptions.map((item, index) => {
            const isSelected = value.some((v) => v.value === item.value);
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  // background: isHighlighted
                  //   ? "#BC3D80"
                  //   : isSelected
                  //   ? "#BC3D80"
                  //   : "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                {OptionComponent ? (
                  <OptionComponent
                    item={item}
                    isSelected={isSelected}
                    isHighlighted={isHighlighted}
                  />
                ) : (
                  item.label
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default DownshiftMultiSelect;
