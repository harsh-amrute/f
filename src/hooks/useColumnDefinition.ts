import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store/store";
import { CellRenderersMapping, filterParams, getCellDataType, getCellFilter, mergeObjects } from "../helpers/utils";

export function useColumnDefinitionsMTA (
    fields: any,
    customizationParams: any = {},
    extraFields: any = [],
    removeCols: any = [],
  ) {
    const EnvConfig = useSelector((state:RootState) =>state.mta.EnvConfig);
  const NUMBER_FORMAT = EnvConfig['NUMBER_FORMAT'];   
  const columnDefs = fields?.map((data: any) => {
    const columnDef = {
      colId: data.Col_Code || data.colCode,
      headerName: data.Header || data.header,
      field: data.Col_Code || data.colCode,
      initialHide: !data.Visible,
      intialPinned: null,
      initialSort: null,
      sortIndex: null,
      aggFunc: null,
      rowGroup: false,
      rowGroupIndex: null,
      initialPivot: false,
      enablePivot: true,
      enableRowGroup:false,
      enableValue:true,
      pivotIndex: null,
     
      flex: 1,
      minWidth: 180,
      cellStyle: {
        justifyContent: data.CellAlignment
      },
      cellRenderer: CellRenderersMapping[data.Col_Code || data.colCode] !== undefined ? CellRenderersMapping[data.Col_Code || data.colCode] : 'string',
      cellDataType: getCellDataType(data.DataType),
      filter: getCellFilter(data.DataType),
      filterParams: filterParams,
      position: data.Col_Position,

      ...(getCellDataType(data.DataType) === 'number' && {
        valueFormatter: (params: any) => {
          const format = (NUMBER_FORMAT || '').toUpperCase();
          const locale = format === 'USA' ? 'en-US' : format === 'IND' ? 'hi-IN' : undefined;
          if(params.value == null || isNaN(params.value)) return ''
          else if(locale)  return params.value.toLocaleString(locale);
          return params.value;
          // return params.value == null || isNaN(params.value) ? '' : params.value;
        }
      })
    };
    // Apply customization if needed
    if (customizationParams[data.Col_Code || data.colCode]) {
      // Object.assign(columnDef, customizationParams[data.Col_Code]);
      mergeObjects(columnDef, customizationParams[data.Col_Code || data.colCode])
    }
    return columnDef;
  });
  
  // Add extra columns
  // If position is not specified or invalid, add the column at the end
  extraFields?.forEach((field: any) => {
    const position = field.position;
    if (
      position === undefined ||
      position < 0 ||
      position > columnDefs.length
    ) {
      field.position = columnDefs.length;
    }
  });
  
  //add extraFields in columnDefs
  columnDefs.push(...extraFields);

  //sort all column accordinglly position 
  columnDefs.sort((a: any, b: any) => a.position - b.position);

  //remove columns matching "removeCols"
  const finalcolDef = columnDefs?.filter((obj: any) => !removeCols?.includes(obj.colId));
console.log("COLDEFF",finalcolDef);

  return finalcolDef;

}