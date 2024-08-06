import { useRef, useState } from "react";
import { AgChartOptions } from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { APIMock } from "./mockData";
import { DayPicker } from "react-day-picker";
import CustomCalenderCaption from "./CustomCalenderCaption";
import CustomCalenderDay from "./CustomCalenderDay";
import { useUserData } from "../../../../../../context/index";
import { Rectangle } from "../../../Production/FullKitAssignement/RectangleMarker";
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";
import {
  CalenderHeading,
  CalenderLabel,
  CalenderWrapper,
  CapsuleWrapper,
  ColoredMarker,
  GraphWrapper,
  HorizontalLineDashed,
  HorizontalWrapper,
  MarkerWrapper,
  SectionFlex,
  VerticalTitle,
  VerticalWrapper,
} from "./styles";
import CustomSelect from "../../../Production/FullKitAssignement/Select";

const ResourceUtilization = () => {
  const [chartLoading, setChartLoading] = useState(false);
  const chartRef = useRef<AgChartsReact>(null);
  const [horizonDays, setHorizonDays] = useState(30);
  const [selectedGraphState, setSelectedGraphState] = useState("wipLimit");
  const [actBtn, setActBtn] = useState({
    label: "Under Limit",
    value: "Under Limit",
  });
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  console.log(chartLoading);

  function TooltipRenderer({ datum }: any) {
    return `
      <div class="ag-chart-tooltip-title" style="background-color: #2E2E2E; display: flex; justify-content: flex-start; align-items: center; min-width: 200px">
          Details
      </div>
      <div class="ag-chart-tooltip-content" style="color: white; background-color: #2E2E2E; padding: 0px 20px;">
      <div style="border-top: 1px dashed lightgray"></div>
      <div style="width: 100%; padding: 10px 5px;">
          <div style="display: flex; width: 100%;">
              <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #E96666"></div>
              <div style="display:flex; justify-content: space-between; width: 100%;">
                  <div>${selectedGraphState === "wipLimit"
        ? "Limit"
        : "Utilization Percentage"
      }</div>
                  <div style="margin-left: 20px">${datum?.limit}%</div>
              </div>
          </div>
          ${selectedGraphState === "wipLimit"
        ? `<div style="display: flex; width: 100%;">
              <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #000000"></div>
              <div style="display:flex; justify-content: space-between; width: 100%;">
                  <div>Usage</div>
                  <div>${actBtn?.label === "Over Limit"
          ? datum?.overLimit
          : datum?.underLimit
        }%</div>
              </div>
          </div>`
        : ""
      }
      </div>`;
  }

  const getUtilizationColor = (date: any) => {

    const redDates = [
      "01-08-2024",
      "07-08-2024",
      "08-08-2024",
      "09-08-2024",
      "10-08-2024",
      "11-08-2024",
      "12-08-2024",
      "13-08-2024",
      "21-08-2024",
      "22-08-2024",
      "25-08-2024",
      "26-08-2024",
      "27-08-2024",
      "28-08-2024",
      "29-08-2024",
      "30-08-2024",
      "31-08-2024",
      "23-08-2024",
      "24-08-2024",
    ];
    const yelowDates = [
      "02-08-2024",
      "03-08-2024",
      "04-08-2024",
      "05-08-2024",
      "06-08-2024",
    ];

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const newDate = `${day}-${month}-${year}`;

    if (redDates.includes(newDate)) {
      return "Red";
    }
    if (yelowDates.includes(newDate)) {
      return "Yellow";
    }
    return "default";
  };

  const getWIPColor = (date: any) => {
    const overLimit = [
      "01-08-2024",
      "07-08-2024",
      "08-08-2024",
      "09-08-2024",
      "10-08-2024",
      "11-08-2024",
      "12-08-2024",
      "13-08-2024",
      "19-08-2024",
      "20-08-2024",
      "21-08-2024",
      "22-08-2024",
      "25-08-2024",
      "26-08-2024",
      "27-08-2024",
      "28-08-2024",
      "29-08-2024",
      "30-08-2024",
      "31-08-2024",
      "23-08-2024",
      "24-08-2024",
    ];
    const underLimit = [
      "02-08-2024",
      "03-08-2024",
      "04-08-2024",
      "05-08-2024",
      "06-08-2024",
      "14-08-2024",
      "15-08-2024",
      "16-08-2024",
      "17-08-2024",
      "18-08-2024",
      "19-08-2024",
    ];

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const newDate = `${day}-${month}-${year}`;

    if (overLimit.includes(newDate)) {
      return "Red";
    }
    if (underLimit.includes(newDate)) {
      return "Green";
    }
    return "default";
  };

  const utilizationOptions: AgChartOptions = {
    data: APIMock.utilization,

    series: [
      {
        type: "bar",
        xKey: "ccr",
        yKey: "limit",
        yName: "Utilization",
        stacked: true,
        fill: "#A8A8A8",
        highlightStyle: {
          item: {
            fill: "#B93B7E",
            stroke: "#B93B7E",
            strokeWidth: 2,
          },
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
    ],

    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
          padding: 10,
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        position: "left",
        line: { enabled: true },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
          formatter(params) {
            return params?.value + "%";
          },
        },
        gridLine: {
          enabled: false,
        },
      },
    ],
    background: {
      fill: "transparent", // Set the background to transparent
    },
    legend: {
      position: "bottom",
      item: {
        showSeriesStroke: true,
        marker: {
          size: 15,
          strokeWidth: 0,
          shape: "square",
        },
      },
    },
    // padding: {
    //   bottom: 0,
    // },
  };

  const wipOptions: AgChartOptions = {
    data: APIMock.wipLimit,

    series: [
      {
        type: "bar",
        xKey: "ccr",
        yKey: actBtn.value === "Over Limit" ? "overLimit" : "underLimit",
        yName: "Released",
        stacked: true,
        fill: "#000000",
        highlightStyle: {
          item: {
            fill: "#D2CECE",
            stroke: "#D2CECE",
            strokeWidth: 2,
          },
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "scatter",
        xKey: "ccr",
        yKey: "limit",
        yName: "Limit",
        marker: {
          size: 10,
          fill: "#E96666",
          shape: Rectangle,
          strokeWidth: 0,
        },
        highlightStyle: {
          item: {
            fill: "#820F4C",
            stroke: "#820F4C",
            strokeWidth: 2,
          },
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
    ],

    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
          padding: 0,

        },

        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "WIP In Days",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        position: "left",
        line: { enabled: true },
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
    background: {
      fill: "transparent",
    },
    legend: {
      position: "bottom",
      item: {
        showSeriesStroke: true,
        // paddingY: 0,
        marker: {
          size: 15,
          strokeWidth: 0,
          shape: "square",
        },
      },

    },
    padding: {
      bottom: 0,
    },
  };

  const handleHorizonSubmit = () => {
    console.log("horizon SUbmit");
  };

  const updateGraphState = (id: number, option: string) => {
    setSelectedGraphState(option);
  };

  const handleLimitGraphChange = () => {
    if (actBtn.label === "Over Limit") {
      setActBtn({
        label: "Under Limit",
        value: "Under Limit",
      });
    } else {
      setActBtn({
        label: "Over Limit",
        value: "Over Limit",
      });
    }
  };

  return (
    <div>
      <MTOActionToolBar
        themeUi={themeUi}
        comp={"resourceUtilization"}
        horizonDays={horizonDays}
        setHorizonDays={setHorizonDays}
        handleHorizonSubmit={handleHorizonSubmit}
        selectedGraphState={selectedGraphState}
        updateGraphState={updateGraphState}
      />
      <HorizontalWrapper>
        <GraphWrapper>
          {
            selectedGraphState === "wipLimit" && (


              <CapsuleWrapper
                style={{
                  zoom: 1,
                  padding: "4px",
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  zIndex: 8,
                }}
              >
                <VFCapsule
                  activeBtn={actBtn}
                  capsules={[
                    {
                      label: "Under Limit",
                      value: "Under Limit",
                    },
                    {
                      label: "Over Limit",
                      value: "Over Limit",
                    },
                  ]}
                  handleClick={() => handleLimitGraphChange()}
                />
              </CapsuleWrapper>
            )

          }
          <div style={{ width: "100%", height: "87%" }}>
            <AgChartsReact
              suppressDragLeaveHidesColumns={true}
              ref={chartRef}
              options={
                selectedGraphState === "wipLimit"
                  ? wipOptions
                  : utilizationOptions
              }
              onChartReady={() => {
                setChartLoading(false);
              }}
            />
          </div>
        </GraphWrapper>
        <VerticalWrapper>
          <SectionFlex>
            <VerticalTitle>Analytics</VerticalTitle>
            <div data-testid="custom-select" style={{ width: "100%" }}>
              <CustomSelect
                placeholder="Select CCR"
                selected={false}
                options={[]}
                width={"100%"}
                optionsWidth={"100%"}
              />
            </div>
          </SectionFlex>
          <HorizontalLineDashed />
          <div style={{ display: "flex", flexDirection: 'column', zoom: 0.8 }}>

            <div style={{ padding: "10px", width: '100%' }}>
              <CalenderLabel>
                <MarkerWrapper>
                  <ColoredMarker color={"#A2A2A2"} />
                  &lt;60%
                </MarkerWrapper>
                <MarkerWrapper>
                  <ColoredMarker color="#EBBF2C" />
                  60-85%
                </MarkerWrapper>
                <MarkerWrapper>
                  <ColoredMarker color="#E53F3F" />
                  85%+
                </MarkerWrapper>
              </CalenderLabel>
              <CalenderWrapper>
                <CalenderHeading data-testid="utilization">Utilization</CalenderHeading>
                <DayPicker
                  style={{

                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  mode="single"
                  components={{
                    Caption: CustomCalenderCaption,
                    Day: (props) => {
                      return (
                        <CustomCalenderDay
                          {...props}
                          color={getUtilizationColor(props.date)}
                        />
                      );
                    },
                  }}
                  styles={{
                    cell: {
                      padding: "5px",
                    },
                  }}
                />
              </CalenderWrapper>
            </div>
            <HorizontalLineDashed />
            <div style={{ padding: "10px", width: '100%' }}>
              <CalenderLabel>
                <MarkerWrapper>
                  <ColoredMarker color="#33800B" />
                  Under Limit
                </MarkerWrapper>
                <MarkerWrapper>
                  <ColoredMarker color="#E53F3F" />
                  Over Limit
                </MarkerWrapper>
                <MarkerWrapper>
                  <ColoredMarker color="#A2A2A2" />
                  Other
                </MarkerWrapper>
              </CalenderLabel>
              <CalenderWrapper>
                <CalenderHeading data-testid="wipControl">WIP Control</CalenderHeading>
                <DayPicker
                  style={{
                    // zoom: 0.8,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  mode="single"
                  components={{
                    Caption: CustomCalenderCaption,
                    Day: (props) => {
                      return (
                        <CustomCalenderDay
                          {...props}
                          color={getWIPColor(props.date)}
                        />
                      );
                    },
                  }}
                  styles={{
                    cell: {
                      padding: "5px",
                    },
                  }}
                />
              </CalenderWrapper>
            </div>
          </div>
        </VerticalWrapper>
      </HorizontalWrapper>
    </div>
  );
};

export default ResourceUtilization;
