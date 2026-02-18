import { useColorOptionStyles } from "../../../../../../../hooks/useVFFilterContent";

export interface CustomOptionProps {
  item: { value: string; label: string; color?: string };
  isSelected: boolean;
  isHighlighted: boolean;
}

export const COptCheckboxNoBorder = ({
  item,
  isSelected,
  isHighlighted,
}: CustomOptionProps) => {
  const optionStyles = useColorOptionStyles();

  return (
    <div
      style={{
        ...optionStyles.optionContainer,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 20px",
        background: isHighlighted ? "#FCE4F0" : isSelected ? "#BC3D80" : "#fff",
      }}
    >
      <input
        type="checkbox"
        style={{
          width: 18,
          height: 18,
          accentColor: "#BC3D80",
        }}
        checked={isSelected}
        readOnly
      />
      <span>{item.label}</span>
    </div>
  );
};

export const COptCheckboxWithBorder = ({
  item,
  isSelected,
  isHighlighted,
}: CustomOptionProps) => {
  const optionStyles = useColorOptionStyles();

  return (
    <div
      style={{
        ...optionStyles.optionContainer,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 8px",
        border: isHighlighted
          ? "2px solid #BC3D80"
          : isSelected
          ? "2px solid #BC3D80"
          : "",
      }}
    >
      <input
        type="checkbox"
        style={{
          width: 18,
          height: 18,
          accentColor: "#BC3D80",
        }}
        checked={isSelected}
        readOnly
      />
      <span>{item.label}</span>
    </div>
  );
};
export const COptColorCheckbox = ({
  item,
  isSelected,
  isHighlighted,
}: CustomOptionProps) => {
  const optionStyles = useColorOptionStyles();

  return (
    <div
      style={{
        ...optionStyles.optionContainer,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "6px",
        padding: "10px 8px",
        background: isHighlighted ? "#FCE4F0" : isSelected ? "#BC3D80" : "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          style={{
            width: 14,
            height: 14,
            accentColor: "#BC3D80",
            marginRight: "16px",
          }}
          checked={isSelected}
          readOnly
        />
        <span>{item.label}</span>
      </div>
      <div
        style={{
          width: 20,
          height: 20,
          background: item?.color || "white",
          margin: "0 8px",
          borderRadius: "4px",
          border: "1px solid white",
        }}
      />
    </div>
  );
};
