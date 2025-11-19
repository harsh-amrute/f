import React from "react";
import Downshift from "downshift";
import Radio from "../Radio";

type RadioOption = {
  label: string;
  value: string | number;
};

type RadioSelectProps = {
  options: RadioOption[];
  theme: string;
  color?: string;
  Icon?: React.ComponentType<{ props: RadioOption }>;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (newValue: RadioOption | null) => void;
  isDisabled?: boolean;
  isClearable?: boolean;
  getOptionLabel?: (option: RadioOption) => string;
};

const itemToString = (item:RadioOption | null) => (item ? item.label : "");


const RadioSelect: React.FC<RadioSelectProps> = ({ options, theme, color = "white", Icon, ...rest }) => {
  return (
    <Downshift
      onChange={(selectedItem) => {
        if (selectedItem && rest.onChange) {
          rest.onChange({
            value: selectedItem.value,
            label: selectedItem.label,
          });
        }
      }}
      itemToString={itemToString}
      selectedItem={
        options.find((option) => option.value === rest.value) ||
        options.find((option) => option.value === rest.defaultValue)
      }
    >
      {({
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            minWidth: "80px",
            width: "max-content",
          }}
        >
          <button
            type="button"
            {...getToggleButtonProps()}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // better space distribution
              background: color,
              border: "1px solid black",
              borderRadius: 0,
              fontSize: "12px",
              minHeight: "25px",
              minWidth: "80px",
              padding: "0 8px", // uniform horizontal padding
              boxShadow: "none",
              cursor: "pointer",
              outline: "none",
              color: "#000",
              userSelect: "none", // prevent text selection on click
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "black")
            } // subtle blue focus
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "hsl(0, 0%, 80%)")
            }
          >
            <span
              style={{
                flexGrow: 1,
                textAlign: "left",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {selectedItem ? selectedItem.label : rest.placeholder || ""}
            </span>
            <img
              src="/assets/img/down-icon.svg"
              alt="open"
              style={{
                marginLeft: "8px",
                transition: "transform 0.3s ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                width: "10px",
                height: "10px",
                flexShrink: 0,
                pointerEvents: "none", // icon doesn’t intercept clicks
                filter: "grayscale(40%)", // subtle grey tint
              }}
            />
          </button>

          <ul
            {...getMenuProps()}
            style={{
              position: "absolute",
              zIndex: 100000000,
              minWidth: "100%",
              width: "max-content",
              background: "white",
              margin: 0,
              padding: 0,
              boxShadow: isOpen ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
              listStyle: "none",
              maxHeight: isOpen ? "120px" : 0,
              overflowY: "auto",
              border: isOpen ? "1px solid hsl(0, 0%, 80%)" : "none",
              display: isOpen ? "block" : "none",
            }}
          >
            {isOpen &&
              options.map((item, index) => (
                <li
                  key={item.value}
                  {...getItemProps({
                    item,
                    index,
                    style: {
                      fontSize: "12px",
                      padding: "8px",
                      cursor: "pointer",
                      background: highlightedIndex === index ? "#fff" : "#fff",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      borderBottom:
                        index !== options.length - 1
                          ? "1px solid #eee"
                          : "none",
                    },
                  })}
                >
                  <Radio
                    theme={theme}
                    defaultChecked={selectedItem?.value === item.value}
                  />
                  {item.label}
                  {Icon && <Icon props={item} />}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default RadioSelect;
