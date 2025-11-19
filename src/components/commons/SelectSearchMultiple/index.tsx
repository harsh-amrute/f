import React, { useState, useMemo, useRef } from "react";
import { useMultipleSelection, useCombobox } from "downshift";
import * as globalStyles from "../../../styles/global";
import { useUserData } from "../../../context";
import { chooseThemeColor } from "../../../styles/global";

interface Option {
  value: string;
  label: string;
}

interface SelectSearchMultipleProps {
  value: Option[];
  setValue: (items: Option[]) => void;
  options: Option[];
  placeholder: string;
  icon?: string;
  handleListChild?: (e: object) => void;
}

const SelectSearchMultiple = ({
  value,
  setValue,
  options,
  placeholder,
  icon,
}: SelectSearchMultipleProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  // const options = [
  //   { value: "apple", label: "Apple" },
  //   { value: "banana", label: "Banana" },
  //   { value: "orange", label: "Orange" },
  //   { value: "grape", label: "Grape" },
  //   { value: "mango", label: "Mango" },
  // ];
  // To manage selected items
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    selectedItems: value,
    onSelectedItemsChange: ({ selectedItems }) => {
      if (selectedItems) setValue(selectedItems);
    },
  });

  const itemToString = (item: Option | null) => (item ? item.label : "");

  // Combobox for input and dropdown options
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    openMenu,
    inputValue,
    setInputValue,
  } = useCombobox<Option>({
    items: options,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        addSelectedItem(selectedItem);
        setInputValue("");
      }
    },
  });
  console.log("inputValue", inputValue);
  const maxToShow = 1;
  const overflowItems = value.slice(maxToShow);
  // ---- Filter options AFTER the hook, using inputValue ----
  const filteredOptions = options.filter(
    (item) =>
      !value.some((selected) => selected.value === item.value) &&
      itemToString(item)
        .toLowerCase()
        .includes((inputValue ?? "").toLowerCase())
  );

  return (
    <div style={{ margin: 3, position: "relative", width: "100%" }}>
      <label {...getLabelProps()} style={{ display: "none" }}>
        {placeholder}
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          border: "1px solid #c0c0c0",
          borderRadius: 6,
          minHeight: 40,
          backgroundColor: "#fff",
          padding: "5px 10px",
          cursor: "text",
          boxShadow: isOpen
            ? `0 0 0 0.8px ${chooseThemeColor[themeUi].color5}`
            : "none",
          userSelect: "none",
          boxSizing: "border-box",
          margin: "1px",
          overflow: "hidden",
        }}
        onClick={() => openMenu()}
      >
        {/* Selected items */}
        {value.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                backgroundColor: "#313131",
                color: globalStyles.white,
                borderRadius: 20,
                padding: "5px 10px",
                fontSize: 13,
                fontWeight: "400",
                maxWidth: "calc(100% - 50px)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                alignItems: "center",
                marginRight: 8,
              }}
              title={value[0].label}
              {...getSelectedItemProps({ selectedItem: value[0], index: 0 })}
            >
              {value[0].label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(value[0]);
                }}
                style={{
                  marginLeft: 8,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 12,
                  lineHeight: 1,
                  color: globalStyles.white,
                  padding: 0,
                  userSelect: "none",
                }}
                aria-label={`Remove ${value[0].label}`}
                type="button"
              >
                ×
              </button>
            </div>
            {/* Overflow badge */}
            {overflowItems.length > 0 && (
              <div
                title={overflowItems.map((i) => i.label).join(", ")}
                style={{
                  display: "flex",
                  backgroundColor: "#313131",
                  color: "#fff",
                  borderRadius: 20,
                  padding: "5px 10px",
                  height: 33,
                  alignItems: "center",
                  fontWeight: 400,
                  fontSize: 12,
                  userSelect: "none",
                }}
              >
                +{overflowItems.length} more
              </div>
            )}
          </>
        ) : (
          ""
        )}

        {/* Input for searching */}
        <img
          src={icon ? icon : "/assets/img/ist/location.svg"}
          alt="location"
        />
        <input
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          style={{
            flexGrow: 1,
            border: "none",
            outline: "none",
            fontSize: 12,
            minWidth: 60,
            marginLeft: 5,
            backgroundColor: "transparent",
            cursor: "text",
          }}
          onFocus={openMenu}
          placeholder={value.length === 0 ? placeholder : ""}
        />

        <img src="/assets/img/down-icon.svg" alt="open" />
      </div>

      {/* Dropdown menu */}
      <ul
        {...getMenuProps()}
        style={{
          maxHeight: 160,
          overflowY: "auto",
          margin: 0,
          padding: 0,
          listStyle: "none",
          backgroundColor: "white",
          position: "absolute",
          width: "100%",
          border: "1px solid #c0c0c0",
          borderRadius: 6,
          marginTop: 4,
          boxShadow: "0 4px 11px rgba(0,0,0,0.1)",
          zIndex: 3,
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        {isOpen && filteredOptions.length === 0 && (
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
          options
            .filter(
              (item) =>
                !value.some((selected) => selected.value === item.value) &&
                itemToString(item)
                  .toLowerCase()
                  .includes((inputValue ?? "").toLowerCase())
            )
            .map((item, index) => {
              const isHighlighted = highlightedIndex === index;
              return (
                <li
                  key={item.value}
                  {...getItemProps({ item, index })}
                  style={{
                    backgroundColor: isHighlighted ? "#e6f0ff" : "white",
                    padding: "10px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px",
                  }}
                >
                  {item.label}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default SelectSearchMultiple;
