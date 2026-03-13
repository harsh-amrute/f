//import { CustomCellRendererProps } from "@ag-grid-community/react";
import _ from "lodash";
import { FlatIcon1, iconBgVar, iconBgHoverVar } from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const ActionCellRenderer = (props: any) => {
  return (
    !_.isEmpty(props.data) &&
    props.data?.ha && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          className={FlatIcon1}
          title="High Ageing"
          style={assignInlineVars({
            [iconBgVar]: `url("${process.env.PUBLIC_URL}/assets/img/mto/DeptWiseBmReport/exclamatory.svg")`,
            [iconBgHoverVar]: `url("${process.env.PUBLIC_URL}/assets/img/mto/DeptWiseBmReport/exclamatoryWhite.svg")`,
  
          })}

          //src={"/assets/img/mto/DeptWiseBmReport/exclamatory.svg"}
        />
      </div>
    )
  );
};

export default ActionCellRenderer;
