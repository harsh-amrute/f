import React, { useRef, useState } from "react";
import { useSelect } from "downshift";
import { chooseThemeColor } from "../../../../../styles/global";

const ArrowIcon = ({ icon }: { icon?: any }) =>
  icon ? (
    <span style={{ display: "flex", alignItems: "center", padding: 0 }}>
      {icon}
    </span>
  ) : (
    <svg
      width="16"
      height="16"
      style={{ color: "grey" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

const VFSelect = ({
  options = [],
  themeUi,
  icon,
  placeholder,
  disabled = false,
  ...rest
}: any) => {
  const items = options || [];
  const [selectedItem, setSelectedItem] = useState(rest.value ?? null);
  const buttonRef = useRef<HTMLDivElement>(null);
  console.log("disabled", disabled);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem: dsSelectedItem,
  } = useSelect({
    items,
    itemToString: (item) => (item ? item.label : ""),
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedItem(selectedItem);
      if (rest.onChange) rest.onChange(selectedItem || null);
    },
  });

  const themeColors = chooseThemeColor[themeUi];
  const primaryColor = themeColors.color4;
  const primary25 = primaryColor + "4A";

  return (
    <div
      style={{
        position: "relative",
        width: placeholder === "Select Order Type" ? 170 : "100%",
        minWidth: "80px",
        ...rest.style,
      }}
    >
      <div
        ref={buttonRef}
        {...getToggleButtonProps({
          disabled,
          "aria-label": placeholder,
          tabIndex: 0,
        })}
        style={{
          minHeight: 25,
          border: "1px solid hsl(0, 0%, 80%)",
          borderRadius: 0,
          backgroundColor: disabled ? "#F2F2F2" : "#fff",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          minWidth: "80px",
          cursor: disabled ? "not-allowed" : "pointer",
          padding: "4px 8px",
          color: "inherit",
          fontSize: 14,
          opacity: disabled ? 0.65 : 1,
        }}
      >
        <div
          style={{
            flex: 1,
            color: !selectedItem ? "#888" : "#222",
            fontWeight: 400,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "grey",
            marginLeft: 4,
            padding: 0,
          }}
        >
          {icon ? <ArrowIcon icon={icon} /> : <ArrowIcon />}
        </div>
      </div>
      <ul
        {...getMenuProps()}
        style={{
          zIndex: 100000000,
          minWidth: "100%",
          width: "max-content",
          position: "absolute",
          left: 0,
          right: 0,
          marginTop: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px #ddd",
          border: "1px solid hsl(0, 0%, 80%)",
          borderRadius: "0 0 4px 4px",
          maxHeight: 120,
          overflowY: "auto",
          padding: 0,
          display: isOpen ? "block" : "none",
          boxSizing: "border-box",
          listStyle: "none",
          margin: 0,
        }}
      >
        {isOpen && items.length === 0 && (
          <li
            style={{
              padding: "8px 10px",
              fontStyle: "italic",
              color: "#999",
              backgroundColor: "#fff",
              fontSize: 13,
            }}
          >
            No options
          </li>
        )}
        {isOpen &&
          items.map((item: any, index: number) => {
            const isSelected =
              selectedItem && item.value === selectedItem.value;
            const isHighlighted = highlightedIndex === index;
            return (
              <li
                key={item.value}
                {...getItemProps({ item, index, disabled })}
                aria-selected={isSelected}
                style={{
                  fontSize: 14,
                  padding: "7px 12px",
                  backgroundColor: isHighlighted
                    ? primary25
                    : isSelected
                    ? primaryColor
                    : "#fff",
                  color: isHighlighted || isSelected ? "#222" : "#444",
                  cursor: disabled ? "not-allowed" : "pointer",
                  borderBottom: "1px solid #eee",
                  fontWeight: isSelected ? 500 : 400,
                  fontStyle: isSelected ? "italic" : "normal",
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

export default VFSelect;
