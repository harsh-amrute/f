import React, { useState, useRef, useEffect } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
  accentColorVar,
} from "./style.css";
import {
  textInputWrapper,
  buttonWrapper,
  imageWrapper,
  calendarBase,
  calPrimaryVar,
  calHoverVar,
  calTodayVar,
} from "../../SupplyChainIntelligenceHub/ElephantOrders/styles.css";
import { useUserData } from "../../../../../context";
import moment from "moment";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import { getStartDate, useVFMultiFilter } from "./useVFFilterContent";
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import { useSelector } from "react-redux";
import { RootState } from "./../../../../../redux/store/store";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface FilterSectionProps {
  filters?: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
  initialFromDate?: string;
  initialToDate?: string;
  selectedFilterType?: string;
}

const THEME = {
  REGALBLAZE: {
    accent: "#F7B500",
    calPrimary: "#C7810E",
    calHover: "#fee3b7",
    calToday: "#E1B69F",
    calendarIcon: "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg",
    clearIcon: "/assets/img/Clear_Due_Date_Yellow.svg",
  },
  DEFAULT: {
    accent: "#BC3D80",
    calPrimary: "#82104C",
    calHover: "#82104C",
    calToday: "#e2a9c8",
    calendarIcon: "/assets/img/mto/OrderRescheduling/edit-calendar.svg",
    clearIcon: "/assets/img/Clear_Due_Date.svg",
  },
} as const;

