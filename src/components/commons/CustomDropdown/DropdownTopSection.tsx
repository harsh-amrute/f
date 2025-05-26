

interface DropdownTopSectionProps{
    selectAll : (e:React.ChangeEvent<HTMLInputElement>) => void;
    isSelectAll : boolean
}

function DropdownTopSection({selectAll,isSelectAll}: DropdownTopSectionProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        fontSize: "1.2rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <input type="checkbox" id="selectall-checkbox"  checked={isSelectAll}  onChange={(e)=> selectAll(e)} />
      <label htmlFor="selectall-checkbox">Select all</label>
    </div>
  );
}

export default DropdownTopSection;
