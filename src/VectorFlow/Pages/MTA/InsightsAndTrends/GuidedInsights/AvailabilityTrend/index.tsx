import { AgChartsReact } from "ag-charts-react";
import { useGetAvailabilityTrend } from "../../../../../Services/MTA/InsightsAndTrends";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";
import { useState, useEffect } from "react";
import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";
import { AgChartOptions } from "ag-charts-community";
import VFInfoToolTip from '../../../../../../components/VectorFLOW/commons/VFInfoToolTip';


const AvailabilityTrend = () => {
  const [AvailabilityTrend, setAvailabilityData] = useState();
  const { mutateAsync: GetAvailabilityTrend, isLoading } =
    useGetAvailabilityTrend();
  //const rowData=AvailabilityTrend?.data?.data;
  const [horizon, setHorizon] = useState<number>(9);

  useEffect(() => {
    OnHorizonChange(horizon);
  }, []);
  const OnHorizonChange = async (hvalue: any) => {
    setHorizon(hvalue);
    const param = { horison: horizon };
    const AvailabilityTrend = await GetAvailabilityTrend(param);
    const AvailabilityTrendData = AvailabilityTrend?.data?.data;
    setAvailabilityData(AvailabilityTrendData);
  };
 

  const options:AgChartOptions = {
    
    // title: {
    //   // text: "Availabilty Trend",
    //   // fontWeight: "500",
    //   // fontSize:14,
    // },
    data: AvailabilityTrend,
    series: [
      {
        xKey: "week",
        yKey: "percentage",
        strokeWidth: 3,
        stroke: "#4E4E4E",
        marker: {
          fill: "#BC3D81",
          size: 8,
          stroke: "white",
          strokeWidth: 3,
          
        },
        title: "Distributor"
      },
    ],
    // axes: [
    //   {
    //     type: "category",
    //     position: "bottom",
    //   } as const,
    //   {
    //     type: "number",
    //     position: "left",
    //     label: {
    //       format: "#{.0f} %",
    //     },
    //   } as const,
      
    // ],
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
          label: {
                  format: "#{.0f} %",
                },
          title: {
              text: 'Availability %',
              fontSize:10,
              fontFamily:'Roboto'
          },
      } as const
  ],
    legend: {
      position: "bottom",
    },
  
  };
  if (isLoading) {
    return <VFLoader />;
  }

  const graph1 = [
    'This graph highlights day wise availabilty perecentage across locations',
    'Availabilty Perecentage = (Total instances excluding black/Total instances)*100'
  ]

  return (
    <div style={{marginTop:'25px',marginLeft:'20px'}}>
      <div style={{display: "flex", alignItems:'center',justifyContent:'flex-start',gap:'40px',marginBottom:'20px'}}>
        <label
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 300,
            fontSize: 15,
            paddingLeft: 20,
            fontFamily: "Roboto",
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
          defaultValue={horizon}
          handleChange={(e) => setHorizon(e)}
          labelValueFormatter={(value: number) =>
            value > 1 ? `${value} Days` : `${value} Day`
          }
          style={{margin:'0px'}}
        />
        {/* <VFButtonOutline
          style={{height:'35px', fontSize:'13px', fontWeight:500}}
            themeUi={themeUi}
            onClick={() => OnHorizonChange(horizon)}
            width={100}
        > */}
          <img 
            style={{cursor:'pointer'}}
            src="/assets/img/Group 627.svg" 
            height={40} 
            width={50} 
            onClick={() => OnHorizonChange(horizon)}
            /> 
        {/* </VFButtonOutline> */}
      </div>
      <div className="Title" style={{height:'50px', backgroundColor:'white',display:'flex',justifyContent:'center', alignItems:'center'}}>
        <div style={{fontSize:'14px', fontWeight:500, textAlign:'center'}}>
          Availabilty Trend
        </div>
        <div style={{marginLeft:10,marginBottom:'-5px'}}>
          <VFInfoToolTip infoList={graph1} />
        </div>
      </div>
      <div style={{height:'300px'}}>
        <AgChartsReact options={options} />
      </div>
    </div>

  );
};
export default AvailabilityTrend;
