//import { CustomCellRendererProps } from "@ag-grid-community/react";
import { FlatIcon } from "./styles";

const ActionCellRenderer = (/*props: CustomCellRendererProps*/) => {

    return (
        <div className="action-cell">
            <FlatIcon src={"/assets/img/mto/DeptWiseBmReport/exclamatory.svg"} />
            {/* You can add additional content here */}
        </div>
    );
}

export default ActionCellRenderer;
