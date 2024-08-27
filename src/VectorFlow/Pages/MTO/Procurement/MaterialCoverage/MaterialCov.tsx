import { useEffect, useState } from 'react';
import {
  TextXAxis,
  TextYAxis,
  BTRLayoutTabsWrapper,
} from '../MaterialCoverage/styles';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import FutureCov from './FutureCov';
import CurrentCov from './CurrentCov';
import { MaterialCoverageString } from '../../Common/String';
import MaterialSODetailed from './MaterialSODetailed';
import { DetailsObj } from './CommonFunc';
import { useGetSOSummaydetails } from '../../../../../VectorFlow/Services/MTO/Procurement/MaterialCoverage';
import { toast } from 'react-toastify';
import { notifyError, notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import useFilter from "../../../../../hooks/useFilter";
// import { APIResponseMock } from '../../Production/InsightsAndTrends/OrderBalance/OrderBalanceMockData';
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import OverlayLoader from '../../Common/Loader';

const APIFilterConfig = {
  filSecVisConfig: {
    "Proc_Material_Coverage_For_OpenSO": {
      mjr: false,
      or: true,
      res: true,
      cus: true
    },
  }
};

const MaterialCov = () => {
  const [detailDataObj, setDetailDataObj] = useState<DetailsObj>();
  // const [currTab, setCurrTab] = useState<string>("Current Coverage");
  const [currTab, setCurrTab] = useState<string>("CurrentCoverage");
  const [toggleComponent, setToggleComponent] = useState<boolean>(false);
  const [soData, setSOData] = useState<any>([]);
  const { data, isLoading, /*refetch*/ } = useGetSOSummaydetails();
  const { data: filterResponse, /*isLoading*/ } = useGetFilterData();
  const [filterData, setFilterData] = useState({});


  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { state: currFilter, setState: setCurrFilter, onFilterRemove } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Proc_Material_Coverage_For_OpenSO);

  const onApplyFilter = (filter: any) => {
    console.log(filter)
    setIsFilterOpen(false)
  }
  const onAddFilter = () => {
    setIsFilterOpen(true)
  }

  const toggleFilter = (state: boolean) => {
    setIsFilterOpen(state);
  }


  useEffect(() => {
    if (isLoading) {

      toast.dismiss();
      notifyLoader("Loading Data ...")
    }
    else {
      if (data?.status === 200) {


        toast.dismiss();
        notifySuccess("Data Fetched Successfully!")
      }
      else {
        toast.dismiss();
        notifyError("Failed to fetch data!")
      }
    }
  }, [isLoading])


  const handleToggleComponent = (value: boolean) => {
    setToggleComponent(value);
  }

  const handleParameterData = (data: any) => {
    setDetailDataObj(data)
  }

  useEffect(() => {
    setSOData(data?.data.data)
  }, [data])

  useEffect(() => {
    setFilterData(filterResponse?.data.data)
  }, [filterResponse]);

  const tabs = [
    {
      id: "1",
      value: 'CurrentCoverage',
      label: "Current Coverage"
    },
    {
      id: "2",
      value: 'FutureCoverage',
      label: "Future Coverage"
    }
  ]

  const defaultTab = tabs.findIndex(tab => tab.value === currTab)

  return (
    <div style={{ width: "100%" }}>
      {!toggleComponent ?
        <>
          {
            isLoading && (
              <OverlayLoader />
            )
          }
          <div style={{ zoom: '1.3' }}>
            <ActionToolBar
              comp={'MaterialCov'}
              isExcelExport
              isAddFilterButton
              isFilterOpen={isFilterOpen}
              onAddFilter={onAddFilter}
              toggleFilter={toggleFilter}
              onApplyFilter={onApplyFilter}
              multiFilter={currFilter}
              setMultiFilter={setCurrFilter}
              onFilterRemove={onFilterRemove}
              onDateChange={() => { console.log('') }}
              submitDate={() => { console.log('') }}
            />
          </div>
          <BTRLayoutTabsWrapper>
            <VFFloatingTab
              handleClick={(e) => setCurrTab(e.value)}
              tabs={tabs}
              defaultTab={defaultTab}
            />
          </BTRLayoutTabsWrapper>
          <div style={{ display: 'flex', justifyContent: "center", width: "100%" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", width: "max-content", position: "relative" }}>
              <TextXAxis style={{ height: 'max-content', position: "absolute", right: "100%" }}>
                {MaterialCoverageString.orderPriority}
                <div style={{
                  width: "85%",
                  border: "1px solid #000",
                  color: "#FFFFFF",
                  marginBottom: '10px',
                  marginLeft: '5px'
                }}>
                </div>
              </TextXAxis>

              {/**code goes here */}
              {
                currTab === 'FutureCoverage' ?
                  <FutureCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData} />
                  :
                  <CurrentCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData} />
              }
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextYAxis style={{ width: "max-content" }}>
              {MaterialCoverageString.statusKits}
              <div style={{
                width: "85%",
                border: "1px solid #000",
                color: "#FFFFFF",
                marginBottom: '10px',
                marginLeft: '5px'
              }}>
              </div>
            </TextYAxis>
          </div>

        </>
        :
        <div style={{ height: '100%' }}>
          <div style={{ zoom: 1.25 }}>

            <ActionToolBar
              isGoBackButton
              isAddFilterButton
              isExcelExport
              comp={'MaterialCovDetailData'}
              onDateChange={() => { console.log('') }}
              submitDate={() => { console.log('') }}
              handleGoBack={() => {
                handleToggleComponent(false);
                // setCurrTab("CurrentCoverage")
              }}
            />
          </div>
          <MaterialSODetailed parameterData={detailDataObj} />
        </div>

      }
    </div>

  )
}
export default MaterialCov;