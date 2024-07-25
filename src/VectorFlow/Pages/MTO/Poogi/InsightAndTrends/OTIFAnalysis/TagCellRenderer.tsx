import {BPRColorCellRendererWrapper} from './styles'
import './style.css';

const tagToolTip =(color:number)=> {
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

 const TagCellRenderer = (params:any)=>{

    const tags = Object.keys(params.value).filter((key) => params.value[key] );

    
    return(
        <div>SVG</div>
    )
}

export default TagCellRenderer;