import React, { useMemo, useState } from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from './styles';
import { AgGridReactProps } from 'ag-grid-react';
//import { ColDef } from 'ag-grid-enterprise'

import { deptwiseBMReportData, DeptWiseBMReport, RemarkHistoryData } from './DeptWiseBMReportData';
import GridView from './GridView';
import { Allotment } from 'allotment';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import useViewPort from '../../../../../hooks/useViewPort';
import OrderElapsedGrid from './OrderElapsedGrid';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import AgeingCellRenderer from './AgeingIconCellRenderer';
import customCellRenderer from './CustomCellRenderer';
import RowGroupRenderer from './RowGroupRenderer';
import TextBoxCellRenderer from './TextBoxCellRenderer';
import RemarkHistoryRenderer from './RemarkHistoryRenderer';
import BPRRemarkHistoryModal from './MTORemarkHistoryModal';

const DptWiseBMReport = () => {

    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "AgeingCellRenderer": AgeingCellRenderer,
            // "availabilityToolTip": AvailabilityToolTip,
            "customCellRenderer": customCellRenderer,
            "TextBoxCellRenderer": TextBoxCellRenderer,
            "RemarkHistoryRenderer": RemarkHistoryRenderer
        }), []);



    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },

            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            components: customCellRenderers,
            pagination: true,
            defaultColDef: {
                cellStyle: {
                    'text-align': 'center',
                    'height': '50px',
                    "font-style": "normal",
                    "font-variant": "normal",
                    "font-weight": "300",
                    "font-size": "20px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },
            },

        },
        masterDetail: true,
        detailCellRenderer: RowGroupRenderer,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,


    };

    const { screenHeight } = useViewPort()
    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'DeptWiseBMReport'}
                    isAddFilterButton
                    isExcelExport
                    isWIPCheckBox
                    onDateChange={() => { console.log('') }}
                    submitDate={() => { console.log('') }}
                />
            </BMDepHeaderWraper>

            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 145, margin: '0' }}>
                    <Allotment vertical={true} separator={true}   >
                        <Allotment.Pane preferredSize={'60%'}>
                            <BTRAllomentSection>
                                <GridView agGridProps={agGridProps} columDef={DeptWiseBMReport(() => setIsRemarkHistoryOpen(true))} convercolumnDef={deptwiseBMReportData} />
                            </BTRAllomentSection>
                        </Allotment.Pane>

                        <Allotment.Pane preferredSize={'50%'}>
                            <BTRAllomentSection>
                                <OrderElapsedGrid isTrue={true} />
                            </BTRAllomentSection>
                        </Allotment.Pane>
                    </Allotment>
                </BTRTableWrapper>
            </HorizontalViewWrapper>

            <BPRRemarkHistoryModal
                data={RemarkHistoryData}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />

        </BMDepWrapper>


    )
}

export default DptWiseBMReport;