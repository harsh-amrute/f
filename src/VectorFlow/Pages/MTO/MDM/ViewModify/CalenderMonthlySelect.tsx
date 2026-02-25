import { style } from "@vanilla-extract/css";

export const monthlyWrapper = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
});

export const select = style({
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "20px",
});

export const selectInline = style({
  width: "auto",
  marginBottom: "0px",
});

export const addButton = style({
  backgroundColor: "#82104C",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  selectors: {
    "&:hover": {
      backgroundColor: "#A42C68",
    },
  },
});

function CalenderMonthlySelect({
  formData,
  handleMnOptionsChange,
  handleMdOptionsChange,
  onAddClick,
  onRemoveClick,
  id,
}: any) {

  const current = formData.dow.find((m: any) => m.id === id) ?? { mn: '', md: '' };

  return (
    <div className={monthlyWrapper}>
      <label
        htmlFor="the"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        <input type="radio" id="the" checked readOnly /> The
      </label>

      <select
        className={`${select} ${selectInline}`}
        value={current.mn}
        onChange={(e) => handleMnOptionsChange(e, id)}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {["first", "second", "third", "fourth", "last"].map(
          (option: string, index: number) => (
            <option key={index} value={option}>
              {option}
            </option>
          )
        )}
      </select>

      <select
        className={`${select} ${selectInline}`}
        value={current.md}
        onChange={(e) => handleMdOptionsChange(e, id)}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {[
          "day",
          "weekday",
          "weekend day",
          "Su",
          "Mo",
          "Tu",
          "We",
          "Th",
          "Fr",
          "Sa",
        ].map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {id !== 0 ? (
        <button className={addButton} onClick={() => onRemoveClick(id)}>
          x
        </button>
      ) : (
        <button className={addButton} onClick={onAddClick}>
          +
        </button>
      )}
    </div>
  );
}

export default CalenderMonthlySelect;
