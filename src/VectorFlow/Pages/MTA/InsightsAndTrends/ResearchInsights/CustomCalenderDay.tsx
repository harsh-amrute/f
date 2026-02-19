import { format, isSameMonth } from 'date-fns'
import { DayProps, useNavigation } from 'react-day-picker'
import { BPRColorMapper } from '../../../../../helpers/utils'
import { CustomCalenderDayWrapper } from './styles.css'


interface CustomCalenderDayProps extends DayProps {
    color: string
}



const CustomCalenderDay = (props: CustomCalenderDayProps) => {

    const { currentMonth } = useNavigation()


    const isDateValid = isSameMonth(currentMonth, props.date)
    const currColors = BPRColorMapper(props.color)

    if (isDateValid) {
        return (
            <div className={CustomCalenderDayWrapper} style={{
                backgroundColor: currColors.bg,
                color: currColors.text
            }}>
                {format(props.date, 'dd')}
            </div>
        )
    }
    return <></>
}


export default CustomCalenderDay