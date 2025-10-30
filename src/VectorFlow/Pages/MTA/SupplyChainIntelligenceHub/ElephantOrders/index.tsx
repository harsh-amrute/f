import useElephantOrders from "./useElephantOrders";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import { GridStateContext } from "../../../../../context/GridStateContext";
import { eoLayout } from "./styles.css";
import VFPagination from "../../../../../VectorFlow/Pages/MTO/Common/VFPagination";
import ActionToolBar from "../Planning/ActionToolBar";
import { useState } from "react";
import VFSave from "./VFSave";
import OverlayLoader from "../../../../../VectorFlow/Pages/MTO/Common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

const ElephantOrder = () => {
  const {
    isSavedDataLoading,
    VDRColumns,
    RowData,
    EOCount,
    currentPage,
    setExportExcelColumns,
    exportExcelColumns,
    tempDownloadData,
    setTempDownloadData,
    exportExcelRowData,
    setExportExcelRowData,
    isLoading,
    GetEOData,
    tempRef,
    tempAgGridProps,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    onExportToExcelCallBack,
    onApplyFilter,
    ref,
    agGridProps,
    generalFilterOptions,
    onResetCallback,
    onSubmitDueDate,
  } = useElephantOrders();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const ELEPHANT_ORDER_ROWS_PER_PAGE =
    EnvConfig["ELEPHANT_ORDER_ROWS_PER_PAGE"];

  return (
    <GridStateContext.Provider
      value={{
        ref: ref,
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
        onResetCallback: onResetCallback,
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        <ActionToolBar
          view={"grid"}
          setCurrentTab={""}
          currCategory={"EO"}
          currentTab={""}
          tabsList={[]}
          onApplyFilter={(e) => onApplyFilter(e)}
          onFloatingTabChange={() => console.log("")}
          onGoBack={() => console.log("")}
          onViewChange={() => console.log("")}
          genericRecordCount={EOCount}
          onExportToExcelCallBack={onExportToExcelCallBack}
          multiFilter={currFilter}
          generalFilterOptions={generalFilterOptions}
          setMultiFilter={setCurrFilter}
          onDelete={onDeleteFilter}
        />
      </div>
      <div className={eoLayout}>
        {(isLoading || isSavedDataLoading) && <OverlayLoader />}
        {/* ...rest of your EO layout content... */}
      </div>
    </GridStateContext.Provider>
  );
};

export default ElephantOrder;
