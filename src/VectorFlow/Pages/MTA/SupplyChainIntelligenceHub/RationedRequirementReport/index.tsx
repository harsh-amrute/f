import {RRRLayout} from './styles'
import useRRR from './useRRR';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'



const RRR = () => {

 const { RRRColumns,agGridProps,RRRRowData, isLoading,handleChangePage,RRRDataCount,currentPage} = useRRR();
  
 if(isLoading){
  return(
    <VFLoader/>
  )
 }



  return (
    <RRRLayout>
        {/* <RRRTaskBar style={{width:isSideBarOpen? '77%':'97%'}}>
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
            <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Reset Filter
            </VFButton>
        </RRRTaskBar> */}
        <div style={{height:'100vf'}}>

          <VFTable
                  {...agGridProps}
                  columnDefs={RRRColumns}
                  rowData={RRRRowData}
              />  
              <VFPagination 
                selectedRows={0} 
                totalRows={RRRDataCount} 
                currentPage={currentPage} 
                rowsPerPage={50}
                handleChangePage={(e)=>handleChangePage(e)} 
              />  
        </div>
    </RRRLayout>
  )
}

export default RRR