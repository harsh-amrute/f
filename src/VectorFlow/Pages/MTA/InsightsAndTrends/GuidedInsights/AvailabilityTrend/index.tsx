import { AgCharts } from "ag-charts-react";
import { useGetAvailabilityTrend } from "../../../../../Services/MTA/InsightsAndTrends";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";
import { useState, useEffect } from "react";
import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";
import VFInfoToolTip from '../../../../../../components/VectorFLOW/commons/VFInfoToolTip';


const AvailabilityTrend = ({themeUi, filter, horizon, setHorizon}:{themeUi:string, filter:any, horizon:number, setHorizon:any}) => {

  const { mutateAsync: GetAvailabilityTrend, isLoading } =
  useGetAvailabilityTrend();

  const [options, setOptions] = useState({});

  useEffect(() => {
    OnHorizonChange(horizon);
  },[filter]);
  
  const OnHorizonChange = async (hvalue: any) => {
    setHorizon(hvalue);
    const param = { horison: horizon, filters:filter };
    const AvailabilityTrend = await GetAvailabilityTrend(param);
    const AvailabilityTrendData = AvailabilityTrend?.data?.data;
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
    const locationTypes = Array.from(new Set(AvailabilityTrendData.map((d:any) => d.locationtype)));
     const series = locationTypes.map((locationType, index) => {
    const seriesData = AvailabilityTrendData.filter((d:any) => d.locationtype === locationType)
                            .map((d:any) => ({ week: d.week, percentage: d.percentage }));
                            return {
        type: 'line',
        xKey: 'week',
        yKey: 'percentage',
        yName: locationType,
        data: seriesData,
        stroke: greyShades[index % greyShades.length],
        strokeWidth: 3,
        //stroke: "#4E4E4E",
        marker: {
          fill: greyShades[index % greyShades.length],
          size: 5,
          stroke: greyShades[index % greyShades.length],
          strokeWidth: 3,
        }
      };
    });

    setOptions(
      {
      autoSize: true,
      
      data: AvailabilityTrendData,
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
            autoRotate:false,
            avoidCollisions:true
          },
          
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Availability%',
          },
          label: {
          format: "#{.0f} %",
          
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
  
  if (isLoading) {
    return <VFLoader />;
  }

  const graph1 = [
    'This graph highlights day wise availabilty percentage (On Hand) across locations',
    'Availabilty Perecentage = (Total instances excluding black/Total instances)*100'
  ]

  return (
    <div style={{marginTop:'25px',marginLeft:'20px',height:'70%'}}>
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
            src={themeUi==="REGALBLAZE"?"/assets/img/Group 627-regal.svg":"/assets/img/Group 627.svg"}
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
      <div style={{height:'85%'}}>
        <AgCharts options={options} />
      </div>
    </div>

  );
};
export default AvailabilityTrend;