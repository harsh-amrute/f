import { ProcurementLayout } from '../styles';
import ActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useSimFullKit from '../SimulateFullKit/useSimFullKit';
import '../styles';
import VFFloatingTab from "../../../../../../components/VectorFLOW/commons/VFFloatingTab";

const SimulateFullKit = () => {
    const { renderView, currentTab, toggleCurrentTab, Save } = useSimFullKit();
    return (
        <>
            <ActionToolBar
                comp={'Procurement Planning'}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>

                <VFFloatingTab
                    handleClick={(tab) => toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id: 'iof',
                            label: 'Incremental Order In Full Kit',
                            value: 'iof'
                        },
                        {
                            id: 'cf',
                            label: 'Cumulative Full Kit',
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
            {/* <text onClick={Save} style={{ fontSize: 34 }}>save</text> */}
        </>
    )
}

export default SimulateFullKit


