import React, { useEffect, useRef } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { VFWrapper } from './styles';

interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
}

const GridView = ({ agGridProps, columDef, convercolumnDef }: GridProps) => {

    const gridRef = useRef();

  
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
                    ref={gridRef}
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
                />
            </VFWrapper>
        </>
    )
}

export default GridView