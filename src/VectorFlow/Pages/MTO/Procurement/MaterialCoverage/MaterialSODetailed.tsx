import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

const MaterialSODetailed = () => {
    const { columnDef,
        agGridProps, RRRRowData } = useMaterialSO();
    return (
        <>
            <div>
                <ProcurementLayout>
                    <VFTable
                        {...agGridProps}
                        columnDefs={columnDef}
                        rowData={RRRRowData}
                        tooltipHideDelay={100000}
                        tooltipShowDelay={0}
                        tooltipMouseTrack={true}
                    />
                </ProcurementLayout>
            </div>



        </>
    )
}

export default MaterialSODetailed

