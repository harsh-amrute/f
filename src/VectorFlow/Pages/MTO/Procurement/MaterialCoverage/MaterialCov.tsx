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

const MaterialCov = () => {
  const [detailDataObj, setDetailDataObj] = useState<DetailsObj>();
  // const [currTab, setCurrTab] = useState<string>("Current Coverage");
  const [currTab, setCurrTab] = useState<string>("CurrentCoverage");
  const [toggleComponent, setToggleComponent] = useState<boolean>(false);
  const { data, /*isLoading, refetch*/ } = useGetSOSummaydetails();
  console.log(data)
  const [soData, setSOData] = useState<any>([]);


  const handleToggleComponent = (value: boolean) => {
    setToggleComponent(value);
  }

  const handleParameterData = (data: any) => {
    setDetailDataObj(data)
  }
  
  useEffect(()=>{
    console.log("fetched");
    setSOData(data?.data.data)
  },[data])

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
          <ActionToolBar
            comp={'MaterialCov'}
            onDateChange={() => { console.log('') }}
            submitDate={() => { console.log('') }}
          />
          <BTRLayoutTabsWrapper>
            <VFFloatingTab
              handleClick={(e) => setCurrTab(e.value)}
              tabs={tabs}
              defaultTab={defaultTab}
            />
          </BTRLayoutTabsWrapper>
          <div style={{display: 'flex', justifyContent:"center", width: "100%"}}>
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
                <FutureCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData}/>
                :
                <CurrentCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData}/>
            }
          </div>
          </div>

          <div style={{display:"flex",justifyContent: "center"}}>
            <TextYAxis style={{width:"max-content"}}>
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
        <>
          <ActionToolBar
            comp={'MaterialCovDetailData'}
            onDateChange={() => { console.log('') }}
            submitDate={() => { console.log('') }}
            handleGoBack={()=>{
              handleToggleComponent(false);
              // setCurrTab("CurrentCoverage")
            }}
          />
          <MaterialSODetailed parameterData={detailDataObj} />
        </>

      }
    </div>

  )
}
export default MaterialCov;