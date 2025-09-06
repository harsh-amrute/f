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
  TooltipWrapper,
  TooltipRow,
} from "./MyChartStyles";
import Tooltip from "../../Common/Tooltip";
import styled from "styled-components";



const MyChart = ({
  RowData,
  ColDef,
  TaskData,
  colors,
  primary_key,
  CustomTaskBar,
  CustomTooltip
}: {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  CustomTaskBar?: ({props}:any) => React.ReactNode;
  CustomTooltip?: any;
}) => {

  const initialColWidths: any = ColDef.map((ele:any) => ele.width); // default width 150px
  const [colWidths, setColWidths] = useState<any>(initialColWidths);

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


  const ToolTipContent = (
    task: any,
    taskStartOffset: any,
    taskEndOffset: any
  ) => {
    return (
      <TooltipWrapper>
        <TooltipRow>
          <div>
            <strong>{task[primary_key]}</strong>
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
        <ColumnSection style={{position: 'relative'}}>
          <thead style={{position: "sticky", top: 0}}>
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
                  {TaskData.map((task, taskIdx) => {
                    if (task[primary_key] === row[primary_key]) {
                      // Align startDate to start of day
                      const chartStart = new Date(startDate);
                      chartStart.setHours(0, 0, 0, 0);
  
                      const slotDuration =
                        zoom === "week"
                          ? 24 * 60 * 60 * 1000
                          : 8 * 60 * 60 * 1000; 
  
                      const taskStart = new Date(task.start * 1000);
                      taskStart.setSeconds(0, 0); // snap to minute
                      const taskEnd = new Date(task.end * 1000);
                      taskEnd.setSeconds(0, 0);
  
                      // Calculate offsets
                      const taskStartOffset =
                        taskStart.getTime() - chartStart.getTime();
                      const taskEndOffset =
                        taskEnd.getTime() - chartStart.getTime();
                      const taskDuration = taskEndOffset - taskStartOffset;
  
                      // convert offset → slots
                      const startSlots = taskStartOffset / slotDuration;
                      const durationSlots = taskDuration / slotDuration;
  
                      // finally convert slots → px
                      const left = startSlots * cellWidth;
                      const width = durationSlots * cellWidth;
  
                      return (
                        <Tooltip
                          content={CustomTooltip? CustomTooltip(task,taskStartOffset, taskEndOffset, startDate): ToolTipContent(
                            task,
                            taskStartOffset,
                            taskEndOffset
                          )}
                          key={taskIdx}
                        >
                          {
                            CustomTaskBar? CustomTaskBar({taskIdx, left, width, task}):
                            <TaskBar
                            key={taskIdx}
                            left={left}
                            width={width}
                            backgroundColor={colors[task.task_type] ?? "#cecece"}
                            >
                            {task.jobId ? task.jobId : task.task_type}
                          </TaskBar>
                          }
                        </Tooltip>
                      );
                    }
                    return null;
                  })}
                  {calendarHeaders.flatMap((header: any, headerIdx: number) =>
                    header.subHeaders.map((sub: any, subIdx: any) => (
                      <ContentCell
                        key={`${rowIndex}-${headerIdx}-${subIdx}`}
                        width={cellWidth}
                      ></ContentCell>
                    ))
                  )}
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
