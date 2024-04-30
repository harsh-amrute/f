
 import {SCChartContainer, SCDynamicContainer, SCHorizontalDivider} from '../style';
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import { AgChartsReact } from "ag-charts-react";
import { Allotment } from "allotment";
import {useGetExcessInventorySku,useGetExcessInventoryValue}from "../../../../../Services/MTA/InsightsAndTrends";
import VFLoader from '../../../../../../components/VectorFLOW/commons/VFLoader';

const ExcessInventoryTrend=()=>{
    const {data:ExcessInventorySkuData, isLoading:isLoaderGraph1}=useGetExcessInventorySku();
    const {data:ExcessInventoryValueData, isLoading:isLoaderGraph2}=useGetExcessInventoryValue();
            
    const ExcessInventorySku=ExcessInventorySkuData?.data?.data;
    const ExcessInventoryValue=ExcessInventoryValueData?.data?.data;

    const options1 = {
    title: {  
      text: 'Excess Inventory Trend (Count Of SKU)-Last 90 Days',
    },
     data: ExcessInventorySku,     
    series: [
      {
    
        xKey: 'date',
        xName:'Date',
        yKey: 'countSku',
        yName:'Count of SKU',
      
        strokeWidth: 3,
        stroke: "#000000",
        marker: {
          fill: "#BC3D81",
          size: 12,
          stroke: "white",
          strokeWidth: 2,
         
        },        
      }
     
    ],
    axes: [{
        type: "category",
        position: "bottom",
      
  } as const,
      {         
        type: "number",
        position: "left"
       
      }as const
]
}
const options2 = {
    title: {  
      text: 'Excess Inventory Trend (In Value)-Last 90 Days',
    },
     data: ExcessInventoryValue,     
    series: [
      {
    
        xKey: 'date',
        xName:'Date',
        yKey: 'value',
        yName:'Value In Lakhs',
      
        strokeWidth: 3,
        stroke: "#000000",
        marker: {
          fill: "#BC3D81",
          size: 12,
          stroke: "white",
          strokeWidth: 2,
         
        },        
      }
     
    ],
    axes: [{
        type: "category",
        position: "bottom",
      
  } as const,
      {         
        type: "number",
        position: "left"
       
      }as const
]
}
const graph1=['This graph highlights the date-wise trend of excess inventory across various locations and products over the past 7 days','Excess Inventory = Quantity > Norm']

const graph2=['This graph highlights the date-wise trend of excess inventory in value across various locations and products over the past 7 days','Excess Inventory = Quantity > Norm']

if(isLoaderGraph1||isLoaderGraph2){
  <VFLoader/>
}
    return    (

             
            <SCDynamicContainer>
       <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={450} >
<div style={{top: '316px',
left: '293px',
width: '550px',
height: '400px'}}><AgChartsReact options={options1} /></div>
  <SCHorizontalDivider/>
</SCChartContainer>
 <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                           
                        </div>
</Allotment.Pane>
<Allotment.Pane preferredSize={'50%'}>
                        <SCChartContainer height={450}>
<div style={{top: '316px',
left: '1191px',
width: '550px',
height: '400px'}}><AgChartsReact options={options2} /></div>
  <SCHorizontalDivider/>
</SCChartContainer>
 <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>

                        </div>
</Allotment.Pane>
</Allotment>
</SCDynamicContainer>
  
    )
}

export default ExcessInventoryTrend