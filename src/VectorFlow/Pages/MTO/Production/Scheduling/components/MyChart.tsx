import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
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
  chartWrapper,
  chartHeightVar,
  headerCell,
  contentCell,
  cellWidthVar,
  taskBar,
  taskBarLeftVar,
  taskBarWidthVar,
  taskBarBgVar,
  zoomButton,
  zoomBtnBgVar,
  zoomBtnColorVar,
  zoomBtnBorderVar,
  zoomBtnHoverBgVar,
  zoomBtnHoverColorVar,
  colorPaletteBgVar,
  contentRow,
  taskContainer,
  tooltipWrapper,
  tooltipRow,
  sectionWrapper,
  columnSection,
  columnHeaderWrapper,
  columnTable,
  columnHeaderRow,
  resizeHandle,
  zoomSection,
  zoomButtonWrapper,
  colorPalette,
  label,
  columnBodyWrapper,
  calendarSection,
  calendarHeaderWrapper,
  calendarHeaderRowTop,
  calendarCell,
  calendarHeaderRow,
  calendarBodyWrapper,
  calendarTable,
  legendWrapper,
} from "./MyChartStyles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface SlotConfig {
  [key: string]: string; // e.g., "1": "07:00 AM"
}

interface MyChartProps {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  Slot?: SlotConfig[]; // Dynamic shift configuration
  CustomTaskBar?: ({ props }: any) => React.ReactNode;
  CustomTooltip?: any;
  height?: number;
  rowHeight?: number;
  overscanCount?: number;
  Attributes?: { [key: string]: any };
}

