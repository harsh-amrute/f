import { useState } from 'react';
import {
  TextXAxis,
  TextYAxis,
  BTRLayoutTabsWrapper,

} from '../MaterialCoverage/styles';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import FutureCov from './FutureCov';
import CurrentCov from './CurrentCov';
import { ColorsMTO } from '../../Common/Colors';
import { MaterialCoverageString } from '../../Common/String';
import MaterialSODetailed from './MaterialSODetailed';
import { DetailsObj } from './CommonFunc';

const MaterialCov = () => {
  const [detailDataObj, setDetailDataObj] = useState<DetailsObj>();
  const [currTab, setCurrTab] = useState<string>();
  const [toggleComponent, setToggleComponent] = useState<boolean>(false);
  
  const handleToggleComponent = (value: boolean) => {
    setToggleComponent(value);
  }

  const handleParameterData=(data:any)=>{
    setDetailDataObj(data)
  }

  return (
    <div style={{ width: "100%" }}>
      <ActionToolBar
        comp={'MaterialCov'}
      />
      {!toggleComponent ?
        <>
          <BTRLayoutTabsWrapper>
            <VFFloatingTab
              handleClick={(e) => setCurrTab(e.value)}
              tabs={[
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
              ]}
              defaultTab={0}
            />
          </BTRLayoutTabsWrapper>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextXAxis style={{ height: 'max-content' }}>
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
                <FutureCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} />
                :
                <CurrentCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} />
            }
          </div>


          <TextYAxis>
            {MaterialCoverageString.statusKits}
            <div style={{
              width: "10%",
              border: `1px solid ${ColorsMTO.Black}`,
              color: ColorsMTO.White.code,
              margin: 'auto'
            }}>
            </div>
          </TextYAxis>
        </>
        :
        <MaterialSODetailed parameterData={detailDataObj}/>
      }
    </div>

  )
}
export default MaterialCov;