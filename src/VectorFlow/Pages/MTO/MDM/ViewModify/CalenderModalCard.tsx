import React, { useCallback, useEffect, useMemo, useState } from 'react'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard';
import CustomCalenderCaption from "../../../MTA/InsightsAndTrends/ResearchInsights/CustomCalenderCaption";
import moment from 'moment';
import DatePickForm from './DatePickForm';
import { CalenderHeading } from "../../../../../VectorFlow/Pages/MTO/Poogi/InsightAndTrends/ResourceUtilization/styles";
import { CalenderWrapper } from "../../../MTA/InsightsAndTrends/ResearchInsights/styles";
import CustomCalenderDay from '../../Poogi/InsightAndTrends/ResourceUtilization/CustomCalenderDay';
import { DayPicker } from "react-day-picker";


function CalenderModalCard({selectedData, setSelectedData, isModalOpen, setIsModalOpen, onSaveHandler, plantNames, ccrNames, calendarFormData}:any) {

    
    
    const [highlightedDates, setHighlightedDates] = useState<string[]>([]) 

    // Mapping days to their respective index in JavaScript's Date object (0 for Sunday, 6 for Saturday)
    const dayMap: Record<string, number> = {
    Su: 0,
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
    };
    
    // Function to generate highlighted dates, memoized using useCallback
    const generateHighlightedDates = useCallback(() => {
      if (!selectedData?.sd || !selectedData?.ed) return [];
    
    
      const startDate = moment(selectedData.sd, "YYYY-MM-DD");
      const endDate = moment(selectedData.ed, "YYYY-MM-DD");
    
      const result: string[] = [];
    
      // If the recurrence is "monthly"
      if (selectedData.rb === "Monthly") {
        
        selectedData.dow.forEach((day: any) => {
        const currentMonth = moment(startDate).startOf("month");
        while (currentMonth.isSameOrBefore(endDate, "month")) {
            const matchingDate = getNthOccurrenceOfDay(
                currentMonth.year(),
                currentMonth.month(),
                day.mn,
                day.md
            );

        // Ensure the date is within the valid range
        if (matchingDate && matchingDate.isBetween(startDate, endDate, "day", "[]")) {
            result.push(matchingDate.format("YYYY-MM-DD"));
        }

        currentMonth.add(1, "month"); // Move to next month
        }
        });
    
        return result;
      }
      // Default behavior (daily or weekly recurrence)
      
     while (startDate.isSameOrBefore(endDate)) {
        const dayOfWeek = startDate.day();
        const selectedDays = selectedData.dow.map((day: any) => day.md);

        // Check if the current day of the week is in the selected days
        if ((selectedDays.length === 1 && selectedDays.includes("")) || selectedDays.some((day: any) => dayMap[day] === dayOfWeek)) {
            result.push(startDate.format("YYYY-MM-DD"));
        }
   
          dayOfWeek === 6? startDate.add(selectedData.rd*7+1, "days") : startDate.add(1, "day");
       
      }
    
      return result; 
    }, [selectedData]);
    
    const getNthOccurrenceOfDay = (year: number, month: number, occurrence: string, dayType: string) => {
      const firstDayOfMonth = moment({ year, month, day: 1 });
      const lastDayOfMonth = moment({ year, month }).endOf("month");
    
      // If "md" is "day", return the exact nth day of the month
      if (dayType === "day") {
        let dayNumber = 1;
        if (occurrence === "second") dayNumber = 2;
        if (occurrence === "third") dayNumber = 3;
        if (occurrence === "fourth") dayNumber = 4;
        if (occurrence === "last") dayNumber = lastDayOfMonth.date();
    
        const specificDate = moment({ year, month, day: dayNumber });
    
        // Ensure the date falls within the valid range
        return specificDate.isValid() ? specificDate : null;
      }
    
      // Handle weekday/weekend/specific day logic as before
      const dates: moment.Moment[] = [];
      for (let d = moment(firstDayOfMonth); d.isSameOrBefore(lastDayOfMonth); d.add(1, "day")) {
        const weekday = d.isoWeekday();
        const dayOfWeek = d.day();
    
        if (
          (dayType === "weekday" && weekday <= 5) ||
          (dayType === "weekend day" && weekday >= 6) ||
          (dayType in dayMap && dayOfWeek === dayMap[dayType])
        ) {
          dates.push(moment(d));
        }
      }
    
      // Get required occurrence for weekdays/weekends
      if (occurrence === "first") return dates[0];
      if (occurrence === "second") return dates[1];
      if (occurrence === "third") return dates[2];
      if (occurrence === "fourth") return dates[3];
      if (occurrence === "last") return dates[dates.length - 1];
    
      return null;
    };
    
    
    
    // Memoize the result so it's only recomputed when necessary
    const getHighlightedDates = useMemo(() => generateHighlightedDates(), [generateHighlightedDates]);
    
    
    // Update the state when highlightedDates changes
    useEffect(() => {
      setHighlightedDates(getHighlightedDates);
    }, [getHighlightedDates]);

  return (
    <VFModalCard
    openModal={isModalOpen}
    closeModal={() => {
      setIsModalOpen(false);
    }}
    headerText={"Add Details"}
    headerIcon={""}
    closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
  >
    <div
      style={{
        height: "76vh",
        width: "72vw",
        overflowX: "hidden",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <div
            style={{
              padding: "10px",
              width: "100%",
              margin: "50px 0 20px 20px",
            }}
          >
            <CalenderWrapper
              style={{
                zoom: "1",
                background: "white",
                borderRadius: "12px",
              }}
            >
              <CalenderHeading
                style={{ width: "100%", fontWeight: "bold" }}
                data-testid="utilization"
              >
                Calendar
              </CalenderHeading>
              <DayPicker
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                mode="single"
                components={{
                  Caption: CustomCalenderCaption,
                  Day: (props:any) => {
                    const formattedDate = moment(props?.date).format(
                      "YYYY-MM-DD"
                    );
                    const color = highlightedDates.includes(formattedDate)
                      ? "Red"
                      : "";
                    return <CustomCalenderDay {...props} color={color} />;
                  },
                }}
                styles={{
                  cell: {
                    padding: "5px",
                  },
                }}
              />
            </CalenderWrapper>
          </div>
        </div>
        <div
          style={{
            height: "90%",
            borderLeft: "2px solid #A0A0A0",
            margin: "40px 0",
          }}
        ></div>
        <div >
          {
            <DatePickForm
              plantNames={plantNames}
              calendarFormData={calendarFormData}
              ccrNames={ccrNames}
              formData={selectedData}
              setFormData={setSelectedData}
              onSaveHandler={onSaveHandler}
              setIsModalOpen={setIsModalOpen}
            />
          }
        </div>
      </div>
    </div>
  </VFModalCard>
  )
}

export default CalenderModalCard