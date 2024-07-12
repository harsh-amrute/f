import { format } from "date-fns"
import { ETACellRendererWrapper,ETACellValue } from "./styles"

 const ETACellRenderer = (params:any)=>{
    console.log(params.value)

    const date = new Date(params.value)

    const formattedDate = format(date,'P')

    return(
        <ETACellRendererWrapper>
            <ETACellValue>{formattedDate}</ETACellValue>
        </ETACellRendererWrapper>
    )
}

export default ETACellRenderer