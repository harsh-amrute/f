import { useSelect } from "downshift";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  selected: Option | null;
  placeholder?: string;
  options: Option[];
  width?: string | number;
  optionsWidth?: string | number;
}

const CustomSelect = ({
  selected,
  placeholder = "",
  options,
  width,
  optionsWidth,
}: CustomSelectProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useSelect<Option>({
    items: options,
    selectedItem: selected,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      // trigger parent onChange manually if needed, implement as per your context
    },
  });

  return (
    <div style={{ width: width || "max-content", position: "relative" }}>
      <div
        {...getToggleButtonProps()}
        style={{
          border: "1px solid hsl(0, 0%, 80%)",
          boxShadow: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer",
          userSelect: "none",
          fontSize: 14,
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>{selected ? selected.label : placeholder}</div>
        <div style={{ pointerEvents: "none" }}>
          {/* Add dropdown arrow if desired */}▼
        </div>
      </div>

      <ul
        {...getMenuProps()}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxHeight: 150,
          overflowY: "auto",
          width: optionsWidth || "150px",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          boxShadow: isOpen ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "none",
          position: "absolute",
          backgroundColor: "white",
          zIndex: 1000,
          display: isOpen ? "block" : "none",
        }}
      >
        {isOpen &&
          options.map((item, index) => {
            const isSelected = selectedItem?.value === item.value;
            const isHighlighted = highlightedIndex === index;
            return (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  backgroundColor: isHighlighted ? "#eee" : "white",
                  cursor: "pointer",
                  borderBottom:
                    index < options.length - 1 ? "1px solid #eee" : "none",
                }}
                aria-selected={isHighlighted}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  tabIndex={-1}
                  style={{ marginRight: 8 }}
                />
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CustomSelect;
