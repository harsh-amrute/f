import { type NavigateFunction } from 'react-router'
import { LOCAL_STORAGE_KEY, ROUTES } from './constants'
import { MainService } from '../module-main/services/api'
import { notifyError } from './notify'
import { type Master, type Option, type Field, type Filter, MDMMasterState, DraftActionType,type NormHistory, type DailyData } from '../VectorFlow/types/MDM';
import readXlsxFile from 'read-excel-file'
import {ColDef,ColGroupDef} from 'ag-grid-community';
import { customKeys, defaultColDefs, masterIdToDeleteSchemaMapper, masterIdToSchemaMapper, TaskPendingAvoidColumnsMapper, taskStatusCustomColDefs, mdmRoutes } from './MDMConstants';
import ActionRenderer from '../VectorFlow/Pages/MTA/MDM/SavedDrafts/ActionRenderer';
import {subDays,addDays,format, differenceInSeconds} from 'date-fns';
//import { formatMDMDateFromat } from './format';
import {formatMDMDate} from './format';
import TaskPendingActionHeader from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionHeader';
import TaskPendingActionRenderer from '../VectorFlow/Pages/MTA/MDM/TaskPendingForReview/TaskPendingActionRenderer';

// clear cached token and redirect to sso login

const keyboardCharacters = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const loginRedirect = (navigate?: NavigateFunction) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD)

  saveOriginalUrlBeforeLogin()

  if (navigate != null) {
    navigate(ROUTES.landing, { replace: true })
  } else {
    window.location.href = ROUTES.landing
  }
}

export const login = (navigate: NavigateFunction) => {
  const localLogin = isTrue(process.env.REACT_APP_ENABLE_LOCAL_LOGIN)

  if (localLogin) {
    navigate(ROUTES.internalLogin, { replace: true })
  } else {
    window.location.href = String(process.env.REACT_APP_SSO_LOGIN_URL)
  }
}

// save current url in session storage
const saveOriginalUrlBeforeLogin = () => {
  const pathname = window.location.pathname
  if (
    pathname !== '/' &&
    pathname !== ROUTES.logout &&
    pathname !== ROUTES.landing
  ) {
    sessionStorage.setItem(
      'original_url',
      window.location.pathname + window.location.search
    )
  }
}

// navigate to the original url after user login
export const getOriginalUrl = () => {
  const originalUrl = sessionStorage.getItem('original_url')
  const originalUrlType = sessionStorage.getItem('original_url_type')
  if (originalUrl || originalUrlType) {
    sessionStorage.removeItem('original_url')
    // original_url_type for external projects
    sessionStorage.removeItem('original_url_type')
  }
  return { url: originalUrl, type: originalUrlType }
}

export const hasUdfToken = () => {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD)
}

/**
 * Utilities to compare between two variables with same supported types: string | number | boolean
 */
export const compare = <T = string | number | boolean>(a: T, b: T) => {
  if (a === b) return 0
  else if (a > b) return 1
  return -1
}

/**
 * Utilities to remove keys with value is undefined, null or empty
 * Useful for clearing parameter objects, to not display empty parameters in the url
 */
export const cleanObject = (object?: Record<string, any>) => {
  if (object == null) return {}
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (value === undefined || value === null || value === '') {
      delete object[key]
    }
  })
  return object
}

export const formatUpperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/*
 * Ignore operators that handled by imperva for sql injection
 */
export const sanitizeUserSearchText = (search: string) => {
  const value = search.trim()

  // 1. single quote: if only one and it's at the last place, Imperva consider it's sql injection
  if (
    value.split("'").length === 2 &&
    value.substring(value.length - 1) === "'"
  ) {
    return search.replace("'", '')
  }
  return search
}

export const isTrue = (value?: string | number) => {
  return (
    (typeof value === 'string' && value?.toUpperCase() === 'TRUE') ||
    value === 1
  )
}

