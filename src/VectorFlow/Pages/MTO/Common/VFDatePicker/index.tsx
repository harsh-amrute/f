import React, { useRef } from "react";
import { useUserData } from "../../../../../context/index";
import { ButtonWrapper, DateInputWrapper, DatePickerWrapper, ImageWrapper, TextInputWrapper } from "./styles";

const VFDatePicker = (props: any) => {
    const dateInputRef: any = useRef(null); // Ref to the hidden native input
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    const openDatePicker = () => {
        if (dateInputRef?.current) {
            dateInputRef.current.showPicker(); // Use showPicker for modern browsers
            dateInputRef.current.focus(); // Fallback to focus
        }
    };

    return (
        <DatePickerWrapper
            onClick={openDatePicker}>
            <TextInputWrapper
                type="text"
                id="customDate"
                value={props.date}
                placeholder="DD-MM-YYYY"
            />
            <br />
            {/* Hidden date input */}
            <DateInputWrapper
                type="date"
                ref={dateInputRef}
                value={props.date}
                min={props.datetime}
                onChange={(e) => props.onDateChange(e.target.value)}
                data-testid={"datepicker"}
            />
            <ButtonWrapper type="button">
                <ImageWrapper
                    src={themeUi === "REGALBLAZE" ? "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg" : "/assets/img/mto/OrderRescheduling/edit-calendar.svg"}
                    height={16}
                    width={16}
                    alt="Group 627"
                />
            </ButtonWrapper>
        </DatePickerWrapper>
    );
};

export default VFDatePicker;
