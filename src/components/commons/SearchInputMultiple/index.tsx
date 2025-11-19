import React, { useState, useMemo, useRef } from "react";
import { useSelect } from "downshift";
import { chooseThemeColor } from "../../../styles/global";

interface Option {
  label: string;
  value: string | number;
}
export interface SelectSearchMultipleProps {
  value: Option[];
  setValue: (val: Option[]) => void;
  options: Option[];
  placeholder: string;
  handleListChild?: (items: Option[]) => void;
  disabled: boolean;
  icon?: React.ComponentType;
  maxToShow?: number;
  backgroundColor?: string;
  borderRadius?: number;
  boxShadow?: string;
  isCheckBoxRef?: any;
  from?: string;
  activeApplicationId?: number;
}

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20.002"
      viewBox="0 0 20 20.002"
      data-testid="vfmaster-search-icon"
    >
      <g
        id="Group_3376"
        data-name="Group 3376"
        transform="translate(-905.1 -140.058)"
      >
        <g
          id="b995a33f0790c855384b59de531e8fe3"
          transform="translate(905.1 140.058)"
        >
          <path
            id="Path_90"
            data-name="Path 90"
            d="M16.352,24.4A8.152,8.152,0,1,1,24.5,16.252,8.163,8.163,0,0,1,16.352,24.4Zm0-15.093a6.982,6.982,0,1,0,6.982,6.982A6.994,6.994,0,0,0,16.352,9.312Z"
            transform="translate(-8.2 -8.1)"
            fill="#313131"
          />
          <path
            id="Path_91"
            data-name="Path 91"
            d="M45.786,46.664,40.1,41.02l.92-.92,5.644,5.686-.878.878"
            transform="translate(-26.664 -26.662)"
            fill="#313131"
          />
        </g>
      </g>
    </svg>
  );
};

