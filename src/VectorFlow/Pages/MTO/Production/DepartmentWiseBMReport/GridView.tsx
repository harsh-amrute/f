import { VFWrapper } from './styles';
import { SaveBtnWrapper, SaveBtn } from '../../Poogi/ReasonOrderChange/styles';
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
// import { pagination } from '../../Common/Enum';
// import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFTable from '../../Common/VFTable';
import { memo } from 'react';
interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
    reference?: any
    updateReason?: () => void
    handlePageChange: (e: any) => any
    totalRow?: any
    currentPage?: any,
    saveBtn?: boolean,
    onGridReady?: any
}

const GridView = memo(({
    agGridProps,
    columDef,
    convercolumnDef,
    reference,
    updateReason,
    handlePageChange,
    totalRow,
    currentPage,
    onGridReady,
    saveBtn = true }: GridProps) => {

    const rowsPerPage = Number(process.env.REACT_APP_MTO_BM_REPORT_ROWS_PER_PAGE) || 500;

    return (
        <>
            <VFWrapper className="wrapper-overall">
                <VFTable
                    {...agGridProps}
                    maintainColumnOrder
                    pagination={false}
                    columnDefs={columDef}
                    rowData={convercolumnDef}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    //detailRowHeight={400}
                    rowSelection={'multiple'}
                    detailRowAutoHeight
                    tooltipMouseTrack={true}
                    //defaultColDef={{maxWidth:150}}
                    onGridReady = {()=>{
                        if(onGridReady){
                            onGridReady();
                        }
                    }}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                            {
                                statusPanel: 'agAggregationComponent',
                                statusPanelParams: {
                                    aggFuncs: ['avg', 'count', 'min', 'max', 'sum']
                                }
                            },
                        ],
                    }}
                    ref={reference}
                />
            <VFPagination
                selectedRows={0}
                rowsPerPage={rowsPerPage?rowsPerPage: 0}
                totalRows={totalRow?totalRow: 0}
                currentPage={currentPage?currentPage: 0}
                handleChangePage={handlePageChange}
            />
            </VFWrapper>
            {
                saveBtn && (
                    <SaveBtnWrapper style={{ margin: '1rem 0', padding: 0 }}>
                        <SaveBtn onClick={updateReason}>
                            Save Remark
                        </SaveBtn>
                    </SaveBtnWrapper>
                )
            }
        </>
    )
})

export default GridView