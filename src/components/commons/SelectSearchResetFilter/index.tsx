import { useState } from "react";
import { useCombobox } from "downshift";
import "./styles.css";

interface SelectSearchProps {
  placeholder: string;
  options: { label: string; value: string }[];
  valueFilter: any;
  setValueFilter: any;
}

const SelectSearchResetFilter = ({
  options,
  placeholder,
  valueFilter,
  setValueFilter,
}: SelectSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const {
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    inputValue,
    selectItem,
    isOpen: comboOpen,
    openMenu,
  } = useCombobox({
    items: options,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setValueFilter(selectedItem);
        setIsOpen(false);
      }
    },
  });

  const filteredItems = options.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div style={{ margin: 3, position: "relative" }}>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        target={
          <button
            className="select-search-input"
            onClick={() => {
              toggleOpen();
              if (!isOpen) openMenu();
            }}
            style={{
              background: "#F2F2F2",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              padding: "8px 12px",
              minWidth: 240,
              maxWidth: 300,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{valueFilter ? valueFilter.label : placeholder}</span>
              <span style={{ color: "#999", fontSize: 14 }}>▼</span>
            </div>
          </button>
        }
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 4px 11px rgba(0,0,0,0.1)",
            marginTop: 8,
            position: "absolute",
            zIndex: 2,
            maxWidth: 300,
          }}
        >
          <input
            {...getInputProps({
              placeholder: `Search ${placeholder}`,
              onFocus: openMenu,
            })}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ccc",
              padding: "8px 10px",
              fontSize: 14,
              outline: "none",
              background: "#F2F2F2",
              borderRadius: "6px 6px 0 0",
            }}
          />

          <ul
            {...getMenuProps()}
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              maxHeight: 200,
              overflowY: "auto",
              fontSize: 14,
            }}
          >
            {comboOpen &&
              filteredItems.map((item, index) => (
                <li
                  key={item.value}
                  {...getItemProps({ item, index })}
                  style={{
                    padding: "8px 10px",
                    backgroundColor:
                      highlightedIndex === index ? "#F2F2F2" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    selectItem(item);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </li>
              ))}

            {filteredItems.length === 0 && (
              <li
                style={{
                  padding: "8px 10px",
                  fontSize: 14,
                  color: "#666",
                }}
              >
                No results found
              </li>
            )}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
};

// --- Components reused from original code but CSP-safe ---

const Dropdown = ({ children, isOpen, target, onClose }: any) => (
  <div style={{ position: "relative" }}>
    {target}
    {isOpen ? children : null}
    {isOpen ? (
      <div
        onClick={onClose}
        style={{
          bottom: 0,
          left: 0,
          top: 0,
          right: 0,
          position: "fixed",
          zIndex: 1,
        }}
      />
    ) : null}
  </div>
);

export default SelectSearchResetFilter;
