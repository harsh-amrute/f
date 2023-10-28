import {Dispatch,ReactNode,SetStateAction} from 'react';
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

interface VFTabProps{
  tabs:Tab[],
  setTabs:Dispatch<SetStateAction<Tab[]>>,
  allMasters:Master[],
  activeMaster:Master | undefined,
  setActiveMaster:Dispatch<SetStateAction<Master | undefined>>
  themeUi:string,
  onClose:(e:React.MouseEvent<HTMLElement>,tab:Tab) => void,
  newTabTitle?:string | undefined,
  newTabIcon:string,
  newTabHandler?:() => void,
  children:ReactNode,

}

const VFTab = ({tabs,allMasters,activeMaster,setActiveMaster,setTabs,themeUi,onClose,newTabTitle,newTabIcon,newTabHandler,children}:VFTabProps) => {

  const changeTab = (currTab: Tab) => {
    if(currTab.status === 'completed') return;
    const activeMaster = allMasters.find((master:Master) => master.id === currTab.id);
    setActiveMaster(activeMaster);
  }

  const getTabStatus = (activeMaster:Master | undefined,currTab:Tab) => {
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
                      >
                        <SCTabContent>
                          <SCTabTitle status={getTabStatus(activeMaster,tab)}>{tab.name.slice()}</SCTabTitle>
                          <img onClick={(e:React.MouseEvent<HTMLElement>) => {onClose(e,tab)}} src={getTabStatus(activeMaster,tab) === 'active' ? "/assets/img/VectorFLOW/NMS/close-white.svg" : tab.status === 'completed' ? "/assets/img/VectorFLOW/NMS/tick.svg" : "/assets/img/VectorFLOW/NMS/close.svg"}/>
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