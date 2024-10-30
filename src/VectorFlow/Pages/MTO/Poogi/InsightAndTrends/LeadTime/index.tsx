import React, { useEffect, useState } from 'react'
import { useGetUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import ChartView from './ChartView';
import GridView from './GridView';
import { useGetLeadTimeData, useGetLeadTimeExcelData } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/LeadTime'
import { notifyError, notifySuccess } from '../../../../../../helpers/notify'
import OverlayLoader from '../../../Common/Loader';
import { useUserData } from "../../../../../../context/index";
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../../helpers/utils';
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import useFilter from '../../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../../hooks/useColDef';

const APIFilterConfig = {
    filSecVisConfig: {
      "Poogi_Lead_Time" : {
        mjr : false,
        or: false,
        res: true,
        cus: true
      },
    }
};
const LeadTime = () => {
    const [isGridView, setIsGridView] = useState(false);

    const [HeaderData, setHeaderData] = useState();
    const [chartTableData, setChartTableData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const reportName = "LeadTime";
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [colDef, setColDef] = useState([{}]);
    const [isReset, setIsReset] = useState(false);
    const [filterData, setFilterData] = useState({});
    const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const { 
        state: currFilter, 
        setState: setCurrFilter, 
        onFilterRemove, 
        isFilterOpen, 
        isMfgSelected,
        onAddFilter, 
        onApplyFilter, 
        toggleFilter,
        appliedFilters
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_Lead_Time);
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const { user } = useUserData();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData();
    const { mutateAsync: getLeadTimeData, isLoading} = useGetLeadTimeData()
    const {colDefMap,getColDef} = useColDef();
    const {mutateAsync : getLeadTimeExcelData} = useGetLeadTimeExcelData();

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            getColDef(response)
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const getUserColumnConfig = async () => {
        try {
          const data = await getUserUIReportConfigData({
            un: user.user.name,
            rn_id: UIGridCode.PoogiLeadTime
          });
    
          const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
          console.log(newConfig, 'GET');
          setColumnState(newConfig);
    
          if (!data) {
            console.error('Failed to apply column state');
          }
        } catch (error) {
          console.error(error);
        }
      }
    
    const handleSaveClick = async () => {
        try {
          const config = currentGridRef.current.api.getColumnState();
    
          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.PoogiLeadTime,
            cs: JSON.stringify(config)
          }
          await updateUserUIReportConfigData([payload]);
          await getUserColumnConfig();
    
        } catch (error) {
          console.error(error);
        }
      }
    
      const handleResetClick = () => {
        setIsReset(true);
      }
    
    const getFilterData = async () => {
        try {
          const response = await getPageWiseFilterData({page_name: FilterPageName.Poogi_Lead_Time});
          setFilterData(response?.data.data);
        } catch (error) {
          console.error(error);
        }
    }
    
    useEffect(() => {
        setColumnDef();
        getGridData();
        getFilterData();
    }, [])

    const getGridData = async (isExcelExport = false) => {
      if(isExcelExport){
        const headersdata = currentGridRef?.current?.api?.getColumnState();
        const formatedFilters = formatFilterJSON(appliedFilters)
        const body = getBodyForExcelExport({headersdata,appliedFilters:formatedFilters,colDefMap})
        try {
          const response = await getLeadTimeExcelData({body, isExcelExport : 1,report_name : FilterPageName.Poogi_Lead_Time})
          console.log('api response: ', response)
          DownloadExcel(response,FilterPageName.Poogi_Lead_Time)
        } catch (error) {
          console.log(error);
        }
      }else{

        try{
          const data = await getLeadTimeData({graphflag: 1});
          const chartData: any = []
          const tableData: any = []
          Object.entries(data.data.data).forEach((entry: any)=>{
            // console.log(entry1);
            chartData.push({x: entry[0], y: Object.values(entry[1]).sort((a: any,b: any)=> a - b)})
            tableData.push({...entry[1], week: entry[0]})
          })
          setChartTableData(tableData);
          setChartData(chartData)
          notifySuccess("Data Fetched Successfully!");
        }
        catch(err: any){
          console.log(err)
          notifyError("Something Went Wrong")
        }
      }
    }
    
    const colDefCustomizations = {
        'Tag': {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        'BPP': {
            cellRenderer: ColorCellRenderer,
        },
    }

    useEffect(() => {
        setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
      }, [HeaderData])

    useEffect(() => {
        if (isReset) {
          setColumnState(colDef);
          setIsReset(false)
        }else{
          handleSaveClick();
        }
      }, [isReset]);

    const GetExcelData = () =>{
      getGridData(true);
    }

    return (
        <>
            <MTOActionToolBar  
                handleSaveClick={handleSaveClick}
                handleResetClick={handleResetClick} 
                handleGoBack={() => { setIsGridView(false) }} 
                isGoBackButton={isGridView} 
                isChartGridToggle 
                isGridView={isGridView} 
                setIsGridView={setIsGridView} 
                isExcelExport = {isGridView ? true : false}
                onExcelExportClick={GetExcelData}
                isAddFilterButton
                isFilterOpen={isFilterOpen}
                onAddFilter={onAddFilter}
                toggleFilter={toggleFilter}
                onApplyFilter={onApplyFilter}
                multiFilter={currFilter}
                setMultiFilter={setCurrFilter}
                onFilterRemove={onFilterRemove}
                isMfgSelected={isMfgSelected}
            />
            {(isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader/>}
            {
                isGridView ?
                    <>
                        <GridView 
                            colDef={colDef} 
                            setCurrentGridRef={setCurrentGridRef} 
                            currentGridRef={currentGridRef}
                            columnState={columnState}
                            appliedFilters={appliedFilters}
                        />
                    </>
                    :
                    <>
                        <ChartView chartData={chartData} chartTableData={chartTableData}/>
                    </>
            }
        </>
    )
}

export default LeadTime