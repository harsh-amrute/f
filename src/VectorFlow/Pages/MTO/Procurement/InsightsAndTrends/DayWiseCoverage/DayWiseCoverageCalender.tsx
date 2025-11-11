import _ from "lodash";
import React, { Dispatch, SetStateAction } from "react";
import {
  CalenderContainer,
  CalenderContent,
  CalenderMonth,
  CalenderMonths,
  CalenderTitle,
  Day,
  Month,
  Calender,
  dayBgColorVar,
} from "./style.css";
import { eachMonthOfInterval, format, getDaysInMonth, getYear } from "date-fns";
import Tooltip from "../../../../../../components/VectorFLOW/commons/MTO/Tooltip";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface IDayWiseCoverageCalenderProps {
  start: string;
  end: string;
  getToolTipContent: (id: string) => JSX.Element | null;
  getColor: (id: string) => string;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const DayWiseCoverageCalender = ({
  start,
  end,
  getToolTipContent,
  getColor,
  selectedDate,
  setSelectedDate,
}: IDayWiseCoverageCalenderProps) => {
  const getMonths = (start: string, end: string) => {
    const monthRange = eachMonthOfInterval({
      start: new Date(start),
      end: new Date(end),
    });
    const years = new Set();
    monthRange.forEach((date: any) => {
      years.add(getYear(date));
    });
    return (
      <div className={CalenderContainer}>
        <h1 className={CalenderTitle}>
          Calender {Array.from(years).join("/")}
        </h1>
        <div className={CalenderContent}>
          <div className={CalenderMonths}>
            {monthRange.map((month: any) => {
              return (
                <div className={CalenderMonth}>{format(month, "MMM")}</div>
              );
            })}
          </div>

          <table className={Calender}>
            <tbody>
              {monthRange.map((month: any, mi: number) => (
                <tr key={mi} className={Month}>
                  {_.range(0, getDaysInMonth(month)).map(
                    (dayIdx: number, di: number) => {
                      const formattedDate = format(
                        `${month.getFullYear()}/${month.getMonth() + 1}/${
                          dayIdx + 1
                        }`,
                        "yyyy-MM-dd"
                      );
                      const content = getToolTipContent(formattedDate);
                      const color = getColor(formattedDate);
                      const isSelected =
                        selectedDate === "" || selectedDate === formattedDate;

                      const cell = (
                        <td
                          key={di}
                          className={Day}
                          style={{
                            ...assignInlineVars({ [dayBgColorVar]: color }),
                            opacity: isSelected ? 1 : 0.5,
                            cursor: content ? "pointer" : "not-allowed",
                          }}
                          onClick={() =>
                            selectedDate === formattedDate
                              ? setSelectedDate("")
                              : setSelectedDate(formattedDate)
                          }
                        >
                          {dayIdx + 1}
                        </td>
                      );

                      return content ? (
                        <Tooltip
                          disableStyleInjection={true}
                          key={di}
                          content={content}
                        >
                          {cell}
                        </Tooltip>
                      ) : (
                        cell
                      );
                    }
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return <div>{getMonths(start, end)}</div>;
};

export default DayWiseCoverageCalender;
