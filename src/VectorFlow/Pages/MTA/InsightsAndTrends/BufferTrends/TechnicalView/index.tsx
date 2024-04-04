import {useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import {CapsuleWrapper,ChartWrapper} from "./styles";
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from '../styles';
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import { BufferTrendsGraphState } from '../../../../../types/BPR'
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";

import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-community";



interface TechnicalWiseProps{
    data:any
    currentPageTab:string
    handleClick?:(value:any,index:any)=>void
    isLoading:boolean
    graphs:BufferTrendsGraphState[]  
    updateGraphState:(id:number, property:string, value:any) => void
}


const TechnicalWise = ({data,currentPageTab,handleClick,isLoading,graphs,updateGraphState}:TechnicalWiseProps) => {

    // const refGraph1 = useRef<GridRef>(null);
    // const refGraph2 = useRef<GridRef>(null);

    const options:AgChartOptions = {
        axes:[
          {
              
              type:"category",
              position:'bottom',
              label:{
                  fontSize:8,
                  fontWeight:'bold',
                  color:'black'
              }
          },
          {
              type:"number",
              position:'left',
              label:{
                fontSize:8,
                fontWeight:'bold',
                color:'black'
              }
          }
        ],
        series: [
          {
            type: "line",
            xKey: "dt",
            yKey: "B",
            yName: "Black",
            stroke: "black" ,
            marker:{
                fill:"Black",
                stroke:"Black"
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
                stroke:"Blue"
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
                stroke:"Red"
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
                stroke:"Yellow"
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
                stroke:"Green"
            }
          }
          ,
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "W",
            yName: "White",
            stroke: "Grey" ,
            marker:{
                fill:"grey",
                stroke:"grey",
                
            }
          }
        
        ],
        legend:{
          position:'bottom',
          item:{
              label:{
                  fontSize:8,

              },
              marker:{
                  size:8
              },
              line:{
                  strokeWidth:1
              }
          }
          
      }
      };

      const graph1 = [
        'This graph shows the trend of number of SKU Locations in Black, Red, Green, Yellow, and White.'
      ]

      const graph2 = [
        'This graph shows the trend of percentage of SKU Locations in Black, Red, Green, Yellow, and White.'
      ];
    
    
    return(
        <>
        
            <Allotment>
                <Allotment.Pane preferredSize={1000}>
                    <SCChartContainer height={375}>
                        <SCChartHeaderContainer>
                            <CapsuleWrapper>
                                <VFCapsule
                                        activeBtn={graphs[0].pen}
                                        capsules={[
                                            
                                            {
                                                label:"Percentage",
                                                value:'Percentage'
                                            },
                                            {
                                                label:"Absolute Value",
                                                value:'Absolute'
                                            }
                                        ]}
                                        handleClick={(value:any)=>updateGraphState(1,"pen",value)}
                                        
                                    />                                   
                            </CapsuleWrapper>                                                                
                        </SCChartHeaderContainer>
                        <SCHorizontalDivider/>
                        <ChartWrapper>
                            <div style={{ height:'100%' , width:'100%'}}>
                                <AgChartsReact options={{...options,data:data}}/>
                            </div> 
                        </ChartWrapper>                      
                    </SCChartContainer>
                    {!isLoading && (<div style={{marginLeft:'10px',marginRight:'10px'}}>
                        <VFInfoTip text={graph1}/>
                    </div>)}
                </Allotment.Pane>
                
            </Allotment>
        </>
    )
    
}

export default TechnicalWise;