export const HorizonFilter: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
  initialFromDate = "",
  initialToDate = "",
  selectedFilterType = "StartDate",
}) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const tokens = themeUi === "REGALBLAZE" ? THEME.REGALBLAZE : THEME.DEFAULT;

  const { handleSelectChange } = useVFMultiFilter({
    multiFilter,
    onMultiFilterChange,
  });

  const lastRunDate = useSelector((state: RootState) => state.mta.lastRunDate);
  const endDate = lastRunDate.split("T")[0];
  const startDate = getStartDate(endDate);

  const [fromDate, setFromDate] = useState<string>(initialFromDate);
  const [toDate, setToDate] = useState<string>(initialToDate);

  const [showFromCal, setShowFromCal] = useState(false);
  const [showToCal, setShowToCal] = useState(false);
  const [fromCalPos, setFromCalPos] = useState({ top: 0, left: 0, width: 0 });
  const [toCalPos, setToCalPos] = useState({ top: 0, left: 0, width: 0 });

  const fromBoxRef = useRef<HTMLDivElement>(null);
  const toBoxRef = useRef<HTMLDivElement>(null);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromCalRef = useRef<HTMLDivElement>(null);
  const toCalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (multiFilter?.horizonFilter?.filters) {
      const startDateFilter = multiFilter.horizonFilter.filters.find(
        (f: any) => f.attributeName === "startDate"
      );
      const endDateFilter = multiFilter.horizonFilter.filters.find(
        (f: any) => f.attributeName === "endDate"
      );
      setFromDate(startDateFilter?.value ?? "");
      setToDate(endDateFilter?.value ?? "");
    } else {
      setFromDate("");
      setToDate("");
    }
  }, [multiFilter?.horizonFilter?.filters]);
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        fromCalRef.current &&
        !fromCalRef.current.contains(target) &&
        fromBoxRef.current &&
        !fromBoxRef.current.contains(target)
      )
        setShowFromCal(false);

      if (
        toCalRef.current &&
        !toCalRef.current.contains(target) &&
        toBoxRef.current &&
        !toBoxRef.current.contains(target)
      )
        setShowToCal(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleFromCalendar = () => {
    const rect = fromBoxRef.current?.getBoundingClientRect();
    if (rect) {
      setFromCalPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setShowFromCal((prev) => !prev);
  };

  const toggleToCalendar = () => {
    const rect = toBoxRef.current?.getBoundingClientRect();
    if (rect) {
      setToCalPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setShowToCal((prev) => !prev);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const tile = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startOnly = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return tile < startOnly || tile > endOnly;
  };

  const handleFromChange = (date: Date) => {
    const formatted = moment(date).format("YYYY-MM-DD");
    setFromDate(formatted);
    setShowFromCal(false);
    handleSelectChange({
      newValue: [{ label: formatted, value: formatted }],
      header: "Start Date",
      filterId: "HF1",
      parentId: "horizonFilter",
      attributeName: "startDate",
    });
  };

  const handleToChange = (date: Date) => {
    const formatted = moment(date).format("YYYY-MM-DD");
    setToDate(formatted);
    setShowToCal(false);
    handleSelectChange({
      newValue: [{ label: formatted, value: formatted }],
      header: "End Date",
      filterId: "HF2",
      parentId: "horizonFilter",
      attributeName: "endDate",
    });
  };

  const clearFromDate = () => {
    setFromDate("");
    handleSelectChange({
      newValue: [],
      header: "HorizonFilter",
      filterId: "HF1",
      parentId: "horizonFilter",
      attributeName: "startDate",
    });
  };

  const clearToDate = () => {
    setToDate("");
    handleSelectChange({
      newValue: [],
      header: "HorizonFilter",
      filterId: "HF2",
      parentId: "horizonFilter",
      attributeName: "endDate",
    });
  };

  const rootVars = assignInlineVars({ [accentColorVar]: tokens.accent });

  const calVars = assignInlineVars({
    [calPrimaryVar]: tokens.calPrimary,
    [calHoverVar]: tokens.calHover,
    [calTodayVar]: tokens.calToday,
  });

  const dateBoxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    border: `1px solid ${tokens.accent}`,
    padding: "6px 8px",
    backgroundColor: "#fff",
    gap: "6px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const calPopoverStyle = (pos: {
    top: number;
    left: number;
    width: number;
  }): React.CSSProperties => ({
    position: "absolute",
    top: pos.top,
    left: pos.left,
    width: pos.width,
    zIndex: 9999,
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    borderRadius: "12px",
    overflow: "hidden",
  });

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    cursor: "pointer",
    pointerEvents: "auto",
  };

  const calInnerStyle: React.CSSProperties = {
    width: "100%",
  };

  return (
    <div className={filterGroup} style={rootVars}>
      <div className={filterColumn}>
        <p className={textWrapper}>From Date</p>
        <div className={dropDownWrapper}>
          <div ref={fromBoxRef} style={dateBoxStyle}>
            <input
              className={textInputWrapper}
              ref={fromInputRef}
              value={fromDate}
              readOnly
              placeholder="YYYY-MM-DD"
              onClick={toggleFromCalendar}
              style={inputStyle}
            />
            <button
              className={buttonWrapper}
              type="button"
              onClick={toggleFromCalendar}
            >
              <img
                className={imageWrapper}
                src={tokens.calendarIcon}
                alt="calendar"
              />
            </button>
            <button
              className={buttonWrapper}
              type="button"
              onClick={clearFromDate}
            >
              <img
                className={imageWrapper}
                src={tokens.clearIcon}
                alt="clear"
              />
            </button>
          </div>

          {showFromCal &&
            ReactDOM.createPortal(
              <div
                ref={fromCalRef}
                style={{ ...calPopoverStyle(fromCalPos), ...calVars }}
              >
                <div style={calInnerStyle}>
                  <Calendar
                    className={calendarBase}
                    onChange={(val) =>
                      val instanceof Date && handleFromChange(val)
                    }
                    value={fromDate ? new Date(fromDate) : new Date()}
                    tileDisabled={tileDisabled}
                  />
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
      <div className={filterColumn}>
        <p className={textWrapper}>To Date</p>
        <div className={dropDownWrapper}>
          <div ref={toBoxRef} style={dateBoxStyle}>
            <input
              className={textInputWrapper}
              ref={toInputRef}
              value={toDate}
              readOnly
              placeholder="YYYY-MM-DD"
              onClick={toggleToCalendar}
              style={inputStyle}
            />
            <button
              className={buttonWrapper}
              type="button"
              onClick={toggleToCalendar}
            >
              <img
                className={imageWrapper}
                src={tokens.calendarIcon}
                alt="calendar"
              />
            </button>
            <button
              className={buttonWrapper}
              type="button"
              onClick={clearToDate}
            >
              <img
                className={imageWrapper}
                src={tokens.clearIcon}
                alt="clear"
              />
            </button>
          </div>

          {showToCal &&
            ReactDOM.createPortal(
              <div
                ref={toCalRef}
                style={{ ...calPopoverStyle(toCalPos), ...calVars }}
              >
                <div style={calInnerStyle}>
                  <Calendar
                    className={calendarBase}
                    onChange={(val) =>
                      val instanceof Date && handleToChange(val)
                    }
                    value={toDate ? new Date(toDate) : new Date()}
                    minDate={fromDate ? new Date(fromDate) : undefined}
                    tileDisabled={tileDisabled}
                  />
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
};
