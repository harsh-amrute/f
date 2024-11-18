import { useNavigate } from "react-router"
import IconCard from "../../commons/VFCard/IconCard"
import { PanelGrid, PanelGridWrapper } from "../SelectMaster/styles"
import {  ToolsWrapper } from "./styles"


const Tools = ()=>{

    const navigate = useNavigate()

    return(
        <ToolsWrapper>
            <PanelGrid style={{gap:0,display:'flex',maxWidth:800}}>
                <div style={{flex:1,margin:'20px'}}>
                <IconCard
                    text="Manage Roles"
                    iconOnMouseIn="/assets/img/VectorFLOW/NMS/edit.svg"
                    iconOnMouseOut="/assets/img/VectorFLOW/NMS/edit.svg"
                    onClick={()=>navigate('/vector-admin/manage-roles')}
                    themeUi="NOIRFUSION"
                />
                </div>
                <div style={{flex:1,margin:'20px'}}>
                <IconCard
                    text="Manage URLs"
                    iconOnMouseIn="/assets/img/VectorFLOW/NMS/edit.svg"
                    iconOnMouseOut="/assets/img/VectorFLOW/NMS/edit.svg"
                    onClick={()=>navigate('/vector-admin/manage-urls')}
                    themeUi="NOIRFUSION"
                />
                </div>
            </PanelGrid>
        </ToolsWrapper>
    )
}

export default Tools