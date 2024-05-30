import { SCChartContainer, SCDynamicContainer } from '../style';
import { AgChartsReact } from "ag-charts-react";
import { Allotment } from "allotment";
import { useGetExcessInventorySku, useGetExcessInventoryValue } from "../../../../../Services/MTA/InsightsAndTrends";
import VFLoader from '../../../../../../components/VectorFLOW/commons/VFLoader';
import VFRangeSlider from '../../../../../../components/VectorFLOW/commons/VFRangeSlider';
import VFInfoToolTip from '../../../../../../components/VectorFLOW/commons/VFInfoToolTip';


const ExcessInventoryTrend = () => {
    const { data: ExcessInventorySkuData, isLoading: isLoaderGraph1 } = useGetExcessInventorySku();
    const { data: ExcessInventoryValueData, isLoading: isLoaderGraph2 } = useGetExcessInventoryValue();

    const ExcessInventorySku = ExcessInventorySkuData?.data?.data;
    const ExcessInventoryValue = ExcessInventoryValueData?.data?.data;

    const options1 = {
        // title: {
        //     text: 'Excess Inventory Trend (Count Of SKU)-Last 90 Days',
        //     fontWeight:500,
        //     fontSize:14
        // },
        data: ExcessInventorySku,
        series: [
            {
                xKey: 'date',
                xName: 'Date',
                yKey: 'countSku',
                yName: 'Count of SKU',
                strokeWidth: 3,
                stroke: "#A5A5A5",
                marker: {
                    fill: "#BC3D81",
                    size: 8,
                    stroke: "white",
                    strokeWidth: 2,
                },
            }
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                title: {
                    text: 'Date',
                    fontSize:10,
                    fontFamily:'Roboto'
                },
                label:{
                    fontSize:8,
                    fontFamily:'Roboto'
                  }
            } as const,
            {
                type: "number",
                position: "left",
                title: {
                    text: 'Value In Lakhs',
                    fontSize:10,
                    fontFamily:'Roboto'
                },
            } as const
        ]
    };

    const options2 = {
        // title: {
        //     text: 'Excess Inventory Trend (In Value)-Last 90 Days',
        //     fontWeight:500,
        //     fontSize:14
            
        // },
        data: ExcessInventoryValue,
        series: [
            {
                xKey: 'date',
                xName: 'Date',
                yKey: 'value',
                yName: 'Value In Lakhs',
                strokeWidth: 3,
                stroke: "#A5A5A5",
                marker: {
                    fill: "#BC3D81",
                    size: 8,
                    stroke: "white",
                    strokeWidth: 2,
                },
            }
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                title: {
                    text: 'Date',
                    fontSize:10,
                    fontFamily:'Roboto'
                },
                label:{
                    fontSize:8,
                    fontFamily:'Roboto'
                  }
            } as const,
            {
                type: "number",
                position: "left",
                title: {
                    text: 'Count of SKUs',
                    fontSize:10,
                    fontFamily:'Roboto'
                },
            } as const
        ]
    };
const graph1=['This graph highlights the date-wise trend of excess inventory across various locations and products over the past 7 days','Excess Inventory = Quantity > Norm']

const graph2=['This graph highlights the date-wise trend of excess inventory in value across various locations and products over the past 7 days','Excess Inventory = Quantity > Norm']

