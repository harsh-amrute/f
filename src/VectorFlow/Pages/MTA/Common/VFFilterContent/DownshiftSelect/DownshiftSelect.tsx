import React, { useState, useMemo } from "react";
import Downshift from "downshift";

interface Option {
  value: string;
  label: string;
}

interface DownshiftSelectProps {
  options: Option[];
  placeholder?: string;
  value?: Option | null;
  onChange?: (selected: Option | null) => void;
  isSearchable?: boolean;
  styles?: any;
  components?: {
    IndicatorSeparator?: React.FC;
    DropdownIndicator?: React.FC;
    Menu?: React.FC<{ children?: React.ReactNode }>;
  };
  disabled?: boolean;
  DropdownIndicatorComponent?: React.FC;

  /** NEW */
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
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

const DownshiftSelect: React.FC<DownshiftSelectProps> = ({
  options,
  placeholder = "Select...",
  value = null,
  onChange,
  isSearchable = true,
  styles,
  components,
  disabled = false,
  DropdownIndicatorComponent /** NEW CALLBACK PROPS */,
  onMenuOpen,
  onMenuClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<Option | null>(value);

  const filteredOptions = useMemo(() => {
    if (!isSearchable || !inputValue.trim()) return options;

    return options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue, isSearchable]);

  return (
    <Downshift
      selectedItem={selectedItem}
      onChange={(selection) => {
        setSelectedItem(selection);
        onChange?.(selection);
      }}
      itemToString={(item) => (item ? item.label : "")}
      inputValue={isSearchable ? inputValue : ""}
      onInputValueChange={(val) => isSearchable && setInputValue(val)}
      /** NEW: detect menu open & close */
      onStateChange={(changes, state) => {
        if (changes.isOpen === true) {
          setInputValue("");
          onMenuOpen?.();
        }
        if (changes.isOpen === false) {
          onMenuClose?.();
        }
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        getRootProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        openMenu,
      }) => (
        <div
          {...getRootProps({}, { suppressRefError: true })}
          style={{ position: "relative", width: "100%" }}
        >
          {/* Control */}
          <div
            {...getToggleButtonProps()}
            onClick={() => !disabled && openMenu()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "40px",
              fontSize: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {isSearchable ? (
              <input
                {...getInputProps({
                  placeholder:
                    selectedItem?.label || placeholder || "Select...",
                  disabled,
                  style: {
                    flex: 1,
                    backgroundColor: "transparent",
                    outline: "none",
                    color: "#1f2937",
                    cursor: disabled ? "not-allowed" : "",
                    whiteSpace: "nowrap",
                    border: "none",
                  },
                })}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  color: "#1f2937",
                }}
              >
                {selectedItem?.label || placeholder}
              </span>
            )}

            {/* DROPDOWN INDICATOR */}
            <div
              onClick={() => openMenu()}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: disabled ? "#f0f0f0" : "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                width: "32px",
                borderRadius: "8px",
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
          </div>

          {/* Menu */}
          <ul
            {...getMenuProps()}
            style={{
              position: "absolute",
              zIndex: 10,
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              marginTop: "4px",
              maxHeight: "240px",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              listStyle: "none",
              padding: 0,
              display: isOpen ? "block" : "none",
              fontSize: "14px",
              scrollbarWidth: "thin",
            }}
          >
            {isOpen &&
              (options.length === 0 || filteredOptions.length === 0) && (
                <li
                  style={{
                    padding: 10,
                    color: "#999",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  No options
                </li>
              )}
            {isOpen &&
              filteredOptions.map((item, index) => {
                const isSelected = selectedItem?.value === item.value;
                const isHighlighted = highlightedIndex === index;

                return (
                  <li
                    key={item.value}
                    {...getItemProps({ item, index })}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      background: isHighlighted
                        ? "#FCE4F0"
                        : isSelected
                        ? "#BC3D80"
                        : "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default DownshiftSelect;
