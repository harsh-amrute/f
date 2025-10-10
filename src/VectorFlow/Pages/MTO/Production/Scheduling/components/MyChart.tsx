import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  addDays,
  startOfWeek,
  startOfDay,
} from "date-fns";
import Tooltip from "../../../Common/Tooltip";
import { 
  CalendarBodyWrapper, 
  CalendarCell, 
  CalendarHeaderRow, 
  CalendarHeaderWrapper, 
  CalendarSection, 
  CalendarTable, 
  ChartWrapper, 
  ColorPallete, 
  ColumnBodyWrapper, 
  ColumnHeaderRow, 
  ColumnHeaderWrapper, 
  ColumnSection, 
  ColumnTable, 
  ContentCell, 
  ContentRow, 
  HeaderCell, 
  Label, 
  LegendWrapper, 
  ResizeHandle, 
  SectionWrapper, 
  TaskBar, 
  TaskContainer, 
  TooltipRow, 
  TooltipWrapper, 
  ZoomButton, 
  ZoomButtonWrapper, 
  ZoomSection 
} from "./MyChartStyles";

interface MyChartProps {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  CustomTaskBar?: ({props}:any) => React.ReactNode;
  CustomTooltip?: any;
  height?: number;
  rowHeight?: number;
  overscanCount?: number;
  enableAggregation?: boolean; // NEW: Aggregate overlapping tasks
  aggregationThreshold?: number; // NEW: Pixel threshold for aggregation
}

// Memoized TaskBar component to prevent re-renders
const MemoizedTaskBar = React.memo(({ 
  left, 
  width, 
  backgroundColor, 
  children,
  onClick 
}: any) => (
  <TaskBar
    left={left}
    width={width}
    backgroundColor={backgroundColor}
    onClick={onClick}
  >
    {children}
  </TaskBar>
));

// Memoized Row component
const VirtualRow = React.memo(({ 
  row, 
  rowIndex,
  rowHeight,
  colDef,
  colWidths,
  tasks,
  calendarHeaders,
  totalSubHeaders,
  cellWidth,
  zoom,
  startDate,
  colors,
  primary_key,
  CustomTaskBar,
  CustomTooltip,
  ToolTipContent,
  visibleColRange,
}: any) => {
  const slotDuration = zoom === "week" ? 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
  const chartStart = useMemo(() => {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [startDate]);

  return (
    <ContentRow style={{ height: `${rowHeight}px` }}>
      {calendarHeaders.flatMap((header: any, headerIdx: number) =>
        header.subHeaders.map((sub: any, subIdx: any) => (
          <TaskContainer key={`${rowIndex}-${headerIdx}-${subIdx}`} />
        ))
      )}
      
      <td style={{ position: 'absolute', left: 0, right: 0, height: `${rowHeight}px`, padding: 0, border: 0 }}>
        <div style={{ position: 'relative', width: totalSubHeaders * cellWidth + 'px', height: `${rowHeight}px` }}>
          {tasks.map((task: any, taskIdx: number) => {
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
            
            // Culling: Skip tasks outside visible area
            const taskEndPos = left + width;
            const viewportStart = visibleColRange.start * cellWidth;
            const viewportEnd = visibleColRange.end * cellWidth;
            
            if (taskEndPos < viewportStart - 100 || left > viewportEnd + 100) {
              return null;
            }

            // Skip very small tasks (< 2px)
            if (width < 2) {
              return null;
            }

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
                  <MemoizedTaskBar
                    left={left}
                    width={width}
                    backgroundColor={colors?.[task.task_type] ?? "#cecece"}
                  >
                    {task.jobId ? task.jobId : task.task_type}
                  </MemoizedTaskBar>
                }
              </Tooltip>
            );
          })}
        </div>
      </td>
    </ContentRow>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for deep equality on critical props
  return (
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.row === nextProps.row &&
    prevProps.tasks === nextProps.tasks &&
    prevProps.visibleColRange.start === nextProps.visibleColRange.start &&
    prevProps.visibleColRange.end === nextProps.visibleColRange.end &&
    prevProps.zoom === nextProps.zoom
  );
});

