
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import {CapsuleWrapper,ChartWrapper} from "./styles";
import {SCChartHeaderContainer, SCChartContainer, SCHorizontalDivider,
    SCChartSliderContainer,SCChartMainContainer,HorizonHeader} from '../styles';
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";
import { BufferTrendsGraphState } from '../../../../../types/BPR'
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";


import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";



interface EconomicalWiseProps{
    data:any
    currentPageTab:string
    handleClick?:(i:any)=>void
    isLoading:boolean
    graphs:BufferTrendsGraphState[]
    updateGraphState:(id:number, property:string, value:any) => void  
    setHorizondays?:any
    handleSubmitClick:()=>void
    horizonDays:number
}




const EconomicalWise = ({data,isLoading,graphs,updateGraphState,setHorizondays
            ,handleSubmitClick,horizonDays}:EconomicalWiseProps) => {


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
            yKey: "b",
            yName: "Black",
            stroke: "black" ,
            
            marker:{
                fill:"Black",
                stroke:"Black",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "bu",
            yName: "Blue",
            stroke: "Blue" ,
            marker:{
                fill:"Blue",
                stroke:"Blue",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "r",
            yName: "Red",
            stroke: "Red" ,
            marker:{
                fill:"Red",
                stroke:"Red",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "y",
            yName: "Yellow",
            stroke: "Yellow" ,
            marker:{
                fill:"Yellow",
                stroke:"Yellow",
            }
          },
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "g",
            yName: "Green",
            stroke: "Green" ,
            marker:{
                fill:"Green",
                stroke:"Green",
            }
          }
          ,
          {
            type: "line",
            xKey: "dt",
            xName:"Date",
            yKey: "w",
            yName: "White",
            stroke: "grey" ,
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
    }
      const graph1 = [
        'This graph shows the trend of number of SKU Locations in Black, Red, Green, Yellow, and White.'
      ]
    
    return(
        <>
            <Allotment>
                <Allotment.Pane preferredSize={1000}>
                    <SCChartContainer height={375}>
                        <SCChartMainContainer>
                            <SCChartSliderContainer>                               
                            <label style={{fontStyle:"normal",
                                    fontVariant:"normal",
                                    fontWeight:400,
                                    fontSize:17,
                                
                                    fontFamily:"Roboto"}}> <b>Select Horizon: </b></label>               
                                <VFRangeSlider
                                        showTriangle={false}
                                        min={1}
                                        max={90}
                                        milestones={[0,1,90]}
                                        strictMode={false}
                                        width={250}
                                        defaultValue={horizonDays}
                                        handleChange={(e)=>setHorizondays(e)}
                                        labelValueFormatter={(value:number)=>value>1?`${value} Days`:`${value} Day`}
                                    />
                                <div>
                                    <VFButtonOutline themeUi="" onClick={handleSubmitClick} width={120} disabled={false}>
                                        Submit
                                    </VFButtonOutline>
                                </div>
                                
                            </SCChartSliderContainer>
                            
                            <SCChartHeaderContainer style={{display:'flex',marginBottom:'5px'}}>
                                
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
                        </SCChartMainContainer>
                        
                        <SCHorizontalDivider/>
                        <ChartWrapper>
                            <div style={{ height:'77%' , width:'100%'}}>
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

export default EconomicalWise;