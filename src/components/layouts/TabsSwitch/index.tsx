import { ReactElement } from "react";

import './tabSwitch.css';

interface ITabSwitchProps {
    heading: string;
    tabs: string[];
    handleTabChange: (tab: number) => void;
    activeTab: number;
    tabUI: ReactElement<any, any>
}

const TabSwitch = (props: ITabSwitchProps) => {
    const { heading, tabs, handleTabChange, tabUI, activeTab } = props;

    const handleTab = (tab: number) => () => {
        handleTabChange(tab);
    }

    const getBorders = (activeTab: number) => {
        if(tabs?.length === 1){
            return { borderRadius: '15px 15px' }
        }

        if(tabs.length > 1){
            if(activeTab === 0){
                return { borderRadius: '15px 0px 0px 15px'}
            }
            
            if(activeTab === tabs.length-1){
                return { borderRadius: '0px 15px 15px 0px'}
            }
        }

        return { borderRadius: '0px'}
    }

    return (
        <>
            <div className="tab-switch-container">
                <div className="tab-switch-heading">{heading}</div>
                <div className="tabs-wrapper">
                    {tabs?.map((tab: string, index: number)=>
                        <div 
                            style={getBorders(index)}
                            className={`${index === activeTab ? 'active-tab' : 'tab'}`} 
                            onClick={handleTab(index)}
                        >
                            {tab}
                        </div>
                    )}
                </div>
            </div>
            {tabUI}
        </>
    )
}

export default TabSwitch;
