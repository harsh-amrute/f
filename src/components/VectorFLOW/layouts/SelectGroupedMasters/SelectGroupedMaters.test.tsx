import { screen, render, fireEvent } from "@testing-library/react"
import { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../../../redux/store/store"
import { UserDataContext } from "../../../../context"
import SelectGroupedMasters, { SelectGroupedMastersProps } from "."
import { setupReactQuery } from "../../../../config/react-query-config"
import { VFMasterGroupCardContent } from "./styles"


const mockFunction = jest.fn()

const dummyprops:SelectGroupedMastersProps = {
    onSubmit:mockFunction,
    onCancel:mockFunction,
    onSelectMasters:mockFunction,
    mapMasterUIToMasterGroup:mockFunction,
    handleOnClickMaster:mockFunction,
    selectedMasters:[
      {
          "id": "5",
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
          ]
      }
  ],
    allMasters:[
      {
          "id": "1",
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
          ]
      },
      {
          "id": "2",
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
          ]
      },
      {
          "id": "3",
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
          ]
      },
      {
          "id": "4",
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
          ]
      },
      {
          "id": "5",
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
          ]
      },
      {
          "id": "7",
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
          ]
      },
      {
          "id": "8",
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
          ]
      },
      {
          "id": "9",
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
          ]
      },
      {
          "id": "11",
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
          ]
      },
      {
          "id": "12",
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
          ]
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
        // Assuming VFMasterGroupCardContent renders within SelectGroupedMasters
        const masterNameElement = screen.getByText();
        expect(masterNameElement).toBeInTheDocument();
      });

      it("Handles hover state on VFMasterGroupCardContent",()=>{
        const masterNameElement = screen.getByText("Master Name");
    fireEvent.mouseEnter(masterNameElement); // Assuming hover triggers on mouseEnter
    expect(masterNameElement).toHaveStyle({ backgroundColor: "#820F4C" });
      });

    })
      
    
    
    
  
