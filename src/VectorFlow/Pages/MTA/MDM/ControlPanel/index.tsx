
import IconCard from "../../../../../components/VectorFLOW/commons/VFCard/IconCard"
import { Container,PanelGrid, PanelGridWrapper } from "./styles"
import ButtonCard from "../../../../../components/VectorFLOW/commons/VFCard/ButtonCard"
import { useNavigate } from "react-router";

import {createConflictRowData} from '../../../../../helpers/utils'

const ControlPanel = ()=>{
    const navigate = useNavigate();

    console.log(createConflictRowData([
        {
            "user": "rohan",
            "conflictdetails": [
                {
                    "oldData": {
                        "sc": "Jayesh",
                        "sd": "Thane",
                        "ec": "50",
                        "wt": "50.000",
                        "vm": "50.000",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    },
                    "requestedData": {
                        "sc": "Jayesh",
                        "sd": "Thane",
                        "ec": "50",
                        "wt": "50",
                        "vm": "50",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    }
                },
                {
                    "oldData": {
                        "sc": "Tarun",
                        "sd": "Vasai",
                        "ec": "50",
                        "wt": "50.000",
                        "vm": "50.000",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    },
                    "requestedData": {
                        "sc": "Tarun",
                        "sd": "Vasai",
                        "ec": "50",
                        "wt": "50",
                        "vm": "50",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    }
                }
            ]
        },
        {
            "user": "jayesh",
            "conflictdetails": [
                {
                    "oldData": {
                        "sc": "Jayesh",
                        "sd": "",
                        "ec": "0",
                        "wt": "",
                        "vm": "",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "",
                        "SL2": "",
                        "SL3": "",
                        "SL4": "",
                        "SL5": ""
                    },
                    "requestedData": {
                        "sc": "Jayesh",
                        "sd": "Thane",
                        "ec": "50",
                        "wt": "50",
                        "vm": "50",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    }
                },
                {
                    "oldData": {
                        "sc": "Tarun",
                        "sd": "",
                        "ec": "0",
                        "wt": "",
                        "vm": "",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "",
                        "SL2": "",
                        "SL3": "",
                        "SL4": "",
                        "SL5": ""
                    },
                    "requestedData": {
                        "sc": "Tarun",
                        "sd": "Vasai",
                        "ec": "50",
                        "wt": "50",
                        "vm": "50",
                        "c1": "",
                        "c2": "",
                        "c3": "",
                        "c4": "",
                        "c5": "",
                        "c6": "",
                        "c7": "",
                        "c8": "",
                        "c9": "",
                        "c10": "",
                        "c11": "",
                        "c12": "",
                        "c13": "",
                        "c14": "",
                        "c15": "",
                        "SL1": "ARR",
                        "SL2": "AR",
                        "SL3": "TR",
                        "SL4": "",
                        "SL5": ""
                    }
                }
            ]
        }
    ],"1"))

    return (
        <Container>
            <PanelGridWrapper>
                <PanelGrid>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/edit.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/edit-hover.svg'} text={'View / Modify Records '}  onClick={()=>navigate('/master-data-management/control-panel/view-modify')}/>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/add.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/add-hover.svg'} text={'Add Records '} onClick={()=>navigate('/master-data-management/control-panel/add')}/>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/delete.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/delete-hover.svg'} text={'Delete Records '} onClick={()=>navigate('/master-data-management/control-panel/delete')}/>
                </PanelGrid>
            </PanelGridWrapper>
            {/* <PanelGridWrapper>
                <PanelGrid>
                    <ButtonCard text="Forced Norm Changes" onClick={()=>console.log("clciked")}/>
                    <ButtonCard text="Phase-In Phase-Out" onClick={()=>console.log("clciked")}/>
                    <ButtonCard text="Seasonality" onClick={()=>console.log("clciked")}/> 
                </PanelGrid>
            </PanelGridWrapper> */}
        </Container>
    )
}

export default ControlPanel