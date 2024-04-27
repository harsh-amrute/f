
import { BTRLayoutTabsWrapper, BTRLayoutWrapper, ToggleViewBtnWrapper } from "./styles"
import useBTR from "./useBTR"

import {SCViewBackground,SCViewContainer,SCViewImage,SCVerticalDivider} from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar/styles'
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar"

const BufferTrendReport = ()=>{

    const {
        currentTab,
        isLoading,
        verticalView,
        toggleVerticalView,
        toggleCurrentTab,
        renderView
    } = useBTR()

    if(isLoading){
        return <VFLoader/>
    }
    

    return(
        <BTRLayoutWrapper>

            <ActionToolBar view={'grid'} setCurrentTab={''} currCategory={'BTR'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')} onExportToExcelCallBack genericRecordCount={0}/>


            <BTRLayoutTabsWrapper>
                <VFFloatingTab
                    handleClick={(tab:any)=>toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id:"1",
                            value:'both',
                            label:"Both On-Hand & Pipeline View"
                        },
                        {
                            id:"2",
                            value:'on-hand',
                            label:"On-Hand Inv. View"
                        },
                        {
                            id:"3",
                            value:'pipeline',
                            label:"Pipeline Inv. View"
                        }
                    ]}  
                />
                {currentTab?.id==='1' && (
                    <ToggleViewBtnWrapper>
                    <SCViewBackground>
                        <SCViewContainer onClick={() => toggleVerticalView(true)} style={{opacity:verticalView?1:0.4}}>
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"} style={{transform:'rotate(90deg)'}} alt="" />
                            <p style={{color:'#b0acac'}}>Vertical View</p>
                        </SCViewContainer>
                        <div><SCVerticalDivider/></div>
                        <SCViewContainer onClick={()=>toggleVerticalView(false)} style={{opacity:!verticalView?1:0.4}}>
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"}  alt=""  />
                            <p style={{color:'#bc3d81'}}>Horizontal View</p>
                        </SCViewContainer>
                    </SCViewBackground>
                </ToggleViewBtnWrapper>
                )}
            </BTRLayoutTabsWrapper>
            {renderView()}
        </BTRLayoutWrapper>
    )
}

export default BufferTrendReport