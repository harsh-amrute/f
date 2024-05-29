import { ProcurementLayout } from './styles';
import ActionToolBar from "../../../MTA/SupplyChainIntelligenceHub/Planning/ActionToolBar";
import usePP from './usePP';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";


const ProcurementPlanning = () => {
    const { renderView, toggleCurrentTab, excelDownload } = usePP();
    return (
        <>
            <ActionToolBar
                view={'grid'}
                setCurrentTab={() => { return }}
                currCategory={'PP'}
                currentTab={''}
                tabsList={[]}
                onFloatingTabChange={() => console.log('')}
                onGoBack={() => console.log('')}
                onViewChange={() => console.log('')}
                showAllTick={''}
                handleGoButton={''}
                genericRecordCount={0}
                onExportToExcelCallBack={excelDownload}
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
                {renderView()}
            </ProcurementLayout>
        </>
    )
}

export default ProcurementPlanning