const MyChart: React.FC<MyChartProps> = ({
  RowData,
  ColDef,
  TaskData,
  colors,
  primary_key,
  CustomTaskBar,
  CustomTooltip,
  height = 380,
  rowHeight = 30,
  overscanCount = 5,
}) => {
  const initialColWidths: any = ColDef.map((ele:any) => ele.width);
  const [colWidths, setColWidths] = useState<any>(initialColWidths);
  const [zoom, setZoom] = useState<"week" | "day">("day");
  
  const [visibleRowRange, setVisibleRowRange] = useState({ start: 0, end: 10 });
  const [visibleColRange, setVisibleColRange] = useState({ start: 0, end: 10 });

  const leftBodyRef = useRef<HTMLDivElement>(null);
  const rightBodyRef = useRef<HTMLDivElement>(null);
  const rightHeaderRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const startDate = useMemo(() => {
    const minStart = Math.min(...TaskData.map((task) => task.start * 1000));
    return startOfDay(startOfWeek(new Date(minStart), { weekStartsOn: 0 }));
  }, [TaskData]);

  const endDate = useMemo(() => {
    const maxEnd = Math.max(...TaskData.map((task) => task.end * 1000));
    return startOfDay(new Date(maxEnd));
  }, [TaskData]);

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

  const totalSubHeaders = useMemo(() => 
    calendarHeaders.reduce(
      (sum: number, header: any) => sum + header.subHeaders.length,
      0
    ),
    [calendarHeaders]
  );

  const cellWidth = 100;
  const controlsHeight = 65;
  const chartHeight = height - controlsHeight;

  const calculateVisibleRows = useCallback((scrollTop: number) => {
    const start = Math.floor(scrollTop / rowHeight);
    const visibleCount = Math.ceil(chartHeight / rowHeight);
    const end = start + visibleCount;
    
    return {
      start: Math.max(0, start - overscanCount),
      end: Math.min(RowData.length, end + overscanCount)
    };
  }, [rowHeight, chartHeight, RowData.length, overscanCount]);

  const calculateVisibleColumns = useCallback((scrollLeft: number) => {
    const start = Math.floor(scrollLeft / cellWidth);
    const visibleCount = Math.ceil((rightBodyRef.current?.clientWidth || 800) / cellWidth);
    const end = start + visibleCount;
    
    return {
      start: Math.max(0, start - overscanCount),
      end: Math.min(totalSubHeaders, end + overscanCount)
    };
  }, [cellWidth, totalSubHeaders, overscanCount]);

  // Debounced scroll handler for better performance
  const handleVirtualScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (rightBodyRef.current) {
        const scrollTop = rightBodyRef.current.scrollTop;
        const scrollLeft = rightBodyRef.current.scrollLeft;
        
        const newRowRange = calculateVisibleRows(scrollTop);
        const newColRange = calculateVisibleColumns(scrollLeft);
        
        setVisibleRowRange(prev => {
          if (prev.start !== newRowRange.start || prev.end !== newRowRange.end) {
            return newRowRange;
          }
          return prev;
        });
        
        setVisibleColRange(prev => {
          if (prev.start !== newColRange.start || prev.end !== newColRange.end) {
            return newColRange;
          }
          return prev;
        });
      }
    }, 16); // ~60fps
  }, [calculateVisibleRows, calculateVisibleColumns]);

  useEffect(() => {
    const handleLeftScroll = () => {
      if (!isScrollingSyncRef.current && leftBodyRef.current && rightBodyRef.current) {
        isScrollingSyncRef.current = true;
        rightBodyRef.current.scrollTop = leftBodyRef.current.scrollTop;
        handleVirtualScroll();
        setTimeout(() => { isScrollingSyncRef.current = false; }, 10);
      }
    };

    const handleRightScroll = () => {
      if (!isScrollingSyncRef.current && rightBodyRef.current && leftBodyRef.current) {
        isScrollingSyncRef.current = true;
        leftBodyRef.current.scrollTop = rightBodyRef.current.scrollTop;
        setTimeout(() => { isScrollingSyncRef.current = false; }, 10);
      }
      handleVirtualScroll();
    };

    const handleRightBodyHorizontalScroll = () => {
      if (rightBodyRef.current && rightHeaderRef.current) {
        rightHeaderRef.current.scrollLeft = rightBodyRef.current.scrollLeft;
      }
    };

    const handleRightBodyHorizontalScrollHeader = () => {
      if (rightBodyRef.current && rightHeaderRef.current) {
        rightBodyRef.current.scrollLeft = rightHeaderRef.current.scrollLeft;
      }
    };

    const leftBody = leftBodyRef.current;
    const rightBody = rightBodyRef.current;
    const rightBodyHeader = rightHeaderRef.current;

    if (leftBody) {
      leftBody.addEventListener('scroll', handleLeftScroll, { passive: true });
    }
    if (rightBody) {
      rightBody.addEventListener('scroll', handleRightScroll, { passive: true });
      rightBody.addEventListener('scroll', handleRightBodyHorizontalScroll, { passive: true });
    }
    if (rightBodyHeader) {
      rightBodyHeader.addEventListener('scroll', handleRightBodyHorizontalScrollHeader, { passive: true });
    }

    handleVirtualScroll();

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (leftBody) {
        leftBody.removeEventListener('scroll', handleLeftScroll);
      }
      if (rightBody) {
        rightBody.removeEventListener('scroll', handleRightScroll);
        rightBody.removeEventListener('scroll', handleRightBodyHorizontalScroll);
      }
      if (rightBodyHeader) {
        rightBodyHeader.removeEventListener('scroll', handleRightBodyHorizontalScrollHeader);
      }
    };
  }, [handleVirtualScroll]);

  // Optimized task indexing with spatial indexing
  const tasksByRow = useMemo(() => {
    const map = new Map<any, any[]>();
    const slotDuration = zoom === "week" ? 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
    
    TaskData.forEach(task => {
      const key = task[primary_key];
      if (!map.has(key)) {
        map.set(key, []);
      }
      
      // Pre-calculate position for spatial queries
      const taskStart = new Date(task.start * 1000);
      const taskEnd = new Date(task.end * 1000);
      const chartStart = new Date(startDate);
      chartStart.setHours(0, 0, 0, 0);
      
      const taskStartOffset = taskStart.getTime() - chartStart.getTime();
      const taskEndOffset = taskEnd.getTime() - chartStart.getTime();
      const startSlots = taskStartOffset / slotDuration;
      const durationSlots = (taskEndOffset - taskStartOffset) / slotDuration;
      
      map.get(key)!.push({
        ...task,
        _left: startSlots * cellWidth,
        _width: durationSlots * cellWidth,
        _startSlot: startSlots,
        _endSlot: startSlots + durationSlots,
      });
    });
    
    // Sort tasks by start time for efficient rendering
    map.forEach((tasks) => {
      tasks.sort((a, b) => a._startSlot - b._startSlot);
    });
    
    return map;
  }, [TaskData, primary_key, zoom, startDate, cellWidth]);

  const visibleRows = useMemo(() => {
    return RowData.slice(visibleRowRange.start, visibleRowRange.end);
  }, [RowData, visibleRowRange]);

  const ToolTipContent = useCallback((
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
  }, [primary_key, startDate]);

  const totalHeight = RowData.length * rowHeight;
  const offsetTop = visibleRowRange.start * rowHeight;

  return (
    <SectionWrapper>
      <ChartWrapper height={chartHeight}>
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
                <tr style={{ height: `${offsetTop}px` }}></tr>
                
                {visibleRows.map((row, index) => {
                  const actualRowIndex = visibleRowRange.start + index;
                  return (
                    <ContentRow key={actualRowIndex} style={{width: 'fit-content', height: `${rowHeight}px`}}>
                      {ColDef.map((col, colIndex) => (
                        <ContentCell key={colIndex} width={colWidths[colIndex]}>
                          {row[col.key as keyof typeof row]}
                        </ContentCell>
                      ))}
                    </ContentRow>
                  );
                })}
                
                <tr style={{ height: `${totalHeight - (visibleRowRange.end * rowHeight)}px` }}></tr>
              </tbody>
            </ColumnTable>
          </ColumnBodyWrapper>
        </ColumnSection>

        <CalendarSection>
          <CalendarHeaderWrapper ref={rightHeaderRef}>
            <CalendarTable>
              <thead>
                <CalendarHeaderRow>
                  {calendarHeaders.map((header: any, idx: any) => (
                    <CalendarCell key={idx} colSpan={header.subHeaders.length}>
                      {header.label}
                    </CalendarCell>
                  ))}
                </CalendarHeaderRow>
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
                <tr style={{ height: `${offsetTop}px` }}></tr>
                
                {visibleRows.map((row, index) => {
                  const actualRowIndex = visibleRowRange.start + index;
                  const rowTasks = tasksByRow.get(row[primary_key]) || [];
                  
                  return (
                    <VirtualRow
                      key={actualRowIndex}
                      row={row}
                      rowIndex={actualRowIndex}
                      rowHeight={rowHeight}
                      colDef={ColDef}
                      colWidths={colWidths}
                      tasks={rowTasks}
                      calendarHeaders={calendarHeaders}
                      totalSubHeaders={totalSubHeaders}
                      cellWidth={cellWidth}
                      zoom={zoom}
                      startDate={startDate}
                      colors={colors}
                      primary_key={primary_key}
                      CustomTaskBar={CustomTaskBar}
                      CustomTooltip={CustomTooltip}
                      ToolTipContent={ToolTipContent}
                      visibleColRange={visibleColRange}
                    />
                  );
                })}
                
                <tr style={{ height: `${totalHeight - (visibleRowRange.end * rowHeight)}px` }}></tr>
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