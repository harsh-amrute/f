import { ETACellRendererWrapper,ETACellValue } from "./styles"

 const ETACellRenderer = (params:any)=>{

    return(
        <ETACellRendererWrapper>
            <ETACellValue>{params.value}</ETACellValue>
        </ETACellRendererWrapper>
    )
}

export default ETACellRenderer