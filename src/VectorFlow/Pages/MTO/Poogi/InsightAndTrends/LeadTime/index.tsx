import React, { useEffect, useState } from 'react'
import { useGetUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import ChartView from './ChartView';
import GridView from './GridView';
import { useGetLeadTimeData } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/LeadTime'
import { notifyError, notifySuccess } from '../../../../../../helpers/notify'
import OverlayLoader from '../../../Common/Loader';

const LeadTime = () => {
    const [isGridView, setIsGridView] = useState(false);

    const [HeaderData, setHeaderData] = useState();
    const [chartTableData, setChartTableData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const reportName = "LeadTime";

    const { mutateAsync: getUIConfigData } = useGetUIConfigData();
    const { mutateAsync: getLeadTimeData, isLoading} = useGetLeadTimeData()



    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        setColumnDef();
        getGridData();
    }, [])

    const getGridData = async () => {
        try{
            const data = await getLeadTimeData({graphFlag: 1});
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

    // Sample Data

    // const chartData: any = [
    //     { x: "Feb 2024", y: [2, 5, 8, 11, 14] },
    //     { x: "Mar 2024", y: [2, 3, 5, 6, 8] },
    //     { x: "May 2024", y: [1, 3, 4, 5, 9] },
    //     { x: "Jun 2024", y: [2, 4, 6, 8, 10] },
    //     { x: "July 2024-WK 1", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 2", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 3", y: [3, 5, 7, 9, 11] },
    //     { x: "July 2024-WK 4", y: [3, 5, 7, 9, 11] },
    //     { x: "Aug 2024-WK 1", y: [3, 6, 9, 12, 15] },

    // ];


    // const GraphTableData = [
    //     { 'week': 'Jul2024-Wk1', 'LW': 1, 'Q1': 3, 'Q2': 4, 'Q3': 7, 'HW': 9 },
    //     { 'week': 'Jul2024-Wk2', 'LW': 2, 'Q1': 4, 'Q2': 5, 'Q3': 8, 'HW': 10 },
    //     { 'week': 'Jul2024-Wk3', 'LW': 3, 'Q1': 5, 'Q2': 6, 'Q3': 9, 'HW': 11 },
    //     { 'week': 'Jul2024-Wk4', 'LW': 4, 'Q1': 6, 'Q2': 7, 'Q3': 10, 'HW': 12 },
    //     { 'week': 'Aug2024-Wk1', 'LW': 5, 'Q1': 7, 'Q2': 8, 'Q3': 11, 'HW': 13 },
    //     { 'week': 'Aug2024-Wk2', 'LW': 6, 'Q1': 8, 'Q2': 9, 'Q3': 12, 'HW': 14 },
    //     { 'week': 'Aug2024-Wk3', 'LW': 7, 'Q1': 9, 'Q2': 10, 'Q3': 13, 'HW': 15 },
    // ]



    return (
        <>
            <MTOActionToolBar handleGoBack={() => { setIsGridView(false) }} isGoBackButton={isGridView} isChartGridToggle isGridView={isGridView} setIsGridView={setIsGridView} isExcelExport />
            {isLoading && <OverlayLoader/>}
            {
                isGridView ?
                    <>
                        <GridView uiConfig={HeaderData}/>
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