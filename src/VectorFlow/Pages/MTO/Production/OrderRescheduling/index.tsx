import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import VFFloatingTab from '../../../../../components/VectorFLOW/commons/VFFloatingTab';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { ApplyZoomOut } from './styles';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { VFTableWrapper } from '../../../../../components/VectorFLOW/commons/VFTable/styles';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import ReasonCellRenderer from './ReasonCellRenderer';
import columnData from './ColumnData';
import DueDateCellRenderer from './DueDateCellRenderer';
import { usePutUpdateOrderDueDate, useGetOrderSchedulingData, useGetOrderSchedulingPageData } from '../../../../Services/MTO/Production/OrderRescheduling';
import { AgGridReactProps } from 'ag-grid-react';
import { GridRef } from '../../../../types/MDM';
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';
import { ATTR_TOAST, notifySuccess, notifyError } from '../../../../../helpers/notify';
import { toast } from 'react-toastify';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import { CustomLoadingCellRendererProps } from '@ag-grid-community/react';
import { GridReadyEvent } from 'ag-grid-charts-enterprise';

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
        if (selectedData) {
            setSelectedRowData([...selectedRowData, ...selectedData as RowDataType[]]);
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
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType: false,
            resizable: false,
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

    let colDef = columnData;
    const [rowData, setRowData] = useState<RowDataType[] | null>(null);

    const addChangeDate = (date: string, key: string) => {
        const newData = rowData;
        newData?.forEach(item => {
            if (item.oid === key) {
                item.dd = date;
            }
        });
        setRowData(newData);
    };

    colDef = [
        {
            field: "",
            headerCheckboxSelection: false,
            checkboxSelection: true,
            maxWidth: 50,
            floatingFilter: false,
        },
        ...colDef,
        {
            colId: "dd",
            field: "dd",
            headerName: "Due Date",
            hide: false,
            autoHeaderHeight: true,
            wrapHeaderText: true,
            cellRenderer: currTab === 'Unschedule' ? "" : DueDateCellRenderer,
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
        {
            colId: "rs",
            field: "rs",
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
    ];

    const [currData, setCurrData] = useState<any>(null);

    const GetData = async () => {
        try {

            const APIData = await getOrderSchedulingData();
            console.log("API data", APIData.data.data.results);
            console.log("==>", APIData);
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
        const newDat = [...APIData.data.data.results]
        setRowData(newDat);
        console.log("new data", APIData, "new dat", newDat);
        setIsLoading(false);
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


    const PostData = async (data: any, message: string) => {
        try {
            const response = await putUpdateOrderDueDate(JSON.parse(JSON.stringify(data)));
            if (refGraph1) {
                refGraph1.current?.api.deselectAll();
            }
            if (response.status === 200) {
                toast.dismiss();
                notifySuccess(message);
            } else {
                toast.dismiss();
                notifyError("Failed to update data");
            }
        } catch (error) {
            toast.dismiss();
            notifyError("Failed to update Data!");
            console.log(error);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    const unschedule = async () => {
        const finalData = convertJsonForUnschedule(selectedRowData, 'Admin', 1);
        PostData(finalData, "Order Unscheduled Successfully !");
        await handlePageChangeCumulative(currentPage);
    };

    const overwriteDD = () => {
        const finalData = convertJsonForDueDate(selectedRowData, 'Admin', 0);
        PostData(finalData, "Order Due date updated successfully !");
        setSelectedRowData([]);
    };


    return (
        <>
            <div style={{ width: "100%", position: 'relative', height: '85vh' }}>

                <MTOActionToolBar comp={'orderReschedule'} />
                {/* {isLoading && <VFOverlay>
                    <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>Loading....</h1>
                </VFOverlay>} */}
                {/* {isLoading ? <VFLoader /> : ( */}
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
                        <VFTableWrapper height='69vh'>
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

                                {...agGridProps}
                                pagination={false}
                                height={"100%"}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ width: '99.5%' }}>

                                    <VFPagination

                                        selectedRows={0}
                                        rowsPerPage={10}
                                        totalRows={currData ? currData.data.data.count : 0}
                                        currentPage={currentPage}
                                        handleChangePage={handlePageChangeCumulative}
                                    />
                                </div>
                            </div>
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
