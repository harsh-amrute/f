import {BPRColorCellRendererWrapper} from '../BPR/styles.css'


const colorMapper =(color:string)=> {
    if(color==="White"){
        return {
            "bg":"white",
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

 const ColorCellRenderer = (params:any)=>{
    const color = params.value

    const cellColor = colorMapper(color)
    

    if(!color){
        return(
            <div className={BPRColorCellRendererWrapper} style={{backgroundColor:"white",color:"black",maxWidth:90}} data-testid='color-cell'>
                NULL
            </div>
        )
    }

    return(
        <div className={BPRColorCellRendererWrapper} style={{backgroundColor:cellColor.bg,color:cellColor.text,maxWidth:90}} data-testid='color-cell'>
            {color}
        </div>
    )
}

export default ColorCellRenderer