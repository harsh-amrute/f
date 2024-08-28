import { useState, useEffect, useRef } from 'react';
import VFFloatingTab from '../../../../../components/VectorFLOW/commons/VFFloatingTab';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { ApplyZoomOut, PaginationWrapper, VFTableWrapper } from './styles';
import VFTable from '../../Common/VFTable';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import ReasonCellRenderer from './ReasonCellRenderer';
import DueDateCellRenderer from './DueDateCellRenderer';
import { usePutUpdateOrderDueDate, useGetOrderSchedulingData, useGetOrderSchedulingPageData } from '../../../../Services/MTO/Production/OrderRescheduling';
import { AgGridReactProps } from 'ag-grid-react';
import { GridRef } from '../../../../types/MDM';
import { notifySuccess, notifyError } from '../../../../../helpers/notify';
import { toast } from 'react-toastify';
import { IRowNode } from 'ag-grid-enterprise';
import { FirstDataRenderedEvent } from 'ag-grid-community';
import OverlayLoader from '../../Common/Loader';
import { useGetUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UIConfig';
import { getColumnDefinations } from '../../../../../helpers/utils';
import VFPagination from '../../Common/VFPagination';
import { pagination } from '../../Common/Enum';

const user = { user: { them_ui: 'pure' } };

interface RowDataType {
    oid: string;
    dd?: string;
    [key: string]: any; // Add this line to allow for additional properties
}

const OrderRescheduling = () => {
    const { mutateAsync: putUpdateOrderDueDate } = usePutUpdateOrderDueDate();
    const { mutateAsync: getOrderSchedulingData } = useGetOrderSchedulingData();
    const { mutateAsync: getOrderSchedulingPageData } = useGetOrderSchedulingPageData();

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const refGraph1 = useRef<GridRef>(null);
    const [selectedRowData, setSelectedRowData] = useState<RowDataType[]>([]);

    const getSelectedRowData = () => {

        const selectedData = refGraph1.current?.api.getSelectedRows();

        //  logic to get the unselected row and set the default date to it

        // const unselectedRows: any = [];
        // const lastUpdateSelectedRows: any = [];

        // rowData.forEach((e) => {
        //     selectedRowData.forEach((el) => {
        //         if (e.oid === el.oid) {
        //             lastUpdateSelectedRows.push(e);
        //         }
        //     })
        // })

        // lastUpdateSelectedRows.forEach((e: any) => {
        //     let isThere = false;
        //     selectedData?.forEach((el) => {
        //         if (e.oid === el.oid) {
        //             isThere = true;
        //         }
        //     }
        //     )


        //     if (!isThere) {
        //         unselectedRows.push(e);
        //     }

        // })


        // console.log("unselected Row...", unselectedRows)

        // unselectedRows.forEach((e: any) => {
        //     rowData.forEach((el: any) => {
        //         if (el.oid === e.oid) {
        //             e.oid = el.oid;
        //         }
        //     })
        // })


        // unselectedRows.forEach((unSec: any) => {

        //     refGraph1?.current?.api.forEachNode((node) => {
        //         if (node.data && node.data.oid) {

        //             if (node.data.oid === unSec.oid) {
        //                 console.log("yes")
        //                 node.data.dd = unSec.dd;
        //             }
        //         }
        //     });

        // })

        // setRowData(rowData);

        /////////////////

        if (selectedData) {
            let mergedData = [...selectedRowData]; // Start with the existing selected data

            selectedData.forEach((newItem) => {
                const index = mergedData.findIndex(item => item.oid === newItem.oid);

                if (index !== -1) {
                    // If the item exists, replace it
                    mergedData[index] = newItem;
                } else {
                    // Otherwise, add the new item
                    mergedData.push(newItem);
                }
            });

            rowData.forEach((item) => {
                let isThere = 0;
                selectedData.forEach((selectedD) => {
                    if (selectedD.oid === item.oid) {
                        isThere = 1;
                    }
                })

                if (isThere == 0) {
                    mergedData = mergedData.filter(e => e.oid !== item.oid)
                }
            })

            setSelectedRowData(mergedData);
        }
    };

    const agGridProps: AgGridReactProps = {
        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: 'focus',
        tooltipInteraction: true,
        readOnlyEdit: true,
        pagination: true,
        suppressRowClickSelection: true,
        rowHeight: 40,
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            floatingFilterComponentParams: { suppressFilterButton: true },
            suppressMenu: true,
            resizable: true,
            cellDataType: false,
            minWidth: 140,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            cellStyle: {
                "text-align": "center",
                'text-overflow': 'ellipsis',
            },
            flex: 1,
        },
        onSelectionChanged: getSelectedRowData
    };

    const [currTab, setCurrTab] = useState('Unschedule');
    const tabs = [
        { label: 'Unschedule', value: 'Unschedule', id: 'Unschedule' },
        { label: 'Overwrite Due Date', value: 'Overwrite Due Date', id: 'Overwrite Due Date' }
    ];

    const [colDef, setColDef] = useState([{}]);

    const [HeaderData, setHeaderData] = useState([{}]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()

    const reportName = "OrderRescheduling";

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response.data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setColumnDef();
    }, [])


    const extras = [
        {
            field: "",
            resizable: false,
            position: 0,
            headerCheckboxSelection: false,
            checkboxSelection: true,
            maxWidth: 50,
            suppressMenu: true,
            floatingFilter: false,
        }
    ];
    const addChangeDate = (date: string, key: string) => {
        const newData = rowData;
        newData.forEach(item => {
            if (item.oid === key) {
                item.dd = date;
            }
        });
        setRowData(newData);
    };

    const customHeader = {
        DueDate: {
            autoHeaderHeight: true,
            wrapHeaderText: true,
            cellRenderer: (currTab === 'Unschedule') ? "" : DueDateCellRenderer,
            cellRendererParams: {
                data: {
                    addChangeDate: addChangeDate,
                }
            },
            initialWidth: 200,
            width: 200,
            filter: "agMultiColumnFilter",
            floatingFilter: true
        },
        Reason: {
            colId: 'rs',
            field: 'rs',
            headerName: "Reason",
            hide: false,
            autoHeaderHeight: true,
            wrapHeaderText: true,
            initialWidth: 210,
            width: 210,
            filter: "agMultiColumnFilter",
            cellRenderer: ReasonCellRenderer,
            floatingFilter: true
        }
    };

    useEffect(() => {
        const headerDataCopy = JSON.parse(JSON.stringify(HeaderData));
        setColDef(getColumnDefinations(headerDataCopy, customHeader, extras));
    }, [HeaderData, customHeader]);



    const [rowData, setRowData] = useState<RowDataType[]>([]);



    // colDef = [
    //     {
    //         field: "",
    //         headerCheckboxSelection: false,
    //         checkboxSelection: true,
    //         maxWidth: 50,
    //         floatingFilter: false,
    //     },
    //     ...colDef,
    //     {
    //         colId: "dd",
    //         field: "dd",
    //         headerName: "Due Date",
    //         hide: false,
    //         autoHeaderHeight: true,
    //         wrapHeaderText: true,
    //         cellRenderer: currTab === 'Unschedule' ? "" : DueDateCellRenderer,
    //         cellRendererParams: {
    //             data: {
    //                 addChangeDate: addChangeDate,

    //             }
    //         },
    //         initialWidth: 200,
    //         width: 200,
    //         filter: "agMultiColumnFilter",
    //         floatingFilter: true
    //     },
    //     {
    //         colId: "rs",
    //         field: "rs",
    //         headerName: "Reason",
    //         hide: false,
    //         autoHeaderHeight: true,
    //         wrapHeaderText: true,
    //         initialWidth: 210,
    //         width: 210,
    //         filter: "agMultiColumnFilter",
    //         cellRenderer: ReasonCellRenderer,
    //         floatingFilter: true
    //     }
    // ];

    const [currData, setCurrData] = useState<any>(null);

    const GetData = async () => {
        try {

            const APIData = await getOrderSchedulingData();
            setCurrData(APIData);
            setRowData(APIData.data.data.results);

        }
        catch (e) {
            notifyError("Failed to fetch Grid data!")
        }
        setIsLoading(false);
    };

    const handlePageChangeCumulative = async (pageNumber: number) => {
        setIsLoading(true);
        setCurrentPage(pageNumber);
        const APIData = await getOrderSchedulingPageData(pageNumber.toString());
        setCurrData(APIData);
        const newDat = APIData.data.data.results
        setRowData(newDat);
        setIsLoading(false);
        // (refGraph1.current?.api.getRowNode) && refGraph1.current?.api.set
    };

    type OutputItem = {
        ok: string;
        r: string;
        dd?: string;
    };

    type Output = {
        unm: string;
        isUnSch: number;
        ordData: OutputItem[];
    };

    function convertJsonForUnschedule(inputArray: any, username: string, isUnSch: number): Output {
        const output: Output = {
            unm: username,
            isUnSch: isUnSch,
            ordData: []
        };

        inputArray.forEach((item: any) => {
            const ordDataItem: OutputItem = {
                ok: item.odk || "",
                r: item.rs || ""
            };
            output.ordData.push(ordDataItem);
        });

        return output;
    }

    function convertJsonForDueDate(inputArray: any, username: string, isUnSch: number): Output {
        const output: Output = {
            unm: username,
            isUnSch: isUnSch,
            ordData: []
        };

        inputArray.forEach((item: any) => {
            const ordDataItem: OutputItem = {
                ok: item.odk || "",
                dd: item.dd || "",
                r: item.rs || ""
            };
            output.ordData.push(ordDataItem);
        });

        return output;
    }

    const reasonCheck = (data: any): boolean => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.r.toString().length === 0) {

                return false;
            }

        }
        return true;
    }


    const PostData = async (data: any, message: string): Promise<boolean> => {
        if (reasonCheck(data.ordData)) {

            try {
                const response = await putUpdateOrderDueDate(JSON.parse(JSON.stringify(data)));

                if (response.status === 200) {
                    if (refGraph1) {
                        refGraph1.current?.api.deselectAll();
                    }
                    toast.dismiss();
                    notifySuccess(message);

                } else {
                    toast.dismiss();
                    notifyError("Failed to update data");

                    return false;
                }
            } catch (error) {
                toast.dismiss();
                notifyError("Failed to update Data!");
                return false;
            }
        }
        else {
            toast.dismiss();
            notifyError("Make sure you provide a reason for every update !")
            // if (refGraph1) {
            //     refGraph1.current?.api.deselectAll();
            // }
            return false;
        }
        return true;
    };

    useEffect(() => {
        GetData();
    }, []);

    const unschedule = async () => {
        const finalData = convertJsonForUnschedule(selectedRowData, 'Admin', 1);
        const isSuccesss = await PostData(finalData, "Order Unscheduled Successfully !");
        if (isSuccesss) {
            setSelectedRowData([]);
            await handlePageChangeCumulative(currentPage);
            handlePageChangeCumulative(currentPage);
        }
    };

    const overwriteDD = async () => {
        const finalData = convertJsonForDueDate(selectedRowData, 'Admin', 0);
        const isSuccess = await PostData(finalData, "Order Due date updated successfully !");
        if (isSuccess) {
            setSelectedRowData([]);

        }

    };

    const existsInSelected = (reqOid: string): boolean => {
        for (let index = 0; index < selectedRowData.length; index++) {
            const element = selectedRowData[index];
            if (element.oid === reqOid) {
                return true;
            }

        }
        return false;
    }

    const onFirstDataRendered =
        (params: FirstDataRenderedEvent<any>) => {
            const nodesToSelect: IRowNode[] = [];

            params.api.forEachNode((node) => {
                if (node.data && node.data.oid && existsInSelected(node.data.oid)) {
                    node.data.rs = selectedRowData[0].r;
                    for (let index = 0; index < selectedRowData.length; index++) {
                        const element = selectedRowData[index];
                        if (element.oid === node.data.oid) {
                            node.data.rs = element.rs;
                            node.data.dd = element.dd;
                        }
                    }
                    nodesToSelect.push(node);
                }

            });
            params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
        }
        ;


    return (
        <>
            <div style={{ width: "100%", position: 'relative', height: '85vh' }}>

                <MTOActionToolBar comp={'orderReschedule'} isExcelExport />
                {isLoading && <OverlayLoader />}

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <ApplyZoomOut>
                            <VFFloatingTab
                                handleClick={(e) => setCurrTab(e.value)}
                                tabs={tabs}
                                defaultTab={0}
                            />
                        </ApplyZoomOut>
                    </div>
                    <div style={{ width: '100%' }}>
                        <VFTableWrapper >
                            <VFTable

                                disableZoomScaling
                                columnDefs={colDef}
                                rowData={rowData}
                                ref={refGraph1}
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
                                onFirstDataRendered={onFirstDataRendered}
                                onGridReady={onFirstDataRendered}
                                onRowDataUpdated={onFirstDataRendered}
                                {...agGridProps}
                                pagination={false}
                                height={"100%"}
                            />




                            <PaginationWrapper>

                                <VFPagination
                                    selectedRows={0}
                                    rowsPerPage={pagination.mtoPageSize}
                                    totalRows={currData ? currData.data.data.count : 0}
                                    currentPage={currentPage}
                                    handleChangePage={handlePageChangeCumulative}
                                />
                            </PaginationWrapper>
                        </VFTableWrapper>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                        <div style={{ width: '100%', height: '65px', padding: '30px 30px', background: 'white', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <ApplyZoomOut>
                                {
                                    currTab === 'Unschedule' ?
                                        <VFButton disabled={(selectedRowData && selectedRowData[0]) ? false : true} style={{ width: '150px' }} themeUi={user.user.them_ui} onClick={unschedule}>Unschedule</VFButton>
                                        :
                                        <VFButton disabled={(selectedRowData && selectedRowData[0]) ? false : true} style={{ width: '200px' }} themeUi={user.user.them_ui} onClick={overwriteDD}>Overwrite Due Date</VFButton>
                                }
                            </ApplyZoomOut>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    );
};

export default OrderRescheduling;
