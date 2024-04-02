
import {useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import {CapsuleWrapper} from "./styles";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from '../styles';
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import VFFloatingTab from "../../../../../../components/VectorFLOW/commons/VFFloatingTab";
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";


import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-community";



interface EconomicalWiseProps{
    data:any
    currentPageTab:string
    handleClick?:(i:any)=>void
    isLoading:boolean
}




const EconomicalWise = ({data,currentPageTab,handleClick,isLoading}:EconomicalWiseProps) => {

    const refGraph1 = useRef<GridRef>(null);
    const refGraph2 = useRef<GridRef>(null);

    const options:AgChartOptions = {
        title: {
            text: "Buffer Trends Graph",
          },
        //data: data,
        series: [
          {
            type: "line",
            xKey: "dt",
            yKey: "B",
            yName: "Black",
            stroke: "black" ,
            
            marker:{
                fill:"Black",
                stroke:"Black",
                //: "square",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "BU",
            yName: "Blue",
            stroke: "Blue" ,
            marker:{
                fill:"Blue",
                stroke:"Blue",
                //: "square",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "R",
            yName: "Red",
            stroke: "Red" ,
            marker:{
                fill:"Red",
                stroke:"Red",
                //shape: "square",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "Y",
            yName: "Yellow",
            stroke: "Yellow" ,
            marker:{
                fill:"Yellow",
                stroke:"Yellow",
                //shape: "square",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "G",
            yName: "Green",
            stroke: "Green" ,
            marker:{
                fill:"Green",
                stroke:"Green",
                //shape: "square",
            }
          }
          ,
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "W",
            yName: "White",
            stroke: "grey" ,
            marker:{
                fill:"grey",
                stroke:"grey",
                
            }
          }
        
        ],
      };

      const graph1 = [
        'This graph shows the trend of number of SKU Locations in Black, Red, Green, Yellow, and White.(economical)'
      ]

      const graph2 = [
        'This graph shows the trend of percentage of SKU Locations in Black, Red, Green, Yellow, and White.'
      ];
    
    return(
        <>
            <Allotment>
                <Allotment.Pane preferredSize={1000}>
                    <SCChartContainer height={547}>
                        <SCChartHeaderContainer style={{display:'flex', justifyContent:'right',marginBottom:'5px'}}>

                            <CapsuleWrapper>
                                <VFCapsule
                                    defaultActive={0}
                                    capsules={[
                                        {
                                            label:"Absolute",
                                            value:'absolute'
                                        },
                                        {
                                            label:"Percentage",
                                            value:'percentage'
                                        }
                                    ]}
                                    handleClick={handleClick}
                                    
                                />
                            </CapsuleWrapper>                           
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                            <div style={{ height:'85%'}}>
                                <AgChartsReact options={{...options, data:data}}/>
                            </div>
                            
                        {/* <div id="LocationWiseGraph1"></div> */}
                    </SCChartContainer>

                    {!isLoading && (<div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <VFInfoTip text={graph1}/>
                    </div>)}
                </Allotment.Pane>
                
            </Allotment>
        </>
    )
    
}

export default EconomicalWise;