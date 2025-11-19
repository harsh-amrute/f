import React, { useState, useMemo, useRef } from "react";
import { useSelect } from "downshift";
import * as globalStyles from "../../../styles/global";
import { useUserData } from "../../../context";

interface Option {
  value: string;
  label: string;
  isParent?: boolean;
  paddingLeft?: number;
  color?: string;
}

interface SelectOptionLevelProps {
  value: Option[]; // multi select
  setValue: (value: Option[]) => void;
  options: Option[];
  placeholder: string;
  isDisabled: boolean;
}

const inlineStyles = {
  control: (isFocused: boolean, isDisabled: boolean) => ({
    minWidth: 223,
    background: "#FFFFFF",
    fontSize: 16,
    outline: "none",
    borderRadius: 6,
    height: 50,
    cursor: isDisabled ? "not-allowed" : "pointer",
    border: "0.3px solid #707070",
    boxShadow: isFocused ? "0 0 0 1px #aaa" : "none",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
    padding: "5px 10px",
  }),
  option: (data: Option, isSelected: boolean, isDisabled: boolean) => ({
    cursor: data.isParent ? "not-allowed" : "pointer",
    fontWeight: data.isParent ? 500 : 300,
    paddingLeft: data.paddingLeft || 10,
    color: data.color || "black",
    fontSize: 16,
    backgroundColor: isSelected ? "#BC3D80" : "white",
    opacity: isDisabled ? 0.5 : 1,
  }),
};

const SelectOptionLevel = ({
  value,
  setValue,
  options,
  placeholder,
  isDisabled,
}: SelectOptionLevelProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    const filter = inputValue.toLowerCase();
    return options.filter(
      (item) =>
        !value.some((v) => v.value === item.value) &&
        (item.label.toLowerCase().includes(filter) || item.isParent)
    );
  }, [inputValue, options, value]);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu,
  } = useSelect({
    items: filteredOptions,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem && !selectedItem.isParent) {
        setValue([...value, selectedItem]);
        setInputValue("");
        openMenu();
      }
    },
    selectedItem: null,
  });

  const removeItem = (item: Option) => {
    setValue(value.filter((v) => v.value !== item.value));
    inputRef.current?.focus();
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        {...getToggleButtonProps({ disabled: isDisabled })}
        style={inlineStyles.control(isOpen, isDisabled)}
        onClick={() => {
          if (!isDisabled) {
            openMenu();
            inputRef.current?.focus();
          }
        }}
      >
        {value.map((selectedItem) => (
          <div
            key={selectedItem.value}
            style={{
              display: "flex",
              backgroundColor: "#313131",
              color: globalStyles.white,
              margin: "5px",
              padding: "7px",
              borderRadius: "20px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: globalStyles.white,
                font: "normal normal 300 13px/ 13px Roboto",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "3px 5px 3px 6px",
              }}
            >
              {selectedItem.label}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isDisabled) removeItem(selectedItem);
              }}
              aria-label={`Remove ${selectedItem.label}`}
              style={{
                display: "flex",
                margin: "auto",
                color: "red",
                borderRadius: "50%",
                border: "1px solid",
                cursor: "pointer",
                padding: "0 4px",
              }}
              type="button"
              disabled={isDisabled}
            >
              ×
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={value.length === 0 ? placeholder : ""}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!isOpen) openMenu();
          }}
          onFocus={() => !isDisabled && openMenu()}
          style={{ border: "none", outline: "none", flexGrow: 1, fontSize: 16 }}
          aria-autocomplete="list"
          aria-controls="select-menu"
          aria-expanded={isOpen}
          autoComplete="off"
          disabled={isDisabled}
        />
      </div>

      <ul
        {...getMenuProps({ id: "select-menu" })}
        style={{
          cursor: "pointer",
          maxHeight: 160,
          zIndex: 3,
          width: "100%",
          background: globalStyles.white,
          position: "absolute",
          boxShadow: "0px 10px 20px #C4C8D066",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {isOpen &&
          filteredOptions.map((item, index) => (
            <li
              key={item.value}
              {...getItemProps({ item, index })}
              style={inlineStyles.option(item, false, isDisabled)}
            >
              {item.label}
            </li>
          ))}
        {isOpen && filteredOptions.length === 0 && (
          <li
            style={{
              padding: 8,
              color: "#999",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            No options
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectOptionLevel;
