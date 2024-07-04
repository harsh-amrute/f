import { ProcurementLayout } from './styles';
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from './useProcPlanning';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useState } from 'react';
import moment from 'moment';

const ProcurementPlanning = () => {
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const datetime = moment(d).format(format2);
    const [date, selectedDate] = useState<string>(datetime);
    const { renderView, toggleCurrentTab, fetchData } = useProcPlanning(date);
    const handleDateChange = (date: string) => {
        selectedDate(date);
    };
    return (
        <>
            <ActionToolBar
                comp={'Procurement Planning'}
                onDateChange={handleDateChange}
                submitDate={() => { fetchData(date) }}
                date={date}
            />
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


