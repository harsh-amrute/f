import { addButton, monthlyWrapper, selectCls, selectInline } from "./styles.css";

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
        className={`${selectCls} ${selectInline}`}
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
        className={`${selectCls} ${selectInline}`}
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
