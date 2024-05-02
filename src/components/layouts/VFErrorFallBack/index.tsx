// import VFButton from "../../VectorFLOW/commons/VFButton"
import VFButtonOutline from "../../VectorFLOW/commons/VFButtonOutline"
import { VFErrorFallBackHeader, VFErrorFallBackWrapper,VFErrorFallBackContainer,VFErrorFallBackButtonGroup } from "./styles"



const VFErrorFallBack = ()=>{

    const handleGoHome =()=>{
        window.location.href = '/master-data-management/control-panel'
    }

    return(
        <VFErrorFallBackWrapper>
            <VFErrorFallBackContainer>
                <VFErrorFallBackHeader>Something went wrong</VFErrorFallBackHeader>
                <VFErrorFallBackButtonGroup>
                    <VFButtonOutline themeUi="NOIRFUSION" onClick={handleGoHome}  width={150}>
                        Go Home
                    </VFButtonOutline>
                    <div style={{width:20}}/>
                    {/* <VFButton themeUi="NOIRFUSION" onClick={()=>console.log('')} width={150}>
                        Contact Support
                    </VFButton> */}
                </VFErrorFallBackButtonGroup>
            </VFErrorFallBackContainer>
        </VFErrorFallBackWrapper>
    )
}

export default VFErrorFallBack