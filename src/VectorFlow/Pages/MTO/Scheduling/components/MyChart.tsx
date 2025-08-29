import React, { useMemo, useState } from "react";
import {
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    addDays,
  } from "date-fns";
import { SectionWrapper, ChartWrapper, ColumnSection, ColumnHeaderRow, HeaderCell, ResizeHandle, ContentRow, CalendarSection, CalendarTable, CalendarHeaderRow, CalendarCell, TaskBar, ZoomSection, ZoomButtonWrapper, ZoomButton, LegendWrapper, ColorPallete, Label, ContentCell } from "./MyChartStyles";
import Tooltip from "../../Common/Tooltip";
import styled from "styled-components";



const TooltipWrapper = styled.div`
  padding: 8px;
  background:  rgba(60, 59, 59, 0.88);
  border: 0.7px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  color:  rgba(197, 195, 195, 0.88);
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
`




const MyChart = () => {
  const [colWidths, setColWidths] = useState([120, 140]);

  const ColDef = [
    { title: "Stage", key: "stage" },
    { title: "Work Station", key: "workStation" },
  ];

  const RowData = [
    { stage: "Cutting", workStation: "Cutter 1" },
    { stage: "Cutting", workStation: "Cutter 2" },
    { stage: "Sewing", workStation: "Sewing Machine 1" },
    { stage: "Sewing", workStation: "Sewing Machine 2" },
    { stage: "Packing", workStation: "Packing Station 1" },
    { stage: "Packing", workStation: "Packing Station 2" },
  ];

  const TaskData = [
    { jobId: "J0001", workStation: "Cutter 1", start: 1735689655233, end: 1735862400000 }, // Jan 1, 2025 00:00 to Jan 3, 2025 00:00
    { jobId: null, workStation: "Cutter 1", start: 1735862400000, end: 1735948800000 }, // Jan 3, 2025 00:00 to Jan 4, 2025 00:00
    { jobId: "J0002", workStation: "Cutter 1", start: 1735948800000, end: 1736121600000 }, // Jan 4, 2025 00:00 to Jan 6, 2025 00:00
    { jobId: "J0004", workStation: "Cutter 2", start: 1735776000000, end: 1735804800000 }, // Jan 2, 2025 00:00 to Jan 5, 2025 00:00
    { jobId: "J0005", workStation: "Sewing Machine 1", start: 1736035200000, end: 1736640000000 }, // Jan 4, 2025 00:00 to Jan 10, 2025 00:00
    { jobId: "J0006", workStation: "Sewing Machine 1", start: 1736640000000, end: 1737072000000 }, // Jan 10, 2025 00:00 to Jan 14, 2025 00:00
    { jobId: "J0007", workStation: "Sewing Machine 2", start: 1736121600000, end: 1736736000000 }, // Jan 6, 2025 00:00 to Jan 12, 2025 00:00
    { jobId: "J0009", workStation: "Packing Station 1", start: 1736736000000, end: 1737168000000 }, // Jan 11, 2025 00:00 to Jan 15, 2025 00:00
    { jobId: "J0010", workStation: "Packing Station 2", start: 1737168000000, end: 1737686400000 }, // Jan 13, 2025 00:00 to Jan 18, 2025 00:00
  ];

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

  const startDate = new Date(2025, 0, 1); // Jan 1, 2025
  const endDate = new Date(2025, 1, 28); // Feb 28, 2025

  // ✅ Generate headers
  const getCalendarHeaderDateObject = () => {
    if (zoom === "week") {
      // Weeks as headers, days as subheaders
      const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 0 });
      return weeks.map((weekStart) => {
        const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
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

  const calendarHeaders = useMemo(() => getCalendarHeaderDateObject(), [
    zoom,
    startDate,
    endDate,
  ]);

  const colorObj = [
    {color: "#BC3D81", label: "Assigned Job" },
    {color: "#cecece", label: "Free Slot" },
    {color: "grey", label: "Type A" },
    {color: "slate-grey", label: "Type B" },
  ]

  const ToolTipContent = ({task}:any) => (
    <TooltipWrapper>
      <TooltipRow>
        <div><strong>{task.workStation}</strong></div>
        <div style={{color: "#cecece"}}>{task.jobId?task.jobId:"N/A"}</div>
      </TooltipRow>
      <div style={{width: '100%', borderTop: '1px dashed #666666'}}>

      </div>
      <TooltipRow>
        <div><strong>Start:</strong></div>
        <div>{format(new Date(task.start), "PPpp")}</div>
      </TooltipRow>
      <TooltipRow>
        <div><strong>End:</strong></div>
        <div>{format(new Date(task.end), "PPpp")}</div>
      </TooltipRow>
    </TooltipWrapper>
  );

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
            {calendarHeaders.map((header:any, idx:any) => (
             <CalendarCell key={idx} colSpan={header.subHeaders.length}>
             {header.label}
           </CalendarCell>
            ))}
          </CalendarHeaderRow>

          {/* Sub Header Row */}
          <CalendarHeaderRow>
            {calendarHeaders.flatMap((header:any, idx:any) =>
              header.subHeaders.map((sub:any, subIdx:any) => (
                <CalendarCell key={`${idx}-${subIdx}`}>{sub}</CalendarCell>
              ))
            )}
          </CalendarHeaderRow>
            <tbody>
                {RowData.map((row, rowIndex) => (
                <ContentRow key={rowIndex}>
                    {
                      TaskData.map((task, taskIdx) => {
                        if(task.workStation === row.workStation) {
                          // Calculate left and width based on date range and zoom level
                          const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
                          const dayWidth = (calendarHeaders.length * (zoom === "day" ? 3 : 7) * 100) / totalDays; // assuming each subheader is 100px wide

                          const taskStartOffset = (task.start - startDate.getTime()) / (1000 * 60 * 60); // Offset in hours
                          const taskDuration = (task.end - task.start) / (1000 * 60 * 60); // Duration in hours
                          
                          const left = (taskStartOffset / 24) * dayWidth; // Convert hours to days for positioning
                          const width = Math.max((taskDuration / 24) * dayWidth, 4); // Convert hours to days for width, ensure at least one unit wide
                          
                          
                          return (
                            <Tooltip content={ToolTipContent({task})} key={taskIdx}>

                          <TaskBar key={taskIdx} left={left} width={width} backgroundColor={task.jobId!==null?"#BC3D81":"#cecece"} >
                            {task.jobId?task.jobId:""}
                          </TaskBar>
                            </Tooltip>
                          );
                        }
                        return null;
                      })
                    }
                    {calendarHeaders.flatMap((header:any) =>
                    header.subHeaders.map((sub:any, subIdx:any) => (
                        <ContentCell key={`${rowIndex}-${subIdx}`} width={100}>
                            
                        </ContentCell>
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
        <ZoomButton disabled={zoom==="week"} active={zoom==="week"} onClick={() => setZoom("week")}>-</ZoomButton>
        {/* <p style={{padding: '0 3px'}}>zoom</p> */}
        <ZoomButton disabled={zoom==="day"} active={zoom==="day"} onClick={() => setZoom("day")}>+</ZoomButton>

      </ZoomButtonWrapper>
    </ZoomSection>
      <LegendWrapper>
                {
                  colorObj.map((colorItem, colorIdx) => (
                    <React.Fragment key={colorIdx}>
                      <ColorPallete color={colorItem.color} />
                      <Label>{colorItem.label}</Label>
                    </React.Fragment>
                  ))

                }
      </LegendWrapper>
      </SectionWrapper>
  );
};

export default MyChart;
