
// import { ICellRendererParams } from "ag-grid-enterprise"
import { BPRColorCellRendererWrapper, 
    BPRTagsCellRendererWrapper,
    BPRRemarksCellRendererWrapper,
    BPRColorCellRendererIcon,
    BPRSubmitRemarkInput
} from "./styles"


// interface BPRSubmitRemarkCellRendererProps extends ICellRendererParams{
//     onClick:(params:any)=>void
// }

// interface BPRRemarkHistoryCellRendererProps extends ICellRendererParams{
//     onClick:(e:any,params:any)=>void
// }

// interface ColorMapper {
//     [key: string]: {
//         bg: string;
//         text: string;
//     };
// }


const colorMapper =(color:string)=> {

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
                "bg":"white",
                "text":"black"
            }
    }
}

export const BPRTechColorCellRenderer = (params:any)=>{

    const techColor = params.data.TechColor

    const cellColor = colorMapper(params.data.TechColor)

    if(!techColor || techColor.lenght<1){
        return(
            <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}} data-testid='bpr-tech-color-cell'>
                NULL
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
            {params.data.TechPen}%
        </BPRColorCellRendererWrapper>
    )
}


export const BPREcoColorCellRenderer = (params:any)=>{


    const ecoColor = params.data.EcoColor

    const cellColor = colorMapper(ecoColor)

    if(!ecoColor || ecoColor.length<1){
        return(
            <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
                NULL
            </BPRColorCellRendererWrapper>
        )
    }

    return(
        <BPRColorCellRendererWrapper style={{backgroundColor:cellColor.bg,color:cellColor.text}}>
            {params.data.EcoPen}%
        </BPRColorCellRendererWrapper>
    )
}

export const BPRTagsCellRenderer = (params:any)=>{
    return(
        <BPRTagsCellRendererWrapper>
            {params.data.tags}
        </BPRTagsCellRendererWrapper>
    )
}



export const BPRSubmitRemarkCellRenderer = (params:any)=>{

    return(
        <BPRRemarksCellRendererWrapper>
            <BPRSubmitRemarkInput placeholder="Type Remark" ref={(ref) => {
                if (!ref) return;

                ref.onclick = (e:any) => {
                    params.onClick(e)
                    e.stopPropagation();
                };
            }}/>
        </BPRRemarksCellRendererWrapper>
    )
}

export const BPRRemarksCellRenderer = (params:any)=>{

   
    return (
        <BPRRemarksCellRendererWrapper >
            <BPRColorCellRendererIcon 
            alt="eye icon"
             src="/assets/img/VectorFLOW/BPR/eye.svg"
             ref={(ref) => {
                if (!ref) return;
        
                ref.onclick = (e:any) => {
                 params.onClick(e, {
                    "tags": "PIPO",
                    "sc": "ARES0798C004",
                    "sd": "AR CORE SHIRTS, 42",
                    "norm": 3,
                    "stock": 3,
                    "etc": 0,
                    "transit": [
                      {
                        "lc": "USTSHC0054",
                        "cd": "Feb-23",
                        "slt": 2,
                        "tlt": 2,
                        "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                      },
                      {
                        "lc": "ARGT6025A",
                        "cd": "Nov-22",
                        "slt": 2,
                        "tlt": 2,
                        "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                      },
                      {
                        "lc": "ARGT6005AB",
                        "cd": "Nov-22",
                        "slt": 2,
                        "tlt": 2,
                        "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                      }
                    ]
              })
                  e.stopPropagation();
                };
              }}
             />
        </BPRRemarksCellRendererWrapper>
    )
}
