import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { BPRLayout,BPRTaskBar } from "./styles"
import BPRViewTable from "./BPRViewTable"
import useBPR from "./useBPR"
import "allotment/dist/style.css";
import { Allotment } from "allotment"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"




const BPR = ()=>{

    const {
      isSideBarOpen,
      isSubGridOpen,
      isLoading,
      activeRow,
      BPRColumns,
      agGridProps
    } = useBPR()

    if(isLoading){
      return (
        <VFLoader/>
      )
    }

    return(
        <BPRLayout>
            <BPRTaskBar style={{width:isSideBarOpen?'77%':'97%'}}>
                <VFButtonOutline
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Excel Export 
                </VFButtonOutline>
                <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Edit Filter
                </VFButton>
            </BPRTaskBar>
            <div style={{height:'100vh'}}>
            <Allotment vertical defaultSizes={[400,100]}>
              <Allotment.Pane >
              <VFTable
                {...agGridProps}
                columnDefs={BPRColumns}
                rowData={[
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0798C004",
                    "SKUName": "AR CORE SHIRTS, 42",
                    "Norm": 3,
                    "Stock": 3,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                      },
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
                      },
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0439C002",
                    "SKUName": "AR CORE SHIRTS, 39",
                    "Norm": 2,
                    "Stock": 3,
                    "TechPen": -50,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0439C002",
                    "SKUName": "AR CORE SHIRTS, 39",
                    "Norm": 1,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0439C002",
                    "SKUName": "AR CORE SHIRTS, 39",
                    "Norm": 2,
                    "Stock": 1,
                    "TechPen": 50,
                    "TechColor": "Yellow",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0798C004",
                    "SKUName": "AR CORE SHIRTS, 42",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0439C007",
                    "SKUName": "AR CORE SHIRTS, 48",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES0439C007",
                    "SKUName": "AR CORE SHIRTS, 48",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0295A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 2,
                    "Stock": 3,
                    "TechPen": -50,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0295A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0295A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0297A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0294A006",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHIR, M",
                    "Norm": 3,
                    "Stock": 2,
                    "TechPen": 33.33,
                    "TechColor": "Yellow",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02018A003",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 40",
                    "Norm": 2,
                    "Stock": 2,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0292A006",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHIR, M",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0294A001",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSH, 3XL",
                    "Norm": 1,
                    "Stock": 2,
                    "TechPen": -100,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0297A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02018A003",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 40",
                    "Norm": 3,
                    "Stock": 4,
                    "TechPen": -33.33,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USSHTC0016006",
                    "SKUName": "US SHT S Tailored Fit BLACK",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0062001",
                    "SKUName": "US TSH 3XL Slim Fit Orange",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0062008",
                    "SKUName": "US TSH XXL Slim Fit Orange",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0063004",
                    "SKUName": "US TSH L Slim Fit DK. ORANGE",
                    "Norm": 2,
                    "Stock": 2,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0063006",
                    "SKUName": "US TSH S Slim Fit DK. ORANGE",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0065005",
                    "SKUName": "US TSH M Slim Fit MAROON",
                    "Norm": 2,
                    "Stock": 1,
                    "TechPen": 50,
                    "TechColor": "Yellow",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARGT6042A004",
                    "SKUName": "AUTO FLEX PLUS DOBBY COTTON CHINOS, 36",
                    "Norm": 8,
                    "Stock": 30,
                    "TechPen": -275,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "UDTSHC0026006",
                    "SKUName": "UD TSH S Muscle Fit PEACH",
                    "Norm": 1,
                    "Stock": 4,
                    "TechPen": -300,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USTSHC0066007",
                    "SKUName": "US TSH XL Slim Fit Blue",
                    "Norm": 2,
                    "Stock": 4,
                    "TechPen": -100,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARGT6054003",
                    "SKUName": "Formal Core Bi-Stretch",
                    "Norm": 2,
                    "Stock": 2,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARGT6054005",
                    "SKUName": "Formal Core Bi-Stretch",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARGT6031A002",
                    "SKUName": "AUTO FLEX SATIN COTTON CHINOS, 32",
                    "Norm": 2,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1039002",
                    "SKUName": "SS20 NEW CORE  40",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1039003",
                    "SKUName": "SS20 NEW CORE  42",
                    "Norm": 1,
                    "Stock": 2,
                    "TechPen": -100,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1040001",
                    "SKUName": "SS20 NEW CORE  39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1042002",
                    "SKUName": "SS20 NEW CORE  40",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1042003",
                    "SKUName": "SS20 NEW CORE  42",
                    "Norm": 1,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES1215002",
                    "SKUName": "ARROW-ARROW NEWYORK-MWT-WOVEN SHIRT  39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0295A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 2,
                    "TechPen": -100,
                    "TechColor": "White",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A002",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A002",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A002",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A002",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 39",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "USSHTC0069H008",
                    "SKUName": "US SHT XXL Tailored Fit NAVY",
                    "Norm": 1,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A002",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 39",
                    "Norm": 2,
                    "Stock": 2,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0297A008",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02018A003",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 40",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A005",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 44",
                    "Norm": 2,
                    "Stock": 2,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "AREK0297A009",
                    "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSH, XXL",
                    "Norm": 27,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02018A003",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 40",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02018A003",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 40",
                    "Norm": 3,
                    "Stock": 0,
                    "TechPen": 100,
                    "TechColor": "Black",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A005",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 44",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  },
                  {
                    "tags": "PIPO",
                    "SKUCode": "ARES02020A005",
                    "SKUName": "ARROW-SPORT_SHIRT-CORE-WOVEN, 44",
                    "Norm": 1,
                    "Stock": 1,
                    "TechPen": 0,
                    "TechColor": "Green",
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
                  }
                ]}
            />
              </Allotment.Pane>
              <Allotment.Pane maxSize={300}>
              {isSubGridOpen && (
                <BPRViewTable
                    rowData={activeRow}
                    colDefs={[
                        {
                            headerName:"LR Code",
                            colId:'lc',
                            field:'lc'
                        },
                        {
                            headerName:"Creation Date",
                            colId:'cd',
                            field:'cd'
                        },
                        {
                            headerName:"Ageing",
                            colId:'ageing',
                            field:'ageing'
                        },
                        {
                            headerName:"ETA",
                            colId:'eta',
                            field:'eta'
                        },
                        {
                            headerName:"Current Location",
                            colId:'cl',
                            field:'cl'
                        },
                        {
                            headerName:"Quantity",
                            colId:'quantity',
                            field:'quantity'
                        },
                        {
                            headerName:"Execution Eco Color",
                            colId:'eec',
                            field:'eec'
                        },
                        {
                            headerName:"Remarks",
                            colId:'remarks',
                            field:'remarks'
                        }
                    ]}
                />
            )}
              </Allotment.Pane>
            </Allotment>
            </div>
            
        </BPRLayout>
    )
}

export default BPR