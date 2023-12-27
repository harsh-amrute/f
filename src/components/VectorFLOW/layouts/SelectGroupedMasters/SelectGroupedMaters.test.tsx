import { screen, render, fireEvent } from "@testing-library/react"
import { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../../../redux/store/store"
import { UserDataContext } from "../../../../context"
import SelectGroupedMasters, { SelectGroupedMastersProps } from "."
import { setupReactQuery } from "../../../../config/react-query-config"

const mockFunction = jest.fn()

const dummyprops:SelectGroupedMastersProps = {
    onSubmit:mockFunction,
    onCancel:mockFunction,
    handleOnClickMaster:mockFunction,
    selectedMasters:[
      {
          "id": 5,
          "name": "MOQMaster",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sk",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wh",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SupplierCode",
                  "key": "sc",
                  "visible": false,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "MOQ",
                  "key": "mq",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "PusfrSatKf",
                  "masterId": 5,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sk",
                  "colId": "sk",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wh",
                  "colId": "wh",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SupplierCode",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "mq",
                  "colId": "mq",
                  "headerName": "MOQ",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      }
    ],
    allMasters:[
      {
          "id": 1,
          "name": "SKUMaster",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "Description",
                  "key": "sd",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "ElephantOrderCapping",
                  "key": "ec",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Weight",
                  "key": "wt",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "Volume",
                  "key": "vm",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c1",
                  "key": "c1",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c2",
                  "key": "c2",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c3",
                  "key": "c3",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c4",
                  "key": "c4",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c5",
                  "key": "c5",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c6",
                  "key": "c6",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c7",
                  "key": "c7",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c8",
                  "key": "c8",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c9",
                  "key": "c9",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c10",
                  "key": "c10",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c11",
                  "key": "c11",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c12",
                  "key": "c12",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c13",
                  "key": "c13",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c14",
                  "key": "c14",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              },
              {
                  "displayName": "c15",
                  "key": "c15",
                  "visible": false,
                  "isAdd": true,
                  "isEdit": true,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "L20AEYJxWR",
                  "masterId": 1,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sd",
                  "colId": "sd",
                  "headerName": "Description",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ec",
                  "colId": "ec",
                  "headerName": "ElephantOrderCapping",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wt",
                  "colId": "wt",
                  "headerName": "Weight",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "vm",
                  "colId": "vm",
                  "headerName": "Volume",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c1",
                  "colId": "c1",
                  "headerName": "c1",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c2",
                  "colId": "c2",
                  "headerName": "c2",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c3",
                  "colId": "c3",
                  "headerName": "c3",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c4",
                  "colId": "c4",
                  "headerName": "c4",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c5",
                  "colId": "c5",
                  "headerName": "c5",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c6",
                  "colId": "c6",
                  "headerName": "c6",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c7",
                  "colId": "c7",
                  "headerName": "c7",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c8",
                  "colId": "c8",
                  "headerName": "c8",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c9",
                  "colId": "c9",
                  "headerName": "c9",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c10",
                  "colId": "c10",
                  "headerName": "c10",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c11",
                  "colId": "c11",
                  "headerName": "c11",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c12",
                  "colId": "c12",
                  "headerName": "c12",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c13",
                  "colId": "c13",
                  "headerName": "c13",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c14",
                  "colId": "c14",
                  "headerName": "c14",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c15",
                  "colId": "c15",
                  "headerName": "c15",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 2,
          "name": "LocationMaster",
          "fields": [
              {
                  "displayName": "WHCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WHDescription",
                  "key": "wd",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "LogisticsLocation",
                  "key": "l",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c1",
                  "key": "c1",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c2",
                  "key": "c2",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c3",
                  "key": "c3",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c4",
                  "key": "c4",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c5",
                  "key": "c5",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c6",
                  "key": "c6",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c7",
                  "key": "c7",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c8",
                  "key": "c8",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c9",
                  "key": "c9",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c10",
                  "key": "c10",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c11",
                  "key": "c11",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c12",
                  "key": "c12",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c13",
                  "key": "c13",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c14",
                  "key": "c14",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "c15",
                  "key": "c15",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "lwWgMl41WM",
                  "masterId": 2,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "WHCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wd",
                  "colId": "wd",
                  "headerName": "WHDescription",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "l",
                  "colId": "l",
                  "headerName": "LogisticsLocation",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c1",
                  "colId": "c1",
                  "headerName": "c1",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c2",
                  "colId": "c2",
                  "headerName": "c2",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c3",
                  "colId": "c3",
                  "headerName": "c3",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c4",
                  "colId": "c4",
                  "headerName": "c4",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c5",
                  "colId": "c5",
                  "headerName": "c5",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c6",
                  "colId": "c6",
                  "headerName": "c6",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c7",
                  "colId": "c7",
                  "headerName": "c7",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c8",
                  "colId": "c8",
                  "headerName": "c8",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c9",
                  "colId": "c9",
                  "headerName": "c9",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c10",
                  "colId": "c10",
                  "headerName": "c10",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c11",
                  "colId": "c11",
                  "headerName": "c11",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c12",
                  "colId": "c12",
                  "headerName": "c12",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c13",
                  "colId": "c13",
                  "headerName": "c13",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c14",
                  "colId": "c14",
                  "headerName": "c14",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c15",
                  "colId": "c15",
                  "headerName": "c15",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 3,
          "name": "SkuLocationMaster",
          "fields": [
              {
                  "displayName": "SKU Code",
                  "key": "sc",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKU Name",
                  "key": "sn",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Location Code",
                  "key": "wc",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Location Name",
                  "key": "ln",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Parent Loc code",
                  "key": "pwc",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Parent Loc Name",
                  "key": "sc",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Norm",
                  "key": "n",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "MinNorm",
                  "key": "mn",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "RLT",
                  "key": "rlt",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "RCP",
                  "key": "rcp",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "GCP",
                  "key": "gcp",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "OCP",
                  "key": "ocp",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Min Order Count",
                  "key": "moc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "PackSize",
                  "key": "ps",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Modified Spike Threshold",
                  "key": "mst",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Default Spike Threshold",
                  "key": "st",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Modified PSO Threshold",
                  "key": "mpt",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Default PSO Threshold",
                  "key": "pt",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "FG/RM Flag",
                  "key": "frf",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "DBM Active",
                  "key": "da",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "Norm Percent Reservation",
                  "key": "npr",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt01",
                  "key": "c1",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt02",
                  "key": "c2",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt03",
                  "key": "c3",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt04",
                  "key": "c4",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt05",
                  "key": "c5",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt06",
                  "key": "c6",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt07",
                  "key": "c7",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt08",
                  "key": "c8",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt09",
                  "key": "c9",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt10",
                  "key": "c10",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt11",
                  "key": "c11",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt12",
                  "key": "c12",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt13",
                  "key": "c13",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt14",
                  "key": "c14",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SKULocAtt15",
                  "key": "c15",
                  "visible": true,
                  "isAdd": true,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "NjjTPzIR4g",
                  "masterId": 3,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SKU Code",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sn",
                  "colId": "sn",
                  "headerName": "SKU Name",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "Location Code",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ln",
                  "colId": "ln",
                  "headerName": "Location Name",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "pwc",
                  "colId": "pwc",
                  "headerName": "Parent Loc code",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "Parent Loc Name",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "n",
                  "colId": "n",
                  "headerName": "Norm",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "mn",
                  "colId": "mn",
                  "headerName": "MinNorm",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "rlt",
                  "colId": "rlt",
                  "headerName": "RLT",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "rcp",
                  "colId": "rcp",
                  "headerName": "RCP",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "gcp",
                  "colId": "gcp",
                  "headerName": "GCP",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ocp",
                  "colId": "ocp",
                  "headerName": "OCP",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "moc",
                  "colId": "moc",
                  "headerName": "Min Order Count",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ps",
                  "colId": "ps",
                  "headerName": "PackSize",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "mst",
                  "colId": "mst",
                  "headerName": "Modified Spike Threshold",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "st",
                  "colId": "st",
                  "headerName": "Default Spike Threshold",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "mpt",
                  "colId": "mpt",
                  "headerName": "Modified PSO Threshold",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "pt",
                  "colId": "pt",
                  "headerName": "Default PSO Threshold",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "frf",
                  "colId": "frf",
                  "headerName": "FG/RM Flag",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "da",
                  "colId": "da",
                  "headerName": "DBM Active",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "npr",
                  "colId": "npr",
                  "headerName": "Norm Percent Reservation",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c1",
                  "colId": "c1",
                  "headerName": "SKULocAtt01",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c2",
                  "colId": "c2",
                  "headerName": "SKULocAtt02",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c3",
                  "colId": "c3",
                  "headerName": "SKULocAtt03",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c4",
                  "colId": "c4",
                  "headerName": "SKULocAtt04",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c5",
                  "colId": "c5",
                  "headerName": "SKULocAtt05",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c6",
                  "colId": "c6",
                  "headerName": "SKULocAtt06",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c7",
                  "colId": "c7",
                  "headerName": "SKULocAtt07",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c8",
                  "colId": "c8",
                  "headerName": "SKULocAtt08",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c9",
                  "colId": "c9",
                  "headerName": "SKULocAtt09",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c10",
                  "colId": "c10",
                  "headerName": "SKULocAtt10",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c11",
                  "colId": "c11",
                  "headerName": "SKULocAtt11",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c12",
                  "colId": "c12",
                  "headerName": "SKULocAtt12",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c13",
                  "colId": "c13",
                  "headerName": "SKULocAtt13",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c14",
                  "colId": "c14",
                  "headerName": "SKULocAtt14",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "c15",
                  "colId": "c15",
                  "headerName": "SKULocAtt15",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 4,
          "name": "SOBMaster",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sk",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SupplierCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SOB",
                  "key": "sb",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "2vNQHWixnh",
                  "masterId": 4,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sk",
                  "colId": "sk",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SupplierCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sb",
                  "colId": "sb",
                  "headerName": "SOB",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 5,
          "name": "MOQMaster",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sk",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wh",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "SupplierCode",
                  "key": "sc",
                  "visible": false,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "MOQ",
                  "key": "mq",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "PusfrSatKf",
                  "masterId": 5,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sk",
                  "colId": "sk",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wh",
                  "colId": "wh",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SupplierCode",
                  "hide": true,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "mq",
                  "colId": "mq",
                  "headerName": "MOQ",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 7,
          "name": "AddPOMaster",
          "fields": [
              {
                  "displayName": "PhaseOutSKU",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "LocationCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "pI75V7BcCx",
                  "masterId": 7,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "PhaseOutSKU",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "LocationCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 8,
          "name": "AddPIPOMaster",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "PhaseInSKUCode",
                  "key": "pi",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "QBUgVT9fjD",
                  "masterId": 8,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "pi",
                  "colId": "pi",
                  "headerName": "PhaseInSKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 9,
          "name": "AddTargetNorm",
          "fields": [
              {
                  "displayName": "PhaseInSKUCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "LocationCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "TargetNorm",
                  "key": "tn",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "XUxZDbv31N",
                  "masterId": 9,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "PhaseInSKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "LocationCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "tn",
                  "colId": "tn",
                  "headerName": "TargetNorm",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 11,
          "name": "AbsoluteValueSeasonality",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "StartDate",
                  "key": "sd",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "EndDate",
                  "key": "ed",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "TargetNorm",
                  "key": "tn",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "BuildupDuration",
                  "key": "bd",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "ehYt52tL3J",
                  "masterId": 11,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sd",
                  "colId": "sd",
                  "headerName": "StartDate",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ed",
                  "colId": "ed",
                  "headerName": "EndDate",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "tn",
                  "colId": "tn",
                  "headerName": "TargetNorm",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "bd",
                  "colId": "bd",
                  "headerName": "BuildupDuration",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      },
      {
          "id": 12,
          "name": "DeltaPercentageSeasonality",
          "fields": [
              {
                  "displayName": "SKUCode",
                  "key": "sc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "WhCode",
                  "key": "wc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "StartDate",
                  "key": "sd",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "EndDate",
                  "key": "ed",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "DeltaNormPercentage",
                  "key": "dnp",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "UpperLowerCap",
                  "key": "ulc",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              },
              {
                  "displayName": "BuildupDuration",
                  "key": "bd",
                  "visible": true,
                  "isAdd": false,
                  "isEdit": false,
                  "isDownload": true
              }
          ],
          "filters": [
              {
                  "id": "O0FaDOs3JH",
                  "masterId": 12,
                  "field": "",
                  "operator": "",
                  "text": ""
              }
          ],
          "colDefs": [
              {
                  "field": "sc",
                  "colId": "sc",
                  "headerName": "SKUCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "wc",
                  "colId": "wc",
                  "headerName": "WhCode",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "sd",
                  "colId": "sd",
                  "headerName": "StartDate",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ed",
                  "colId": "ed",
                  "headerName": "EndDate",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "dnp",
                  "colId": "dnp",
                  "headerName": "DeltaNormPercentage",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "ulc",
                  "colId": "ulc",
                  "headerName": "UpperLowerCap",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              },
              {
                  "field": "bd",
                  "colId": "bd",
                  "headerName": "BuildupDuration",
                  "hide": false,
                  "floatingFilter": true,
                  "filter": "agMultiColumnFilter",
                  "minWidth": 180,
                  "cellStyle": {
                      "text-align": "center"
                  },
                  "flex": 1
              }
          ],
          "rowData": [],
          "progress": "default"
      }
  ]
}

const queryClient = setupReactQuery()

const contextWrapper = (children: ReactNode,store:any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider store={store}>
          <UserDataContext.Provider
            value={{
              user: { user: { theme_ui: "NOIRFUSION" } },
              changeColorTheme: (color) => {
                return color;
              },
            }}
          >
            {children}
          </UserDataContext.Provider>
        </Provider>
      </Router>
    </QueryClientProvider>
  );
}

describe("SelectGroupedMasters Component", () => {
  beforeEach(()=>{
    render(contextWrapper(<SelectGroupedMasters {...dummyprops}/>,store))
  })

    it("renders the component", () => {
      const submit=screen.getByText('Submit')
      expect(submit).toBeInTheDocument()
      const cancel=screen.getByText('Cancel')
      expect(cancel).toBeInTheDocument
      });

      it("Check if page closes when Cancel button is clicked", async () => {
        const cancel = screen.getByText("Cancel");
        fireEvent.click(cancel);
        expect(mockFunction).toBeCalled()
      });

      it("Renders VFMasterGroupCardContent with default props", async () => {
        const masterNameElement = screen.getByText("MOQMaster");
        expect(masterNameElement).toBeInTheDocument();
      });

      it("Handles hover state on VFMasterGroupCardContent",()=>{
        const masterNameElement = document.querySelector("#SKUMaster") as HTMLElement;
        fireEvent.mouseEnter(masterNameElement);
        expect(masterNameElement).toHaveStyle('backgroundColor: #820F4C');
        fireEvent.mouseOut(masterNameElement);
        expect(masterNameElement).toHaveStyle('backgroundColor: #FFFFF');
      }); 

      it("It handles Click on VFMasterGroupCardContent",()=>{
        const clickableElement = screen.getAllByTestId("vf-master-group-card")[0];
        fireEvent.click(clickableElement);
        fireEvent.click(clickableElement);
    })  
    
})
  
