import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import OverlayLoader from '../../Common/Loader';

interface MaterialSODetailedProps {
    parameterData: any
}

const MaterialSODetailed = ({ parameterData }: MaterialSODetailedProps) => {
    const {
        columnDef,
        agGridProps,
        RRRRowData,
        isLoading,
        rowDataCount,
        handlePageChangeOnHook,
        currentPage
    } = useMaterialSO(parameterData);


    const handlePageChange = (currPage: number) => {
        handlePageChangeOnHook(currPage);
    }

    return (
        <div style={{ height: '100%' }}>
            {
                isLoading && (
                    <OverlayLoader />
                )
            }
            <ProcurementLayout style={{ marginLeft: '25px' }}>

                <VFTable
                    {...agGridProps}
                    columnDefs={columnDef}
                    rowData={RRRRowData}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={'780px'}
                    paginationPageSize={10}
                    pagination={false}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={10}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                />
            </ProcurementLayout>
        </div>
    )
}

export default MaterialSODetailed

