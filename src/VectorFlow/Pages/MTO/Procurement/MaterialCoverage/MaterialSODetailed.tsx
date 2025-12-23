import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../Common/VFTable';
import VFPagination from '../../Common/VFPagination';
import OverlayLoader from '../../Common/Loader';
import { pagination } from '../../Common/Enum';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useUserData } from "../../../../../context"
import BomExcelModal from '../../Common/BomExcelModal';
import { SideBarDef } from 'ag-grid-enterprise';


interface MaterialSODetailedProps {
    parameterData: any,
    setCurrentGridRef: any,
    currentGridRef: any,
    columnState: any,
    colDef: any,
    isUpdateUserConfig: any,
    isGetUserConfig: any,
    appliedFilters:any,
    handleSaveClick:any,
    userConfigFetched:any,
    userPageSize:any,
    setUserPageSize:any
    childColDef: any
    showExcelModal: any,
    setShowExcelModal: any,
    excelBody:any,
}

    const MaterialSODetailed = forwardRef(({ isUpdateUserConfig, isGetUserConfig, parameterData, setCurrentGridRef, currentGridRef, columnState, colDef,appliedFilters,handleSaveClick,userConfigFetched,userPageSize,setUserPageSize,childColDef, showExcelModal, setShowExcelModal, excelBody}: MaterialSODetailedProps, ref) => {
    // const {
    //     agGridProps,
    //     RRRRowData,
    //     isLoading,
    //     rowDataCount,
    //     handlePageChangeOnHook,
    //     currentPage,
    //     savePageSize,
    //     getInitialData,

    // } = useMaterialSO(parameterData, appliedFilters,handleSaveClick,userConfigFetched,userPageSize,setUserPageSize,childColDef);
    //     const gridRef = useRef<any>(null);
        
    //         const {user} = useUserData();
    //         const themeUi = user?.user?.theme_ui

    // const [isDisabled, setIsDisabled]= useState<boolean>(true);
    

    

    // const handlePageChange = (currPage: number) => {
    //     handlePageChangeOnHook(currPage, false, {}, userPageSize);
    // }
    // //Excel Export POC 

    // // useEffect(() =>{
    // //     if(colDef){
    // //         axios.put("http://10.8.1.10:9000/getOpenSODetailsData/?Color=Black,Red,Yellow&KitStatus=NK&S=0&E=0&export=1&report_name=kuchbh", {
    // //             headers: colDef.map((col: any)=>{
    // //                 return {
    // //                     hd: col.headerName,
    // //                     scc: col.field,
    // //                 }
    // //             }).filter((col: any)=> {
    // //                 return col.hd != undefined && col.hide != false
    // //             })
    // //         },{
    // //             headers:{
    // //                 'Content-Type': 'application/json',
    // //             },
    // //             responseType: "blob"
    // //         }).then((data: any)=>{
    // //             console.log(data);
    // //             const blob = data.data
    // //             console.log(blob);
    // //             const url = URL.createObjectURL(blob)

    // //                 // Trigger download
    // //                 const link = document.createElement('a')
    // //                 link.href = url
                   
    // //                 link.setAttribute('download', `ReportFile.xlsx`)
    // //                 document.body.appendChild(link)
    // //                 link.click()
    // //                 // Clean up download URL
    // //                 URL.revokeObjectURL(url)
    // //             // Create download URL for blob object
    // //             ;
    // //         })
    // //     }
        
    // // }, [colDef])

    // useEffect(()=>{ 
        
    //     if (columnState?.length && colDef.length > 0 && currentGridRef?.current) {
       
    //         const result = currentGridRef?.current?.api.applyColumnState({
    //             state: columnState,
    //             applyOrder: true
    //         });

    //         if (!result) {
    //             console.error('Failed to apply column state');
    //         }
    //     }

    // }, [columnState, currentGridRef?.current]);
      
    //   const handleExcelConfirm = () => {
    //     setShowExcelModal(false);
    //     getInitialData(0, true,excelBody,userPageSize,1)  
    //   }

    //   const handleExcelCancel = () => {
    //     setShowExcelModal(false);
    //     getInitialData(0, true,excelBody,userPageSize,0) 
    //     }
        
    //  const sideBar:SideBarDef = {
    //         toolPanels: [
    //           {
    //             id: "columns",
    //             labelDefault: "Columns",
    //             labelKey: "columns",
    //             iconKey: "columns",
    //             toolPanel: "agColumnsToolPanel",
    //             toolPanelParams: {
    //                 suppressPivots: true,
    //                 suppressPivotMode: true,
    //                 suppressRowGroups: true,
    //                 suppressValues: true,
    //               },
    //           },
    //         ],
    //         defaultToolPanel:'',
    //       }
    
    
    return (
        <div>Material SO Detailed Component</div>
        // <>
        //     {
        //         (isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
        //     }
        //     <ProcurementLayout style={{ marginLeft: '25px', flex: "1" }}>

        //         <VFTable
        //             {...agGridProps}
        //             columnDefs={colDef}
        //             rowData={RRRRowData}
        //             tooltipHideDelay={100000}
        //             tooltipShowDelay={0}
        //             tooltipMouseTrack={true}
        //             // height={'780px'}
        //             sideBar={
        //                sideBar
        //             }
        //             ref={gridRef}
        //             onGridReady={(params: any) => {
        //                 params.api.autoSizeAllColumns();
        //                 setCurrentGridRef(gridRef);
        //             }}
                    
        //             paginationPageSize={pagination.mtoPageSize}
        //             pagination={false}
        //             maintainColumnOrder
        //             onFilterChanged={()=>{Object.keys((gridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}

        //         />
        //         <BomExcelModal
        //             open={showExcelModal}
        //             onClose={() => setShowExcelModal(false)}
        //             onConfirm={handleExcelConfirm}
        //             onCancel={handleExcelCancel}
        //             themeUi={themeUi}
        //             headerText={"Excel Export"}
        //             messageText={"Do you want to download Excel with RM/PM details?"}
        //         />

        //         <VFPagination
        //             selectedRows={0}
        //             resetGridRef={gridRef}
        //             isDisabled={isDisabled}
        //             rowsPerPage={userPageSize || pagination.mtoPageSize}
        //             totalRows={rowDataCount}
        //             currentPage={currentPage}
        //             handleChangePage={handlePageChange}
        //             customPageSizeEnabled={true}
        //             savePageSize={savePageSize}
        //             userPageSize = {userPageSize}
        //         />
        //     </ProcurementLayout>
        // </>
    )
})

export default MaterialSODetailed

