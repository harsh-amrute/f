import { ProcurementLayout } from './styles';
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from './useProcPlanning';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useState } from 'react';

const ProcurementPlanning = () => {
    const { renderView, toggleCurrentTab, fetchData } = useProcPlanning();
    const [date, selectedDate] = useState<string>('');
    const handleDateChange = (date: string) => {
        selectedDate(date);
    };
    return (
        <>
            <ActionToolBar
                comp={'Procurement Planning'}
                onDateChange={handleDateChange}
            />
            <text onClick={() => {
                fetchData(date)
            }} style={{ fontSize: 34 }}>Submit</text>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>

                <VFFloatingTab
                    handleClick={(tab) => toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id: 'ca',
                            label: 'Completely Available',
                            value: 'ca'
                        },
                        {
                            id: 'short',
                            label: 'Shortage',
                            value: 'short'
                        }
                    ]}
                />

            </div>
            <ProcurementLayout>
                {renderView()}
            </ProcurementLayout>
        </>
    )
}

export default ProcurementPlanning


