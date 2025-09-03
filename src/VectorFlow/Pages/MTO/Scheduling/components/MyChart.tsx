import React, { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  addDays,
  startOfWeek,
  differenceInMilliseconds,
  startOfDay,
} from "date-fns";
import {
  SectionWrapper,
  ChartWrapper,
  ColumnSection,
  ColumnHeaderRow,
  HeaderCell,
  ResizeHandle,
  ContentRow,
  CalendarSection,
  CalendarTable,
  CalendarHeaderRow,
  CalendarCell,
  TaskBar,
  ZoomSection,
  ZoomButtonWrapper,
  ZoomButton,
  LegendWrapper,
  ColorPallete,
  Label,
  ContentCell,
  TaskContainer,
} from "./MyChartStyles";
import Tooltip from "../../Common/Tooltip";
import styled from "styled-components";

const TooltipWrapper = styled.div`
  padding: 8px;
  background: rgba(60, 59, 59, 0.88);
  border: 0.7px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  color: rgba(197, 195, 195, 0.88);
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const MyChart = ({
  RowData,
  ColDef,
  TaskData,
  colors,
}: {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
}) => {
  const [colWidths, setColWidths] = useState([120, 140]);

  const handleResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = colWidths[index];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidths = [...colWidths];
      newWidths[index] = Math.max(30, startWidth + delta); // min width 30px
      setColWidths(newWidths);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const [zoom, setZoom] = useState<"week" | "day">("week");

  // When computing startDate and endDate

  const startDate = useMemo(() => {
    const minStart = Math.min(...TaskData.map((task) => task.start * 1000));
    // Align to Sunday, then snap to start of day
    return startOfDay(startOfWeek(new Date(minStart), { weekStartsOn: 0 }));
  }, [TaskData]);

  const endDate = useMemo(() => {
    const maxEnd = Math.max(...TaskData.map((task) => task.end * 1000));
    return startOfDay(new Date(maxEnd)); // snap to midnight for consistency
  }, [TaskData]);

  // ✅ Generate headers
  const getCalendarHeaderDateObject = () => {
    if (zoom === "week") {
      // Weeks as headers, days as subheaders
      const weeks = eachWeekOfInterval(
        { start: startDate, end: endDate },
        { weekStartsOn: 0 }
      );
      return weeks.map((weekStart) => {
        const days = Array.from({ length: 7 }).map((_, i) =>
          addDays(weekStart, i)
        );
        return {
          label: format(weekStart, "EEE, dd MMM yyyy"),
          subHeaders: days.map((day) => format(day, "EEEEE")), // S, M, T, W...
        };
      });
    } else {
      // Days as headers, shifts as subheaders
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      return days.map((day) => ({
        label: format(day, "EEEE, d MMMM yyyy"),
        subHeaders: ["Shift 1", "Shift 2", "Shift 3"],
      }));
    }
  };

  const calendarHeaders = useMemo(
    () => getCalendarHeaderDateObject(),
    [zoom, startDate, endDate]
  );

  const colorObj = [
    { color: "#BC3D81", label: "Assigned Job" },
    { color: "#cecece", label: "Free Slot" },
    { color: "grey", label: "Type A" },
    { color: "slate-grey", label: "Type B" },
  ];

  const ToolTipContent = (
    task: any,
    taskStartOffset: any,
    taskEndOffset: any
  ) => {
    return (
      <TooltipWrapper>
        <TooltipRow>
          <div>
            <strong>{task.work_station}</strong>
          </div>
          <div style={{ color: "#cecece" }}>
            {task.jobId ? task.jobId : task.task_type}
          </div>
        </TooltipRow>
        <div style={{ width: "100%", borderTop: "1px dashed #666666" }}></div>
        <TooltipRow>
          <div>
            <strong>Start:</strong>
          </div>
          <div>
            {format(new Date(startDate.getTime() + taskStartOffset), "PPpp")}
          </div>
        </TooltipRow>

        <TooltipRow>
          <div>
            <strong>End:</strong>
          </div>
          <div>
            {format(new Date(startDate.getTime() + taskEndOffset), "PPpp")}
          </div>
        </TooltipRow>
      </TooltipWrapper>
    );
  };

  const totalSubHeaders = calendarHeaders.reduce(
    (sum: number, header: any) => sum + header.subHeaders.length,
    0
  );

  const cellWidth = 100;
  const totalChartWidth = totalSubHeaders * cellWidth;

  return (
    <SectionWrapper>
      <ChartWrapper>
        <ColumnSection>
          <thead>
            <ColumnHeaderRow>
              {ColDef.map((col, index) => (
                <HeaderCell key={index} width={colWidths[index]}>
                  {col.title}
                  <ResizeHandle onMouseDown={(e) => handleResize(index, e)} />
                </HeaderCell>
              ))}
            </ColumnHeaderRow>
          </thead>
          <tbody>
            {RowData.map((row, rowIndex) => (
              <ContentRow key={rowIndex}>
                {ColDef.map((col, colIndex) => (
                  <ContentCell key={colIndex} width={colWidths[colIndex]}>
                    {row[col.key as keyof typeof row]}
                  </ContentCell>
                ))}
              </ContentRow>
            ))}
          </tbody>
        </ColumnSection>
        <CalendarSection>
          <CalendarTable>
            {/* Main Header Row */}
            <CalendarHeaderRow>
              {calendarHeaders.map((header: any, idx: any) => (
                <CalendarCell key={idx} colSpan={header.subHeaders.length}>
                  {header.label}
                </CalendarCell>
              ))}
            </CalendarHeaderRow>

            {/* Sub Header Row */}
            <CalendarHeaderRow>
              {calendarHeaders.flatMap((header: any, idx: any) =>
                header.subHeaders.map((sub: any, subIdx: any) => (
                  <CalendarCell key={`${idx}-${subIdx}`}>{sub}</CalendarCell>
                ))
              )}
            </CalendarHeaderRow>
            <tbody>
              {RowData.map((row, rowIndex) => (
                <ContentRow key={rowIndex}>
                  {/* <TaskContainer> */}
                    {TaskData.map((task, taskIdx) => {
                      if (task.work_station === row.work_station) {
                        // Calculate left and width based on date range and zoom level

                        const myStartDate = new Date(startDate.getTime());

                        console.log(
                          "myStartDate",
                          myStartDate,
                          "\ntask",
                          new Date(task.start * 1000)
                        );

                        const cellWidth = 100; // fixed
                        const slotDuration =
                          zoom === "week"
                            ? 24 * 60 * 60 * 1000 // 1 day
                            : (24 / 3) * 60 * 60 * 1000; // 1 shift = 8 hours

                        // task start offset in ms from chart start
                        const taskStartOffset =
                          task.start * 1000 - startDate.getTime();
                        const taskEndOffset =
                          task.end * 1000 - startDate.getTime();
                        // position in px
                        const left =
                          (taskStartOffset * cellWidth) / slotDuration;
                        const width =
                          ((taskEndOffset - taskStartOffset) * cellWidth) /
                          slotDuration;

                        return (
                          <Tooltip
                            content={ToolTipContent(
                              task,
                              taskStartOffset,
                              taskEndOffset
                            )}
                            key={taskIdx}
                          >
                            <TaskBar
                              key={taskIdx}
                              left={left}
                              width={width}
                              backgroundColor={
                                colors[task.task_type] ?? "#cecece"
                              }
                            >
                              {task.jobId ? task.jobId : task.task_type}
                            </TaskBar>
                          </Tooltip>
                        );
                      }
                      return null;
                    })}
                    {calendarHeaders.flatMap((header: any, headerIdx: number) =>
                      header.subHeaders.map((sub: any, subIdx: any) => (
                        <ContentCell
                          key={`${rowIndex}-${headerIdx}-${subIdx}`}
                          width={100}
                        ></ContentCell>
                      ))
                    )}
                  {/* </TaskContainer> */}
                </ContentRow>
              ))}
            </tbody>
          </CalendarTable>
        </CalendarSection>
      </ChartWrapper>
      <ZoomSection>
        <ZoomButtonWrapper>
          <ZoomButton
            disabled={zoom === "week"}
            active={zoom === "week"}
            onClick={() => setZoom("week")}
          >
            -
          </ZoomButton>
          {/* <p style={{padding: '0 3px'}}>zoom</p> */}
          <ZoomButton
            disabled={zoom === "day"}
            active={zoom === "day"}
            onClick={() => setZoom("day")}
          >
            +
          </ZoomButton>
        </ZoomButtonWrapper>
      </ZoomSection>
      <LegendWrapper>
        {/* {colorObj.map((colorItem, colorIdx) => (
          <React.Fragment key={colorIdx}>
            <ColorPallete color={colorItem.color} />
            <Label>{colorItem.label}</Label>
          </React.Fragment>
        ))} */}

        {colors &&
          Object.keys(colors).map((key, index) => (
            <React.Fragment key={index}>
              <ColorPallete color={colors[key]} />
              <Label>{key}</Label>
            </React.Fragment>
          ))}
      </LegendWrapper>
    </SectionWrapper>
  );
};

export default MyChart;
