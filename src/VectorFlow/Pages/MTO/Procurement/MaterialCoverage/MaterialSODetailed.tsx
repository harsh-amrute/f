import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

interface MaterialSODetailedProps {
    parameterData: any
}

const MaterialSODetailed = ({ parameterData }: MaterialSODetailedProps) => {
    const {
        columnDef,
        agGridProps,
        RRRRowData
    } = useMaterialSO(parameterData);
    return (
        <>

            <ProcurementLayout>
                <VFTable
                    {...agGridProps}
                    columnDefs={columnDef}
                    rowData={RRRRowData}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={'1000px'}
                />
            </ProcurementLayout>
        </>
    )
}

export default MaterialSODetailed