export const handleDownload = async (nameApi: string, nameFile: string) => {
  try {
    const token = await MainService.refreshToken();
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${nameApi}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`
      }
    })  
    // Convert response to blob object
    const blob = await response.blob()
    // Create download URL for blob object
    const url = URL.createObjectURL(blob)
  
    // Trigger download
    const link = document.createElement('a')
    link.href = url
    if(nameFile===''){
      const temp = response.headers.get('content-disposition')?.split('=');
      if(temp) nameFile = temp[temp.length-1];
      link.setAttribute('download', `${nameFile}`)
    }
    else{
      link.setAttribute('download', `${nameFile}.csv`)
    }
    document.body.appendChild(link)
    link.click()
    // Clean up download URL
    URL.revokeObjectURL(url);
    return true;
  } catch (error:any) {
    notifyError(error);
  }
 
}

export const handleDataProductFilter = (data: any) => {
  const filterDuplicateValues = (listData: any) => {
    const newListData = listData.filter((item: string, index: number) => {
      return listData.indexOf(item) == index
    })

    return newListData
  }

  let listCategory = [] as string[]
  let listStyle = [] as string[]
  let listFit = [] as string[]
  let listLaunchPeriod = [] as any[]
  let listSubBrand = [] as any[]
  let listBrand = [] as any[]

  listBrand = Object.keys(data).map((item: string) => ({
    value: item,
    label: item
  }))

  // list brand
  Object.keys(data).map((brand: any) => {
    listSubBrand = listSubBrand.concat(Object.keys(data[brand]).map((item: string) => ({
      value: item,
      label: item
    })))

    // list subBrand
    if (data[brand]) {
      Object.keys(data[brand]).map((subBrand: any) => {
        listCategory.push(...Object.keys(data[brand][subBrand]))

        // list category
        if (data[brand][subBrand]) {
          Object.keys(data[brand][subBrand]).map((category: any) => {
            listStyle.push(...Object.keys(data[brand][subBrand][category]))

            // List style
            if (data[brand][subBrand][category]) {
              Object.keys(data[brand][subBrand][category]).map((style: any) => {
                listFit.push(
                  ...Object.keys(data[brand][subBrand][category][style])
                )

                // list launch period
                if (data[brand][subBrand][category][style]) {
                  Object.keys(data[brand][subBrand][category][style]).map(
                    (fit: any) => {
                      listLaunchPeriod.push(
                        ...Object.values(
                          data[brand][subBrand][category][style][fit][0]
                        )
                      )
                    }
                  )
                }
              })
            }
          })
        }
      })
    }
  })

  listCategory = filterDuplicateValues(listCategory).map((item: string) => ({
    value: item,
    label: item
  }))
  listStyle = filterDuplicateValues(listStyle).map((item: string) => ({
    value: item,
    label: item
  }))
  listFit = filterDuplicateValues(listFit).map((item: string) => ({
    value: item,
    label: item
  }))
  listLaunchPeriod = filterDuplicateValues(listLaunchPeriod).map((item: string) => ({
    value: item,
    label: item
  }))

  return {
    listBrand,
    listSubBrand,
    listCategory,
    listStyle,
    listFit,
    listLaunchPeriod
  }
}

export const format_number = (num: number) => {
  function parseNumber(numb: any) {
    if (typeof numb === 'number') {
      // If the input is already a number, return it as is
      return numb
    } else if (typeof numb === 'string') {
      // If the input is a string, parse it and return an integer or a float
      if (numb.includes('.')) {
        return parseFloat(numb)
      } else {
        return parseInt(numb)
      }
    } else {
      // If the input is not a number or a string, return null
      return null
    }
  }

  if (num >= 9999999999) {
    // If the number is greater than or equal to 1 crore
    return {
      compare: '>',
      digits: 999,
      letter: 'Cr'
    }
  }

  const num_str = String(Math.floor(num)) // Convert the number to a string
  const num_len = num_str.length // Get the length of the string

  let digits: any = '0'
  let letter = ''
  // Calculate the number of digits and the letter representation
  if (num_str === '0') {
    letter = ''
  } else if ([1, 2, 3].includes(num_len)) {
    digits = num_str
    letter = 'R'
  } else if (num_len === 4) {
    digits = (num / 1000).toFixed(1)
    letter = 'K'
  } else if ([5, 6].includes(num_len)) {
    digits = Math.round(num / 1000).toString()
    letter = 'K'
  } else if (num_len === 7) {
    digits = (num / 100000).toFixed(1)
    letter = 'L'
  } else if (num_len === 8) {
    digits = Math.round(num / 100000).toString()
    letter = 'L'
  } else if (num_len === 9) {
    digits = (num / 10000000).toFixed(1)
    letter = 'Cr'
  } else if (num_len === 10) {
    digits = Math.round(num / 10000000).toString()
    letter = 'Cr'
  } 
  digits = parseNumber(digits)
  // Combine the digits and letter representation into a single string
  return {
    compare: null,
    digits,
    letter
  }
} 

// Helper Function to Dynamically Map Roles fetched from Backend to the Frontend as required by the ArrowList Component.
export const generateRolesObject = (roles:Array<object>,permission:string[],is_admin:boolean) => {
  const rolesArray = [] as object[];
  const rolesObjectIST:{id:number,title:string,status:boolean,child:object[]} = {
          id:0,
          title:"",
          status:false,
          child:[],
  }
  const rolesObjectVF:{id:number,title:string,status:boolean,child:object[]} = {
    id:0,
    title:"",
    status:false,
    child:[],
  }
  
  roles.forEach((role:any)=>{

    if(role.name.startsWith("IST")){
      if(permission.includes("IST Admin") || is_admin){
        rolesObjectIST.id = 1;
        rolesObjectIST.title = "profile.tabContent.manageUsers.roles.interStoreTransfers";
        rolesObjectIST.child.push(role);
      }
    }
    else{
      if(permission.includes("Admin") || is_admin){
        rolesObjectVF.id = 2;
        rolesObjectVF.title = "profile.tabContent.manageUsers.roles.distribution";
        rolesObjectVF.child.push(role);
      }
    }
  })

  if(rolesObjectIST.child.length > 0) rolesArray.push(rolesObjectIST);
  if(rolesObjectVF.child.length > 0) rolesArray.push(rolesObjectVF);
  return rolesArray;
}

//Helper Roles to Generate Options as required for react-multiselect component
export const generateOptions = (data:Master[]) => {
  const temp:string[] = [];
  const options:Option[] = [];
  if(!data)return options
  data.forEach((master:Master)=>{
    master.fields.forEach((field:Field)=>{
      if(!temp.includes(field.displayName)){
        temp.push(field.displayName);
        options.push({value:field.key,label:field.displayName,})
      }
    })
  });

  return options;
}

export const generateRandomId =(length?:number)=>{
  if(!length){
    length= 10
  }
  
  let id = ''
  for (let index = 0; index < length; index++) {
    id = id + keyboardCharacters[Math.floor(Math.random() * keyboardCharacters.length)]
    
  }
  return id

}

export const replaceKeyWithDisplayName = (message:string,master:MDMMasterState) => {
  return new String(message).replaceAll(/".*?"/g,(m)=>{
    const displayName = master.fields.find((f:Field)=>f.key === m.replaceAll('"',''))?.displayName;
    if(displayName) return displayName
    return m;
  })
}

export const checkError = (row:any,master:MDMMasterState,isDelete:boolean) => { 
  const masterSchema = isDelete?masterIdToDeleteSchemaMapper[master.id.toString()]:masterIdToSchemaMapper[master.id.toString()];
  let {error,warning}:any = masterSchema.validate(row,{context:row});
  if(error) error = replaceKeyWithDisplayName(error.message,master);
  if(warning) warning = replaceKeyWithDisplayName(warning,master);
  return {error,warning};
}

export const parseExcelData = async (file:any,master:MDMMasterState,isDelete:boolean) => {
  
  const currMasterKeys = master.fields.map((field:Field)=>field.key); //array containing keys of current master fields
  const result:object[] = [];
  const buffer = await file.arrayBuffer();

  const data = await readXlsxFile(buffer,{
    parseNumber: (string:any) => string
  });
  //displayName to key mapper
  const headerKeys = data[0].map((headerName:any)=>{
    const fieldObj = master.fields.find((field:Field)=>field.displayName === headerName);
    if(fieldObj) return fieldObj.key;
    else return '';
  })

  headerKeys.forEach((key:string)=>{
    if(!currMasterKeys.includes(key)){
      throw new Error("Please Upload a Valid Master");
    }
  })

 
  
  let rowObj:any = {};
  let temp = 0;
  data.slice(1).map((row:any)=>{
    
    row.map((value:any)=>{
      const attributeName = headerKeys[temp];
      rowObj[attributeName.toString()] = value;
      temp+=1;
    })
    temp = 0;
    //Replace with empty string if null (for Custom keys)
    Object.keys(rowObj).forEach((key:any)=>{
      if(customKeys.includes(key) && rowObj[key]===null){
        rowObj[key] = ''
      }
    })

    const {error,warning} = checkError(rowObj,master,isDelete);
    
    if(error !== undefined){
      rowObj.error = error;
    }
    if(warning !== undefined){
      rowObj.warning = warning;
    }
    result.push(rowObj);
    rowObj={}
    
  })

  return result;
}

export const mapMasterToColumnDefs = (fields:Field[],masterId?:number,onShowChart?:any)=>{
  let result:any[] = []

  result = fields.map((f)=>{
    return{
      field:f.key,
      colId:f.key,
      headerName:f.displayName,
      hide:!f.visible,
      floatingFilter: true,
      filter: "agMultiColumnFilter",
      cellDataType:false,
      // suppressColumnsToolPanel: f.isEdit ? false : true,
      ...defaultColDefs
    }
  })

  if(masterId==10){
    const seasonalityCheckboxColDef:ColDef={
      field:'checkbox',
      colId:'checkbox',
      headerName:'',
      checkboxSelection:true,
      headerCheckboxSelection:true,
      headerCheckboxSelectionCurrentPageOnly:true,
      width:10
    }
    const seasonalityColorColDef:ColDef={
      field:'color',
      colId:'color',
      headerName:'',
      width:3,
      minWidth:3,
      cellRenderer:'seasonalityColorCellRenderer'
    }

    const seasonalityGraphColDef:ColDef={
      field:'graph',
      colId:'graph',
      headerName:'',
      width:40,
      cellRenderer:'seasonalityGraphCellRenderer',
      cellRendererParams:{
        onShowChart
      }
    }

    return [seasonalityColorColDef,seasonalityCheckboxColDef,seasonalityGraphColDef,...result]
  }
  return result;
}


export const areMasterFiltersValid = (masterFilters:Filter[])=>{
  for(let i =0;i<masterFilters.length;i++){
    if(masterFilters[i].field===""|| masterFilters[i].operator===""|| masterFilters[i].text===""){
      return false
    }
  }
  return true
}

// export const getMasterFromMasterGroupMapper=(mapper:{})=>{
//   for (const masterGroupKey in mapper){
//     return 
//   }
// }


export const mapStateFiltersToPayload = (filters:Filter[]) => {
  return filters.map((filter:Filter)=>({attributeName:filter.field,op:filter.operator,value:filter.text}))

}

export const mapMasterToMasterState = (masters:Master[],onShowChart?:any):MDMMasterState[] => {

  return masters.map((master:Master)=>({
    id:master.id,
    name:master.name,
    fields:master.fields,
    filters:[
    {
      id:generateRandomId(),
      masterId:master.id,
      field:'',
      operator:'',
      text:''
    }],
    colDefs:mapMasterToColumnDefs(master.fields,master.id,onShowChart),
    rowData:[],
    progress:'default'
  }))
}

export const mapDraftToColumnDefs = (fields:Field[],customParams?:ColDef)=>{
  let result:ColDef[] = []
  result = fields.map((f)=>{
    return{
      field:f.key,
      colId:f.key,
      headerName:f.displayName,
      minWidth:180,

      cellStyle: {
        "textAlign": "center",
      },
      flex: 1,
      cellRenderer:f.key==="action"&& ActionRenderer,
      ...customParams
    }
  })
  return result
}

export const mapTaskStatusToColDefs = (taskStatus:ColDef[])=>{
  let result:ColDef[] = []
  result = taskStatus.map((t:ColDef)=>{
    return{
      ...t,
      minWidth:180,
      cellStyle: {
        "textAlign": "center",
      },
      flex: 1,
      floatingFilter:true,
      filter: "agMultiColumnFilter",
    }
  })
  return result
}

export const mapPendingTaskToColumnDefs = (colDefs:ColDef[]):ColDef[]=>{
  return colDefs.map((colDef:ColDef)=>{
    return{
      ...colDef,
      floatingFilter: true,
      filter: "agMultiColumnFilter",
      minWidth:180,
      cellStyle: (params)=>{
        if(params.colDef.colId ==='TaskName')return{"text-align": "center",'color':'rgb(188, 61, 129)','text-decoration':'underline','text-underline-offset':'7px','cursor':'pointer'}
        return{
          "text-align": "center",
          'color':'back',
          'text-decoration':'none',
          'text-underline-offset':'0px',
          'cursor':'auto'
        }
      },
      flex: 1,
    }
  })
}

export const mapRowDataWithSrNo = (rowData:any[])=>{
  let result = []
  if(!rowData)return []
  result = rowData

  // result  = rowData.map((row)=>{
  //   return{
  //     ...row,
  //     PendingSince:formatMDMDate(row.PendingSince)
  //   }
  // })

  result.sort((a,b):any=>{
    return differenceInSeconds(b.PendingSince,a.PendingSince)
  })

  result = result.map((row:any,index:number)=>{
    return {
      ...row,
      SrNo:index + 1
    }
  })
  return result
}


export const mapDraftDataToTableRowData = (rowData:any[])=>{
  let result = []
  if(!rowData)return
  result  = rowData.map((row)=>{
    return{
      ...row,
      LastModifiedDateTime:formatMDMDate(row.LastModifiedDateTime)
    }
  })

  result.sort((a,b):any=>{
    return differenceInSeconds(b.LastModifiedDateTime,a.LastModifiedDateTime)
  })

  result = result.map((r:any,index:number)=>{
    return {...r, sr_no:index + 1,LastModifiedDateTime:format(r.LastModifiedDateTime,'dd/MM/yy hh:mm:ss a')}
  })
  return result
}

export const getExistingColumns = (rowData:any)=>{
  return Object.keys(rowData)
}

export const getExistingColumnFields = (columns:string[],fields:Field[]):Field[]=>{
  const updatedFields:Field[] = []
  columns.map((c:string)=>{
    fields.find((f:Field)=>{
      if(f.key===c)updatedFields.push(f)
    })
  })
  return updatedFields
}

export const mapMasterToColumnGroupDefs = (existingColumnsFields:Field[],masterId:number,tasktype?:string, showApproveAllModal?:any,showRejectAllModal?:any,actionStatus?:string):ColGroupDef[] | ColDef[]=>{

  console.log(actionStatus)
  const colDefs =  existingColumnsFields.map((f:Field)=>{

    if(TaskPendingAvoidColumnsMapper[masterId].includes(f.key)){
      return{
        headerName:f.displayName,
        field:f.key,
        colId:f.key,
        hide:!f.visible,
        suppressSpanHeaderHeight: true,
        ...defaultColDefs
      }
    }

    if(tasktype==="add"){
      return{
        headerName:f.displayName,
        field:f.key,
        colId:f.key,
        hide:!f.visible,
        children:[
          {
            headerName:'Add ' +f.displayName,
            field:'Add'+f.key,
            colId:'Add'+f.key,
            cellStyle:{
              "color":'#BC3D81',
              "text-align":"center",
              "border-left":"solid 1px #B9B9B9",
            }
          }
        ],
        ...defaultColDefs,
        
      }
    }

    if(tasktype==="remove"){
      return{
        headerName:f.displayName,
        field:f.key,
        colId:f.key,
        hide:!f.visible,
        children:[
          {
            headerName:'Delete ' +f.displayName,
            field:'Delete'+f.key,
            colId:'Delete'+f.key,
            cellStyle:{
              "color":'#BC3D81',
              "text-align":"center",
              "border-left":"solid 1px #B9B9B9",
            }
          }
        ],
        ...defaultColDefs,
        
      }
    }

    return{
      headerName:f.displayName,
      field:f.key,
      colId:f.key,
      hide:!f.visible,
      children:[
        {
          headerName:'New ' +f.displayName,
          field:'New'+f.key,
          colId:'New'+f.key,
          cellStyle:{
            "color":'#BC3D81',
            "text-align":"center",
            "border-left":"solid 1px #B9B9B9",
          }
        },
        {
          headerName:'Old ' +f.displayName,
          field:'Old' +f.key,
          colId:'Old'+f.key,
          cellStyle:{
            "text-align":"center",
            "border-right":"solid 1px #B9B9B9"
          }
        }
      ],
      ...defaultColDefs,
      
    }
  })

  const taskPendingCustomColDefs :any[] = [
    {
        field:'action',
        colId:'action',
        headerName:'Action',
        children:[
            {
                headerComponent:TaskPendingActionHeader,
                headerComponentParams:{
                  showApproveAllModal:showApproveAllModal,
                  showRejectAllModal:showRejectAllModal,
                  actionStatus:actionStatus
                },
                cellRenderer:TaskPendingActionRenderer,
                width:300,
                cellStyle:{
                    "border-left":"solid 1px #B9B9B9"
                }
            }
            // {
            //     field:"reject",
            //     colId:'reject',
            //     headerName:"Reject All",
            //     headerCheckboxSelection:true,
            //     cellRenderer:TaskPendingRejectActionButton,
            //     width:150,
            //     cellStyle:{
            //         "border-right":"solid 1px #B9B9B9"
            //     }
            // }
        ],
        cellStyle: {
        "text-align": "center"
        },
        flex: 1,
    },
    {
        field:'status',
        colId:'status',
        headerName:'Status',
        suppressSpanHeaderHeight: true,
        cellStyle:{
            "border-right":"solid 1px #B9B9B9",
            "border-left":"solid 1px #B9B9B9",
            "text-align":'center'
        },
        flex:1,
        minWidth:100
    },
    {
        field:'comments',
        colId:'comments',
        headerName:'Comments',
        suppressSpanHeaderHeight: true,
        editable:true,
        ...defaultColDefs
    }
]

  return [
  //   {
  //   field:'checkbox',
  //   colId:'checkbox',
  //   headerName:'',
  //   checkboxSelection:true,
  //   headerCheckboxSelection:true,
  //   headerCheckboxSelectionCurrentPageOnly:true,
  //   width:10
  // }
  ...colDefs,...taskPendingCustomColDefs]
}

export const mapMasterToTaskStatusColumnGroupDefs = (existingColumnsFields:Field[],masterId:number,tasktype?:string):ColGroupDef[] | ColDef[]=>{

  const colDefs =  existingColumnsFields.map((f:Field)=>{


    if(tasktype==="add"){
      return{
        headerName:f.displayName,
        field:f.key,
        colId:f.key,
        hide:!f.visible,
        ...defaultColDefs,
        
      }
    }

    if(tasktype==="remove"){
      return{
        headerName:f.displayName,
        field:f.key,
        colId:f.key,
        hide:!f.visible,
        ...defaultColDefs,
        
      }
    }

    return{
      headerName:f.displayName,
      field:f.key,
      colId:f.key,
      hide:!f.visible,
      children:[
        {
          headerName:'New ' +f.displayName,
          field:'New'+f.key,
          colId:'New'+f.key,
          cellStyle:{
            "color":'#BC3D81',
            "text-align":"center",
            "border-left":"solid 1px #B9B9B9",
          }
        },
        {
          headerName:'Old ' +f.displayName,
          field:'Old' +f.key,
          colId:'Old'+f.key,
          cellStyle:{
            "text-align":"center",
            "border-right":"solid 1px #B9B9B9"
          }
        }
      ],
      ...defaultColDefs,
      
    }
  })

  return [...colDefs,...taskStatusCustomColDefs]
}


export const mapNewAndOldMasterRowDataToCustomRowData = (dirtyRowData:any[],existingColumnFields:Field[],taskType:string,masterId:number)=>{
  return dirtyRowData.map(entry => {

    if(taskType==='modify'){
      const oldData = JSON.parse(entry.old);
      const newData = JSON.parse(entry.new);
      
  
      const oldDataPrefixed:any = {};
      const newDataPrefixed:any = {};
  
  
      existingColumnFields.map((f:Field)=>{

        if(TaskPendingAvoidColumnsMapper[masterId].includes(f.key)){
          newDataPrefixed[f.key] = newData[f.key]
        }

       else{
        oldDataPrefixed[`Old${f.key}`] = oldData[f.key]
        newDataPrefixed[`New${f.key}`] = newData[f.key]
       }
      })
      return {
          ...oldDataPrefixed,
          ...newDataPrefixed,
          status:'',
          comments:''
      };
    }
    const data = entry;
    

    const dataPrefixed:any = {};



    existingColumnFields.map((f:Field)=>{
      
      if(taskType==='add'){
       if(!TaskPendingAvoidColumnsMapper[masterId].includes(f.key)){
        dataPrefixed[`Add${f.key}`] = data[f.key]
       }
       else{
        dataPrefixed[f.key] = data[f.key]
       }
      }
      else{
       if(!TaskPendingAvoidColumnsMapper[masterId].includes(f.key)){
        dataPrefixed[`Delete${f.key}`] = data[f.key]
       }
       else{
        dataPrefixed[f.key] = data[f.key]
       }
      }
    })
    return {
        ...dataPrefixed,
        status:'',
        comments:''
    };
   
});
}

export const mapTaskStatusDataToRowData = (dirtyRowData:any[],existingColumnFields:Field[],taskType:string)=>{

  return dirtyRowData.map(entry => {

    if(taskType==='modify'){
      const oldData = JSON.parse(entry.old);
      const newData = JSON.parse(entry.new);
      
  
      const oldDataPrefixed:any = {};
      const newDataPrefixed:any = {};
  
  
      existingColumnFields.map((f:Field)=>{


        oldDataPrefixed[`Old${f.key}`] = oldData[f.key]
        newDataPrefixed[`New${f.key}`] = newData[f.key]
        newDataPrefixed['status'] = oldData['Status']
        newDataPrefixed['comments'] = oldData['Comments']
       
      })
      return {
          ...oldDataPrefixed,
          ...newDataPrefixed
      };
    }
    const data = entry;
    

    const dataPrefixed:any = {};



    existingColumnFields.map((f:Field)=>{
      dataPrefixed['status'] = data['Status']
      dataPrefixed['comments'] = data['Comments']
      
      if(taskType==='add'){
 
        dataPrefixed[f.key] = data[f.key]
       
       
      }
      else{
       
        dataPrefixed[f.key] = data[f.key]
       
      }
    })
    return {
        ...dataPrefixed
    };
   
});
}


export const getActionName = (id:number):DraftActionType=>{
  console.debug(id)
  if(id===1)return {id:1,label:'add',value:'add'}
  if(id===2)return {id:2,label:'view-modify',value:'modify'}
  if(id===3)return {id:3,label:'delete',value:'remove'}
  throw new Error('Invalid action id')
}

export const getActionId = (actionName:string):DraftActionType=>{
  if(actionName==="add")return {id:1,label:'add',value:'add'}
  if(actionName==="view-modify" || actionName==="modify")return {id:2,label:'view-modify',value:'modify'}
  if(actionName==="delete")return {id:3,label:'delete',value:'remove'}
  throw new Error('Invalid action Name')
}


export const createMastersStateFromDraftData = (draftData:any[],fields:Master[]):MDMMasterState[]=>{

  const masters:MDMMasterState[] = []
  draftData.map((master)=>{
    const existingMaster = fields.find((m:Master)=>m.id==master.MasterId)
   if(existingMaster){
    masters.push({
      id:existingMaster.id,
      name:existingMaster.name,
      colDefs:master.GridState.length>0?JSON.parse(master.GridState):mapMasterToColumnDefs(existingMaster.fields,existingMaster.id),
      rowData:master.DataMaster || [],
      filters:[{
        id:generateRandomId(),
        masterId:existingMaster.id,
        field:'',
        operator:'',
        text:''
      }],
      progress:master.Status,
      fields:existingMaster.fields
    })
   }
  })
  return masters
}
export const getUploadModalRadioButtons = (masterId:number)=>{
  if(masterId==11 || masterId==12){
    return [
      {
        label:'Absolute Value',
        value:11
      },
      {
        label:'Delta Percentage',
        value:12
      }
    ]
  }
  if(masterId==7 || masterId==8 || masterId==9){
    return [
      {
        label:'Phase Out',
        value:7
      },
      {
        label:'Phase In Phase Out',
        value:8
      },
      {
        label:'Target Norm',
        value:9
      }
    ]
  }
  return []
}
export const getDatesBetween = (startDate:Date, endDate:Date) => {
  const currentDate = new Date(startDate.getTime());
  const dates = [];
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export const getFormattedDate = (date:Date) => {
  const splitDateArray = date.toDateString().split(' ');
  return `${splitDateArray[2]} ${splitDateArray[1]} ${date.getFullYear()}`
}

export const generateSesonalityChartData = (row:any,data:any) => {
  let maxNorm = 0;
  let maxStockAndGit = 0;
  data.norm.forEach((o:NormHistory)=>{
    const localMaxima = Math.max(+o.old_norm,+o.new_norm)
    if(maxNorm < localMaxima){
      maxNorm = localMaxima;
    }
  })
  data.dailyData.forEach((o:DailyData)=>{
    const stockAndGit = parseInt(o.stock,10) + parseInt(o.git,10)
    if(maxStockAndGit < stockAndGit){
      maxStockAndGit = stockAndGit;
    }
  })
  const maxQuantity = Math.max(maxNorm,maxStockAndGit);
  // const xAxisLabels = data.dailyData.map((o:DailyData)=>getFormattedDate(new Date(o.date)));
  const xAxisLabels = getDatesBetween(new Date(data.dailyData[0].date),new Date(row.ed));
  // const xAxisLabels = genedata.dailyData.map((o:DailyData)=>new Date(o.date));
  const xAxisLablesFormatted = xAxisLabels.map((date:Date)=>getFormattedDate(date));
  const seasonalityDates = getDatesBetween(new Date(row.sd),new Date(row.ed));

  const buildUpDuration = getDatesBetween(subDays(new Date(row.sd),row.bd),new Date(row.sd));

  const buildUpDurationData = xAxisLabels.map((date:Date)=>{
    if(buildUpDuration.find((sd:Date) => +sd === +date)) return maxQuantity;
    return undefined;
  })

  const rlt = getDatesBetween(xAxisLabels[0],addDays(xAxisLabels[0],parseInt(row.r,10)));

  const rltData = xAxisLabels.map((date:Date)=>{
    if(rlt.find((sd:Date) => +sd === +date)) return maxQuantity;
    return undefined;
  })
  

  const seasonData = xAxisLabels.map((date:Date)=>{
    if(seasonalityDates.find((sd:Date) => +sd === +date)) return maxQuantity;
    return undefined
  })

  const stockData = data.dailyData.map((o:DailyData)=>{
    return parseInt(o.stock,10)
  })
  
  const gitData = data.dailyData.map((o:DailyData)=>{
      return parseInt(o.git,10) 
  })

  const pointRadius:any[] = [];
  let tempNorm = 0; //used for filling data when norm not changed in below function
  const normData = data.dailyData.map((d:DailyData)=>{
    const closestNormChange:NormHistory = data.norm.find((o:NormHistory)=>+(new Date(o.date)) === +(new Date(d.date)));
    if(closestNormChange) {
      tempNorm = parseInt(closestNormChange.new_norm,10);
      pointRadius.push(5);
      return parseInt(closestNormChange.new_norm,10)
    }
    pointRadius.push(0)
    return tempNorm;
  })

  console.log(buildUpDurationData)
  
  const chartData = {
    labels:xAxisLablesFormatted,
    datasets: [
      {
        type: 'line' as const,
        label: 'Norm',
        borderColor: '#002060',
        borderWidth: 3,
        data: normData,
        pointBackgroundColor: "#00B0F0",
        pointStyle:'circle',
        pointRadius:pointRadius,
      },
      {
        type: 'line' as const,
        label: 'Season',
        borderWidth: 0,
        fill:{
          target:'origin',
          above:'rgba(207, 167, 187, 0.4)'
        },
        data: seasonData,
        pointRadius:0,
        pointStyle:'rect',
      },
      {
        type: 'line' as const,
        label: 'BuildUpDuration',
        borderWidth: 0,
        fill:{
          target:'origin',
          above:'rgba(127, 0, 255, 0.4)'
        },
        data: buildUpDurationData,
        pointRadius:0,
        pointStyle:'rect',
        pointBackgroundColor: "rgba(127, 0, 255, 0.4)",
      },
      {
        type: 'line' as const,
        label: 'RLT',
        borderWidth: 0,
        fill:{
          target:'origin',
          above:'rgba(9, 38, 53, 0.4)'
        },
        data: rltData,
        pointRadius:0,
        pointStyle:'rect',
        pointBackgroundColor: "rgba(9, 38, 53, 0.4)",
      },
      {
        type: 'bar' as const,
        label: 'Stock',
        backgroundColor: '#E33A3A',
        data: stockData,
        stack:'bar',
        pointStyle:'rect',
        pointHitRadius:0
      },
      {
        type: 'bar' as const,
        label: 'GIT',
        backgroundColor: '#52B735',
        data: gitData,
        stack:'bar',
        pointStyle:'rect',
        pointHitRadius:0
      },
    ],
  };

  return chartData;
}


export const createSubmitMasterPayload = (master:any,action:string)=>{
  return {
    id:parseInt(master.id),
    action:action,
    data:master.rowData
  }
}

export const navigateWithPrompt = (onRouteChange:()=>void,url:any,state:any,resetState:any) => {
    
    if(!mdmRoutes.includes(url)){
      if(state.activeMaster.id === 0){
        onRouteChange();
      }
      else{
        if(confirm("Are you sure you want to leave this page?")) {
          onRouteChange();
          resetState()
         }
      } 
    }
    else{
      onRouteChange();
    }
   
}  


export const createTaskPendingSubmitPayload = (rowData:any[],actionType:number):any[]=>{
  console.log(actionType)
  const  result:any[] = []

  rowData.forEach((item) => {
    // Create a new object to store modified key-value pairs
    const  newItem:any = {};

    // Iterate through each key-value pair in the object
    Object.entries(item).forEach(([key, value]) => {
      // Check if the key starts with "Oldc"

      if(key==='status'){
        return newItem[key] = value==="Approved"?"3":"4"
      }

     if(actionType===2){
      if (key.startsWith("Old")) {
        // Skip keys with prefix "Oldc"
        return;
      }
      newItem[key.replace("New", "")] = value;
     }

     if(actionType===1){
      newItem[key.replace("Add", "")] = value;
     }

     if(actionType===3){

      newItem[key.replace("Delete", "")] = value;
     }

      // Remove the "Newc" prefix from the key and store the value in the new object
      
    });

    // Add the modified object to the result array
    result.push(newItem);
  });

  return result
}