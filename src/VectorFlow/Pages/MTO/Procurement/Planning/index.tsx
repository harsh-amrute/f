import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from './useProcPlanning';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useState } from 'react';
import moment from 'moment';
import OverlayLoader from '../../Common/Loader';

const ProcurementPlanning = () => {
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const datetime = moment(d).format(format2);
    const [date, selectedDate] = useState<string>(datetime);
    const { renderView, toggleCurrentTab, fetchData, isLoading, currentTab } = useProcPlanning(date);
    const handleDateChange = (date: string) => {
        selectedDate(date);
    };
    return (
        <>

            {isLoading && (
                <OverlayLoader />
            )}

            <div style={{ display: "flex", height: "100%", flexDirection: "column", paddingBottom: "2rem" }}>



                <ActionToolBar
                    comp={'Procurement Planning'}
                    onDateChange={handleDateChange}
                    isReleaseDate
                    isAddFilterButton
                    isExcelExport
                    submitDate={() => { fetchData(date, 1, currentTab.label === 'Shortage' ? '0' : '1') }}
                    date={date}
                />
                <div style={{ zoom: 0.75 }}>
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
                </div>
                {/* <ProcurementLayout> */}
                {renderView()}
                {/* </ProcurementLayout> */}
            </div>
        </>
    )
}

export default ProcurementPlanning


