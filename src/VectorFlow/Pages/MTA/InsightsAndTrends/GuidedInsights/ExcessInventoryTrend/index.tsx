import { SCChartContainer, SCDynamicContainer } from '../style';
import { AgCharts } from "ag-charts-react";
import { Allotment } from "allotment";
import { useGetExcessInventorySku, useGetExcessInventoryValue } from "../../../../../Services/MTA/InsightsAndTrends";
import VFLoader from '../../../../../../components/VectorFLOW/commons/VFLoader';
import VFRangeSlider from '../../../../../../components/VectorFLOW/commons/VFRangeSlider';
import VFInfoToolTip from '../../../../../../components/VectorFLOW/commons/VFInfoToolTip';
import { useEffect, useState } from 'react';


const ExcessInventoryTrend = ({themeUi}:{themeUi:string}) => {

     const [horizon1, setHorizon1] = useState<number>(9);
     const [horizon2, setHorizon2] = useState<number>(9);
     const [options1, setOptions1] = useState({});
        const [options2, setOptions2] = useState({});

    
     const { mutateAsync: GetExcessInventorySku, isLoading: isLoaderGraph1 } =useGetExcessInventorySku();
     const { mutateAsync: GetExcessInventoryValue, isLoading: isLoaderGraph2 } =useGetExcessInventoryValue();

     useEffect(() => {
    OnHorizon1Change(horizon1);
    OnHorizon2Change(horizon2);
  }, []);

   const OnHorizon1Change = async (hvalue: any) => {
    setHorizon1(hvalue);
    const param = { horison: horizon1 };
    const ExcessInventorySkuData = await GetExcessInventorySku(param);
   // const ExcessInventoryValueData =  await GetExcessInventoryValue(param);
   const greyShades = [
      // '#191919', 
       '#333333', 
       //'#4c4c4c',
       // '#595959', 
        '#666666', //'#737373', 
        '#808080',// '#8c8c8c','#999999',
       '#a6a6a6', //'#b2b2b2', '#bfbfbf', 
       '#cccccc', '#d8d8d8'
       
    ];
     const ExcessInventoryDataSku=ExcessInventorySkuData?.data?.data;
    const locationTypes = Array.from(new Set(ExcessInventoryDataSku.map((d:any) => d.locationtype)));
     const series:any = locationTypes.map((locationType, index) => {
    const seriesData = ExcessInventoryDataSku.filter((d:any) => d.locationtype === locationType)
                            .map((d:any) => ({ date: d.date, countSku: d.countSku }));
                            return {
        type: 'line',
        xKey: 'date',
        yKey: 'countSku',
        yName: locationType,
        data: seriesData,
        stroke: greyShades[index % greyShades.length],
        strokeWidth: 3,
      
        marker: {
                    fill: greyShades[index % greyShades.length],
                    size: 8,
                    stroke: "white",
                    strokeWidth: 2,
                },
                
      };
    });

    const totalSeriesData = ExcessInventoryDataSku.reduce((acc:any, current:any) => {
      const existingDate = acc.find((d:any) => d.date === current.date);
      if (existingDate) {
          existingDate.countSku += current.countSku;
      } else {
          acc.push({ date: current.date, countSku: current.countSku });
      }
      return acc;
  }, []);

  series.push({
      type: 'line',
      xKey: 'date',
      yKey: 'countSku',
      yName: 'Total',
      data: totalSeriesData,
      stroke: '#BC3D81',
      strokeWidth: 3,
      marker: {
          fill: '#BC3D81',
          size: 6,
          stroke: "#BC3D81",
          strokeWidth: 2,
      },
      visible:false
  });

   
    setOptions1(
      {
      autoSize: true,
      
      data: ExcessInventoryDataSku,
      series: series,
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Date',
           
          },
          label: {
            formatter: (params:any) => new Date(params.value).toISOString().split('T')[0],
            fontSize: 10,
          },
          
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Count of SKUs',
          },
          
        },
      ],
      legend: {
        position: 'bottom',
        item:{
          marker:{
            shape:'square'
          }
        }
      },
    });
     };

  const OnHorizon2Change = async (hvalue: any) => {
    setHorizon2(hvalue);
    const param = { horison: horizon2 };
    //const ExcessInventorySkuData = await GetExcessInventorySku(param);
    const ExcessInventoryValueData =  await GetExcessInventoryValue(param);
    //SetExcessInventorySku(ExcessInventorySkuData?.data?.data);
     const greyShades = [
      // '#191919', 
       '#333333', 
       //'#4c4c4c',
       // '#595959', 
        '#666666', //'#737373', 
        '#808080',// '#8c8c8c','#999999',
       '#a6a6a6', //'#b2b2b2', '#bfbfbf', 
       '#cccccc', '#d8d8d8'
       
    ];
     const ExcessInventoryDataValue=ExcessInventoryValueData?.data?.data;
    const locationTypes = Array.from(new Set(ExcessInventoryDataValue.map((d:any) => d.locationtype)));
     const series:any = locationTypes.map((locationType, index) => {
    const seriesData = ExcessInventoryDataValue.filter((d:any) => d.locationtype === locationType)
                            .map((d:any) => ({ date: d.date, value: d.value }));
                            return {
        type: 'line',
        xKey: 'date',
        yKey: 'value',
        yName: locationType,
        data: seriesData,
        stroke: greyShades[index % greyShades.length],
        strokeWidth: 3,
        
        marker: {
                    fill: greyShades[index % greyShades.length],
                    size: 8,
                    stroke: "white",
                    strokeWidth: 2,
                },
      };
    });
   
    const totalSeriesData = ExcessInventoryDataValue.reduce((acc:any, current:any) => {
      const existingDate = acc.find((d:any) => d.date === current.date);
      if (existingDate) {
          existingDate.value += current.value;
      } else {
          acc.push({ date: current.date, value: current.value });
      }
      return acc;
  }, []);

  series.push({
      type: 'line',
      xKey: 'date',
      yKey: 'value',
      yName: 'Total',
      data: totalSeriesData,
      stroke: '#BC3D81',
      strokeWidth: 3,
      marker: {
          fill: '#BC3D81',
          size: 6,
          stroke: "#BC3D81",
          strokeWidth: 2,
      },
      visible:false
  });


    setOptions2(
      {
      autoSize: true,
      
      data: ExcessInventoryDataValue,
      series: series,
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Date',
           
          },
          label: {
            formatter: (params:any) => new Date(params.value).toISOString().split('T')[0],
            fontSize: 10,
          },
          
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Value In Lakhs',
          },
          
        },
      ],
      legend: {
        position: 'bottom',
        item:{
          marker:{
            shape:'square'
          }
        }
      },
    });
    
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
                    defaultValue={9}
                    handleChange={(e) => setHorizon1(e)}
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

                    style={{cursor:'pointer', marginLeft:'-15px'}}
                    src={themeUi==="REGALBLAZE"?"/assets/img/Group 627-regal.svg":"/assets/img/Group 627.svg"}
                    height={40} 
                    width={50}
                    onClick={() => OnHorizon1Change(horizon1)}
                    
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
                        <div style={{marginLeft:10,marginBottom:'-5px'}}>
                            <VFInfoToolTip infoList={graph1} />
                        </div>

                    </div>
                    <AgCharts options={options1} />
            </div>
                {/* <SCHorizontalDivider/> */}
            </SCChartContainer>
                 {/* <div style={{marginLeft:'10px',marginRight:'10px'}}>
                            <VFInfoTip text={graph1}/>
                </div> */}
            </div>

        </Allotment.Pane>
        {/* <Allotment.Pane preferredSize={'50%'}> */}
        <div className="main" style={{marginTop:'20px',backgroundColor:'white',height:'415px',boxShadow: '-5px 5px 12px #0000001C', marginLeft:'25px'}}>
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
                defaultValue={9}
                handleChange={(e) => setHorizon2(e)}
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
                    style={{cursor:'pointer', marginLeft:'-15px'}}
                    src={themeUi==="REGALBLAZE"?"/assets/img/Group 627-regal.svg":"/assets/img/Group 627.svg"}
                    height={40} 
                    width={50} 
                    onClick={() => OnHorizon2Change(horizon2)}
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
                    <div style={{marginLeft:10,marginBottom:'-5px'}}>
                        <VFInfoToolTip infoList={graph2} />
                 </div>

                    </div>
                    <AgCharts options={options2} />
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