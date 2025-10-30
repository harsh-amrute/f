import React, { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  addDays,
} from "date-fns";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  /* classes */
  sectionWrapper,
  chartWrapper,
  columnSection,
  calendarSection,
  columnHeaderRow,
  contentRow,
  headerCell,
  resizeHandle,
  contentCell,
  calendarTable,
  calendarHeaderRow,
  calendarCell,
  taskBar,
  legendWrapper,
  zoomSection,
  zoomButtonWrapper,
  zoomButtonBase,
  zoomButtonActive,
  colorPallete,
  label,
  /* vars */
  headerWidthVar,
  cellWidthVar,
  taskLeftVar,
  taskWidthVar,
  taskBgVar,
  paletteColorVar,
} from "./MyChartStyles.css";
import Tooltip from "../../Common/Tooltip";
import { style } from "@vanilla-extract/css";

export const tooltipWrapper = style({
  padding: "8px",
  background: "rgba(60, 59, 59, 0.88)",
  border: "0.7px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  fontSize: "0.9rem",
  color: "rgba(197, 195, 195, 0.88)",
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const tooltipRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
});

const cx = (...p: Array<string | false | null | undefined>) =>
  p.filter(Boolean).join(" ");

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
    {
      jobId: "J0001",
      workStation: "Cutter 1",
      start: 1735689655233,
      end: 1735862400000,
    }, // Jan 1, 2025 00:00 to Jan 3, 2025 00:00
    {
      jobId: null,
      workStation: "Cutter 1",
      start: 1735862400000,
      end: 1735948800000,
    }, // Jan 3, 2025 00:00 to Jan 4, 2025 00:00
    {
      jobId: "J0002",
      workStation: "Cutter 1",
      start: 1735948800000,
      end: 1736121600000,
    }, // Jan 4, 2025 00:00 to Jan 6, 2025 00:00
    {
      jobId: "J0004",
      workStation: "Cutter 2",
      start: 1735776000000,
      end: 1735804800000,
    }, // Jan 2, 2025 00:00 to Jan 5, 2025 00:00
    {
      jobId: "J0005",
      workStation: "Sewing Machine 1",
      start: 1736035200000,
      end: 1736640000000,
    }, // Jan 4, 2025 00:00 to Jan 10, 2025 00:00
    {
      jobId: "J0006",
      workStation: "Sewing Machine 1",
      start: 1736640000000,
      end: 1737072000000,
    }, // Jan 10, 2025 00:00 to Jan 14, 2025 00:00
    {
      jobId: "J0007",
      workStation: "Sewing Machine 2",
      start: 1736121600000,
      end: 1736736000000,
    }, // Jan 6, 2025 00:00 to Jan 12, 2025 00:00
    {
      jobId: "J0009",
      workStation: "Packing Station 1",
      start: 1736736000000,
      end: 1737168000000,
    }, // Jan 11, 2025 00:00 to Jan 15, 2025 00:00
    {
      jobId: "J0010",
      workStation: "Packing Station 2",
      start: 1737168000000,
      end: 1737686400000,
    }, // Jan 13, 2025 00:00 to Jan 18, 2025 00:00
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

  const ToolTipContent = ({ task }: any) => (
    <div className={tooltipWrapper}>
      <div className={tooltipRow}>
        <div>
          <strong>{task.workStation}</strong>
        </div>
        <div style={{ color: "#cecece" }}>
          {task.jobId ? task.jobId : "N/A"}
        </div>
      </div>
      <div style={{ width: "100%", borderTop: "1px dashed #666666" }}></div>
      <div className={tooltipRow}>
        <div>
          <strong>Start:</strong>
        </div>
        <div>{format(new Date(task.start), "PPpp")}</div>
      </div>
      <div className={tooltipRow}>
        <div>
          <strong>End:</strong>
        </div>
        <div>{format(new Date(task.end), "PPpp")}</div>
      </div>
    </div>
  );

  return (
    <div className={sectionWrapper}>
      <div className={chartWrapper}>
        <table className={columnSection}>
          <thead>
            <tr className={columnHeaderRow}>
              {ColDef.map((col, index) => (
                <th
                  key={index}
                  className={headerCell}
                  style={assignInlineVars({
                    [headerWidthVar]: `${colWidths[index]}px`,
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
          <tbody>
            {RowData.map((row, rowIndex) => (
              <tr key={rowIndex} className={contentRow}>
                {ColDef.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={contentCell}
                    style={assignInlineVars({
                      [cellWidthVar]: `${colWidths[colIndex]}px`,
                    })}
                  >
                    {row[col.key as keyof typeof row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={calendarSection}>
          <table className={calendarTable}>
            <thead>
              {/* Main Header Row */}
              <tr className={calendarHeaderRow}>
                {calendarHeaders.map((header: any, idx: number) => (
                  <th
                    key={idx}
                    className={calendarCell}
                    colSpan={header.subHeaders.length}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>

              {/* Sub Header Row */}
              <tr className={calendarHeaderRow}>
                {calendarHeaders.flatMap((header: any, idx: number) =>
                  header.subHeaders.map((sub: any, subIdx: number) => (
                    <th key={`${idx}-${subIdx}`} className={calendarCell}>
                      {sub}
                    </th>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {RowData.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className={contentRow}>
                  {/* task bars (absolute-positioned within the row) */}
                  {TaskData.map((task: any, taskIdx: number) => {
                    if (task.workStation !== row.workStation) return null;

                    // positioning math (same as your original)
                    const totalDays =
                      (endDate.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24) +
                      1;
                    const dayWidth =
                      (calendarHeaders.length *
                        (zoom === "day" ? 3 : 7) *
                        100) /
                      totalDays;

                    const taskStartOffset =
                      (task.start - startDate.getTime()) / (1000 * 60 * 60);
                    const taskDuration =
                      (task.end - task.start) / (1000 * 60 * 60);

                    const left = (taskStartOffset / 24) * dayWidth;
                    const width = Math.max((taskDuration / 24) * dayWidth, 4);

                    const bg = task.jobId !== null ? "#BC3D81" : "#cecece";

                    const bar = (
                      <div
                        key={taskIdx}
                        className={taskBar}
                        style={assignInlineVars({
                          [taskLeftVar]: `${left}px`,
                          [taskWidthVar]: `${width}px`,
                          [taskBgVar]: bg,
                        })}
                      >
                        {task.jobId ? task.jobId : ""}
                      </div>
                    );

                    return Tooltip ? (
                      <Tooltip
                        disableStyleInjection={true}
                        key={taskIdx}
                        content={ToolTipContent({ task })}
                      >
                        {bar}
                      </Tooltip>
                    ) : (
                      bar
                    );
                  })}

                  {/* grid cells */}
                  {calendarHeaders.flatMap((header: any) =>
                    header.subHeaders.map((_: any, subIdx: number) => (
                      <td
                        key={`${rowIndex}-${subIdx}`}
                        className={contentCell}
                        style={assignInlineVars({ [cellWidthVar]: `100px` })}
                      />
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Zoom controls */}
      <div className={zoomSection}>
        <div className={zoomButtonWrapper}>
          <button
            className={cx(zoomButtonBase, zoom === "week" && zoomButtonActive)}
            disabled={zoom === "week"}
            onClick={() => setZoom("week")}
          >
            -
          </button>
          <button
            className={cx(zoomButtonBase, zoom === "day" && zoomButtonActive)}
            disabled={zoom === "day"}
            onClick={() => setZoom("day")}
          >
            +
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className={legendWrapper}>
        {colorObj.map((colorItem: any, colorIdx: number) => (
          <React.Fragment key={colorIdx}>
            <div
              className={colorPallete}
              style={assignInlineVars({ [paletteColorVar]: colorItem.color })}
            />
            <span className={label}>{colorItem.label}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MyChart;
