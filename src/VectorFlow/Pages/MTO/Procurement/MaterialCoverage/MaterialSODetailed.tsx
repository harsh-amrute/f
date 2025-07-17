import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../Common/VFTable';
import VFPagination from '../../Common/VFPagination';
import OverlayLoader from '../../Common/Loader';
import { pagination } from '../../Common/Enum';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard';
import { useUserData } from "../../../../../context"


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
    childrenModal: any,
    setChildrenModal: any,
    excelBody:any,
    
}

    const MaterialSODetailed = forwardRef(({ isUpdateUserConfig, isGetUserConfig, parameterData, setCurrentGridRef, currentGridRef, columnState, colDef,appliedFilters,handleSaveClick,userConfigFetched,userPageSize,setUserPageSize,childColDef, showExcelModal, setShowExcelModal, childrenModal, excelBody}: MaterialSODetailedProps, ref) => {
    const {
        agGridProps,
        RRRRowData,
        isLoading,
        rowDataCount,
        handlePageChangeOnHook,
        currentPage,
        ExcelExportData,
        savePageSize,
        getInitialData,

    } = useMaterialSO(parameterData, appliedFilters,handleSaveClick,userConfigFetched,userPageSize,setUserPageSize,childColDef,setShowExcelModal,childrenModal ,excelBody  );
        const gridRef = useRef<any>(null);
        
            const {user} = useUserData();
            const themeUi = user?.user?.theme_ui

    const [isDisabled, setIsDisabled]= useState<boolean>(true);
    

    useImperativeHandle(ref, ()=>({
        getExcelExport: (body : any)=>{
            console.log('materail so ',body)
            ExcelExportData(body);
        }
    }))

    const handlePageChange = (currPage: number) => {
        handlePageChangeOnHook(currPage, false, {}, userPageSize);
    }
    //Excel Export POC 

    // useEffect(() =>{
    //     if(colDef){
    //         axios.put("http://10.8.1.10:9000/getOpenSODetailsData/?Color=Black,Red,Yellow&KitStatus=NK&S=0&E=0&export=1&report_name=kuchbh", {
    //             headers: colDef.map((col: any)=>{
    //                 return {
    //                     hd: col.headerName,
    //                     scc: col.field,
    //                 }
    //             }).filter((col: any)=> {
    //                 return col.hd != undefined && col.hide != false
    //             })
    //         },{
    //             headers:{
    //                 'Content-Type': 'application/json',
    //             },
    //             responseType: "blob"
    //         }).then((data: any)=>{
    //             console.log(data);
    //             const blob = data.data
    //             console.log(blob);
    //             const url = URL.createObjectURL(blob)

    //                 // Trigger download
    //                 const link = document.createElement('a')
    //                 link.href = url
                   
    //                 link.setAttribute('download', `ReportFile.xlsx`)
    //                 document.body.appendChild(link)
    //                 link.click()
    //                 // Clean up download URL
    //                 URL.revokeObjectURL(url)
    //             // Create download URL for blob object
    //             ;
    //         })
    //     }
        
    // }, [colDef])

    useEffect(()=>{ 
        
        if (columnState?.length && colDef.length > 0 && currentGridRef?.current) {
       
            const result = currentGridRef?.current?.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });

            if (!result) {
                console.error('Failed to apply column state');
            }
        }

    },[columnState,currentGridRef?.current]);
    
    return (
        <>
            {
                (isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
            }
            <ProcurementLayout style={{ marginLeft: '25px', flex: "1" }}>

                <VFTable
                    {...agGridProps}
                    columnDefs={colDef}
                    rowData={RRRRowData}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    // height={'780px'}
                    ref={gridRef}
                    onGridReady={(params: any) => {
                        params.api.autoSizeAllColumns();
                        setCurrentGridRef(gridRef);
                    }}
                    paginationPageSize={pagination.mtoPageSize}
                    pagination={false}
                    maintainColumnOrder
                    onFilterChanged={()=>{Object.keys((gridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}

                />
                   <VFModalCard
          openModal={showExcelModal}
          closeModal={() => setShowExcelModal(false)}
          headerText="Excel Export Bomb Confirmation"
          headerIcon=""
          headerBgColor="white"
          headerTextColor="black"
          closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
          paddingLeftAndRight={27}
        >
          <div
            style={{
              fontSize: "16px",
              padding: "1rem",
              textAlign: "center",
              height: "125px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Do you want to download Excel with BOMB data?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "13px",
              padding: "15px 1.5rem 15px 1.5rem",
              boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.06)",
            }}
          >
            <VFButtonOutline
              themeUi={themeUi}
              onClick={() => {
                setShowExcelModal(false);
                getInitialData(0, true,excelBody,userPageSize,1)

              }}
            >
              Yes
            </VFButtonOutline>
            <VFButton
              themeUi={themeUi}
              onClick={() => {
                setShowExcelModal(false);
                getInitialData(0, true,excelBody,userPageSize,0)

              }}
            >
              No
            </VFButton>
          </div>
        </VFModalCard>
                <VFPagination
                    selectedRows={0}
                    resetGridRef={gridRef}
                    isDisabled={isDisabled}
                    rowsPerPage={userPageSize || pagination.mtoPageSize}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                    customPageSizeEnabled={true}
                    savePageSize={savePageSize}
                    userPageSize = {userPageSize}
                />
            </ProcurementLayout>
        </>
    )
})

export default MaterialSODetailed

