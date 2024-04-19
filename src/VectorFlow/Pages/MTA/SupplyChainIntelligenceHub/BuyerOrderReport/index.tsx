import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";

 import { BORLayout } from "./styles"
 import {useBOR} from "./useBOR"
 import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
 import ActionToolBar from "../Planning/ActionToolBar"

const BuyerOrderReport = ()=>{

    const {     
     isLoading,      
        BORColumns,
        agGridProps,
        rowData,       
        currentPage,
        recordCount,
        handleChangePage       
    } = useBOR()


    if(isLoading){
      return (
        <VFLoader/>
      )
    }

    return(
     <>
        <ActionToolBar view={'grid'} setCurrentTab={''} currCategory={'BOR'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')}/>
        <BORLayout>
            {/* <BORTaskBar style={{width:'74%'}}>
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
            </BORTaskBar> */}
            <div style={{height:'100vh'}}>
           
              <VFTable
               {...agGridProps}
                columnDefs={BORColumns}
                rowData={rowData}
             />
              <VFPagination 
                selectedRows={0} 
                totalRows={recordCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')} 
                handleChangePage={(e)=>handleChangePage(e)} 
              />
              
             </div>
            
        </BORLayout>
    </>
    )
}

export default BuyerOrderReport