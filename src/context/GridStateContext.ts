import{createContext} from 'react'

interface GridStateContextProps{
    ref:any
    exportExcelColumns:Array<any>
    setExportExcelColumns:any
    tempDownloadData:boolean
    setTempDownloadData:any
    exportExcelRowData:Array<any>
    setExportExcelRowData:any
}

export const GridStateContext = createContext<GridStateContextProps>({
    ref:null,
    exportExcelColumns:[],
    setExportExcelColumns:()=>{return},
    tempDownloadData:false,
    setTempDownloadData:()=>{return},
    exportExcelRowData:[],
    setExportExcelRowData:()=>{return}
})

