import { AgChartsReact } from "ag-charts-react";
import { useGetAvailabilityTrend} from "../../../../../Services/MTA/InsightsAndTrends";
 
const AvailabilityTrend=()=>{
  const {data:AvailabilityTrend}=useGetAvailabilityTrend();
  const rowData=AvailabilityTrend?.data?.data;
    
    const options = {
    title: {  
      text: 'Week Wise Availabilty Trend',
    },
     data: rowData,     
    series: [
      {
    
        xKey: 'week',
        yKey: 'percentage',
        strokeWidth: 3,
        stroke: "#BC3D81",
        marker: {
          fill: "#BC3D81",
          size: 12,
          stroke: "white",
          strokeWidth: 3,
         
        },        
      }
     
    ],
    axes: [{
        type: "category",
        position: "bottom",
      
  } as const,
      {         
        type: "number",
        position: "left",
        label: {
          format: "#{.0f} %",
        },      
      }as const
]
}

  return <div><AgChartsReact options={options}  /></div>
}
export default AvailabilityTrend