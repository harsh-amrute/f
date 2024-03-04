import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import {
    SCTaskBarContainer, 
    SCGoBackContainer, 
    SCGoBackText, 
    SCViewContainer, 
    SCViewBackground, 
    SCVerticalDivider, 
    SCViewImage,
    SCCustomActionsContainer,
    SCViewContainerWithBg
} from './styles';
import { useUserData } from '../../../../../../context/UserDataContext';
interface ActionToolBarProps {
    view:string,
    currentTab:string,
    setCurrentTab:any,
    tabsList:Array<{id:string,label:string,value:string}>,
    onFloatingTabChange:(tab:any)=>void,
    onGoBack:()=>void
    onViewChange:(view:string)=>void,
    disableChartAndGridViewToggle?:boolean

}
const ActionToolBar = ({view,currentTab,tabsList,onFloatingTabChange,onGoBack,onViewChange,disableChartAndGridViewToggle}:ActionToolBarProps) => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    const renderFloatingTab = () => {
   
        return(
                <VFFloatingTab
                    tabs={tabsList}
                    handleClick={onFloatingTabChange}
                />
        )
    }

    
    return (
        <>
            {
               (view === 'chart') && 
                    <SCTaskBarContainer>
                        <SCGoBackContainer onClick={onGoBack}>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        {tabsList.length > 0 && renderFloatingTab()}

                        <SCCustomActionsContainer>
                            {
                                currentTab==='custom' &&
                                (
                                    <>
                                        <SCViewContainerWithBg>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" onClick={onGoBack} />
                                            <p>Save</p>
                                        </SCViewContainerWithBg>
                                        <SCViewContainerWithBg>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" onClick={onGoBack} />
                                            <p>Reset</p>
                                        </SCViewContainerWithBg>
                                        {!disableChartAndGridViewToggle && <SCVerticalDivider/> } 
                                    </>
                                )
                                
                            }
                             
                            {
                                !disableChartAndGridViewToggle &&
                                <SCViewBackground>
                                    <SCViewContainer>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-pink.svg"} alt="" />
                                        <p style={{color:'#bc3d81'}}>Chart View</p>
                                    </SCViewContainer>
                                    <div><SCVerticalDivider/></div>
                                    <SCViewContainer onClick={() => onViewChange('grid')}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} alt=""  />
                                        <p style={{color:'#b0acac'}}>Grid View</p>
                                    </SCViewContainer>
                                </SCViewBackground>
                            }
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            {
               (view === 'grid') && 
                    <SCTaskBarContainer>
                        <SCGoBackContainer onClick={onGoBack}>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" onClick={onGoBack} />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        {tabsList.length > 0 && renderFloatingTab()}
                        <SCCustomActionsContainer>
                                <VFButton themeUi={themeUi} onClick={()=>console.log("test")}>Edit Filter</VFButton>
                                <SCVerticalDivider/>
                                <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" onClick={onGoBack} />
                                    <p>Excel Export</p>
                                </SCViewContainerWithBg>
                                <SCVerticalDivider/>  
                                <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" onClick={onGoBack} />
                                    <p>Save</p>
                                </SCViewContainerWithBg>
                                <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" onClick={onGoBack} />
                                    <p>Reset</p>
                                    </SCViewContainerWithBg>
                                    {!disableChartAndGridViewToggle && <SCVerticalDivider/> }

                        
                            {
                                !disableChartAndGridViewToggle &&
                                <SCViewBackground>
                                    <SCViewContainer onClick={() => onViewChange('chart')}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-grey.svg"} alt="" />
                                        <p style={{color:'#b0acac'}}>Chart View</p>
                                    </SCViewContainer>
                                    <div><SCVerticalDivider/></div>
                                    <SCViewContainer>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"} alt="" onClick={onGoBack} />
                                        <p style={{color:'#bc3d81'}}>Grid View</p>
                                    </SCViewContainer>
                                </SCViewBackground>
                            }           
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            
        </>
    )
}

export default ActionToolBar;