
import IconCard from "../../../../../components/VectorFLOW/commons/Card/IconCard"
import { Container,PanelGrid, PanelGridWrapper } from "./styles"
import ButtonCard from "../../../../../components/VectorFLOW/commons/Card/ButtonCard"
import { useNavigate } from "react-router"



const ControlPanel = ()=>{

    const navigate = useNavigate()

    return (
        <Container>
            <PanelGridWrapper>
                <PanelGrid>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/edit.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/edit-hover.svg'} text={'View / Modify Records '}  onClick={()=>navigate('/master-data-management/view-modify')}/>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/add.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/add-hover.svg'} text={'Add Records '} onClick={()=>console.log("clciked")}/>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/delete.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/delete-hover.svg'} text={'Delete Records '} onClick={()=>console.log("clciked")}/>
                </PanelGrid>
            </PanelGridWrapper>
            <PanelGridWrapper>
                <PanelGrid>
                    <ButtonCard text="Forced Norm Changes" onClick={()=>console.log("clciked")}/>
                    <ButtonCard text="Phase-In Phase-Out" onClick={()=>console.log("clciked")}/>
                    <ButtonCard text="Seasonality" onClick={()=>console.log("clciked")}/>
                </PanelGrid>
            </PanelGridWrapper>
        </Container>
    )
}

export default ControlPanel