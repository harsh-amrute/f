import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import {
    SCTaskBarContainer, 
    SCGoBackContainer, 
    SCGoBackText, 
    SCViewContainer, 
    SCViewToggle, 
    SCVerticalDivider, 
    SCViewImage,
    SCCustomActionsContainer
} from './styles';

interface ActionToolBarProps {
    view:string,
    category:string,
    onFloatingTabChange:(tab:any)=>void,
    onGoBack:()=>void

}
const ActionToolBar = ({view,category,onFloatingTabChange,onGoBack}:ActionToolBarProps) => {

    const renderFloatingTab = () => {
        let tabs:any = [];
        switch(category){
            case 'GITToChild':{
                tabs = [
                    {
                        id:'locationWise',
                        label:'Location-Wise',
                        value:'locationWise'
                    },
                    {
                        id:'transporterWise',
                        label:'Transporter-Wise',
                        value:'transporterWise'
                    },
                    {
                        id:'custom',
                        label:'Custom Screens',
                        value:'custom'
                    }
                ]
            }
            break;
        default:
            tabs=[];
            break;
        }
        return(
                <VFFloatingTab
                    tabs={tabs}
                    handleClick={onFloatingTabChange}
                />
        )
    }
    
    return (
        <>
            {
               (view === 'chart') && 
                    <SCTaskBarContainer>
                        <SCGoBackContainer>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" onClick={onGoBack} />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        {renderFloatingTab()}
                        <SCCustomActionsContainer>
                            <SCViewContainer>
                                <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" onClick={onGoBack} />
                                <p>Save</p>
                            </SCViewContainer>

                        
                            <SCViewToggle>
                                <SCViewContainer>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-pink.svg"} alt="" onClick={onGoBack} />
                                    <p style={{color:'#bc3d81'}}>Chart View</p>
                                </SCViewContainer>
                                <div><SCVerticalDivider/></div>
                                <SCViewContainer>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} alt="" onClick={onGoBack} />
                                    <p style={{color:'#b0acac'}}>Grid View</p>
                                </SCViewContainer>
                            </SCViewToggle>
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            
        </>
    )
}

export default ActionToolBar;