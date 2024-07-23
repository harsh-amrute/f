import { ProcurementLayout } from './styles';
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from './useProcPlanning';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useState } from 'react';
import moment from 'moment';
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay';

const ProcurementPlanning = () => {
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const datetime = moment(d).format(format2);
    const [date, selectedDate] = useState<string>(datetime);
    const { renderView, toggleCurrentTab, fetchData, isLoading } = useProcPlanning(date);
    const handleDateChange = (date: string) => {
        selectedDate(date);
    };
    return (
        <>

            {isLoading && (
                <VFOverlay>
                    <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>Loading....</h1>
                </VFOverlay>
            )}

            <div>


                <div style={{ zoom: 1.25 }}>

                    <ActionToolBar
                        comp={'Procurement Planning'}
                        onDateChange={handleDateChange}
                        isReleaseDate
                        isAddFilterButton
                        isExcelExport
                        submitDate={() => { fetchData(date) }}
                        date={date}
                    />
                </div>
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
            </div>
        </>
    )
}

export default ProcurementPlanning


