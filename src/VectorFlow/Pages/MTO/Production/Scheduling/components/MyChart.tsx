import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  addDays,
  startOfWeek,
  startOfDay,
  parse,
} from "date-fns";
import Tooltip from "../../../Common/Tooltip";
import { 
  CalendarBodyWrapper, 
  CalendarCell, 
  CalendarCellTop, 
  CalendarHeaderRow, 
  CalendarHeaderRowTop, 
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

interface SlotConfig {
  [key: string]: string;
}

interface MyChartProps {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  Slot?: SlotConfig[];
  CustomTaskBar?: ({props}:any) => React.ReactNode;
  CustomTooltip?: any;
  height?: number;
  rowHeight?: number;
  overscanCount?: number;
  Attributes?: { [key: string]: any };
}

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

const VirtualRow = React.memo(({ 
  row, 
  rowIndex,
  rowHeight,
  colDef,
  colWidths,
  tasks,
  visibleColumnIndices,
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
  shiftsPerDay,
  shiftFactor,
  Attributes,
  leftPadding,
  rightPadding
}: any) => {
  const slotDuration = zoom === "week" ? 24 * 60 * 60 * 1000 : (24 * 60 * 60 * 1000) / shiftsPerDay;
  const chartStart = useMemo(() => {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [startDate]);

  return (
    <ContentRow style={{ height: `${rowHeight}px` }}>
      {/* Left padding spacer */}
      {leftPadding > 0 && (
        <td style={{ 
          minWidth: `${leftPadding}px`, 
          width: `${leftPadding}px`, 
          padding: 0,
          border: 0,
          background: 'transparent'
        }} />
      )}
      
      {/* Visible calendar cells */}
      {visibleColumnIndices.map((colIdx: number) => (
        <TaskContainer key={`${rowIndex}-${colIdx}`} />
      ))}
      
      {/* Right padding spacer */}
      {rightPadding > 0 && (
        <td style={{ 
          minWidth: `${rightPadding}px`, 
          width: `${rightPadding}px`, 
          padding: 0,
          border: 0,
          background: 'transparent'
        }} />
      )}
      
      {/* Task bars positioned absolutely */}
      <td style={{ 
        position: 'absolute', 
        left: 0, 
        right: 0, 
        height: `${rowHeight}px`, 
        padding: 0, 
        border: 0,
        pointerEvents: 'none'
      }}>
        <div style={{ 
          position: 'relative', 
          width: totalSubHeaders * cellWidth + 'px', 
          height: `${rowHeight}px`,
          pointerEvents: 'auto'
        }}>
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

            const left = (zoom==='day' && shiftFactor>0) ? startSlots * cellWidth + shiftFactor : startSlots * cellWidth;
            const width = durationSlots * cellWidth;
            
            const taskEndPos = left + width;
            const viewportStart = visibleColRange.start * cellWidth;
            const viewportEnd = visibleColRange.end * cellWidth;
            
            if (taskEndPos < viewportStart - 100 || left > viewportEnd + 100) {
              return null;
            }

            if (width < 2) {
              return null;
            }

            return (
              <Tooltip
                content={CustomTooltip ? 
                  CustomTooltip(task, taskStartOffset, taskEndOffset, startDate, Attributes) : 
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
  return (
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.row === nextProps.row &&
    prevProps.tasks === nextProps.tasks &&
    prevProps.visibleColRange.start === nextProps.visibleColRange.start &&
    prevProps.visibleColRange.end === nextProps.visibleColRange.end &&
    prevProps.zoom === nextProps.zoom &&
    prevProps.leftPadding === nextProps.leftPadding &&
    prevProps.rightPadding === nextProps.rightPadding &&
    JSON.stringify(prevProps.visibleColumnIndices) === JSON.stringify(nextProps.visibleColumnIndices)
  );
});

const MyChart: React.FC<MyChartProps> = ({
  RowData,
  ColDef,
  TaskData,
  colors,
  primary_key,
  Slot,
  CustomTaskBar,
  CustomTooltip,
  height = 380,
  rowHeight = 30,
  overscanCount = 5,
  Attributes
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

  const calculateShiftInPixels = (startTime: string, numberOfSlots: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutesFromMidnight = hours * 60 + minutes;
    
    const totalPixelsPerDay = numberOfSlots * 100;
    const pixelsPerMinute = totalPixelsPerDay / (24 * 60);
    const offsetFromMidnight = totalMinutesFromMidnight * pixelsPerMinute;

    const shiftInPixels = totalPixelsPerDay - offsetFromMidnight;
    const actualShift = Math.abs(((numberOfSlots-1)*100)-shiftInPixels)+ (numberOfSlots-1)*100;
    return actualShift;
  };

  const shiftFactor = Slot ? Slot[0]['1']!== '00:00 AM' ? calculateShiftInPixels(Slot[0]['1'].split(' ')[0], Slot.length) : 0 : 0;

  const shiftConfig = useMemo(() => {
    if (!Slot || zoom !== "day") return null;
    
    const shifts = Slot.map(slotObj => {
      const key = Object.keys(slotObj)[0];
      const timeStr = slotObj[key];
      
      let parsed;
      try {
        parsed = parse(timeStr, "hh:mm a", new Date());
        if (isNaN(parsed.getTime())) {
          parsed = parse(timeStr, "HH:mm", new Date());
        }
      } catch {
        parsed = parse(timeStr, "HH:mm", new Date());
      }
      
      const hours = parsed.getHours();
      const minutes = parsed.getMinutes();
      
      return {
        id: key,
        label: timeStr,
        startHour: hours,
        startMinute: minutes,
        startOffsetMs: (hours * 60 + minutes) * 60 * 1000,
      };
    });
    
    shifts.sort((a, b) => a.startOffsetMs - b.startOffsetMs);
    
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    return shifts.map((shift, idx) => {
      const nextShift = shifts[(idx + 1) % shifts.length];
      let durationMs;
      
      if (idx === shifts.length - 1) {
        durationMs = oneDayMs - shift.startOffsetMs + nextShift.startOffsetMs;
      } else {
        durationMs = nextShift.startOffsetMs - shift.startOffsetMs;
      }
      
      return {
        ...shift,
        durationMs,
        durationHours: durationMs / (60 * 60 * 1000),
      };
    });
  }, [Slot, zoom]);

  const shiftsPerDay = useMemo(() => {
    if (zoom === "week") return 7;
    if (shiftConfig) return shiftConfig.length;
    return 3;
  }, [zoom, shiftConfig]);

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

  const formatTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

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
      
      if (shiftConfig) {
        return days.map((day) => ({
          label: format(day, "EEEE, d MMMM yyyy"),
          subHeaders: shiftConfig.map(shift => `Shift ${shift.id} *Starts at ${formatTo12Hour(shift.label.split(' ')[0])}`),
          date: day,
        }));
      } else {
        return days.map((day) => ({
          label: format(day, "EEEE, d MMMM yyyy"),
          subHeaders: ["Shift 1", "Shift 2", "Shift 3"],
          date: day,
        }));
      }
    }
  };

  const calendarHeaders = useMemo(
    () => getCalendarHeaderDateObject(),
    [zoom, startDate, endDate, shiftConfig]
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
    }, 16);
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

  const tasksByRow = useMemo(() => {
    const map = new Map<any, any[]>();
    const slotDuration = zoom === "week" 
      ? 24 * 60 * 60 * 1000 
      : (24 * 60 * 60 * 1000) / shiftsPerDay;
    
    TaskData.forEach(task => {
      const key = task[primary_key];
      if (!map.has(key)) {
        map.set(key, []);
      }
      
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
    
    map.forEach((tasks) => {
      tasks.sort((a, b) => a._startSlot - b._startSlot);
    });
    
    return map;
  }, [TaskData, primary_key, zoom, startDate, cellWidth, shiftsPerDay]);

  const visibleRows = useMemo(() => {
    return RowData.slice(visibleRowRange.start, visibleRowRange.end);
  }, [RowData, visibleRowRange]);

  // Generate visible column indices for virtualization
  const visibleColumnIndices = useMemo(() => {
    const indices = [];
    for (let i = visibleColRange.start; i < visibleColRange.end; i++) {
      indices.push(i);
    }
    return indices;
  }, [visibleColRange]);

  // Calculate padding for virtualized columns
  const leftPadding = visibleColRange.start * cellWidth;
  const rightPadding = (totalSubHeaders - visibleColRange.end) * cellWidth;

  // Flatten calendar headers for virtualization
  const flattenedHeaders = useMemo(() => {
    const result: Array<{headerIdx: number, subIdx: number, header: any, sub: any}> = [];
    calendarHeaders.forEach((header, headerIdx) => {
      header.subHeaders.forEach((sub, subIdx) => {
        result.push({ headerIdx, subIdx, header, sub });
      });
    });
    return result;
  }, [calendarHeaders]);

  // Get visible headers for top row
  const visibleTopHeaders = useMemo(() => {
    const result: Array<{header: any, startIdx: number, span: number}> = [];
    let currentIdx = 0;
    
    calendarHeaders.forEach((header) => {
      const headerStart = currentIdx;
      const headerEnd = currentIdx + header.subHeaders.length;
      
      // Check if header intersects with visible range
      if (headerEnd > visibleColRange.start && headerStart < visibleColRange.end) {
        const visibleStart = Math.max(headerStart, visibleColRange.start);
        const visibleEnd = Math.min(headerEnd, visibleColRange.end);
        const span = visibleEnd - visibleStart;
        
        result.push({ header, startIdx: visibleStart, span });
      }
      
      currentIdx = headerEnd;
    });
    
    return result;
  }, [calendarHeaders, visibleColRange]);

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
        {
          task.jobId && Attributes && Attributes[task.jobId] &&
          Object.keys(Attributes[task.jobId]).map((attrKey, idx)=>(
            <TooltipRow key={idx}>
               <div style={{ color: "#cecece" }}>
                {attrKey}:
              </div>
              <div style={{ color: "#cecece" }}>
              {Attributes[task.jobId][attrKey]}
              </div>
            </TooltipRow>
          ))
        }
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
  }, [primary_key, startDate, Attributes]);

  const totalHeight = RowData.length * rowHeight;
  const offsetTop = visibleRowRange.start * rowHeight;

  return (
    <SectionWrapper>
      <ChartWrapper height={chartHeight}>
        <ColumnSection>
          <ColumnHeaderWrapper>
            <ColumnTable>
              <thead>
                <ColumnHeaderRow style={{height: '50px'}}>
                  {ColDef.map((col, index) => (
                    <HeaderCell style={{borderBottom: '1px solid #cecece', height: '50px'}} key={index} width={colWidths[index]}>
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
            {/* Top header row with day/week labels */}
            <div style={{ 
              position: 'relative', 
              width: `${totalSubHeaders * cellWidth + (zoom === 'day' && shiftFactor > 0 ? shiftFactor : 0)}px`,
              height: '50px',
              background: 'black'
            }}>
              {/* Shift factor padding */}
              {shiftFactor > 0 && zoom === 'day' && (
                <CalendarCellTop style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  minWidth: `${shiftFactor}px`,
                  width: `${shiftFactor}px`,
                  height: '25px'
                }} />
              )}
              
              {/* Visible top headers */}
              {visibleTopHeaders.map((item, idx) => {
                const leftPos = (zoom === 'day' && shiftFactor > 0 ? shiftFactor : 0) + 
                               (item.startIdx * cellWidth);
                const width = item.span * cellWidth;
                
                return (
                  <CalendarCellTop 
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${leftPos}px`,
                      top: 0,
                      minWidth: `${width}px`,
                      width: `${width}px`,
                      height: '25px'
                    }}
                  >
                    {item.header.label}
                  </CalendarCellTop>
                );
              })}
              
              {/* Sub-header row */}
              <div style={{ position: 'absolute', top: '25px', left: 0, width: '100%', height: '25px' }}>
                {shiftFactor > 0 && zoom === 'day' && (
                  <CalendarCell style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    minWidth: `${shiftFactor}px`,
                    width: `${shiftFactor}px`,
                    height: '25px'
                  }} />
                )}
                
                {visibleColumnIndices.map((colIdx) => {
                  const item = flattenedHeaders[colIdx];
                  if (!item) return null;
                  
                  const leftPos = (zoom === 'day' && shiftFactor > 0 ? shiftFactor : 0) + 
                                 (colIdx * cellWidth);
                  
                  return (
                    <CalendarCell 
                      key={colIdx}
                      style={{
                        position: 'absolute',
                        left: `${leftPos}px`,
                        top: 0,
                        minWidth: `${cellWidth}px`,
                        width: `${cellWidth}px`,
                        height: '25px'
                      }}
                    >
                      {zoom === "day" ? (
                        <Tooltip
                          content={
                            <div style={{
                              padding: '8px',
                              color: '#cecece',
                              fontSize: '0.9rem',
                              border: '0.5px solid #cecece',
                              borderRadius: '4px'
                            }}>
                              {item.sub.split('*')[1]}
                            </div>
                          }
                        >
                          {item.sub.split('*')[0]}
                        </Tooltip>
                      ) : (
                        item.sub
                      )}
                    </CalendarCell>
                  );
                })}
              </div>
            </div>
          </CalendarHeaderWrapper>
          
          <CalendarBodyWrapper ref={rightBodyRef}>
            <CalendarTable style={{ 
              width: `${totalSubHeaders * cellWidth + (zoom === 'day' && shiftFactor > 0 ? shiftFactor : 0)}px` 
            }}>
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
                      visibleColumnIndices={visibleColumnIndices}
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
                      shiftsPerDay={shiftsPerDay}
                      shiftFactor={shiftFactor}
                      Attributes={Attributes}
                      leftPadding={leftPadding}
                      rightPadding={rightPadding}
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