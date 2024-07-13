import { Allotment } from "allotment";
import { useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {columnDataLevel1} from "./ColumnData";
import { GridOptions, IDetailCellRendererParams } from "ag-grid-enterprise";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import {APIMock} from "./StplAndFullKitsData";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";

const BarFillUI = (value: any) => {
    const val = value?.value || 0;
    return (
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
        <div>{val || 0}</div>
        <div style={{display: 'flex',minWidth: '100px', background: 'lightgray'}}>
          <div style={{height: '20px',backgroundImage: 'linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)',
                borderRadius:'2px', width: `${val}px`}}/>
        </div>
      </div>
    );
  };

const CustomHeader = ({ headerName }: any) => {
    return (
      <div
        style={{
          fontFamily: "Roboto",
          background: "white",
          fontWeight: "500",
          fontSize: "14px",
          color: "#000000",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        {headerName}
      </div>
    );
  };

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();

  const gridRef = useRef();

const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
    },
    groupDefaultExpanded: 0,
    masterDetail: true,
    detailRowHeight: 500,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
            {
                colId: "order_details",
                field: "order_details",
                headerName: "Order Details",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
                width: 300,
                headerComponent: () => <CustomHeader headerName="Order Details" />
            },
            {
                colId: "or_id",
                field: "or_id",
                headerName: "Order Id",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 400,
                cellRenderer: "agGroupCellRenderer"
            },
            {
                colId: "or_type",
                field: "or_type",
                headerName: "Order Type",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "line_item_id",
                field: "line_item_id",
                headerName: "Line Item Id",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "fg_code",
                field: "fg_code",
                headerName: " FG Code",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "fg_desc",
                field: "fg_desc",
                headerName: "FG Desc",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "order_quality",
                field: "order_quality",
                headerName: "Order Quality",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "quantity_manufacture",
                field: "quantity_manufacture",
                headerName: "Quantity Bal. to Mfg.",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "r_wip",
                field: "r_wip",
                headerName: "Release WIP In Days",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "fk",
                field: "fk",
                headerName: "Full Kit",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
                cellRenderer: (params: any) => <BarFillUI value={params?.value} />
            },
            {
                colId: "un_fk",
                field: "un_fk",
                headerName: "Unreleased Full Kit In Days",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
        ],
        defaultColDef: {
          flex: 1,
        },
        groupDefaultExpanded: 0,
        masterDetail: true,
        detailRowHeight: 300,
        detailCellRendererParams: {
          detailGridOptions: {
            columnDefs: [
                {
                    colId: "rm_material",
                    field: "rm_material",
                    headerName: "RM Material",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 200,
                    headerComponent: () => <CustomHeader headerName="RM Material" />

                },
                {
                    colId: "rm_code",
                    field: "rm_code",
                    headerName: "RM Code",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 200,
                    cellRenderer: "agGroupCellRenderer"
                },
                {
                    colId: "rm_desc",
                    field: "rm_desc",
                    headerName: "RM Desc",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 200,
                },
                {
                    colId: "rm_req",
                    field: "rm_req",
                    headerName: "Required RM",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 200,
                },
                {
                    colId: "rm_avbl",
                    field: "rm_avbl",
                    headerName: "Available RM",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 200,
                },
                {
                    colId: "gap",
                    field: "gap",
                    headerName: "Gap",
                    hide: false,
                    autoHeaderHeight: true,
                    wrapHeaderText: true,
                    initialWidth: 300,
                }
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: (params) => {
            params.successCallback(params.data.children);
          },
        } as IDetailCellRendererParams,
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.children);
      },
    } as IDetailCellRendererParams,
  };

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
            <div data-testid='grid-view'>
                <VFTable
                    // className="child-grid"
                    {...gridOptions}
                    sideBar="columns"
                    columnDefs={columnDataLevel1}
                    rowData={APIMock?.grid}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={"750px"}
                    ref={gridRef}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}
                />
            </div>
        
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 210, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <STPLGraph />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <FullKitGraph />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default STPLAndFullKits;
