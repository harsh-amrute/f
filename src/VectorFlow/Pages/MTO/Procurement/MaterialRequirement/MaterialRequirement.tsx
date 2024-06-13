import React,{useState} from 'react';
import ActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BTRLayoutTabsWrapper,
} from '../MaterialCoverage/styles';
import VFFloatingTab from '../../../../../components/VectorFLOW/commons/VFFloatingTab';

const MaterialRequirement = () => {

    const [currTab, setCurrTab] = useState<string>();

    return (
        <div>
            <ActionToolBar
                comp={'MaterialRequirement'}
            />
            <BTRLayoutTabsWrapper>
                <VFFloatingTab
                    handleClick={(e) => setCurrTab(e.value)}
                    tabs={[
                        {
                            id: "1",
                            value: 'SelectedDayView',
                            label: "Selected Day View"
                        },
                        {
                            id: "2",
                            value: 'CumulativeView',
                            label: "Cumulative View"
                        }
                    ]}
                    defaultTab={0}
                />
            </BTRLayoutTabsWrapper>

        </div>
    )
}

export default MaterialRequirement