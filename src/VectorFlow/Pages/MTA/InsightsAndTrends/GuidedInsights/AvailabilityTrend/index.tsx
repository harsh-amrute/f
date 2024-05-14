import { AgChartsReact } from "ag-charts-react";
import { useGetAvailabilityTrend } from "../../../../../Services/MTA/InsightsAndTrends";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";
import { useState, useEffect } from "react";
import { useUserData } from "../../../../../../context";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";

const AvailabilityTrend = () => {
  const [AvailabilityTrend, setAvailabilityData] = useState();
  const { mutateAsync: GetAvailabilityTrend, isLoading } =
    useGetAvailabilityTrend();
  //const rowData=AvailabilityTrend?.data?.data;
  const [horizon, setHorizon] = useState<number>(9);

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
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
  const options = {
    
    title: {
      text: "Week Wise Availabilty Trend",
    },
    data: AvailabilityTrend,
    series: [
      {
        xKey: "week",
        yKey: "percentage",
        strokeWidth: 3,
        stroke: "#BC3D81",
        marker: {
          fill: "#BC3D81",
          size: 12,
          stroke: "white",
          strokeWidth: 3,
        },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      } as const,
      {
        type: "number",
        position: "left",
        label: {
          format: "#{.0f} %",
        },
      } as const,
      
    ],
  
  };
  if (isLoading) {
    return <VFLoader />;
  }

  const graph1 = [
    'This graph highlights day wise availabilty perecentage across locations',
    'Availabilty Perecentage = (Total instances excluding black/Total instances)*100'
  ]

  return (
    <div style={{marginTop:'25px'}}>
      <div style={{ width: 550, display: "flex", alignItems:'center' }}>
        <label
          style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 300,
            fontSize: 15,
            paddingLeft: 50,
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
        />

        <VFButtonOutline
        style={{height:'35px', fontSize:'12px'}}
          themeUi={themeUi}
          onClick={() => OnHorizonChange(horizon)}
          width={95}
        >
          Submit
        </VFButtonOutline>
      </div>

      <div style={{ marginLeft:'20px'}}>
        <div style={{marginLeft:'10px',marginRight:'10px',height:'400px'}}><AgChartsReact options={options} /></div>
        <div style={{marginLeft:'10px',marginRight:'10px',marginTop:'5px'}}>
          <VFInfoTip text={graph1}/>
        </div>
      </div>
    </div>
  );
};
export default AvailabilityTrend;
