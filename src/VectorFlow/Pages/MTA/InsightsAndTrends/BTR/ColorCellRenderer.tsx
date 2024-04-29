import {BPRColorCellRendererWrapper} from '../../SupplyChainIntelligenceHub/BPR/styles'

const colorMapper =(color:number)=> {
        if(color<0){
            return {
                "bg":"white",
                "text":"black"
            }
        }
        if(color<33.33 && color>0){
            return {
                "bg":"#418D18",
                "text":"white"
            }
        }
        if(color>33.33 && color<66.66){
            return {
                "bg":"#EBBF2B",
                "text":"white"
            }
        }
        if(66.66<color && color<99.99){
            return {
                "bg":"#F04D4D",
                "text":"white"
            }
        }

        return{
            "bg":"#000000",
            "text":"white"
        }  
}

 const ColorCellRenderer = (params:any)=>{

    const color = params.value

    const cellColor = colorMapper(params.value)
    

    if(!color){
        return(
            <>
            
            </>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text,maxWidth:45}} data-testid='color-cell'>
            {color}%
        </BPRColorCellRendererWrapper>
    )
}

export default ColorCellRenderer