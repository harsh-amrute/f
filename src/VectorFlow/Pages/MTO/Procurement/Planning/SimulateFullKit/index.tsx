import { ProcurementLayout } from '../styles';
import ActionToolBar from "../../../../MTA/SupplyChainIntelligenceHub/Planning/ActionToolBar";
import useSimFullKit from '../SimulateFullKit/useSimFullKit';
import '../styles';
import VFFloatingTab from "../../../../../../components/VectorFLOW/commons/VFFloatingTab";


const SimulateFullKit = () => {
    const { renderView, currentTab, toggleCurrentTab } = useSimFullKit();
    return (
        <>
            {/* <ActionToolBar
                //filter={'add'}
                view={'grid'}
                setCurrentTab={''}
                currCategory={'PP'}
                currentTab={''}
                tabsList={[]}
                onFloatingTabChange={() => console.log('')}
                onGoBack={() => console.log('')}
                onViewChange={() => console.log('')}
                ////hideGoBack={true}
                //visibilityToPP={true}
            /> */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>

                <VFFloatingTab
                    handleClick={(tab) => toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id: 'iof',
                            label: 'Incremental Order In Fullkit',
                            value: 'iof'
                        },
                        {
                            id: 'cf',
                            label: 'Cumulative FullKit',
                            value: 'cf'
                        }
                    ]}
                />

            </div>
            <ProcurementLayout>
                <div>
                    {renderView()}

                </div>
            </ProcurementLayout>
        </>
    )
}

export default SimulateFullKit


