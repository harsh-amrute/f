import React, { ReactNode, RefObject, useRef, useState } from "react";
import { useSelect } from "downshift";
import { chooseThemeColor } from "../../../../../styles/global";
import { createPortal } from "react-dom";

const ArrowIcon = ({ icon: Icon }: { icon?: any }) =>
  Icon ? (
    <span style={{ display: "flex", alignItems: "center", padding: 0 }}>
      <Icon />
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

interface DropdownMenuProps {
  isOpen: boolean;
  buttonRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  // keep it loose if you don't care to type it strictly:
  getMenuProps: (options?: any) => any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, buttonRef, children, getMenuProps }) => {
  if (!isOpen) return null;
  console.log("buttonRef", buttonRef.current);
  const rect = buttonRef.current?.getBoundingClientRect();
  console.log("rect", rect);
  if (!rect) return null; // prevents error if ref is not ready

  return createPortal(
    <ul
      {...getMenuProps()}
      style={{
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        zIndex: 9999,
        background: "#fff",
        width: rect?.width,
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px #ddd",
        border: "1px solid hsl(0, 0%, 80%)",
        borderRadius: "0 0 4px 4px",
        maxHeight: 120,
        overflowY: "auto",
        boxSizing: "border-box",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </ul>,
    document.body
  );
};
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
  console.log("ArrowIcon received icon:", icon, buttonRef);

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
      ref={buttonRef}
      style={{
        position: "relative",
        width: placeholder === "Select Order Type" ? 170 : "100%",
        minWidth: "80px",
        ...rest.style,
      }}
    >
      <div
        {...getToggleButtonProps({
          disabled,
          "aria-label": placeholder,
          tabIndex: 0,
        })}
        style={{
          minHeight: 20,
          border: "1px solid hsl(0, 0%, 80%)",
          borderRadius: 0,
          backgroundColor: disabled ? "#F2F2F2" : "#fff",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          minWidth: "120px",
          cursor: disabled ? "not-allowed" : "pointer",
          padding: "4px 8px",
          color: "inherit",
          fontSize: 9,
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
          <ArrowIcon icon={icon} />
        </div>
      </div>
      <DropdownMenu
        isOpen={isOpen}
        buttonRef={buttonRef}
        getMenuProps={getMenuProps}
      >
        {isOpen && items.length === 0 && (
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "7px 12px",
              color: "#999",
              backgroundColor: "#fff",
              fontSize: 10,
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
                  fontSize: 9,
                  padding: "7px 12px",
                  backgroundColor: isHighlighted
                    ? primary25
                    : isSelected
                    ? primaryColor
                    : "#fff",
                  color: isHighlighted || isSelected ? "#222" : "#444",
                  cursor: disabled ? "not-allowed" : "pointer",
                  borderBottom: "1px solid #eee",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </li>
            );
          })}
      </DropdownMenu>
    </div>
  );
};

export default VFSelect;
