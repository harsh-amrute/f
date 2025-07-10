import IconCard from "../../../../../components/VectorFLOW/commons/VFCard/IconCard"
import { Container,PanelGrid, PanelGridWrapper } from "./styles"
import { useNavigate } from "react-router";

// import ButtonCard from "../../../../../components/VectorFLOW/commons/VFCard/ButtonCard";
// import { useDispatch } from "react-redux";
// import { useGetMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM";
// import { ADD_MASTER,TOGGLE_SELECT_MASTER_SCREEN,UPDATE_ACTIVE_MASTER } from "../../../../../redux/actions/MDM";
// import { mapMasterToMasterState } from "../../../../../helpers/utils";
import { useUserData } from "../../../../../context";



const MTOControlPanel = ()=>{
    const navigate = useNavigate();

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    // const {mutateAsync:getUiConfig} = useGetMasterUIConfiguration()

    // const dispatch = useDispatch()
    // const handleFNC = async()=>{
    //     const data = await getUiConfig('modify')
    //     const fncData:any = data.data.data.find((m:any)=>m.id==="13")
    //     if(fncData){
    //       dispatch(ADD_MASTER(mapMasterToMasterState([fncData])[0]))
    //       dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
    //       dispatch(UPDATE_ACTIVE_MASTER(0))     
    //     }
    //     navigate('/mto/master-data-management/control-panel/view-modify')   
    // }

    return (
        <Container style={{padding: '20px'}}>
            <PanelGridWrapper>
                <PanelGrid>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/edit.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/edit-hover.svg'} text={'View / Modify Records '}  onClick={()=>navigate('/mto/master-data-management/control-panel/view-modify')} themeUi={themeUi}/>
                    <IconCard iconOnMouseOut={'/assets/img/VectorFLOW/NMS/add.svg'} iconOnMouseIn={'/assets/img/VectorFLOW/NMS/add-hover.svg'} text={'Add Records (Using Excel) '} onClick={()=>navigate('/mto/master-data-management/control-panel/add')} themeUi={themeUi}/>
                </PanelGrid>
            </PanelGridWrapper>
        </Container>
    )
}

export default MTOControlPanel