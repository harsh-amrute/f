import { useState, useMemo, useCallback, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useUserData } from "../../../../../../context"
import GetSimulateFullKitHeader from './GetSimulateFullKitHeader.json';
import AvlCellRenderer from "../../../Common/AvlCellRenderer";
import AvailabilityToolTip from "../../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from "../../../Common/VFTable";
import { useLocation } from 'react-router-dom';
import ColorCellRenderer from "../../../Common/ColorCellRenderer";
import { mapSimulateProcPlanningFieldsToColDefs } from '../../../../../../helpers/utils';
import DetailCellRenderer from "./DetailCellRenderer";
import { userGetProcAfterSimulationPlanningData  } from "../../../../../Services/MTO/Procurement/ProcPlanning/index";
import OverlayLoader from "../../../Common/Loader";
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { notifyError, notifySuccess } from "../../../../../../helpers/notify";
import { toast } from "react-toastify";


const useSimFullKit = () => {
    const { HeaderData } = GetSimulateFullKitHeader;
    const { isSideBarOpen } = useUserData()
    const [currentPage,setCurrentPage] = useState<any>(1);
    const location = useLocation();
    const rowsData = location.state?.ShortageDatas;
    const date = location.state?.date;
    const [data, setData] = useState([]);
    const [incOrderFullkitData, setIncOrderFullKitData] = useState<any[]>([]);
    const [cumulativeFullKitData, setCumulativeFullKitDara] = useState<any[]>([]);
    if (rowsData) {
        rowsData.forEach((item: any) => {
            if (Array.isArray(item.children)) {
                item.children.sort((a: any, b: any) => a.bpp - b.bpp);
                let remainingEas = 0;
                item.children.forEach((child: any, index: number) => {
                    const penDValue = child.pend;
                    const easValue = item.eas;
                    if (index === 0) {
                        remainingEas = easValue;
                    }
                    if (remainingEas > 0) {
                        if (penDValue <= remainingEas) {
                            child.remq = penDValue;
                            remainingEas -= penDValue;
                        } else {
                            child.remq = remainingEas;
                            remainingEas = 0;
                        }
                    } else {
                        child.remq = 0;
                    }
                });
            }
        });
    }
    // const Save = () => {
    //     const newData: { sno: string; on: string; lid: string; item: string; easa: number }[] = [];
    //     if (rowsData) {
    //         rowsData.forEach((item: any) => {
    //             if (Array.isArray(item.children)) {
    //                 item.children.forEach((child: any) => {
    //                     const newEntry = {
    //                         sno: child.sno,
    //                         on: child.on,
    //                         lid: child.lid,
    //                         item: item.rm,
    //                         easa: item.eas,
    //                         // remq: child.remq
    //                     };
    //                     newData.push(newEntry);
    //                 });
    //             }
    //         });
    //     }
    //     return newData;
    // };


    const [totalRows, setTotalRows] = useState(0);


    const { mutateAsync: userGetProcAfterSimulationData , isLoading, isSuccess, isError} = userGetProcAfterSimulationPlanningData();
    //isLoading: isProcPlanningUILoading, isError

    const fetchData = useCallback(async (date: string, eas: string, pageNumber='1') => {
        try {
            const response = await userGetProcAfterSimulationData({date,eas,pageNumber});
            setData(response?.data?.data?.results);
            setTotalRows(response?.data?.data.count);
            setCurrentPage(pageNumber)

        } catch (error) {
            console.log("error ", error);
        }
    }, [rowsData, userGetProcAfterSimulationData]);

    useEffect(() => {
        if ('' !== date) {
            const selectedDate = date;
            if (rowsData) {
                if(currentTab.id==='iof'){

                    fetchData(selectedDate,'0',currentPage);
                }
                else{
                    fetchData(selectedDate, '1',currentPage);
                }
            }
        }
    }, [rowsData, fetchData]);



    useEffect(() => {
        if (data.length !== undefined && HeaderData.length !== undefined) {
            const initilizeData = (data: any) => {
                const calculateData = data.map((item: any) => ({
                    ...item,
                    fkapr: ((item.fka / item.oq) * 100).toFixed(2)
                }));
                const WithZeroEas = calculateData.filter((item: any) => item.children.every((child: any) => child.eas === 0));
                const WithoutZeroEas = calculateData.filter((item: any) => item.children.every((child: any) => child.eas !== 0));

            
                const BothEasData = calculateData.filter((item: any) => {
                    return item.children.some((child: any) => child.eas === 0) && item.children.some((child: any) => child.eas !== 0);
                });
                // setIncOrderFullKitData([...WithoutZeroEas, ...BothEasData]);
                // setCumulativeFullKitDara([...WithZeroEas, ...BothEasData]);
                setIncOrderFullKitData(calculateData);
                setCumulativeFullKitDara(calculateData);
                return { WithZeroEas, WithoutZeroEas, BothEasData };
            };
            initilizeData(data);
        }
    }, [data]);

    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: 'iof',
            label: 'Incremental Order In Full Kit',
            value: 'iof'
        },
        {
            id: 'cf',
            label: 'Cumulative Full Kit',
            value: 'cf'
        }
    ];
    const SimulateColumns = mapSimulateProcPlanningFieldsToColDefs(HeaderData);
    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);

    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/mto/dayWiseCoverage/collapse.svg'}" style="height: 100%; width: 80%;"/>`,
            groupContracted: `<img src="${'/assets/img/mto/dayWiseCoverage/expand.svg'}" style="height: 100%; width: 80%;"/>`,
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    useEffect(()=>{

        if(isError){
            toast.dismiss();
            notifyError("Failed to fetch data!")
        }
        if(isSuccess){
            notifySuccess("Fetched Data Successfully!")
        }

    },[isError, isSuccess])

    const handlePageChangeCumulative = async (pageNumber: number) => {
        // setIsLoading(true);
        // setCurrentPage(pageNumber);
        // const APIData = await getProcPlanningData({ date, pageNum: currentPage.toString() });
        // // setData(APIData)
        // const newDat = APIData.data.data.results
        // setTotalRows(APIData?.data?.data?.count)
        // // setData(APIData?.data?.data?.results || []);
        // setData(newDat);
        // setIsLoading(false);

        if(currentTab.id==='iof'){

            fetchData(date,'0', pageNumber.toString());
            
        }
        else{
            fetchData(date, '1', pageNumber.toString());
        }

        // (refGraph1.current?.api.getRowNode) && refGraph1.current?.api.set
    };

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "avlCellRenderer": AvlCellRenderer,
            "availabilityToolTip": AvailabilityToolTip
        }), []);


        useEffect(()=>{

            if(currentTab.id==='iof'){
                fetchData(date,'0');
            }
            else{
                fetchData(date,'1');
            }
        
        },[currentTab])

    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);
    const renderView = () => {
        switch (currentTab.id) {
            case "iof":
                return (
                    <div>
                        {isLoading && <OverlayLoader/>}
                        <VFTable
                            {...agGridProps}
                            columnDefs={SimulateColumns}
                            rowData={incOrderFullkitData}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            height={'750px'}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            key={1}
                            selectedRows={0}
                            rowsPerPage={Math.min(10, totalRows)}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}

                        />
                        
                    </div>
                );
            case "cf":
                return (
                    <div>
                        {isLoading && <OverlayLoader/>}
                        <VFTable
                            {...agGridProps}
                            columnDefs={SimulateColumns}
                            rowData={cumulativeFullKitData}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            height={'750px'}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            key={1}
                            selectedRows={0}
                            rowsPerPage={Math.min(15, totalRows)}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}
                        />
                    </div>
                );
            default:
                return <VFTable columnDefs={[]} rowData={[]} {...agGridProps} />
        }
    }
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
            icons: icons,
            defaultColDef: {
                suppressMenu: true,
                resizable: true,
                filter: "agMultiColumnFilter",
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
                    'width': '200px'
                },

            },
        },
        masterDetail: true,
        detailCellRenderer: DetailCellRenderer,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };

    return {
        isSideBarOpen,
        agGridProps,
        currentPage,
        toggleCurrentTab,
        renderView,
        currentTab,
    }
}

export default useSimFullKit;