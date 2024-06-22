import { useState, useMemo, useCallback, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useUserData } from "../../../../../../context"
import GetSimulateFullKitHeader from './GetSimulateFullKitHeader.json';
import AvlCellRenderer from "../../../Common/AvlCellRenderer";
import AvailabilityToolTip from "../../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable';
import { useLocation } from 'react-router-dom';
import ColorCellRenderer from "../../../Common/ColorCellRenderer";
import { mapSimulateProcPlanningFieldsToColDefs } from '../../../../../../helpers/utils';
import DetailCellRenderer from "./DetailCellRenderer";
import { userGetProcAfterSimulationPlanningData, UpdateBatchWiseCompAllSimulation } from "../../../../../Services/MTO/Procurement/ProcPlanning/index";


const useSimFullKit = () => {
    const { HeaderData } = GetSimulateFullKitHeader;
    const { isSideBarOpen } = useUserData()
    const [currentPage] = useState<any>(1);
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
    const Save = () => {
        const newData: { sno: string; on: string; lid: string; item: string; easa: number }[] = [];
        if (rowsData) {
            rowsData.forEach((item: any) => {
                if (Array.isArray(item.children)) {
                    item.children.forEach((child: any) => {
                        const newEntry = {
                            sno: child.sno,
                            on: child.on,
                            lid: child.lid,
                            item: item.rm,
                            easa: item.eas,
                            // remq: child.remq
                        };
                        newData.push(newEntry);
                    });
                }
            });
        }
        return newData;
    };


    const { mutateAsync: userGetProcAfterSimulationData } = userGetProcAfterSimulationPlanningData();
    const { mutateAsync: updateBatchWiseCompAllSimulation } = UpdateBatchWiseCompAllSimulation();
    //isLoading: isProcPlanningUILoading, isError

    const fetchData = useCallback(async (date: string) => {
        try {
            const wrappedData = Save();
            await updateBatchWiseCompAllSimulation(wrappedData);
            const response = await userGetProcAfterSimulationData(date);
            setData(response?.data?.data?.results);
        } catch (error) {
            console.log("error ", error);
        }
    }, [rowsData, userGetProcAfterSimulationData]);

    useEffect(() => {
        if ('' !== date) {
            const selectedDate = date;
            if (rowsData) {
                fetchData(selectedDate);
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
                setIncOrderFullKitData([...WithoutZeroEas, ...BothEasData]);
                setCumulativeFullKitDara([...WithZeroEas, ...BothEasData]);
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
            groupExpanded: `<img src="${'/assets/img/mto/procPlanning/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "avlCellRenderer": AvlCellRenderer,
            "availabilityToolTip": AvailabilityToolTip
        }), []);
    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);
    const renderView = () => {
        switch (currentTab.id) {
            case "iof":
                return (
                    <div>
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
                    </div>
                );
            case "cf":
                return (
                    <div>
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
            pagination: true,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            components: customCellRenderers,
            icons: icons,
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