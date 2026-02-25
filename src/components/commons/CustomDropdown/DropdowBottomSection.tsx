import { SCViewContainerWithBg } from "../../VectorFLOW/commons/MTO/ActionToolBar/styles.css";
import ButtonFloat from "../ButtonFloat";

interface DropdowBottomSectionProps {
  clearAll: () => void;
  handleApply: () => void;
}

function DropdowBottomSection({
  clearAll,
  handleApply,
}: DropdowBottomSectionProps) {
  return (
    <div style={{ borderTop: "1px solid #ccc", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className={SCViewContainerWithBg}
          onClick={clearAll}
          style={{
            width: "7rem",
            fontSize: "1rem",
            fontWeight: 300,
            height: "2.3rem",
            padding: "0.5rem 1rem",
            borderRadius: "3px",
          }}
        >
          <p>Clear</p>
        </div>
        <ButtonFloat
          text="Apply"
          onClick={handleApply} // apply functionality pending
          icon=""
          styles={{
            width: "7rem",
            fontSize: "1rem",
            fontWeight: 300,
            height: "2.3rem",
            padding: "0.5rem 1rem",
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
}

export default DropdowBottomSection;
