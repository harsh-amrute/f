import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../Common/VFTable';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import OverlayLoader from '../../Common/Loader';
import { pagination } from '../../Common/Enum';

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
        <>
            {
                isLoading && (
                    <OverlayLoader />
                )
            }
            <ProcurementLayout style={{ marginLeft: '25px', flex: "1" }}>

                <VFTable
                    {...agGridProps}
                    columnDefs={columnDef}
                    rowData={RRRRowData}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    // height={'780px'}

                    paginationPageSize={pagination.mtoPageSize}
                    pagination={false}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={pagination.mtoPageSize}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                />
            </ProcurementLayout>
        </>
    )
}

export default MaterialSODetailed

