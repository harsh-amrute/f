import {BPRColorCellRendererWrapper} from '../../SupplyChainIntelligenceHub/BPR/styles'

const colorMapper =(color:number)=> {
        if(color<=0){
            return {
                "bg":"#cecece",
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
    console.log(color)

    if(!color){
        return(
            <>
            
            </>
        )
    }

    if(parseInt(color)<0){
        return(
            <BPRColorCellRendererWrapper style={{maxWidth:85}} data-testid='color-cell'>
                N/A
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text,maxWidth:85}} data-testid='color-cell'>
            {color.toString().slice(0,3)}%
        </BPRColorCellRendererWrapper>
    )
}

export default ColorCellRenderer