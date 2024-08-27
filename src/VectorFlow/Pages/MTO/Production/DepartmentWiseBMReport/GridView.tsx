import VFTable from '../../Common/VFTable';
import { VFWrapper } from './styles';
import { SaveBtnWrapper, SaveBtn } from '../../Poogi/ReasonOrderChange/styles';
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import { pagination } from '../../Common/Enum';
interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
    reference?: any
    updateReason?: () => void
    handlePageChange: (e: any) => any
    totalRow?: any
    currentPage?: any,
    saveBtn?: boolean
}

const GridView = ({
    agGridProps,
    columDef,
    convercolumnDef,
    reference,
    updateReason,
    handlePageChange,
    totalRow,
    currentPage,
    saveBtn = true }: GridProps) => {
    return (
        <>
            <VFWrapper>
                <VFTable
                    {...agGridProps}
                    pagination={false}
                    columnDefs={columDef}
                    rowData={convercolumnDef}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    //detailRowHeight={400}
                    rowSelection={'multiple'}
                    tooltipMouseTrack={true}
                    //defaultColDef={{maxWidth:150}}
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
            </VFWrapper>
            <VFPagination
                selectedRows={0}
                rowsPerPage={pagination.mtoPageSize}
                totalRows={totalRow}
                currentPage={currentPage}
                handleChangePage={handlePageChange}
            />
            {
                saveBtn && (
                    <SaveBtnWrapper style={{ margin: '0px 5px 10px' }}>
                        <SaveBtn onClick={updateReason}>
                            Save Remark
                        </SaveBtn>
                    </SaveBtnWrapper>
                )
            }
        </>
    )
}

export default GridView