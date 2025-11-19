import { useState } from "react";
import { useCombobox } from "downshift";
import "./styles.css";

interface SelectSearchProps {
  placeholder: string;
  options: { label: string; value: string }[];
  onChange: (value: any) => void;
}

const SelectSearch = ({
  options,
  placeholder,
  onChange,
}: SelectSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
        setSelectedItem(selectedItem);
        onChange(selectedItem.value);
        setIsOpen(false);
      }
    },
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const filteredItems = options.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div style={{ position: "relative", margin: 3 }}>
      <button
        type="button"
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
        className="select-search-input"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{selectedItem ? selectedItem.label : placeholder}</span>
          <span style={{ color: "#999", fontSize: 14 }}>▼</span>
        </div>
      </button>

      {isOpen ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.1), 0 4px 11px rgba(0,0,0,0.1)",
              marginTop: 8,
              maxWidth: 300,
              zIndex: 2,
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
                      fontSize: 14,
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

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      ) : null}
    </div>
  );
};

export default SelectSearch;
