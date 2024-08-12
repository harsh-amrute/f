import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { SaveBtnWrapper, SaveBtn } from './styles';
import { getColumnDefinations } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetReasonForDelayOrder, useGetPoogiRemarks, usePutPoogiRemarks } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import { toast } from 'react-toastify';
import { notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import { AgGridReactProps } from 'ag-grid-react';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import RemarkHistoryRenderer from '../../Production/DepartmentWiseBMReport/RemarkHistoryRenderer';
import MTORemarkHistoryModal from '../../Production/DepartmentWiseBMReport/MTORemarkHistoryModal';

import CustomCellEditor from './MajorDropDownRenderer';


const ReasonForDelayOrder = () => {
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getPoogiReasonsDelayedOrder, isLoading } = useGetReasonForDelayOrder();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: updatePoogiRemarks } = usePutPoogiRemarks();
    const [HeaderData, setHeaderData] = useState<any>([{}]);
    const [rowData, setRowData] = useState<any>();
    const [isWIPChecked, setWIPCheck] = useState<boolean>(true);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);
    const [savebtn, setSaveBtn] = useState<boolean>(true);
    const reportName = 'ReasonForDelayedOrders';

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const agGridProps: AgGridReactProps = {
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
            pagination: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
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
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false
    };

    //to get the header data from api
    const getHeaderData = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response.data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    //to get the rowdata for Aggrid
    const getInitialData = async (wipval: boolean) => {
        try {
            setWIPCheck(wipval)
            const apiResponse = await getPoogiReasonsDelayedOrder(wipval === true ? 0 : 1);
            setRowData(apiResponse?.data?.data?.results)
        }
        catch (e) {
            console.log(e)
        }
    }

    //to handle the modal for remark
    const handleModal = async (data: any) => {
        try {
            if (data.r.length === 0) {
                const RemarkHistory = await getPoogIRemarks(data.ok)
                if (RemarkHistory.data?.data === 'No remarks are present for the order') {
                    data.r = []
                }
                else {
                    data.r = RemarkHistory.data?.data;
                }
            }
            setRemarkHistory(data.r)
            setIsRemarkHistoryOpen(true)
        }
        catch (e) {
            console.log(e);
        }

    }

    const handleDataToSave = async (data: any) => {
        if (data.majid != undefined && data.minid != undefined) {
            setSaveBtn(false);
            setItems((prevItem) => [...prevItem, data])
        }
    }



    const customHeader = {
        RemarksHistory: {
            pinned: "right",
            minWidth: 120,
            lockPosition: true,
            cellRenderer: RemarkHistoryRenderer,
            cellRendererParams: {
                onClick: (oid: string) => handleModal(oid)
            }
        },
        MajorReason: {
            pinned: "right",
            lockPosition: true,
            initialWidth: 300,
            cellRenderer: CustomCellEditor,

        },
        MinorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 300,
            cellRenderer: CustomCellEditor,
            cellRendererParams: {
                handleData: (saveobj: any) => handleDataToSave(saveobj)
            }
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
    }, [isLoading, isWIPChecked])

    const updateMajorMinorReason = async () => {
        console.log('body to api = ', items)
        const RemarkHistory: any = await updatePoogiRemarks(items);
        if (RemarkHistory.status == 200) {
            toast.dismiss();
            notifySuccess('Successfull')
        }
    }

    if (!rowData) {
        return null;
    }

    //console.log('index.ts', items)
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    return (
        <div style={{ zoom: 1.2 }}>
            <MTOActionToolBar
                quickFilter={
                    <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox checked={isWIPChecked} onChange={(e) => getInitialData(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>
                            Show Only Unassigned Orders
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
                <SaveBtn onClick={() => { updateMajorMinorReason() }} disabled={savebtn}>
                    Save Reasons
                </SaveBtn>
            </SaveBtnWrapper>

            <MTORemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />
        </div>

    )
}

export default ReasonForDelayOrder;