import { format,isSameMonth } from 'date-fns'
import {DayProps,useNavigation} from 'react-day-picker'
import { CustomCalenderDayWrapper } from './styles'


interface CustomCalenderDayProps extends DayProps{
    color:string
}

const colorMapper =(color:string):{bg:string,text:string}=> {

    switch (color){
        case "White":
            return {
                "bg":"white",
                "text":"black"
            }
        case "Yellow":
            return {
                "bg":"#EBBF2B",
                "text":"white"
            }
        case "Green":
            return {
                "bg":"#418D18",
                "text":"white"
            }
        case "Red":
            return {
                "bg":"#F04D4D",
                "text":"white"
            }
        case "Black":
            return{
                "bg":"#000000",
                "text":"white"
            }
        default:
            return{
                "bg":"#B2B2B2",
                "text":"white"
            }
    }
}


const CustomCalenderDay = (props:CustomCalenderDayProps)=>{
  
    const {currentMonth} = useNavigation()


    const isDateValid = isSameMonth(currentMonth,props.date)
    const currColors = colorMapper(props.color)

    if(isDateValid){
        return(
            <CustomCalenderDayWrapper style={{
                backgroundColor:currColors.bg,
                color:currColors.text
            }}>
                {format(props.date,'dd')}
            </CustomCalenderDayWrapper>
        )
    }
    return <></>
}


export default CustomCalenderDay