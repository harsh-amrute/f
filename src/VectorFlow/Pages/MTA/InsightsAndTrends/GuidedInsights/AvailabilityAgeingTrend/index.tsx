import { AgChartsReact } from "ag-charts-react";
import {  useGetAvailabilityAgeing} from "../../../../../Services/MTA/InsightsAndTrends";

const AvailabilityAgeingTrend=()=>{

    const {data:AvailabilityAgeing}=useGetAvailabilityAgeing();
    const AvailabilityAgeingTrendData=AvailabilityAgeing?.data?.data;
    const AvailabilityAgeingTrendOptions={
   title: {
      text: "Trend of #SKU-Loations with Continuous Black/Red/White Status >= Selected Minimum Ageing",
    },
    data: AvailabilityAgeingTrendData,
    series: [
      {
        type: "line" as const,
        xKey: "date",
        yKey: "red",
        yName: "red",
        strokeWidth: 3,
        stroke: "#DA3535",
        marker: {
          fill: "#DA3535",
          size: 5,
         
         
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "black",
        yName: "black",
        strokeWidth: 3,
        stroke: "#000000",
        marker: {
          fill: "#000000",
          size: 5,
        
         
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "white",
        yName: "white",
        strokeWidth: 3,
        stroke: "#BFBFBF",
        marker: {
          fill: "#BFBFBF",
          size: 5,
       
         
        },
      },
    ],

}
    return <div><AgChartsReact options={AvailabilityAgeingTrendOptions} /></div>
}
export default AvailabilityAgeingTrend