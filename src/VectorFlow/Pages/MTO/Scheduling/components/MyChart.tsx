import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  addDays,
  startOfWeek,
  startOfDay,
} from "date-fns";
import Tooltip from "../../Common/Tooltip";
import { CalendarBodyWrapper, CalendarCell, CalendarHeaderRow, CalendarHeaderWrapper, CalendarSection, CalendarTable, ChartWrapper, ColorPallete, ColumnBodyWrapper, ColumnHeaderRow, ColumnHeaderWrapper, ColumnSection, ColumnTable, ContentCell, ContentRow, HeaderCell, Label, LegendWrapper, ResizeHandle, SectionWrapper, TaskBar, TaskContainer, TooltipRow, TooltipWrapper, ZoomButton, ZoomButtonWrapper, ZoomSection } from "./MyChartStyles";


interface MyChartProps {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  CustomTaskBar?: ({props}:any) => React.ReactNode;
  CustomTooltip?: any;
  height?: number; // New prop for fixed height
}

const MyChart: React.FC<MyChartProps> = ({
  RowData,
  ColDef,
  TaskData,
  colors,
  primary_key,
  CustomTaskBar,
  CustomTooltip,
  height = 380, // Default height
}) => {
  const initialColWidths: any = ColDef.map((ele:any) => ele.width);
  const [colWidths, setColWidths] = useState<any>(initialColWidths);
  const [zoom, setZoom] = useState<"week" | "day">("day");

  // Refs for synchronized scrolling
  const leftBodyRef = useRef<HTMLDivElement>(null);
  const rightBodyRef = useRef<HTMLDivElement>(null);
  const rightHeaderRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef(false);

  // Handle column resize
  const handleResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = colWidths[index];

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidths = [...colWidths];
      newWidths[index] = Math.max(30, startWidth + delta);
      setColWidths(newWidths);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Synchronized vertical scrolling
  useEffect(() => {
    const handleLeftScroll = () => {
      if (!isScrollingSyncRef.current && leftBodyRef.current && rightBodyRef.current) {
        isScrollingSyncRef.current = true;
        rightBodyRef.current.scrollTop = leftBodyRef.current.scrollTop;
        setTimeout(() => { isScrollingSyncRef.current = false; }, 10);
      }
    };

    const handleRightScroll = () => {
      if (!isScrollingSyncRef.current && rightBodyRef.current && leftBodyRef.current) {
        isScrollingSyncRef.current = true;
        leftBodyRef.current.scrollTop = rightBodyRef.current.scrollTop;
        setTimeout(() => { isScrollingSyncRef.current = false; }, 10);
      }
    };

    const handleRightBodyHorizontalScroll = () => {
      if (rightBodyRef.current && rightHeaderRef.current) {
        rightHeaderRef.current.scrollLeft = rightBodyRef.current.scrollLeft;
      }
    };

    const leftBody = leftBodyRef.current;
    const rightBody = rightBodyRef.current;

    if (leftBody) {
      leftBody.addEventListener('scroll', handleLeftScroll);
    }
    if (rightBody) {
      rightBody.addEventListener('scroll', handleRightScroll);
      rightBody.addEventListener('scroll', handleRightBodyHorizontalScroll);
    }

    return () => {
      if (leftBody) {
        leftBody.removeEventListener('scroll', handleLeftScroll);
      }
      if (rightBody) {
        rightBody.removeEventListener('scroll', handleRightScroll);
        rightBody.removeEventListener('scroll', handleRightBodyHorizontalScroll);
      }
    };
  }, []);

  // Date calculations
  const startDate = useMemo(() => {
    const minStart = Math.min(...TaskData.map((task) => task.start * 1000));
    return startOfDay(startOfWeek(new Date(minStart), { weekStartsOn: 0 }));
  }, [TaskData]);

  const endDate = useMemo(() => {
    const maxEnd = Math.max(...TaskData.map((task) => task.end * 1000));
    return startOfDay(new Date(maxEnd));
  }, [TaskData]);

  // Generate headers
  const getCalendarHeaderDateObject = () => {
    if (zoom === "week") {
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
          subHeaders: days.map((day) => format(day, "EEEEE")),
        };
      });
    } else {
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

  // Calculate heights considering the controls
  const controlsHeight = 65; // Zoom section + Legend
  const chartHeight = height - controlsHeight;

  return (
    <SectionWrapper>
      <ChartWrapper height={chartHeight}>
        {/* Left Column Section */}
        <ColumnSection>
          <ColumnHeaderWrapper>
            <ColumnTable>
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
            </ColumnTable>
          </ColumnHeaderWrapper>
          <ColumnBodyWrapper ref={leftBodyRef} style={{marginBottom: '15px'}}>
            <ColumnTable>
              <tbody>
                {RowData.map((row, rowIndex) => (
                  <ContentRow key={rowIndex} style={{width: 'fit-content'}}>
                    {ColDef.map((col, colIndex) => (
                      <ContentCell key={colIndex} width={colWidths[colIndex]}>
                        {row[col.key as keyof typeof row]}
                      </ContentCell>
                    ))}
                  </ContentRow>
                ))}
              </tbody>
            </ColumnTable>
          </ColumnBodyWrapper>
        </ColumnSection>

        {/* Right Calendar Section */}
        <CalendarSection>
          <CalendarHeaderWrapper ref={rightHeaderRef}>
            <CalendarTable>
              <thead>
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
              </thead>
            </CalendarTable>
          </CalendarHeaderWrapper>
          
          <CalendarBodyWrapper ref={rightBodyRef}>
            <CalendarTable>
              <tbody>
                {RowData.map((row, rowIndex) => (
                  <ContentRow key={rowIndex}>
                    {/* Render background cells first */}
                    {calendarHeaders.flatMap((header: any, headerIdx: number) =>
                      header.subHeaders.map((sub: any, subIdx: any) => (
                        <TaskContainer
                          key={`${rowIndex}-${headerIdx}-${subIdx}`}
                        />
                      ))
                    )}
                    {/* Then render tasks on top */}
                    <td style={{ position: 'absolute', left: 0, right: 0, height: '30px', padding: 0, border: 0 }}>
                      <div style={{ position: 'relative', width: totalSubHeaders * cellWidth + 'px', height: '30px' }}>
                        {TaskData.filter(task => task[primary_key] === row[primary_key]).map((task, taskIdx) => {
                          const chartStart = new Date(startDate);
                          chartStart.setHours(0, 0, 0, 0);

                          const slotDuration =
                            zoom === "week"
                              ? 24 * 60 * 60 * 1000
                              : 8 * 60 * 60 * 1000;

                          const taskStart = new Date(task.start * 1000);
                          taskStart.setSeconds(0, 0);
                          const taskEnd = new Date(task.end * 1000);
                          taskEnd.setSeconds(0, 0);

                          const taskStartOffset = taskStart.getTime() - chartStart.getTime();
                          const taskEndOffset = taskEnd.getTime() - chartStart.getTime();
                          const taskDuration = taskEndOffset - taskStartOffset;

                          const startSlots = taskStartOffset / slotDuration;
                          const durationSlots = taskDuration / slotDuration;

                          const left = startSlots * cellWidth;
                          const width = durationSlots * cellWidth;

                          return (
                            <Tooltip
                              content={CustomTooltip ? 
                                CustomTooltip(task, taskStartOffset, taskEndOffset, startDate) : 
                                ToolTipContent(task, taskStartOffset, taskEndOffset)
                              }
                              key={`${row[primary_key]}-${taskIdx}`}
                            >
                              {CustomTaskBar ? 
                                CustomTaskBar({taskIdx, left, width, task}) :
                                <TaskBar
                                  left={left}
                                  width={width}
                                  backgroundColor={colors?.[task.task_type] ?? "#cecece"}
                                >
                                  {task.jobId ? task.jobId : task.task_type}
                                </TaskBar>
                              }
                            </Tooltip>
                          );
                        })}
                      </div>
                    </td>
                  </ContentRow>
                ))}
              </tbody>
            </CalendarTable>
          </CalendarBodyWrapper>
        </CalendarSection>
      </ChartWrapper>
      
      <ZoomSection>
        <ZoomButtonWrapper>
          <ZoomButton
            disabled={zoom === "week"}
            active={zoom === "week"}
            onClick={() => setZoom("week")}
          >
            Week
          </ZoomButton>
          <ZoomButton
            disabled={zoom === "day"}
            active={zoom === "day"}
            onClick={() => setZoom("day")}
          >
            Day
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