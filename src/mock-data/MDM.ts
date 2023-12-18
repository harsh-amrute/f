import { MDMMasterState } from "../VectorFlow/types/MDM";
import { generateRandomId } from "../helpers/utils";
export const MasterData:MDMMasterState[] = [
    { 
      id: 1,
      name: 'SKU', 
      fields:[
          {
            displayName:'SKU Code',
            key:"sku_code",
            visible:true
          },
          {
            displayName:'SKU Name',
            key:"sku_name",
            visible:true
          },
          {
            displayName: "Item Category Code",
            key: "item_category_code",
            visible: false
          },
      ],
      colDefs:[],
      progress:'default',
      filters:[
          {
            id:generateRandomId(),
            masterId:1,
            field:'',
            operator:'',
            text:''
          }
      ],
      rowData:[]
    },
    { 
      id: 2,
      name: 'Location', 
      fields:[
          {
            displayName:'Location Code',
            key:"location_code",
            visible:true
          },
          {
            displayName:'Location Name',
            key:"location_name",
            visible:true
          },
          {
            displayName: "c1",
            key: "LocAttr1",
            visible: false
          },
      ],
      colDefs:[],
      progress:'default',
      filters:[
        {
          id:generateRandomId(),
          masterId:2,
          field:'',
          operator:'',
          text:''
        }
    ],
      rowData:[]
    },
    { 
      id: 3,
      name: 'SKU Location', 
      fields:[
          {
            displayName:'SKU Code',
            key:"sku_code",
            visible:true
          },
          {
            displayName:'SKU Name',
            key:"sku_name",
            visible:true
          },
          {
            displayName: "Segment",
            key: "SKULocAttr1",
            visible: false
          },
      ],
      colDefs:[],
      progress:'default',
      filters:[
        {
          id:generateRandomId(),
          masterId:3,
          field:'',
          operator:'',
          text:''
        }
    ],
      rowData:[] 
    },
  ];

  export const getAllDraftsMock:any = {
    recordCount: null,
    data: [
        {
            DraftId: "1121423100749",
            Masters: " SKU",
            userid: "1",
            LastModifiedDateTime: "2023-12-14T10:07:49",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121123170712",
            Masters: "SKU LOCATION SKULOCATION SOB",
            userid: "1",
            LastModifiedDateTime: "2023-12-11T17:07:12",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121323163008",
            Masters: " SKU Location SKU Location",
            userid: "1",
            LastModifiedDateTime: "2023-12-13T16:30:08",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121323164406",
            Masters: " SKU Location SKU Location",
            userid: "1",
            LastModifiedDateTime: "2023-12-13T16:44:06",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121323165317",
            Masters: " Location",
            userid: "1",
            LastModifiedDateTime: "2023-12-13T16:53:17",
            SearchKeys: "Location"
        },
        {
            DraftId: "1121423102937",
            Masters: " SKU",
            userid: "1",
            LastModifiedDateTime: "2023-12-14T10:29:37",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121423103009",
            Masters: " SKU",
            userid: "1",
            LastModifiedDateTime: "2023-12-14T10:30:09",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121423103032",
            Masters: " SKU",
            userid: "1",
            LastModifiedDateTime: "2023-12-14T10:30:32",
            SearchKeys: "SKU"
        },
        {
            DraftId: "1121423104141",
            Masters: " SKU",
            userid: "1",
            LastModifiedDateTime: "2023-12-14T10:41:41",
            SearchKeys: "SKU"
        }
    ],
    status: 200,
    msg: "Data fetched successfully"
}

export const getDraftByIdMockData:any = {
  recordCount: null,
  data: [
      {
          MasterId: 1,
          Status: 0,
          GridState: "[{\"field\":\"SKUCode\",\"colId\":\"SKUCode\",\"headerName\":\"SKU Code\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"SKUDescription\",\"colId\":\"SKUDescription\",\"headerName\":\"SKU Name\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c1\",\"colId\":\"c1\",\"headerName\":\"STYLE CODE\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c2\",\"colId\":\"c2\",\"headerName\":\"Programme\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c3\",\"colId\":\"c3\",\"headerName\":\"Type\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c4\",\"colId\":\"c4\",\"headerName\":\"Style status\",\"hide\":true,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c5\",\"colId\":\"c5\",\"headerName\":\"IMPORT\",\"hide\":true,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c6\",\"colId\":\"c6\",\"headerName\":\"Colour\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c7\",\"colId\":\"c7\",\"headerName\":\"Used in FG Codes\",\"hide\":true,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c8\",\"colId\":\"c8\",\"headerName\":\"SIZE\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c9\",\"colId\":\"c9\",\"headerName\":\"EAN\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c10\",\"colId\":\"c10\",\"headerName\":\"UoM\",\"hide\":true,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c11\",\"colId\":\"c11\",\"headerName\":\"MRP\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c12\",\"colId\":\"c12\",\"headerName\":\"BRAND\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c13\",\"colId\":\"c13\",\"headerName\":\"SUB BRAND\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c14\",\"colId\":\"c14\",\"headerName\":\"CATEGORY\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1},{\"field\":\"c15\",\"colId\":\"c15\",\"headerName\":\"SEASON\",\"hide\":false,\"minWidth\":180,\"floatingFilter\":true,\"filter\":\"agMultiColumnFilter\",\"cellStyle\":{\"text-align\":\"center\"},\"flex\":1}]"
      }
  ],
  status: 200,
  msg: "Data fetched successfully"
}

export const getMasterUIConfigurationMockData:any = {
  recordCount: "7",
  data: [
      {
          id: "1",
          name: "SKUMaster",
          fields: [
              {
                  displayName: "SKUCode",
                  key: "sc",
                  visible: true,
                  isAdd: true,
                  isEdit: true,
                  isDownload: true
              },
          ]
      },
  ],
  status: 200,
  msg: null
}