import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from './useProcPlanning';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useEffect, useState } from 'react';
import moment from 'moment';
import OverlayLoader from '../../Common/Loader';
import useFilter from "../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import { FilterPageName } from "../../Common/Enum";

const APIFilterConfig = {
    filSecVisConfig: {
        "Proc_Procurement_Planning" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};

const ProcurementPlanning = () => {
    const [filterData, setFilterData] = useState({});
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const datetime = moment(d).format(format2);
    const [date, selectedDate] = useState<string>(datetime);
    const { 
        state: currFilter, 
        setState: setCurrFilter, 
        onFilterRemove, 
        isFilterOpen,
        isMfgSelected, 
        onAddFilter, 
        onApplyFilter, 
        toggleFilter 
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Proc_Procurement_Planning);
    const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const {
        renderView, 
        toggleCurrentTab, 
        fetchData, isLoading, 
        currentTab, 
        isUpdateUserConfig,
        isGetUserConfig,
        handleResetClick,
        handleSaveClick, 
    } = useProcPlanning(date);

    const handleDateChange = (date: string) => {
        selectedDate(date);
    };

    const getFilterData = async () => {
        try {
          const response = await getPageWiseFilterData({page_name: FilterPageName.Proc_Procurement_Planning, release_date: date});
          setFilterData(response?.data.data);
        } catch (error) {
          console.error(error);
        }
    }
    
    useEffect(() => {
        getFilterData()
    }, []);

    return (
        <>

            {(isLoading || isUpdateUserConfig || isGetUserConfig) && (
                <OverlayLoader />
            )}

            <div style={{ display: "flex", height: "100%", flexDirection: "column", paddingBottom: "2rem" }}>
                <ActionToolBar
                    comp={'Procurement Planning'}
                    onDateChange={handleDateChange}
                    isReleaseDate
                    isAddFilterButton
                    isExcelExport
                    submitDate={() => { 
                        fetchData(date, 1, currentTab.label === 'Shortage' ? '0' : '1') 
                        getFilterData()
                    }}
                    date={date}
                    handleSaveClick={handleSaveClick}
                    handleResetClick={handleResetClick}
                    isFilterOpen={isFilterOpen}
                    onAddFilter={onAddFilter}
                    toggleFilter={toggleFilter}
                    onApplyFilter={onApplyFilter}
                    multiFilter={currFilter}
                    setMultiFilter={setCurrFilter}
                    onFilterRemove={onFilterRemove}
                    isMfgSelected={isMfgSelected}
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


