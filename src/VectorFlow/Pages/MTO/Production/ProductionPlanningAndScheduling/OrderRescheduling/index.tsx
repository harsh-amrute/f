import React, { useState } from 'react'
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRLayoutTabsWrapper } from '../../../Procurement/MaterialCoverage/styles'
import { ApplyZoomOut } from './styles'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import columnData from '../../../Procurement/InsightsAndTrends/RMPMOrderwiseCoverage/ColumnData'
import { VFTableWrapper } from '../../../../../../components/VectorFLOW/commons/VFTable/styles'
import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton'
import { useUserData } from './../../../../../../context'


const user = { user: { them_ui: 'pure' } }


const OrderRescheduling = () => {
    const [currTab, setCurrTab] = useState('Unschedule');
    const tabs = [{ label: 'Unschedule', value: 'Unschedule', id: 'Unschedule' },
    { label: 'Overwrite Due Date', value: 'Overwrite Due Date', id: 'Overwrite Due Date' }
    ]
    const [tableLoading, setTableLoading] = useState(true);

    const colDef = columnData;
    const rowData = [{}];
    return (
        <>
            <MTOActionToolBar comp={'orderReschedule'} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <ApplyZoomOut >

                        <VFFloatingTab
                            handleClick={(e) => setCurrTab(e.value)}
                            tabs={tabs}
                            defaultTab={0}
                        />

                    </ApplyZoomOut>
                </div>
                <div style={{ width: '100%' }}>
                    <VFTableWrapper height='480px' >

                        <VFTable
                            columnDefs={colDef}
                            rowData={rowData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            rowSelection="multiple"
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                    { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                                    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                                    { statusPanel: 'agAggregationComponent', align: 'left' },
                                ],
                            }}
                            onGridReady={() => { setTableLoading(false) }}
                            disableZoomScaling={true}
                            defaultColDef={{
                                floatingFilter: true,
                                filter: "agMultiColumnFilter",
                            }}
                            height={'480px'}
                        />
                    </VFTableWrapper>
                </div>
                <div style={{ position: 'fixed', bottom: 0 }}>

                    <div style={{ width: '100vw', height: '65px', padding: '30px 80px', background: 'white', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <ApplyZoomOut>
                            {
                                (currTab === 'Unschedule') ?
                                    <VFButton style={{ width: '150px' }} themeUi={user.user.them_ui} onClick={() => { console.log("Button clicked") }}>Unschedule</VFButton>
                                    :
                                    <VFButton style={{ width: '200px' }} themeUi={user.user.them_ui} onClick={() => { console.log("Button clicked") }}>Overwrite Due Date</VFButton>
                            }
                        </ApplyZoomOut>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderRescheduling