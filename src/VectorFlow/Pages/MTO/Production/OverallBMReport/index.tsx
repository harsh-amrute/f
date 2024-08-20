import React from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from '../DepartmentWiseBMReport/styles';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import { Allotment } from 'allotment';

import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
import useViewPort from '../../../../../hooks/useViewPort';

const OverallBmReport = () => {
    const { screenHeight } = useViewPort();
    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'DeptWiseBMReport'}
                    isAddFilterButton
                    isExcelExport
                    quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        {/* <Checkbox checked={isWIPChecked} onChange={(e) => getInitialGridData(e.target.checked, 1)} theme={themeUi} />  */}
                        &nbsp;&nbsp; <strong>Show order with available WIP Only</strong></div>}
                />
            </BMDepHeaderWraper>

            <HorizontalViewWrapper style={{ marginTop: '0px' }}>
                <BTRTableWrapper style={{ height: screenHeight + 100, margin: '0' }}>
                    <Allotment vertical={true} separator={true} >
                        <Allotment.Pane preferredSize={'60%'}>
                            <BTRAllomentSection>
                                {/* <GridView
                                    reference={refGraph1}
                                    agGridProps={agGridProps}
                                    columDef={colDeflatest}
                                    convercolumnDef={gridData}
                                    updateReason={() => handleUpdateReason()}
                                    handlePageChange={(cp) => handlePageChange(cp)}
                                    totalRow={gridDataCount}
                                    currentPage={currentPage}
                                /> */}
                            </BTRAllomentSection>
                        </Allotment.Pane>

                        <Allotment.Pane preferredSize={'40%'}>
                            <BTRAllomentSection>
                                {/* <OrderElapsedGrid
                                    isTrue={isOrderElapsedGrid}
                                    data={deptWiseWipData}
                                    deptName={deptName}
                                    selectedOrderCount={refGraph1.current?.api.getSelectedRows().length}

                                /> */}
                            </BTRAllomentSection>
                        </Allotment.Pane>
                    </Allotment>
                </BTRTableWrapper>
            </HorizontalViewWrapper>

            {/* <BPRRemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            /> */}

        </BMDepWrapper>

    )
}

export default OverallBmReport