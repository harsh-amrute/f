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

const MaterialCov = () => {

  const [currTab, setCurrTab] = useState<string>();
  const [toggleComponent, setToggleComponent] = useState<boolean>(false);

  const handleToggleComponent = (value: boolean) => {
    setToggleComponent(value);
  }

  return (
    <div style={{ width: "85%" }}>
      <ActionToolBar
        comp={'MaterialCov'}
        onDateChange={() => { console.log('') }}
        submitDate={() => { console.log('') }}
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
                <FutureCov handleToggleComponent={handleToggleComponent} />
                :
                <CurrentCov handleToggleComponent={handleToggleComponent} />
            }
          </div>


          <TextYAxis>
            {MaterialCoverageString.statusKits}
            <div style={{
              width: "10%",
              border: `1px solid ${ColorsMTO.Black}`,
              color: ColorsMTO.White,
              margin: 'auto'
            }}>
            </div>
          </TextYAxis>
        </>
        :
        <MaterialSODetailed />
      }
    </div>

  )
}
export default MaterialCov;