import React, { useMemo, useState, useRef, useEffect } from "react";
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
  calendarBodyWrapper,
  calendarCell,
  calendarCellTop,
  calendarHeaderRow,
  calendarHeaderRowTop,
  calendarHeaderWrapper,
  calendarSection,
  calendarTable,
  cellWidthVar,
  chartHeightVar,
  chartWrapper,
  colorPalette,
  colorPaletteBgVar,
  columnBodyWrapper,
  columnHeaderRow,
  columnHeaderWrapper,
  columnSection,
  columnTable,
  contentCell,
  contentRow,
  headerCell,
  label,
  legendWrapper,
  resizeHandle,
  sectionWrapper,
  taskBar,
  taskBarBgVar,
  taskBarLeftVar,
  taskBarWidthVar,
  taskContainer,
  tooltipRow,
  tooltipWrapper,
  zoomBtnBgVar,
  zoomBtnBorderVar,
  zoomBtnColorVar,
  zoomBtnHoverBgVar,
  zoomBtnHoverColorVar,
  zoomButton,
  zoomButtonWrapper,
  zoomSection,
} from "./MyChartStyles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface MyChartProps {
  RowData: any[];
  ColDef: any[];
  TaskData: any[];
  colors: { [key: string]: string };
  primary_key: string;
  CustomTaskBar?: ({ props }: any) => React.ReactNode;
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
  const initialColWidths: any = ColDef.map((ele: any) => ele.width);
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
      if (
        !isScrollingSyncRef.current &&
        leftBodyRef.current &&
        rightBodyRef.current
      ) {
        isScrollingSyncRef.current = true;
        rightBodyRef.current.scrollTop = leftBodyRef.current.scrollTop;
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
      leftBody.addEventListener("scroll", handleLeftScroll);
    }
    if (rightBody) {
      rightBody.addEventListener("scroll", handleRightScroll);
      rightBody.addEventListener("scroll", handleRightBodyHorizontalScroll);
    }
    if (rightBodyHeader) {
      rightBodyHeader.addEventListener(
        "scroll",
        handleRightBodyHorizontalScrollHeader
      );
    }

    return () => {
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
      <div className={tooltipWrapper}>
        <div className={tooltipRow}>
          <div>
            <strong>{task[primary_key]}</strong>
          </div>
          <div style={{ color: "#cecece" }}>
            {task.jobId ? task.jobId : task.task_type}
          </div>
        </div>
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
  };

  const totalSubHeaders = calendarHeaders.reduce(
    (sum: number, header: any) => sum + header.subHeaders.length,
    0
  );

  const cellWidth = 100;

  // Calculate heights considering the controls
  const controlsHeight = 65; // Zoom section + Legend
  const chartHeight = height - controlsHeight;

  const shiftFactor = 212;
  return (
    <div className={sectionWrapper}>
      <div
        className={chartWrapper}
        style={assignInlineVars({
          [chartHeightVar]: `${chartHeight}px`,
        })}
      >
        {/* Left Column Section */}
        <div className={columnSection}>
          <div className={columnHeaderWrapper}>
            <table className={columnTable}>
              <thead>
                <tr className={columnHeaderRow}>
                  {ColDef.map((col, index) => (
                    <th
                      className={headerCell}
                      key={index}
                      style={assignInlineVars({
                        [cellWidthVar]: colWidths[index],
                      })}
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
                {RowData.map((row, rowIndex) => (
                  <tr
                    className={contentRow}
                    key={rowIndex}
                    style={{ width: "fit-content" }}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Calendar Section */}
        <div className={calendarSection}>
          <div className={calendarHeaderWrapper} ref={rightHeaderRef}>
            <table className={calendarTable}>
              <thead>
                <tr className={calendarHeaderRow}>
                  <th
                    className={calendarCellTop}
                    style={{
                      width: shiftFactor + "px",
                      minWidth: shiftFactor + "px",
                    }}
                    key={"my"}
                  >
                    &nbsp;
                  </th>
                  {calendarHeaders.map((header: any, idx: any) => (
                    <th
                      className={calendarCellTop}
                      style={{ width: "300px", minWidth: "300px" }}
                      key={idx}
                      colSpan={header.subHeaders.length}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Main Header Row */}
              {/* Sub Header Row */}
            </table>
            <tr className={calendarHeaderRowTop}>
              <th
                className={calendarCellTop}
                style={{
                  width: shiftFactor + "px",
                  minWidth: shiftFactor + "px",
                }}
                key={"my"}
              >
                &nbsp;
              </th>
              {calendarHeaders.flatMap((header: any, idx: any) =>
                header.subHeaders.map((sub: any, subIdx: any) => (
                  <th className={calendarCell} key={`${idx}-${subIdx}`}>
                    {sub}
                  </th>
                ))
              )}
            </tr>
          </div>

          <div className={calendarBodyWrapper} ref={rightBodyRef}>
            <table className={calendarTable}>
              <tbody>
                {RowData.map((row, rowIndex) => (
                  <tr className={contentRow} key={rowIndex}>
                    {/* Render background cells first */}
                    {calendarHeaders.flatMap((header: any, headerIdx: number) =>
                      header.subHeaders.map((sub: any, subIdx: any) => (
                        <td
                          className={taskContainer}
                          key={`${rowIndex}-${headerIdx}-${subIdx}`}
                        />
                      ))
                    )}
                    {/* Then render tasks on top */}
                    <td
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "30px",
                        padding: 0,
                        border: 0,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: totalSubHeaders * cellWidth + "px",
                          height: "30px",
                        }}
                      >
                        {TaskData.filter(
                          (task) => task[primary_key] === row[primary_key]
                        ).map((task, taskIdx) => {
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

                          const taskStartOffset =
                            taskStart.getTime() - chartStart.getTime();
                          const taskEndOffset =
                            taskEnd.getTime() - chartStart.getTime();
                          const taskDuration = taskEndOffset - taskStartOffset;

                          const startSlots = taskStartOffset / slotDuration;
                          const durationSlots = taskDuration / slotDuration;

                          const left = startSlots * cellWidth + shiftFactor;
                          const width = durationSlots * cellWidth;

                          return (
                            <Tooltip
                              content={
                                CustomTooltip
                                  ? CustomTooltip(
                                      task,
                                      taskStartOffset,
                                      taskEndOffset,
                                      startDate
                                    )
                                  : ToolTipContent(
                                      task,
                                      taskStartOffset,
                                      taskEndOffset
                                    )
                              }
                              key={`${row[primary_key]}-${taskIdx}`}
                            >
                              {CustomTaskBar ? (
                                CustomTaskBar({ taskIdx, left, width, task })
                              ) : (
                                <div
                                  className={taskBar}
                                  style={assignInlineVars({
                                    [taskBarLeftVar]: `${left}px`,
                                    [taskBarWidthVar]: `${width}px`,
                                    [taskBarBgVar]:
                                      colors?.[task.task_type] ?? "#cecece",
                                  })}
                                >
                                  {task.jobId ? task.jobId : task.task_type}
                                </div>
                              )}
                            </Tooltip>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
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
