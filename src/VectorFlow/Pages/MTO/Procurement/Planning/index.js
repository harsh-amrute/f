import { ProcurementLayout } from './styles';
import ActionToolBar from "../../../MTA/SupplyChainIntelligenceHub/Planning/ActionToolBar";
import usePP from './usePP';
import './styles';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";

const ProcurementPlanning = () => {
    const { renderView, currentTab, toggleCurrentTab } = usePP();
    return (
        <>
            <ActionToolBar
                filter={'add'}
                view={'grid'}
                setCurrentTab={''}
                currCategory={'PP'}
                currentTab={''}
                tabsList={[]}
                onFloatingTabChange={() => console.log('')}
                onGoBack={() => console.log('')}
                onViewChange={() => console.log('')}
                hideGoBack={true}
                visibilityToPP={true}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>

                <VFFloatingTab
                    handleClick={(tab) => toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id: 'ca',
                            label: 'Completely Available',
                            value: 'ca'
                        },
                        {
                            id: 'short',
                            label: 'Shortage',
                            value: 'short'
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

export default ProcurementPlanning


