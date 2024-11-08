import { Allotment } from 'allotment'
import { useEffect, useRef, useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import GridView from './GridView'
import WeekWiseGraph from './WeekWiseGraph'
import DeptWiseGraph from './DeptWiseGraph'
import { useGetUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UIConfig'
import { useGetElapsedDaysforDeptPlantData, useGetElapsedTimeData } from '../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/ElapseTime'
import { notifyError, notifySuccess } from '../../../../../../helpers/notify'
import _ from 'lodash'
import OverlayLoader from '../../../Common/Loader'
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { getColumnDefinations } from '../../../../../../helpers/utils';
import { UIGridCode} from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import ColorRangeCellRenderer from '../../../../../../VectorFlow/Pages/MTO/Common/ColorRangeCellRenderer';
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import useColDef from '../../../../../../hooks/useColDef'
// import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
// import useFilter from '../../../../../../hooks/useFilter';

// const APIFilterConfig = {
//     filSecVisConfig: {
//         "Prod_Elapsed_Time" : {
//             mjr : false,
//             or: false,
//             res: true,
//             cus: false
//         },
//     }
// };

const ElapsedTime = () => {

    const [isGridView, setIsGridView] = useState(false);
    const [deptwiseChartTableData, setDeptwiseChartTableData] = useState([]);
    const [deptwiseChartData, setDeptwiseChartData] = useState([]);
    const [alertData, setAlertData] = useState([]);
    const [weeklyChartTableData, setWeeklyChartTableData] = useState([]);
    const [weeklyChartData, setWeeklyChartData] = useState([]);
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState(false);
    const [colDef, setColDef] = useState([{}]);
    const [HeaderData, setHeaderData] = useState();
    const [selectedPlant, setSelectedPlant] = useState<any>();
    const [selectedDept, setSelectedDept] = useState<any>();
    // const [filterData, setFilterData] = useState({});
    // const { 
    //     state: currFilter, 
    //     setState: setCurrFilter, 
    //     onFilterRemove, 
    //     isFilterOpen, 
    //     isMfgSelected,
    //     onAddFilter, 
    //     onApplyFilter, 
    //     toggleFilter,
    //     appliedFilters
    // } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Elapsed_Time);
    // const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getElapsedTimeData, isLoading } = useGetElapsedTimeData()
    const { mutateAsync: getElapsedDaysforDeptPlantData, isLoading: isLoading2 } = useGetElapsedDaysforDeptPlantData()
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const { user } = useUserData();
    const { getColDef , colDefMap} = useColDef();
    const reportName = "Elapse Time";

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

    const getDeptWiseChartData = async () => {
        try {
            const data = await getElapsedTimeData({ graphflag: 1 });
            const chartData: any = []
            const tableData: any = []
            const alertData: any = []
            Object.entries(data.data.data).forEach((entry: any) => {
                const obj = _.cloneDeep(entry[1]);
                if (obj.cl != "Grey") {
                    alertData.push({ x: entry[0], y: [obj.uw + 1] })
                } else {
                    alertData.push({ x: entry[0], y: [] })
                }
                delete obj["cl"]
                chartData.push({ x: entry[0], y: Object.values(obj).sort((a: any, b: any) => a - b) })
                tableData.push({ ...entry[1], department: entry[0] })
            })
            setDeptwiseChartTableData(tableData);
            setDeptwiseChartData(chartData)
            setAlertData(alertData)
            notifySuccess("Data Fetched Successfully!")
        }
        catch (err: any) {
            console.log(err)
            notifyError("Something Went Wrong")
        }

    }

    const getWeeklyChartData = async () => {
        try {
            const data = await getElapsedDaysforDeptPlantData({ plant: selectedPlant.value, dept: selectedDept.value });
            const chartData: any = []
            const tableData: any = []
            Object.entries(data.data.data).forEach((entry: any) => {
                const obj = _.cloneDeep(entry[1]);
                delete obj["cl"]
                chartData.push({ x: entry[0], y: Object.values(obj).sort((a: any, b: any) => a - b) })
                tableData.push({ ...entry[1], week: entry[0] })
            })
            setWeeklyChartTableData(tableData);
            setWeeklyChartData(chartData)
            setAlertData(alertData)
            notifySuccess("Data Fetched Successfully!")
        }
        catch (err: any) {
            console.log(err)
            notifyError("Something Went Wrong")
        }
    }

    const handleSelectionChange = (newPlant: any, newDept: any) => {
        setSelectedPlant(newPlant);
        setSelectedDept(newDept);
    }

    // const getFilterData = async () => {
    //     try {
    //         const response = await getPageWiseFilterData({});
    //         setFilterData(response?.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        setColumnDef();
        getDeptWiseChartData();
        getUserColumnConfig();
        // getFilterData();
    }, [])

    useEffect(() => {
        if (selectedDept?.value && selectedPlant?.value) {
            getWeeklyChartData()
        }
    }, [selectedDept, selectedPlant])

    const getUserColumnConfig = async () => {
        try {
            const data = await getUserUIReportConfigData({
                un: user.user.name,
                rn_id: UIGridCode.ProdElapsedTime
            });

            const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
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
                rn_id: UIGridCode.ProdElapsedTime,
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

    const colDefCustomizations = {
        'Tags': {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        'BPP': {
            cellRenderer: ColorRangeCellRenderer ,
        },
    }

    useEffect(() => {
        setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
    }, [HeaderData])

    // const colDef = useMemo(() => getColumnDefinations(HeaderData, colDefCustomizations), [])

    useEffect(() => {
        if (isReset) {
            setColumnState(colDef);
            setIsReset(false)
        } else {
            handleSaveClick();
        }
    }, [isReset]);

    const elapsedTimeRef = useRef<any>();

    const ExcelExportRefCall =()=>{
        if(elapsedTimeRef?.current?.getExcelExport){
            elapsedTimeRef.current.getExcelExport();
        }
    }

    return (
        <>
            <MTOActionToolBar
                comp={"BTRMTO"}
                // isAddFilterButton
                isChartGridToggle
                isExcelExport = {isGridView ? true : false}
                onExcelExportClick = {ExcelExportRefCall}
                setIsGridView={setIsGridView}
                isGridView={isGridView}
                handleSaveClick={handleSaveClick}
                handleResetClick={handleResetClick}
                // isFilterOpen={isFilterOpen}
                // onAddFilter={onAddFilter}
                // toggleFilter={toggleFilter}
                // onApplyFilter={onApplyFilter}
                // multiFilter={currFilter}
                // setMultiFilter={setCurrFilter}
                // onFilterRemove={onFilterRemove}
                // isMfgSelected={isMfgSelected}
            />

            {
                !isGridView ?
                    <>
                        {(isLoading || isLoading2 || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />}

                        <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <BTRTableWrapper style={{ flex: '1', margin: '0' }}>
                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <DeptWiseGraph chartData={deptwiseChartData} chartTableData={deptwiseChartTableData} alertData={alertData} />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <WeekWiseGraph handleSelectionChange={handleSelectionChange} chartTableData={weeklyChartTableData} chartData={weeklyChartData} plant={selectedPlant} dept={selectedDept} />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>



                            </BTRTableWrapper>

                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GridView 
                            ref = {elapsedTimeRef}
                            colDef={colDef}
                            setCurrentGridRef={setCurrentGridRef}
                            currentGridRef={currentGridRef}
                            columnState={columnState}
                            appliedFilters={null}
                            colDefMap = {colDefMap}
                        />
                    </>
            }
        </>
    )
}

export default ElapsedTime