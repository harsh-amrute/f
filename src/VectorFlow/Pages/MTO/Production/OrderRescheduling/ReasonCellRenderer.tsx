import { etaCellRendererWrapper, reasonInput } from "./styles.css";
import { useState } from "react";
const ReasonCellRenderer = (params: any) => {
  const [val, setVal] = useState(
    params.node.data.rs ? params.node.data.rs : ""
  );

  const selects = params.api.getSelectedRows();
  let disabled = true;

  if (selects) {
    const myodk = params.data.odk;

    selects.forEach((element: any) => {
      if (element.odk === myodk) {
        disabled = false;
      }
    });
  }

  return (
    <div className={etaCellRendererWrapper}>
      <input
        className={reasonInput}
        disabled={disabled}
        value={!disabled ? val : ""}
        onChange={(e) => {
          params.data.rs = e.target.value;
          setVal(params.data.rs);
        }}
        placeholder="Enter your reason here..."
        type="text"
      />
    </div>
  );
};

export default ReasonCellRenderer;
