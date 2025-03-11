import {BPRColorCellRendererWrapper} from '../../SupplyChainIntelligenceHub/BPR/styles'

const colorMapper =(color:string)=> {
    if(color==="White"){
        return {
            "bg":"#cecece",
            "text":"black"
        }
    }
    if(color==="Green"){
        return {
            "bg":"#418D18",
            "text":"white"
        }
    }
    if(color==="Yellow"){
        return {
            "bg":"#EBBF2B",
            "text":"white"
        }
    }
    if(color==="Red"){
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

const BTRColorCellRenderer = (params:any)=>{

    const color = parseFloat(params.value)
    const cellColor = colorMapper(params.data?.['C'+params.colDef.colId]);

    if(color===null || color===undefined || isNaN(color)){
        return(
            <>
            
            </>
        )
    }

    if(color<=-99999999.00){
        return(
            <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text,maxWidth:85}} data-testid='color-cell'>
               -999.99%
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text,maxWidth:85}} data-testid='color-cell'>
            {color.toFixed(2)}%
        </BPRColorCellRendererWrapper>
    )
}

export default BTRColorCellRenderer