const SearchInputMultiple = ({
  value = [],
  setValue,
  options = [],
  placeholder,
  handleListChild,
  disabled,
  icon: Icon,
  maxToShow = 1,
  backgroundColor = "#F2F2F2",
  borderRadius,
  boxShadow,
  isCheckBoxRef,
  from,
  activeApplicationId,
}: SelectSearchMultipleProps) => {
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = useMemo(() => {
    const safeOptions = options || [];
    return safeOptions.filter((option) =>
      String(option.label).toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu,
    closeMenu,
  } = useSelect({
    items: filteredOptions,
    onSelectedItemChange: ({
      selectedItem,
    }: {
      selectedItem: Option | null;
    }) => {
      if (!selectedItem) return;
      let newSelected;
      const exists = value?.some((v) => v.value === selectedItem.value);
      if (exists) {
        newSelected = value?.filter((v) => v.value !== selectedItem.value);
      } else {
        newSelected = [...value, selectedItem];
      }
      console.log("newSelect", newSelected);
      setValue(newSelected);

      if (handleListChild) {
        handleListChild(newSelected);
      }

      if (isCheckBoxRef?.current?.isPrdCheck && from && activeApplicationId) {
        isCheckBoxRef.current[from][activeApplicationId] = false;
      }

      setInputValue("");
      openMenu();
    },
    itemToString: function (item) {
      const result = item ? item.label : "";
      return result;
    },
    selectedItem: null, // use multi-select logic instead
  });

  // Remove selected item handler
  const removeItem = (itemToRemove: any) => {
    const newSelected = value.filter((v) => v.value !== itemToRemove.value);
    setValue(newSelected);
    if (handleListChild) handleListChild(newSelected);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("handlekeydown");
    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove last selected item
      const newSelected = value.slice(0, value.length - 1);
      setValue(newSelected);
      if (handleListChild) handleListChild(newSelected);
    }
  };

  let displayedValues: Option[] = [];
  let overflowValues: Option[] = [];
  // Show maxToShow multi-values and overflow badge
  if (value && value.length) {
    displayedValues = value.slice(0, maxToShow);
    overflowValues = value.slice(maxToShow);
  } else {
    displayedValues = [];
    overflowValues = [];
  }

  console.log("overflowValues", overflowValues, displayedValues);
  // Styling for container and dropdown, similar to your previous style
  const themeUi = "default"; // Replace with your actual theme context if needed
  const myBoxShadow = boxShadow ? boxShadow : "0px 6px 12px #95959529";
  const toggleButtonProps = getToggleButtonProps();
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        // width: 320,
        width: "100%",
        backgroundColor,
        borderRadius: borderRadius ?? 6,
        boxShadow: myBoxShadow,
        fontFamily: "sans-serif",
      }}
    >
      <div
        {...toggleButtonProps}
        onClick={
          disabled
            ? (event) => {
                event.preventDefault();
                console.log("disabled");
              }
            : toggleButtonProps.onClick
        }
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          minHeight: 40,
          cursor: disabled ? "not-allowed" : "pointer",
          padding: "4px 8px", // keep small padding to allow overlap
          borderRadius: borderRadius ?? 6,
          backgroundColor: disabled ? "#f0f0f0" : "white",
          overflowX: "auto", // allow overlap overflow
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          maxWidth: "442px",
        }}
        aria-label="Select multiple items"
      >
        {displayedValues &&
          !!displayedValues.length &&
          displayedValues.map((val, index) => (
            <div
              key={val?.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 12px",
                marginRight: 6,
                backgroundColor: "rgb(49, 49, 49)",
                color: "#f6f6f6",
                borderRadius: 20,
                fontSize: 14,
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              {val?.label}
              <button
                type="button"
                aria-label={`Remove ${val?.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) removeItem(val);
                }}
                style={{
                  border: "1px solid #f6f6f6",
                  background: "transparent",
                  borderRadius: "50%",
                  marginLeft: 8,
                  cursor: disabled ? "not-allowed" : "pointer",
                  lineHeight: 1,
                  color: "#f6f6f6",
                  padding: "1.2px 4px",
                }}
                disabled={disabled}
              >
                ×
              </button>
            </div>
          ))}
        {overflowValues && !!overflowValues.length && (
          <MoreSelectedBadge
            items={overflowValues.map((x) => x?.label || "")}
          />
        )}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!isOpen) openMenu();
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
          style={{
            border: "none",
            outline: "none",
            fontSize: 16,
            flexGrow: 1,
            minWidth: 60,
            backgroundColor: "transparent",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
        {Icon ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 10,
              backgroundColor,
              width: "50px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              right: 0,
            }}
          >
            {<Icon />}
            <SearchIcon />
          </div>
        ) : null}
      </div>

      <ul
        {...getMenuProps()}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "absolute",
          width: "100%",
          maxHeight: 200,
          overflowY: "auto",
          backgroundColor: "white",
          border: isOpen ? "1px solid #ccc" : "none",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          display: isOpen ? "block" : "none",
        }}
      >
        {isOpen && filteredOptions.length === 0 && (
          <li
            style={{
              padding: "8px",
              color: "#999",
              fontStyle: "italic",
              fontSize: "12px",
            }}
          >
            No results found
          </li>
        )}
        {isOpen &&
          filteredOptions.map((item, index) => {
            const isSelected = (value || []).some(
              (v) => v.value === item.value
            );

            return (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  backgroundColor: isSelected
                    ? "#BC3D81" // darker shade for selected
                    : highlightedIndex === index
                    ? "rgba(188, 61, 129, 0.3)" // lighter shade for hover
                    : "white",
                  padding: 8,
                  cursor: disabled ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  opacity: disabled ? 0.6 : 1,
                  borderBottom:
                    index < filteredOptions.length - 1
                      ? "1px solid #eee"
                      : "none",
                  color: isSelected ? "white" : "inherit", // Optional contrast for selected text
                  transition: "background-color 0.2s ease",
                  fontSize: "12px",
                }}
                aria-selected={highlightedIndex === index}
              >
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const MoreSelectedBadge = ({ items }: { items: string[] }) => {
  const title = items.join(", ");
  const length = items.length ? items.length : "";
  const label = `+${length} `;

  return (
    <div
      style={{
        cursor: "default",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 12px",
        marginRight: 6,
        backgroundColor: "rgb(49, 49, 49)",
        color: "#f6f6f6",
        borderRadius: 20,
        fontSize: 14,
        whiteSpace: "normal",
      }}
      title={title}
    >
      {label}
    </div>
  );
};

export default SearchInputMultiple;
