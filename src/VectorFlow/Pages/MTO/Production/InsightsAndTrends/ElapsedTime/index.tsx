import { Allotment } from 'allotment'
import { useEffect, useState } from 'react'
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

const ElapsedTime = () => {

    const [isGridView, setIsGridView] = useState(false);

    
    const reportName = "Elapse Time";

    const [HeaderData, setHeaderData] = useState();
    const [selectedPlant, setSelectedPlant] = useState<any>();
    const [selectedDept, setSelectedDept] = useState<any>();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getElapsedTimeData, isLoading } = useGetElapsedTimeData()
    const { mutateAsync: getElapsedDaysforDeptPlantData, isLoading: isLoading2 } = useGetElapsedDaysforDeptPlantData()

     const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const [deptwiseChartTableData, setDeptwiseChartTableData] = useState([]);
    const [deptwiseChartData, setDeptwiseChartData] = useState([]);
    const [alertData, setAlertData] = useState([]);


    const [weeklyChartTableData, setWeeklyChartTableData] = useState([]);
    const [weeklyChartData, setWeeklyChartData] = useState([]);

    const getDeptWiseChartData = async () => {
        try{
            const data = await getElapsedTimeData({graphFlag: 1});
            const chartData: any = []
            const tableData: any = []
            const alertData: any = []
            Object.entries(data.data.data).forEach((entry: any)=>{
                const obj = _.cloneDeep(entry[1]);
                if(obj.cl != "Grey"){
                    alertData.push({x: entry[0], y: [obj.uw + 1]})
                }else{
                    alertData.push({x: entry[0], y: []})
                }
                delete obj["cl"]
                chartData.push({x: entry[0], y: Object.values(obj)})
                tableData.push({...entry[1], department: entry[0]})
            })
            setDeptwiseChartTableData(tableData);
            setDeptwiseChartData(chartData)
            setAlertData(alertData)
            notifySuccess("Data Fetched Successfully!")
        }
        catch(err: any){
            console.log(err)
            notifyError("Something Went Wrong")
        }
        
    }

    const getWeeklyChartData = async () => {
        try{
            const data = await getElapsedDaysforDeptPlantData({plant: selectedPlant.value, dept: selectedDept.value});
            const chartData: any = []
            const tableData: any = []
            Object.entries(data.data.data).forEach((entry: any)=>{
                const obj = _.cloneDeep(entry[1]);
                delete obj["cl"]
                chartData.push({x: entry[0], y: Object.values(obj)})
                tableData.push({...entry[1], week: entry[0]})
            })
            setWeeklyChartTableData(tableData);
            setWeeklyChartData(chartData)
            setAlertData(alertData)
            notifySuccess("Data Fetched Successfully!")
        }
        catch(err: any){
            console.log(err)
            notifyError("Something Went Wrong")
        }
    }




    const handleSelectionChange = (newPlant: any, newDept: any) => {
        setSelectedPlant(newPlant);
        setSelectedDept(newDept);
    }

    useEffect(() => {
        setColumnDef();
        getDeptWiseChartData();
    }, [])

    useEffect(()=>{
        if(selectedDept?.value && selectedPlant?.value){
            getWeeklyChartData()
        }
    }, [selectedDept, selectedPlant])

    return (
        <>
            <MTOActionToolBar comp={"BTRMTO"} isAddFilterButton isChartGridToggle setIsGridView={setIsGridView} isGridView={isGridView} />

            {
                !isGridView ?
                    <>
                    {(isLoading || isLoading2) && <OverlayLoader/>}

                        <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <BTRTableWrapper style={{ flex: '1', margin: '0' }}>
                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <DeptWiseGraph chartData={deptwiseChartData} chartTableData={deptwiseChartTableData} alertData={alertData}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <WeekWiseGraph handleSelectionChange={handleSelectionChange} chartTableData={weeklyChartTableData} chartData={weeklyChartData} plant={selectedPlant} dept={selectedDept}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>



                            </BTRTableWrapper>

                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GridView uiConfig={HeaderData}/>
                    </>
            }
        </>
    )
}

export default ElapsedTime