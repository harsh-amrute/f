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

    console.log(tags);

    // const cellColor = colorMapper(params.value)

    // if(color===null || color===undefined || isNaN(color)){
    //     return(
    //         <>
            
    //         </>
    //     )
    // }

    if(tags.length === 1){
        return(
            <BPRColorCellRendererWrapper>
                <div className="tag-wrapper">
                    <div className="tag" style={{ backgroundColor: 'yellow' }}>
                        <div className="circle" style={{ backgroundColor: 'blue' }}></div>
                        <div className="text">{tags[0]}</div>
                    </div>
                </div>
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper>
            <div className="tag-wrapper">
                <div className="tag" style={{ backgroundColor: 'yellow' }}>
                    <div className="circle" style={{ backgroundColor: 'blue' }}></div>
                    <div className="text">{tags[0]}</div>
                </div>
                <div className="tag-overlay" style={{ backgroundColor: 'green' }}></div>
            </div>
        </BPRColorCellRendererWrapper>
    )
}

export default TagCellRenderer;