import React, { useRef } from 'react'
import { GridRef } from '../../../../../VectorFlow/types/MDM';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { VFWrapper } from './styles';

interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
    reference:any
}

const GridView = ({ agGridProps, columDef, convercolumnDef,reference }: GridProps) => {

  
    return (
        <>
            <VFWrapper>
                <VFTable
                    {...agGridProps}

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
                            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                            { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                            { statusPanel: 'agAggregationComponent', align: 'left' },
                        ],
                    }}
                    ref={reference}
                />
            </VFWrapper>
        </>
    )
}

export default GridView