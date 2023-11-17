import {ReactNode} from 'react';
import {
    SCTabArea,
    SCTabHeader,
    SCTabHeaderLeft,
    SCTabButton,
    SCTabBody,
    SCTabContent,
    SCTabTitle
  } from './styles'
import {type Tab, type Master} from '../../../../VectorFlow/types/MDM';
// import { useDispatch } from 'react-redux';
// import { setActiveMaster } from '../../../../redux/features/MDM';

interface VFTabProps{
  tabs:Tab[],
  allMasters:Master[],
  activeMaster:Master,
  themeUi:string,
  onClose:(e:React.MouseEvent<HTMLElement>,tab:Tab) => void,
  newTabTitle?:string | undefined,
  newTabIcon?:string,
  newTabHandler?:() => void,
  children?:ReactNode,

}

const VFTab = ({tabs,allMasters,activeMaster,themeUi,onClose,newTabTitle,newTabIcon,newTabHandler,children}:VFTabProps) => {
  
  // const dispatch = useDispatch();

  const changeTab = (currTab: Tab) => {
    return
    // if(currTab.status === 'completed') return;
    // const activeMaster = allMasters.find((master:Master) => master.id === currTab.id);
    // if(activeMaster) dispatch(setActiveMaster(activeMaster));
  }

  const getTabStatus = (activeMaster:Master,currTab:Tab) => {
    if(currTab.status === 'completed') return 'completed';
    return activeMaster?.id === currTab.id ? 'active' : currTab.status;

  }

  return(
      <SCTabArea>
        <SCTabHeader>
            <SCTabHeaderLeft>
              {
                tabs.map((tab:Tab,index:number)=>{
                  return(
                    <SCTabButton 
                      status={getTabStatus(activeMaster,tab)} 
                      zIndex={tabs.length-index} 
                      marLeft={index !== 0} 
                      themeUi={themeUi}
                      onClick={() => { 
                        changeTab(tab) 
                      }}
                      key={tab.id}
                      data-testid="tab-button"
                      >
                        <SCTabContent>
                          <SCTabTitle status={getTabStatus(activeMaster,tab)}>{tab.name.slice()}</SCTabTitle>
                          <img data-testid="tab-close" onClick={(e:React.MouseEvent<HTMLElement>) => {onClose(e,tab)}} src={getTabStatus(activeMaster,tab) === 'active' ? "/assets/img/VectorFLOW/NMS/close-white.svg" : tab.status === 'completed' ? "/assets/img/VectorFLOW/NMS/tick.svg" : "/assets/img/VectorFLOW/NMS/close.svg"}/>
                        </SCTabContent>
                    </SCTabButton>
                  )
                })
              }
              <SCTabButton
                status={''}
                zIndex={0}
                marLeft={true}
                themeUi={themeUi}
                onClick={() => {
                  if(newTabHandler) newTabHandler();
                }}
                data-testid="new-tab"
              >
                  <SCTabContent>
                    <img style={{marginRight:'18px'}} src={newTabIcon}/>
                    <SCTabTitle status={''}>{newTabTitle}</SCTabTitle>
                  </SCTabContent>
              </SCTabButton>
            </SCTabHeaderLeft>

        </SCTabHeader>
        <SCTabBody>
          {children}
        </SCTabBody>
    </SCTabArea>
  )
}

export default VFTab;