import React, { useEffect, useMemo, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { SaveBtnWrapper, SaveBtn } from './styles';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetReasonForDelayOrder } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import { toast } from 'react-toastify';
import { notifyError, notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import { AgGridReactProps } from 'ag-grid-react';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import RemarkHistoryRenderer from '../../Production/DepartmentWiseBMReport/RemarkHistoryRenderer';

const ReasonForDelayOrder = () => {
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getPoogiReasonsDelayedOrder, isLoading } = useGetReasonForDelayOrder();
    const [HeaderData, setHeaderData] = useState<any>([{}]);
    const [rowData, setRowData] = useState<any>();
    const [isWIPChecked, setWIPCheck] = useState<boolean>(true);
    const reportName = 'ReasonForDelayedOrders';

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

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
            //components: customCellRenderers,
            pagination: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                //suppressFiltersToolPanel:true,
                cellStyle: {
                    'text-align': 'center',
                    //'height': '50px',
                    //"font-style": "Roboto",
                    //"font-variant": "normal",
                    "font-size": "18px",
                    "font-family": "Roboto",
                    'white-space': 'nowrap',
                    'resizable': 'true',
                    'color': '#000'
                },
                floatingFilterComponentParams: {
                    suppressFilterButton: true
                }
            },
        },
        sideBar: sideBar,
        masterDetail: true,
        //detailCellRenderer: RowGroupRenderer,
        //detailCellRendererParams:RowGroupRenderer,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false
    };


    const getHeaderData = async () => {
        try {
            const response = await getUIConfigData(reportName);
            // console.log('response==',response?.data?.data)
            setHeaderData(response.data.data);

        }
        catch (e) {
            console.log(e);
        }
    }

    const getInitialData = async (wipval: boolean) => {
        try {
            console.log('wipval',wipval)
            setWIPCheck(wipval)
            const apiResponse = await getPoogiReasonsDelayedOrder(wipval === true ? 0 : 1);
            setRowData(apiResponse?.data?.data?.results)
        }
        catch (e) {
            console.log(e)
        }
    }

    const customHeader = {
        RemarksHistory: {
            pinned: "right",
            minWidth: 120,
            lockPosition: true,
            cellRenderer:RemarkHistoryRenderer
        },
        MajorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 120,

        },
        MinorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 120,
        },
    }

    const columnDef = getColumnDefinations(HeaderData, customHeader);

    useEffect(() => {
        getHeaderData();
        getInitialData(true);
    }, [])

    useEffect(() => {
        if (isLoading) {
            toast.dismiss();
            notifyLoader("Loading Data ...")
        }
        else {
            toast.dismiss();
        }
    }, [isLoading,isWIPChecked])

    if (!rowData) {
        return null;
    }

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    return (
        <div style={{ zoom: 1.2 }}>
            <MTOActionToolBar
                quickFilter={
                    <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox checked={isWIPChecked} onChange={(e) => getInitialData(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>
                            Show order with available WIP Only
                        </strong>
                    </div>
                }
                isAddFilterButton
                isExcelExport
            />
            <VFTable
                {...agGridProps}
                height='750px'
                columnDefs={columnDef}
                rowData={rowData}
            />
            <SaveBtnWrapper>
                <SaveBtn>
                    Save Reasons
                </SaveBtn>
            </SaveBtnWrapper>

        </div>
    )
}

export default ReasonForDelayOrder;