import styled from 'styled-components';
import Calendar from 'react-calendar';


export const ApplyZoomOut = styled.div`
    zoom: 0.7;
`

export const OrderReschedulingWrapper = styled.div`
  & .toolbar-container{
    margin: 0;
    padding-top: 20px;
  }
`

export const VFTableWrapper = styled.div<{ height?: string, disableZoomScaling?: boolean }>`
    // height: 75vh;
    height: 100%;
    // margin-top: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;

    & div[data-testid="vf_pagination"]{
      margin-top: 0 !important;
    }


 
    // & .ag-theme-alpine {
    //   flex: 1;
    //     margin: 0 !important;
    //   }
    & .ag-theme-noir-fusion {
        margin: 0 !important;
      }
    
`
export const PaginationWrapper = styled.div`

`


export const ETACellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    width:100%;
    padding: 1rem;
`

export const ETACellValue = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #77777729;
    border: 0.4000000059604645px solid #707070;
    border-radius: 2px;
    height:30px;
    width:100%;
    padding:4px;
`

export const DatePickerWrapper = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: row;
    width: 180px;
    padding: 5px 25px;
`;

export const TextInputWrapper = styled.input<{theme: string}>`
    width: 80%;
    height: 100%;
    text-align: center;
    letter-spacing: 0px;
    opacity: 1;
    font-size: 12px;
    padding: 4px;
    font-weight: 400;
    font-family: Roboto;
    border: none;
    pointer-events: none;
`;

export const DateInputWrapper = styled.input`
    opacity: 0;
    position: absolute;
    pointer-events: none;
`;

export const ButtonWrapper = styled.button`
    background: none;
`;

export const ImageWrapper = styled.img`
    cursor: pointer;
    height: 15px;
    width: 15px;
`;

export const StyledCalendar = styled(Calendar)<{themeUi:string}>`
    width: 250px;

    .react-calendar__navigation__label__labelText {
        font-weight: 400 !important; 
    }

    .react-calendar__navigation button:disabled {
        background-color: #e6e6e6;
    }

    .react-calendar__navigation button {
        min-width: 40px;
        background: none;
    }

    .react-calendar__navigation button:enabled:focus {  
        background-color:${(props) => props.themeUi === "REGALBLAZE" ? "#C7810E" : "#82104C"};
        color:white;  
    }

    .react-calendar__navigation button:disabled:hover {
        background-color: rgb(230, 230, 230);
    }

    .react-calendar__month-view__weekdays__weekday {
        text-decoration: none;
    }

    .react-calendar__tile--now {
        background:${(props)=>props.themeUi==="REGALBLAZE"?"#E1B69F":"#e2a9c8"};  
    }

    .react-calendar__tile--active {
        background-color:${(props)=>props.themeUi==="REGALBLAZE"?"#C7810E":"#82104C"};
        color: white;
    }
        .react-calendar__tile--hasActive {
        background-color:${(props) => props.themeUi === "REGALBLAZE" ? "#C7810E" : "#82104C"};
         color: white;

    }

    .react-calendar__tile:disabled {
        background-color: white;
        color: #ababab;
    }

    .react-calendar__tile:disabled:hover {
        background-color: white;
    }

    .react-calendar__month-view__days__day--weekend {
        color: #121212;
    }

    .react-calendar__tile:hover {
        background-color:${(props)=>props.themeUi==="REGALBLAZE"?"#fee3b7":"rgba(188, 61, 129, 0.2)"};  
        color: black;
    }

    .react-calendar__navigation button:hover {
        background-color:${(props)=>props.themeUi==="REGALBLAZE"?"#fee3b7":"rgba(188, 61, 129, 0.2)"};  
    }
    `;

// export const CalendarbtnWrapper = styled.div`
//     // border:1px solid red;
//     display:flex;
//     height: 249px;
//     flex-direction:column;
//         // box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 8px;

// `

// export const CloseIcon = styled.div`
//   width: 250px;    
//   height: 30px;
//     border: 1px solid #a0a096;
//   border-bottom:none;

//   align-self: flex-end;
//   display: flex;    
//   justify-content: flex-end;
//   box-sizing: border-box; 
  
//   button {
//     background-color: white;
//     padding-top: 2px;
//     border: none;
//     cursor: pointer;
//   }
// `;

    
    





