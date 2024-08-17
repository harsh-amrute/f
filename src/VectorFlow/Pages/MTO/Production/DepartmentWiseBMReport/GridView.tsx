import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { VFWrapper } from './styles';
import { SaveBtnWrapper, SaveBtn } from '../../Poogi/ReasonOrderChange/styles';

interface GridProps {
    agGridProps: any
    columDef: any
    convercolumnDef: any
    reference: any
    updateReason:()=>void
}

const GridView = ({ agGridProps, columDef, convercolumnDef, reference,updateReason }: GridProps) => {


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
            <SaveBtnWrapper style={{margin:'0px 0px 10px'}}>
                <SaveBtn onClick={ updateReason}>
                    Save Remark
                </SaveBtn>
            </SaveBtnWrapper>
        </>
    )
}

export default GridView