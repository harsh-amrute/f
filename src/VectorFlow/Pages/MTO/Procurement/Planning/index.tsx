import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useProcPlanning from "./useProcPlanning";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useEffect, useState } from "react";
import moment from "moment";
import OverlayLoader from "../../Common/Loader";
import useFilter from "../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import { FilterPageName } from "../../Common/Enum";
import { useUserData } from "../../../../../context";
import BombExcelModal from "../../Common/BombExcelModal";

const APIFilterConfig = {
  filSecVisConfig: {
    Proc_Procurement_Planning: {
      mjr: false,
      or: true,
      res: true,
      cus: true,
    },
  },
};

const ProcurementPlanning = () => {
  const [filterData, setFilterData] = useState({});
  const [showExcelModal, setShowExcelModal] = useState(false);

  const {
    state: currFilter,
    setState: setCurrFilter,
    onFilterRemove,
    isFilterOpen,
    isMfgSelected,
    onAddFilter,
    onApplyFilter,
    toggleFilter,
    appliedFilters,
  } = useFilter(
    filterData,
    APIFilterConfig.filSecVisConfig.Proc_Procurement_Planning
  );
  const {
    mutateAsync: getPageWiseFilterData,
    isLoading: getFilterdataLoading,
  } = useGetFilterData();
  const {
    renderView,
    toggleCurrentTab,
    fetchData,
    isLoading,
    currentTab,
    handleResetClick,
    handleSaveClick,
    // childrenModal,
    // setShowExcelModal,
    // showExcelModal,
    getTempGridData,
    selectedDate,
    setSelectedDate,
    isPivot,
  } = useProcPlanning(appliedFilters);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({
        page_name: FilterPageName.Proc_Procurement_Planning,
        release_date: selectedDate,
      });
      setFilterData(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFilterData();
  }, []);

  const ExcelExportData = () => {
    if (isPivot) {
      getTempGridData();
      return;
    }
    else{
      setShowExcelModal(true);
    } 
  };

  
  const handleExcelConfirm = () => {
    setShowExcelModal(false);
    fetchData(
      selectedDate,
      1,
      currentTab?.label === "Shortage" ? "0" : "1",
      true,
      1,
      1
    );
  };
  const handleExcelCancel = () => {
    setShowExcelModal(false);
    fetchData(
      selectedDate,
      1,
      currentTab?.label === "Shortage" ? "0" : "1",
      true,
      0,
      0
    );
  };

  return (
    <>
      <BombExcelModal
        open={showExcelModal}
        onClose={() => setShowExcelModal(false)}
        onConfirm={handleExcelConfirm}
        onCancel={handleExcelCancel}
        themeUi={themeUi}
      />

      {(isLoading || getFilterdataLoading) && <OverlayLoader />}

      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          paddingBottom: "2rem",
        }}
      >
        <ActionToolBar
          comp={"Procurement Planning"}
          onDateChange={handleDateChange}
          isReleaseDate
          isAddFilterButton
          themeUi={themeUi}
          isExcelExport
          onExcelExportClick={ExcelExportData}
          submitDate={() => {
            // fetchData(date, 1, currentTab?.label === 'Shortage' ? '0' : '1')
            getFilterData();
          }}
          date={selectedDate}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2px",
            }}
          >
            <VFFloatingTab
              handleClick={(tab) => toggleCurrentTab(tab)}
              tabs={[
                {
                  id: "ca",
                  label: "Completely Available",
                  value: "ca",
                },
                {
                  id: "short",
                  label: "Shortage",
                  value: "short",
                },
              ]}
            />
          </div>
        </div>
        {/* <ProcurementLayout> */}
        {renderView()}
        {/* </ProcurementLayout> */}
      </div>
    </>
  );
};

export default ProcurementPlanning;
