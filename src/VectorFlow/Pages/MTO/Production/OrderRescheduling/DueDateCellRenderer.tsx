import { useEffect, useState,useRef} from 'react';
import moment from 'moment';
import { useUserData } from "../../../../../context/index";
import { DatePickerWrapper ,ImageWrapper,DateInputWrapper,ButtonWrapper,TextInputWrapper} from "./styles"

const DueDateCellRenderer = (params: any) => {
      const dateInputRef: any = useRef(null); 
    const [currDate, setCurrDate] = useState(params.data.dd);
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const [datetime] = useState(moment(d).format(format2));

    const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

    useEffect(()=>{
        if(!params.node.selected){
            params.data.dd = params.data.oldDate
            setCurrDate(params.data.oldDate)
        }
    },[params.node.selected])

    const openDatePicker = () => {
    if (params.node.selected && dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    }
  };

    return (
    <DatePickerWrapper onClick={openDatePicker}>
      <TextInputWrapper
        type="text"
        value={!params.node.selected ? params.data.oldDate : currDate}
        placeholder="DD-MM-YYYY"
        readOnly
        style={{
      background:'transparent',
      paddingLeft:'-10px',
      color: params.data.oldDate===currDate? 'black' : '#BC3D81',

      }}
      />

      <DateInputWrapper
        type="date"
        ref={dateInputRef}
        value={!params.node.selected ? params.data.oldDate : currDate}
        min={datetime}
        onChange={(e) => {
          params.data.dd = e.target.value;
          setCurrDate(e.target.value);
        }}
        data-testid="datepicker"
        disabled={!params.node.selected}
      />

      {params.node.selected && (
        <ButtonWrapper type="button">
          <ImageWrapper
            src={
              themeUi === "REGALBLAZE"
                ? "/assets/img/mto/OrderRescheduling/edit-calendar-yellow.svg"
                : "/assets/img/mto/OrderRescheduling/edit-calendar.svg"
            }
            alt="calendar-icon"
          />
        </ButtonWrapper>
      )}
    </DatePickerWrapper>
    );
}

export default DueDateCellRenderer

