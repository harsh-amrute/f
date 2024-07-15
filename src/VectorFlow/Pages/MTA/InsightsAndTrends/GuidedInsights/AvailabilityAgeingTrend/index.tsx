import { AgChartsReact } from "ag-charts-react";
import { useGetAvailabilityAgeing } from "../../../../../Services/MTA/InsightsAndTrends";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";
import { useState, useEffect } from "react";
import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";
import { AgChartOptions } from "ag-charts-community";
import VFInfoToolTip from "../../../../../../components/VectorFLOW/commons/VFInfoToolTip";

const AvailabilityAgeingTrend = ({themeUi}:{themeUi:string}) => {
  const [horizon, setHorizon] = useState<number>(9);
  const [minAgeing, setAgeing] = useState<number>(1);
  const { mutateAsync: GetAvailabilityAgeing, isLoading } =
    useGetAvailabilityAgeing();
  const [AvailabilityAgeingTrendData, setAgeingData] = useState();
  const OnHorizonChange = async (hvalue: any, age: any) => {
    setAgeing(age);

    setHorizon(hvalue);
    const param = { horison: horizon, ageing: minAgeing };

    const AvailabilityAgeing = await GetAvailabilityAgeing(param);

    const AvailabilityAgeingTrendData = AvailabilityAgeing?.data?.data;
    setAgeingData(AvailabilityAgeingTrendData);
  };

  const handleAgeChange = (event: any) => {
    setAgeing(parseInt(event.target.value));
  };

  useEffect(() => {
    OnHorizonChange(horizon, minAgeing);
  }, []);

  const AvailabilityAgeingTrendOptions: AgChartOptions = {
    // title: {
    //   text: "Trend of #SKU-Loations with Continuous Black/Red/White Status >= Selected Minimum Ageing",
    //   fontWeight: "500",
    //   fontSize:14
    // },
    data: AvailabilityAgeingTrendData,
    series: [
      {
        type: "line" as const,
        xKey: "date",
        yKey: "red",
        yName: "red",
        stroke: "#DA3535",
        marker: {
          fill: "red",
          stroke: "red",
          size: 8,
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "black",
        yName: "black",
        strokeWidth: 3,
        stroke: "#000000",
        marker: {
          fill: "black",
          stroke: "black",
          size: 8,
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "white",
        yName: "white",
        strokeWidth: 3,
        stroke: "#BFBFBF",
        marker: {
          fill: "grey",
          stroke: "grey",
          size: 8,
        },
      },
    ],
    legend: {
      position: "bottom",
      item:{
        marker:{
          shape:'square'
        }
      }
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Date",
          fontSize: 10,
          fontFamily: "Roboto",
        },
        label: {
          fontSize: 8,
          fontFamily: "Roboto",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "No of SKU-Locations",
          fontSize: 10,
          fontFamily: "Roboto",
        },
      },
    ],
  };

  const graph1 = [
    "This graph highlights the trends of #SKU-Location with continous black,red or white status, each greater than or equal to the selected mimimum agening",
  ];

  const numbers = Array.from(Array(90), (_, index) => index + 1);
  if (isLoading) {
    return <VFLoader />;
  }

  return (
    <div style={{ margin: "25px 20px 0px 20px" , height:'75%'}}>
      <div
        style={{
          display: "flex",
          top: 221,
          left: 239,
          width: 900,
          height: 59,
          opacity: 1,
          alignItems: "center",
          marginBottom:'8px'
        }}
      >
        <div style={{ paddingLeft: 20, width: 210 }}>
          <label
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: 300,
              fontSize: 15,
              fontFamily: "Roboto",
            }}
          >
            <b>Minimum Ageing:</b>
          </label>
          <select
            onChange={handleAgeChange}
            value={minAgeing}
            style={{
              marginLeft: "4px",
              textAlign: "center",
              width: 40,
              height: 28,
              border: "1px solid #838383",
              boxShadow: " 0px 6px 12px #8D8D8D29",
              borderRadius:'6px'
            }}
          >
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: 390, display: "flex", alignItems:'center'}}>
          <label
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: 300,
              fontSize: 14,
              fontFamily: "Roboto",
              marginRight:'5px'
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
        </div>
        {/* <VFButtonOutline
          themeUi={themeUi}
          onClick={() => OnHorizonChange(horizon, minAgeing)}
          width={100}
          style={{ height: "35px", fontSize: "13px", fontWeight: 500 }}
        >
          Submit
        </VFButtonOutline> */}
         <img 
            style={{cursor:'pointer'}}
            src={themeUi==="REGALBLAZE"?"/assets/img/Group 627-regal.svg":"/assets/img/Group 627.svg"}
            height={40} 
            width={50} 
            onClick={() => OnHorizonChange(horizon, minAgeing)}
            /> 
      </div>
      <div style={{ marginLeft: "10px", marginRight: "10px", height: "88%"}}>
        <div
          className="Title"
          style={{
            height: "50px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ fontSize: "14px", fontWeight: 500, textAlign: "center" }}
          >
            Trend Of #SKU-Locations With Continuous Black/Red/White Status {">"}=
            Selected Minimum Ageing{" "}
          </div>
          <div style={{ marginLeft: 10 ,marginBottom:'-5px'}}>
            <VFInfoToolTip infoList={graph1} />
          </div>
        </div>
        <div style={{height:'85%'}}><AgChartsReact options={AvailabilityAgeingTrendOptions} /></div>
      </div>
    </div>
  );
};
export default AvailabilityAgeingTrend;
