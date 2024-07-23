import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay';

interface MaterialSODetailedProps {
    parameterData: any
}

const MaterialSODetailed = ({ parameterData }: MaterialSODetailedProps) => {
    const {
        columnDef,
        agGridProps,
        RRRRowData,
        isLoading

    } = useMaterialSO(parameterData);
    return (
        <>

            {
                isLoading && (
                    <VFOverlay>
                        <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>Loading....</h1>
                    </VFOverlay>
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
                />
            </ProcurementLayout>
        </>
    )
}

export default MaterialSODetailed