// Memoized TaskBar component
const MemoizedTaskBar = React.memo(
  ({ left, width, backgroundColor, children, onClick }: any) => (
    <div
      className={taskBar}
      style={assignInlineVars({
        [taskBarLeftVar]: `${left}px`,
        [taskBarWidthVar]: `${width}px`,
        [taskBarBgVar]: backgroundColor,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
);

// Memoized Row component
const VirtualRow = React.memo(
  ({
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
    shiftsPerDay,
    shiftFactor,
    Attributes,
  }: any) => {
    const slotDuration =
      zoom === "week"
        ? 24 * 60 * 60 * 1000
        : (24 * 60 * 60 * 1000) / shiftsPerDay;
    const chartStart = useMemo(() => {
      const date = new Date(startDate);
      date.setHours(0, 0, 0, 0);
      return date;
    }, [startDate]);

    return (
      <tr className={contentRow} style={{ height: `${rowHeight}px` }}>
        {calendarHeaders.flatMap((header: any, headerIdx: number) =>
          header.subHeaders.map((sub: any, subIdx: any) => (
            <td
              className={taskContainer}
              key={`${rowIndex}-${headerIdx}-${subIdx}`}
            />
          ))
        )}

        <td
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: `${rowHeight}px`,
            padding: 0,
            border: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: totalSubHeaders * cellWidth + "px",
              height: `${rowHeight}px`,
            }}
          >
            {tasks.map((task: any, taskIdx: number) => {
              const taskStart = new Date(task.start * 1000);
              taskStart.setSeconds(0, 0);
              const taskEnd = new Date(task.end * 1000);
              taskEnd.setSeconds(0, 0);

              const taskStartOffset =
                taskStart.getTime() - chartStart.getTime();
              const taskEndOffset = taskEnd.getTime() - chartStart.getTime();
              const taskDuration = taskEndOffset - taskStartOffset;

              const startSlots = taskStartOffset / slotDuration;
              const durationSlots = taskDuration / slotDuration;

              const left =
                zoom === "day" && shiftFactor > 0
                  ? startSlots * cellWidth + shiftFactor
                  : startSlots * cellWidth;
              const width = durationSlots * cellWidth;

              // Culling: Skip tasks outside visible area
              const taskEndPos = left + width;
              const viewportStart = visibleColRange.start * cellWidth;
              const viewportEnd = visibleColRange.end * cellWidth;

              if (
                taskEndPos < viewportStart - 100 ||
                left > viewportEnd + 100
              ) {
                return null;
              }

              // Skip very small tasks (< 2px)
              if (width < 2) {
                return null;
              }

              return (
                <Tooltip
                  content={
                    CustomTooltip
                      ? CustomTooltip(
                          task,
                          taskStartOffset,
                          taskEndOffset,
                          startDate,
                          Attributes
                        )
                      : ToolTipContent(task, taskStartOffset, taskEndOffset)
                  }
                  key={`${row[primary_key]}-${taskIdx}`}
                >
                  {CustomTaskBar ? (
                    CustomTaskBar({ taskIdx, left, width, task })
                  ) : (
                    <MemoizedTaskBar
                      left={left}
                      width={width}
                      backgroundColor={colors?.[task.task_type] ?? "#cecece"}
                    >
                      {task.jobId ? task.jobId : task.task_type}
                    </MemoizedTaskBar>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.rowIndex === nextProps.rowIndex &&
      prevProps.row === nextProps.row &&
      prevProps.tasks === nextProps.tasks &&
      prevProps.visibleColRange.start === nextProps.visibleColRange.start &&
      prevProps.visibleColRange.end === nextProps.visibleColRange.end &&
      prevProps.zoom === nextProps.zoom
    );
  }
);

const MyChart: React.FC<MyChartProps> = ({
  RowData,
  ColDef,
  TaskData,
  colors,
  primary_key,
  Slot, // Dynamic shift configuration
  CustomTaskBar,
  CustomTooltip,
  height = 380,
  rowHeight = 30,
  overscanCount = 5,
  Attributes,
}) => {
  const initialColWidths: any = ColDef.map((ele: any) => ele.width);
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
    const actualShift =
      Math.abs((numberOfSlots - 1) * 100 - shiftInPixels) +
      (numberOfSlots - 1) * 100;
    return actualShift;
  };

  const shiftFactor = Slot
    ? Slot[0]["1"] !== "00:00 AM"
      ? calculateShiftInPixels(Slot[0]["1"].split(" ")[0], Slot.length)
      : 0
    : 0;

  console.log("Shift Factor:", shiftFactor);

  // Parse and validate shift configuration
  const shiftConfig = useMemo(() => {
    if (!Slot || zoom !== "day") return null;

    const shifts = Slot.map((slotObj) => {
      const key = Object.keys(slotObj)[0];
      const timeStr = slotObj[key];

      // Parse time string (e.g., "07:00 AM" or "15:00")
      let parsed;
      try {
        // Try parsing with AM/PM first
        parsed = parse(timeStr, "hh:mm a", new Date());
        if (isNaN(parsed.getTime())) {
          // Try 24-hour format
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
        startOffsetMs: (hours * 60 + minutes) * 60 * 1000, // milliseconds from 00:00
      };
    });

    // Sort shifts by start time
    shifts.sort((a, b) => a.startOffsetMs - b.startOffsetMs);

    // Calculate duration for each shift
    // Total duration = 24 hours, distributed across all shifts
    const oneDayMs = 24 * 60 * 60 * 1000;

    return shifts.map((shift, idx) => {
      const nextShift = shifts[(idx + 1) % shifts.length];
      let durationMs;

      if (idx === shifts.length - 1) {
        // Last shift: wraps to first shift of next day
        durationMs = oneDayMs - shift.startOffsetMs + nextShift.startOffsetMs;
      } else {
        // Duration until next shift
        durationMs = nextShift.startOffsetMs - shift.startOffsetMs;
      }

      return {
        ...shift,
        durationMs,
        durationHours: durationMs / (60 * 60 * 1000),
      };
    });
  }, [Slot, zoom]);

  // Number of shifts per day (dynamic based on Slot prop)
  const shiftsPerDay = useMemo(() => {
    if (zoom === "week") return 7; // 7 days in week view
    if (shiftConfig) return shiftConfig.length;
    return 3; // Default 3 shifts if no Slot prop
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
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Generate calendar headers with dynamic shifts
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
      // Day view with dynamic shifts
      const days = eachDayOfInterval({ start: startDate, end: endDate });

      if (shiftConfig) {
        // Use dynamic shift configuration
        return days.map((day) => ({
          label: format(day, "EEEE, d MMMM yyyy"),
          subHeaders: shiftConfig.map(
            (shift) =>
              `Shift ${shift.id} *Starts at ${formatTo12Hour(
                shift.label.split(" ")[0]
              )}`
          ),
          date: day,
        }));
      } else {
        // Default: 3 shifts
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

  const totalSubHeaders = useMemo(
    () =>
      calendarHeaders.reduce(
        (sum: number, header: any) => sum + header.subHeaders.length,
        0
      ),
    [calendarHeaders]
  );

  const cellWidth = 100;
  const controlsHeight = 65;
  const chartHeight = height - controlsHeight;

  const calculateVisibleRows = useCallback(
    (scrollTop: number) => {
      const start = Math.floor(scrollTop / rowHeight);
      const visibleCount = Math.ceil(chartHeight / rowHeight);
      const end = start + visibleCount;

      return {
        start: Math.max(0, start - overscanCount),
        end: Math.min(RowData.length, end + overscanCount),
      };
    },
    [rowHeight, chartHeight, RowData.length, overscanCount]
  );

  const calculateVisibleColumns = useCallback(
    (scrollLeft: number) => {
      const start = Math.floor(scrollLeft / cellWidth);
      const visibleCount = Math.ceil(
        (rightBodyRef.current?.clientWidth || 800) / cellWidth
      );
      const end = start + visibleCount;

      return {
        start: Math.max(0, start - overscanCount),
        end: Math.min(totalSubHeaders, end + overscanCount),
      };
    },
    [cellWidth, totalSubHeaders, overscanCount]
  );

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

        setVisibleRowRange((prev) => {
          if (
            prev.start !== newRowRange.start ||
            prev.end !== newRowRange.end
          ) {
            return newRowRange;
          }
          return prev;
        });

        setVisibleColRange((prev) => {
          if (
            prev.start !== newColRange.start ||
            prev.end !== newColRange.end
          ) {
            return newColRange;
          }
          return prev;
        });
      }
    }, 16);
  }, [calculateVisibleRows, calculateVisibleColumns]);

  useEffect(() => {
    const handleLeftScroll = () => {
      if (
        !isScrollingSyncRef.current &&
        leftBodyRef.current &&
        rightBodyRef.current
      ) {
        isScrollingSyncRef.current = true;
        rightBodyRef.current.scrollTop = leftBodyRef.current.scrollTop;
        handleVirtualScroll();
        setTimeout(() => {
          isScrollingSyncRef.current = false;
        }, 10);
      }
    };

    const handleRightScroll = () => {
      if (
        !isScrollingSyncRef.current &&
        rightBodyRef.current &&
        leftBodyRef.current
      ) {
        isScrollingSyncRef.current = true;
        leftBodyRef.current.scrollTop = rightBodyRef.current.scrollTop;
        setTimeout(() => {
          isScrollingSyncRef.current = false;
        }, 10);
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
      leftBody.addEventListener("scroll", handleLeftScroll, { passive: true });
    }
    if (rightBody) {
      rightBody.addEventListener("scroll", handleRightScroll, {
        passive: true,
      });
      rightBody.addEventListener("scroll", handleRightBodyHorizontalScroll, {
        passive: true,
      });
    }
    if (rightBodyHeader) {
      rightBodyHeader.addEventListener(
        "scroll",
        handleRightBodyHorizontalScrollHeader,
        { passive: true }
      );
    }

    handleVirtualScroll();

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (leftBody) {
        leftBody.removeEventListener("scroll", handleLeftScroll);
      }
      if (rightBody) {
        rightBody.removeEventListener("scroll", handleRightScroll);
        rightBody.removeEventListener(
          "scroll",
          handleRightBodyHorizontalScroll
        );
      }
      if (rightBodyHeader) {
        rightBodyHeader.removeEventListener(
          "scroll",
          handleRightBodyHorizontalScrollHeader
        );
      }
    };
  }, [handleVirtualScroll]);

  // Optimized task indexing with dynamic slot duration
  const tasksByRow = useMemo(() => {
    const map = new Map<any, any[]>();
    // Slot duration is now 24 hours divided by number of shifts
    const slotDuration =
      zoom === "week"
        ? 24 * 60 * 60 * 1000
        : (24 * 60 * 60 * 1000) / shiftsPerDay;

    TaskData.forEach((task) => {
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

  const ToolTipContent = useCallback(
    (task: any, taskStartOffset: any, taskEndOffset: any) => {
      return (
        <div className={tooltipWrapper}>
          <div className={tooltipRow}>
            <div>
              <strong>{task[primary_key]}</strong>
            </div>
            <div style={{ color: "#cecece" }}>
              {task.jobId ? task.jobId : task.task_type}
            </div>
          </div>
          {task.jobId &&
            Attributes &&
            Attributes[task.jobId] &&
            Object.keys(Attributes[task.jobId]).map((attrKey, idx) => (
              <div className={tooltipRow} key={idx}>
                <div style={{ color: "#cecece" }}>{attrKey}:</div>
                <div style={{ color: "#cecece" }}>
                  {Attributes[task.jobId][attrKey]}
                </div>
              </div>
            ))}
          <div style={{ width: "100%", borderTop: "1px dashed #666666" }}></div>
          <div className={tooltipRow}>
            <div>
              <strong>Start:</strong>
            </div>
            <div>
              {format(new Date(startDate.getTime() + taskStartOffset), "PPpp")}
            </div>
          </div>
          <div className={tooltipRow}>
            <div>
              <strong>End:</strong>
            </div>
            <div>
              {format(new Date(startDate.getTime() + taskEndOffset), "PPpp")}
            </div>
          </div>
        </div>
      );
    },
    [primary_key, startDate]
  );

  const totalHeight = RowData.length * rowHeight;
  const offsetTop = visibleRowRange.start * rowHeight;

  console.log(ColDef,"ColDef");
  return (
    <div className={sectionWrapper}>
      <div
        className={chartWrapper}
        style={assignInlineVars({
          [chartHeightVar]: `${chartHeight}px`,
        })}
      >
        <div className={columnSection}>
          <div className={columnHeaderWrapper}>
            <table className={columnTable}>
              <thead>
                <tr className={columnHeaderRow} style={{ height: "54px" }}>
                  {ColDef.map((col, index) => (
                    <th
                      className={headerCell}
                      style={{
                        borderBottom: "1px solid #cecece",
                        height: "57px",
                        ...assignInlineVars({
                          [cellWidthVar]: `${colWidths[index]}px`,
                        }),
                      }}
                      key={index}
                    >
                      {col.title}
                      <div
                        className={resizeHandle}
                        onMouseDown={(e) => handleResize(index, e)}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div
            className={columnBodyWrapper}
            ref={leftBodyRef}
            style={{ marginBottom: "15px" }}
          >
            <table className={columnTable}>
              <tbody>
                <tr style={{ height: `${offsetTop}px` }}></tr>

                {visibleRows.map((row, index) => {
                  const actualRowIndex = visibleRowRange.start + index;
                  return (
                    <tr
                      className={contentRow}
                      key={actualRowIndex}
                      style={{ width: "fit-content", height: `${rowHeight}px` }}
                    >
                      {ColDef.map((col, colIndex) => (
                        <td
                          className={contentCell}
                          key={colIndex}
                          width={colWidths[colIndex]}
                        >
                          {row[col.key as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  );
                })}

                <tr
                  style={{
                    height: `${
                      totalHeight - visibleRowRange.end * rowHeight
                    }px`,
                  }}
                ></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={calendarSection}>
          <div className={calendarHeaderWrapper} ref={rightHeaderRef}>
            <tr className={calendarHeaderRowTop}>
              {shiftFactor > 0 && zoom === "day" && (
                <th
                  className={calendarCell}
                  style={{
                    minWidth: shiftFactor + "px",
                    width: shiftFactor + "px",
                  }}
                ></th>
              )}
              {calendarHeaders.map((header: any, idx: any) => {
                if (zoom === "day") {
                  return (
                    <th
                      className={calendarCell}
                      style={{
                        minWidth: Slot ? 100 * Slot.length + "px" : 300 + "px",
                        width: Slot ? 100 * Slot.length + "px" : 300 + "px",
                      }}
                      key={idx}
                    >
                      {header.label}
                    </th>
                  );
                } else {
                  return (
                    <th
                      className={calendarCell}
                      style={{ minWidth: "700px", width: "700px" }}
                      key={idx}
                    >
                      {header.label}
                    </th>
                  );
                }
              })}
            </tr>
            <table className={calendarTable}>
              <thead>
                <tr className={calendarHeaderRow}>
                  {calendarHeaders.flatMap((header: any, idx: any) =>
                    header.subHeaders.map((sub: any, subIdx: any) => (
                      <th className={calendarCell} key={`${idx}-${subIdx}`}>
                        {zoom === "day" ? (
                          <Tooltip
                            content={
                              <div
                                style={{
                                  padding: "8px",
                                  color: "#cecece",
                                  fontSize: "0.9rem",
                                  border: "0.5px solid #cecece",
                                  borderRadius: "4px",
                                }}
                              >
                                {sub.split("*")[1]}
                              </div>
                            }
                            key={`${idx}-${subIdx}`}
                          >
                            {sub.split("*")[0]}
                          </Tooltip>
                        ) : (
                          sub
                        )}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
            </table>
          </div>

          <div className={calendarBodyWrapper} ref={rightBodyRef}>
            <table className={calendarTable}>
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
                      shiftsPerDay={shiftsPerDay}
                      shiftFactor={shiftFactor}
                      Attributes={Attributes}
                    />
                  );
                })}

                <tr
                  style={{
                    height: `${
                      totalHeight - visibleRowRange.end * rowHeight
                    }px`,
                  }}
                ></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={zoomSection}>
        <div className={zoomButtonWrapper}>
          <button
            className={zoomButton}
            disabled={zoom === "week"}
            style={assignInlineVars({
              [zoomBtnBgVar]: zoom === "week" ? "#cecece" : "white",
              [zoomBtnBorderVar]: zoom === "week" ? "none" : "1px solid #333",
              [zoomBtnColorVar]: "#333",
              [zoomBtnHoverBgVar]: zoom === "week" ? "#cecece" : "#555",
              [zoomBtnHoverColorVar]: zoom === "week" ? "#8A8686" : "white",
            })}
            onClick={() => setZoom("week")}
          >
            Week
          </button>
          <button
            className={zoomButton}
            disabled={zoom === "day"}
            style={assignInlineVars({
              [zoomBtnBgVar]: zoom === "day" ? "#cecece" : "white",
              [zoomBtnBorderVar]: zoom === "day" ? "none" : "1px solid #333",
              [zoomBtnColorVar]: "#333",
              [zoomBtnHoverBgVar]: zoom === "day" ? "#cecece" : "#555",
              [zoomBtnHoverColorVar]: zoom === "day" ? "#8A8686" : "white",
            })}
            onClick={() => setZoom("day")}
          >
            Day
          </button>
        </div>
      </div>

      <div className={legendWrapper}>
        {colors &&
          Object.keys(colors).map((key, index) => (
            <React.Fragment key={index}>
              <div
                className={colorPalette}
                style={assignInlineVars({ [colorPaletteBgVar]: colors[key] })}
              />
              <span className={label}>{key}</span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default MyChart;
