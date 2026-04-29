import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import {
  VFTableWrapper,
  vHeight,
} from "../../../../../components/VectorFLOW/commons/VFTable/styles.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface VFTableProps extends AgGridReactProps {
  height?: string;
  disableZoomScaling?: boolean;
}

const CustomVFTable = forwardRef((props: VFTableProps, ref: any) => {
  const { user } = useUserData();

  const theme = user.user.theme_ui;

  const getClassName = () => {
    switch (theme) {
      case "NOIRFUSION":
        return "ag-theme-btr-noir-fusion";
      case "REGALBLAZE":
        return "ag-theme-btr-regal-blaze";
      case "PUREELEGANCE":
        return "ag-theme-btr-pure-elegance";
      case "CHARCOALCHIC":
        return "ag-theme-btr-charcoal-chic";
      default:
        return "ag-theme-btr-noir-fusion";
    }
  };
  const className = getClassName();
  return (
    <div
      className={`${VFTableWrapper} ${className} ag-theme-alpine`}
      role={"table"}
      style={{
        margin: "0px 0px 0px 0px",
        ...assignInlineVars({
          [vHeight]: props.height,
        }),
      }}
    >
      <AgGridReact ref={ref} {...props} />
    </div>
  );
});

export default CustomVFTable;
