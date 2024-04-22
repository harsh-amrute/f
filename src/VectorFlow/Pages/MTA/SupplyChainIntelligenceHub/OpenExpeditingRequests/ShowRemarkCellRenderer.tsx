import { BPRRemarksCellRendererWrapper,BPRColorCellRendererIcon } from "../BPR/styles";

const ShowRemarkCellRenderer = (params:any)=>{

   
    return (
        <BPRRemarksCellRendererWrapper >
            <BPRColorCellRendererIcon 
            alt="history icon"
             src="/assets/img/VectorFLOW/BPR/history.svg"
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


export default ShowRemarkCellRenderer