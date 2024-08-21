import { useEffect, useMemo, useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from "../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer";
import { columnConfigData } from "../OrderBalanceMockData";
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { format } from "date-fns";
import VFCapsule from "../../../../../../../components/VectorFLOW/commons/VFCapsule";
import { CapsuleWrapper } from "../styles";
import { createSeriesData, TooltipRenderer } from "../OrderBalanceCommon";
// import Select from 'react-select'


const TrailDeptBalance = (props: any) => {
  const { graphData } = props;
  const [date] = useState(format(new Date(), "d MMM yyyy"));
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  // const [orderType, setOrderType] = useState({});
  const [actBtn, setActBtn] = useState({
    label: "Bal To Mfg.",
    value: "Bal To Mfg.",
  });

  const options: AgChartOptions = {
    data: rawData,
    series: createSeriesData(),
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Trailing Department",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "Quantity (in UOM)",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        line: { enabled: true },
        position: "left",
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
        gridLine: {
          enabled: false,
        },
      },
    ],

    legend: {
      item: {
        label: {
          fontSize: 10,
        },
      },
    },
  };

  const colDefs = useMemo(() => {
    return getColumnDefinations(columnConfigData?.tableColumn, {}, []);
  }, []);

  const updateGraphState = (capsule: any) => {

    setActBtn(capsule);
   
  };
  
  // const handleChange = (option: any) => {
  //   setOrderType(option)
  //   console.log("Selected option:", option);
  // };

  // const orderTypeOptions = [
  //   { label: "END TO END", value: "endToEnd" },
  //   { label: "Fabric Sale", value: "fabricSale" },
  //  ];

  //  const customStyles = {
  //   control: (provided: any) => ({
  //     ...provided,
  //     width: 180,
  //   }),
  //   menu: (provided: any) => ({
  //     ...provided,
  //     width: 180,
  //   }),
  //   placeholder: (provided: any) => ({
  //     ...provided,
  //     color: 'gray', // Customize the placeholder color
  //     fontSize: '15px', // Customize the font size
  //   }),
  //   option: (provided: any, state: any) => ({
  //     ...provided,
  //     backgroundColor: state.isSelected ? 'lightblue' : 'white',
  //     color: 'black',
  //     '&:hover': {
  //       backgroundColor: 'lightgray',
  //     },
  //   }),
  // };

  const generateHeader = () => {
    return (
      <div
        className="title"
        style={{
          backgroundColor: "white",
          height: "40px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
            <p style={{ fontFamily: 'roboto', fontSize: '15px',fontWeight: '500', paddingRight: '5px' }}>Order Type </p>
            <Select styles={customStyles} placeholder="Select Order Type" options={orderTypeOptions} onChange={handleChange}/>
        </div> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <CapsuleWrapper style={{ zoom: 1, padding: "4px" }}>
            <VFCapsule
              activeBtn={actBtn}
              capsules={[
                {
                  label: "Bal To Mfg.",
                  value: "Bal To Mfg.",
                },
                {
                  label: "Bal To Disp.",
                  value: "Bal To Disp.",
                },
              ]}
              handleClick={updateGraphState}
            />
          </CapsuleWrapper>
          <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
            <VFInfoToolTip
              infoList={[
                `The graph highlights trailing department wise quantities balance to ${actBtn.label === "Bal To Mfg." ? "manufacture" : "dispatch"
                }`,
              ]}
            />
          </div>
          <div
            data-testid="grid-toggle-btn"
            onClick={() => {
              toggleChart1(!hideChart1);
            }}
            style={{
              marginLeft: 10,
              marginBottom: "-5px",
              marginRight: "10px",
            }}
          >
            <img
              src="/assets/img/VectorFLOW/BPR/minimize.svg"
              height={13}
              width={13}
              color={"#CCCCCC"}
            />
          </div>
        </div>
      </div>
    );
  };

  const tableTitle =
    actBtn.label === "Bal To Mfg."
      ? ProductionInsightsAndTrendsString.trailDeptMfg
      : ProductionInsightsAndTrendsString.trailDeptDisp;

  useEffect(()=>{
    if(graphData?.mfg){
      const response: any = graphData?.mfg;
      const data: any =  Object.keys(response)?.map((key: string) => ({
        trailDept: key, 
        b: response[key]?.Black || 0, 
        r: response[key]?.Red || 0, 
        y: response[key]?.Yellow || 0, 
        g: response[key]?.Green || 0, 
        bl: response[key]?.Blue || 0, 
        w: response[key]?.White || 0, 
      }));
      setRawData(data);
    }
  },[graphData])

  useEffect(()=>{

    let response: any = {};
    if (actBtn.label === "Bal To Mfg.") {
      response = graphData?.mfg || {};
    } else {
      response = graphData?.disp || {};
    }

    const data: any =  Object.keys(response)?.map((key: string) => ({
      trailDept: key, 
      b: response[key]?.Black || 0, 
      r: response[key]?.Red || 0, 
      y: response[key]?.Yellow || 0, 
      g: response[key]?.Green || 0, 
      bl: response[key]?.Blue || 0, 
      w: response[key]?.White || 0, 
    }));
    console.log(data, 'data');
    
    setRawData(data);
    
  },[actBtn])
  
  

  return (
    <div
      data-testid="mfg-disp-graph"
      style={{ height: "100%", display: "flex", justifyContent: "left", marginLeft: '10px', paddingBottom: '10px' }}
    >

      <SplitGraphContainer
        tableLoading={tableLoading}
        chartLoading={chartLoading}
        setTableLoading={setTableLoading}
        setChartLoading={setChartLoading}
        data={rawData}
        rowData={options.data}
        graphTitle={`${actBtn.label === "Bal To Mfg."
          ? ProductionInsightsAndTrendsString.trailDeptMfg
          : ProductionInsightsAndTrendsString.trailDeptDisp
          } ` + ` (${date})`}
        tableTitle={tableTitle}
        options={options}
        colDef={colDefs}
        header={generateHeader}
        hideChart={hideChart1}
        toggleChart={toggleChart1}
        TooltipRenderer={TooltipRenderer}
        graphType={7}
      />
    </div>
  );
};

export default TrailDeptBalance;
