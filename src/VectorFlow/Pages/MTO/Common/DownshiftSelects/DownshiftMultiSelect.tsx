import React, { useState, useMemo } from "react";
import Downshift from "downshift";

interface Option {
  value: string;
  label: string;
}

interface DownshiftMultiSelectV2Props {
  options: Option[];
  value: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  OptionComponent?: React.FC<{
    item: Option;
    isSelected: boolean;
    isHighlighted: boolean;
  }>;
  MultiValueComponent?: React.FC<{ item: Option; onRemove: () => void }>;
  disabled?: boolean;
  inputValue?: string;
  onInputChange?: (val: string) => void;
  filterOption?: (option: Option, inputValue: string) => boolean;
  noOptionsMessage?: (inputValue: string) => string;
  menuMinWidth?: string | number;
  isLoading?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  /** NEW PROPS */
  DropdownIndicatorComponent?: React.FC;
  MenuWrapperComponent?: React.FC<{ children: React.ReactNode }>;
  menuIsAlwaysOpen?: boolean;
}

const DownshiftMultiSelect: React.FC<DownshiftMultiSelectV2Props> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  isMulti = true,
  hideSelectedOptions = false,
  closeMenuOnSelect = false,
  OptionComponent,
  MultiValueComponent,
  disabled = false,
  inputValue: controlledInputValue,
  onInputChange,
  filterOption,
  noOptionsMessage,
  menuMinWidth = 200,
  isLoading = false,
  onKeyDown,

  /** NEW PROPS */
  DropdownIndicatorComponent,
  MenuWrapperComponent,
  menuIsAlwaysOpen = false,
}) => {
  const [internalInputValue, setInternalInputValue] = useState("");

  const inputValue =
    controlledInputValue !== undefined
      ? controlledInputValue
      : internalInputValue;

  const setInput = (val: string) => {
    if (controlledInputValue === undefined) setInternalInputValue(val);
    onInputChange?.(val);
  };

  const filteredOptions = useMemo(() => {
    let opts = options;

    if (hideSelectedOptions && isMulti) {
      const selectedValues = value.map((v) => v.value);
      opts = opts.filter((o) => !selectedValues.includes(o.value));
    }

    if (inputValue.trim()) {
      opts = filterOption
        ? opts.filter((o) => filterOption(o, inputValue))
        : opts.filter((o) =>
            o.label.toLowerCase().includes(inputValue.toLowerCase())
          );
    }

    return opts;
  }, [options, value, hideSelectedOptions, inputValue, filterOption, isMulti]);

  const handleSelect = (item: Option | null) => {
    if (!item) return;

    if (isMulti) {
      const alreadySelected = value.some((v) => v.value === item.value);
      const newValue = alreadySelected
        ? value.filter((v) => v.value !== item.value)
        : [...value, item];
      onChange(newValue);
    } else {
      onChange(item ? [item] : []);
    }

    if (closeMenuOnSelect && !isMulti) setInput("");
  };

  const handleRemove = (item: Option) => {
    const newValue = value.filter((v) => v.value !== item.value);
    onChange(newValue);
  };

  return (
    <Downshift
      selectedItem={null}
      onChange={handleSelect}
      itemToString={(item) => (item ? item.label : "")}
      inputValue={inputValue}
      onInputValueChange={setInput}
      // disabled={disabled}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        highlightedIndex,
        isOpen,
        openMenu,
      }) => {
        const menuOpen = menuIsAlwaysOpen ? true : isOpen;

        return (
          <div style={{ position: "relative", width: "100%" }}>
            {/* Control */}
            <div
              {...getToggleButtonProps()}
              onClick={() => !disabled && openMenu()}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "4px",
                width: "100%",
                minHeight: "36px",
                border: "1px solid #c7c0c0",
                borderRadius: "6px",
                padding: "2px 4px",
                backgroundColor: "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {/* Pills */}
              {value.map((item) =>
                MultiValueComponent ? (
                  <MultiValueComponent
                    key={item.value}
                    item={item}
                    onRemove={() => handleRemove(item)}
                  />
                ) : (
                  <span
                    key={item.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: "#e2e2e2",
                      padding: "2px 6px",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item);
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "#555",
                      }}
                    >
                      ×
                    </button>
                  </span>
                )
              )}

              {/* Input */}
              <input
                {...getInputProps({
                  placeholder: value.length === 0 ? placeholder : "",
                  disabled,
                  style: {
                    flex: 1,
                    outline: "none",
                    padding: "2px 4px",
                    fontSize: "0.9rem",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#000",
                    cursor: disabled ? "not-allowed" : "text",
                  },
                  onKeyDown,
                })}
              />

              {/* NEW: Dropdown Indicator */}
              {DropdownIndicatorComponent && <DropdownIndicatorComponent />}

              {/* Loading */}
              {isLoading && (
                <span
                  style={{
                    marginLeft: "4px",
                    color: "#555",
                    fontSize: "0.875rem",
                    animation: "spin 1s linear infinite",
                  }}
                >
                  ⏳
                </span>
              )}
            </div>

            {/* Menu */}
            <ul
              {...getMenuProps()}
              style={{
                minWidth: menuMinWidth,
                position: "absolute",
                zIndex: 10,
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #c7c0c0",
                borderRadius: "6px",
                marginTop: "2px",
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: menuOpen ? "block" : "none",
                padding: 0,
                listStyle: "none",
              }}
            >
              {menuOpen && filteredOptions.length === 0 && (
                <li style={{ padding: "6px 8px", color: "#777" }}>
                  {noOptionsMessage
                    ? noOptionsMessage(inputValue)
                    : "No options"}
                </li>
              )}

              {menuOpen &&
                (MenuWrapperComponent ? (
                  <MenuWrapperComponent>
                    {filteredOptions.map((item, index) => {
                      const isSelected = value.some(
                        (v) => v.value === item.value
                      );
                      const isHighlighted = highlightedIndex === index;

                      return (
                        <li
                          key={item.value}
                          {...getItemProps({ item, index })}
                          style={{
                            padding: "6px 8px",
                            cursor: "pointer",
                            backgroundColor: isHighlighted
                              ? "#f0f0f0"
                              : isSelected
                              ? "#e2e2e2"
                              : "#fff",
                            fontWeight: isSelected ? 600 : 400,
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
                    const isSelected = value.some(
                      (v) => v.value === item.value
                    );
                    const isHighlighted = highlightedIndex === index;

                    return (
                      <li
                        key={item.value}
                        {...getItemProps({ item, index })}
                        style={{
                          padding: "6px 8px",
                          cursor: "pointer",
                          backgroundColor: isHighlighted
                            ? "#f0f0f0"
                            : isSelected
                            ? "#e2e2e2"
                            : "#fff",
                          fontWeight: isSelected ? 600 : 400,
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
                ))}
            </ul>
          </div>
        );
      }}
    </Downshift>
  );
};

export default DownshiftMultiSelect;