if(isLoaderGraph1||isLoaderGraph2){
  <VFLoader/>
}
    return    (
  
<SCDynamicContainer>
    <Allotment minSize={0} maxSize={590}>
        <Allotment.Pane preferredSize={'50%'} >
            <div className="main" style={{marginTop:'20px',backgroundColor:'white',height:'415px',boxShadow: '-5px 5px 12px #0000001C',marginRight:'15px'}}>
                <div className="horiozn one" style={{ width:'100%', height:'50px', display:'flex', justifyContent:'space-evenly', alignItems:'center',zoom:'0.9'}}>
                    <label
                    style={{
                        fontStyle: "normal",
                        fontVariant: "normal",
                        fontWeight: 300,
                        fontSize: 15,
                        fontFamily: "Roboto"
                    }}
                    >
                    {" "}
                    <b>Select Horizon: </b>
                    </label>
                    <VFRangeSlider
                    showTriangle={false}
                    min={1}
                    max={90}
                    milestones={[-1, 0, 30, 60, 90]}
                    strictMode={false}
                    width={250}
                    defaultValue={0}
                    handleChange={()=>console.log('')}
                    labelValueFormatter={(value: number) =>
                        value > 1 ? `${value} Days` : `${value} Day`
                
                    }
                    style={{margin:'0px'}}
                    
                    />
                    {/* <VFButtonOutline
                    style={{height:'35px', fontSize:'13px', fontWeight:500}}
                    themeUi={themeUi}
                    onClick={() =>console.log('')}
                    width={100}>
                    Submit
                    </VFButtonOutline> */}
                   <img 
                    style={{cursor:'pointer'}}
                    src="/assets/img/Group 627.svg" 
                    height={40} 
                    width={50} 
                    onClick={() => console.log('')}
                    />
                   
                </div>
                <SCChartContainer >
                    <div style={{
                        // top: '316px',
                        // left: '293px',
                        // width: '550px',
                        height: '300px',
                        borderTop:'1px solid rgb(178, 178, 178)',
                    }}>

                    <div className="Title" style={{height:'50px', backgroundColor:'white',display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <div style={{fontSize:'14px', fontWeight:500, textAlign:'center'}}>
                            Excess Inventory Trend (Count Of SKU)-Last 90 Days
                        </div>
                        <div style={{marginLeft:10}}>
                            <VFInfoToolTip infoList={graph1} />
                        </div>

                    </div>
                    <AgChartsReact options={options1} />
            </div>
                {/* <SCHorizontalDivider/> */}
            </SCChartContainer>
                 {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                </div> */}
            </div>

        </Allotment.Pane>
        {/* <Allotment.Pane preferredSize={'50%'}> */}
        <div className="main" style={{marginTop:'20px',backgroundColor:'white',height:'415px',boxShadow: '-5px 5px 12px #0000001C', marginLeft:'15px'}}>
            <div className="horiozn one" style={{ width:'100%', height:'50px', display:'flex', justifyContent:'space-evenly', alignItems:'center',zoom:'0.9'}}>
                <label
                style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 300,
                    fontSize: 15,
                    fontFamily: "Roboto"
                }}
                >
                {" "}
                <b>Select Horizon: </b>
                </label>
                <VFRangeSlider
                showTriangle={false}
                min={1}
                max={90}
                milestones={[-1, 0, 30, 60, 90]}
                strictMode={false}
                width={250}
                defaultValue={0}
                handleChange={()=>console.log('')}
                labelValueFormatter={(value: number) =>
                    value > 1 ? `${value} Days` : `${value} Day`
            
                }
                style={{margin:'0px'}}

                />
                 {/* <VFButtonOutline
                    style={{height:'35px', fontSize:'13px', fontWeight:500}}
                    themeUi={themeUi}
                    onClick={() =>console.log('')}
                    width={100}>
                    Submit
                </VFButtonOutline> */}
                 <img 
                    style={{cursor:'pointer'}}
                    src="/assets/img/Group 627.svg" 
                    height={40} 
                    width={50} 
                    onClick={() => console.log('')}
                    />
            </div>

            <SCChartContainer>
                <div style={{
                    // top: '316px',
                    // left: '1191px',
                    // width: '550px',
                    height: '300px',
                    borderTop:'1px solid rgb(178, 178, 178)',
                }}>

                <div className="Title" style={{height:'50px', backgroundColor:'white',display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <div style={{fontSize:'14px', fontWeight:500, textAlign:'center'}}>
                        Excess Inventory Trend (In Value)-Last 90 Days              
                    </div>
                    <div style={{marginLeft:10}}>
                        <VFInfoToolTip infoList={graph2} />
                 </div>

                    </div>
                    <AgChartsReact options={options2} />
                </div>
            {/* <SCHorizontalDivider/> */}
            </SCChartContainer>
            {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph2}/>

                        </div> */}
                                    </div>

        {/* </Allotment.Pane> */}
    </Allotment>
</SCDynamicContainer>
  
    )
}

export default ExcessInventoryTrend