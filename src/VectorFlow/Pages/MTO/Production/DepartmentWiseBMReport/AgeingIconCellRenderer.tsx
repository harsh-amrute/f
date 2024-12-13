//import { CustomCellRendererProps } from "@ag-grid-community/react";
import { FlatIcon1 } from "./styles";


const ActionCellRenderer = (props: any) => {

    return (
        props.data?.ha ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <FlatIcon1
                    title="High Ageing"
                //src={"/assets/img/mto/DeptWiseBmReport/exclamatory.svg"}
                />
            </div>
            :
            null
    )

}

export default ActionCellRenderer;
