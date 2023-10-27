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
import {type Tab} from '../../../../VectorFlow/types/MDM';

interface VFTabProps{
  tabs:Tab[],
  setTabs:Dispatch<SetStateAction<Tab[]>>
  themeUi:string,
  onClose:(e:React.MouseEvent<HTMLElement>,tab:Tab) => void,
  newTabTitle?:string | undefined,
  newTabIcon:string,
  newTabHandler?:() => void,
  children:ReactNode,

}

const VFTab = ({tabs,setTabs,themeUi,onClose,newTabTitle,newTabIcon,newTabHandler,children}:VFTabProps) => {

  const changeTab = (currTab: Tab) => {
    const newTabs = tabs.map((tab:Tab) => {
      if(tab.status === 'completed') return tab;
      if(currTab.name == tab.name) return {name:tab.name,status:'active'}
      return {name:tab.name,status:''};
    })
    setTabs([...newTabs]);
  }

  return(
      <SCTabArea>
        <SCTabHeader>
            <SCTabHeaderLeft>
              {
                tabs.map((tab:Tab,index:number)=>{
                  return(
                    <SCTabButton 
                      status={tab.status} 
                      zIndex={tabs.length-index} 
                      marLeft={index !== 0} 
                      themeUi={themeUi}
                      onClick={() => { 
                        changeTab(tab) 
                      }}
                      >
                        <SCTabContent>
                          <SCTabTitle status={tab.status}>{tab.name.slice()}</SCTabTitle>
                          <img onClick={(e:React.MouseEvent<HTMLElement>) => {onClose(e,tab)}} src={tab.status === 'active' ? "/assets/img/VectorFLOW/NMS/close-white.svg" : tab.status === 'completed' ? "/assets/img/VectorFLOW/NMS/tick.svg" : "/assets/img/VectorFLOW/NMS/close.svg"}/>
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