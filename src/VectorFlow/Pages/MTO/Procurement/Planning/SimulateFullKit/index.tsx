import { ProcurementLayout } from '../styles';
import ActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useSimFullKit from '../SimulateFullKit/useSimFullKit';
import VFFloatingTab from "../../../../../../components/VectorFLOW/commons/VFFloatingTab";
import { useUserData } from "../../../../../../context";
import { useNavigate } from 'react-router';


const SimulateFullKit = () => {
    const { renderView, toggleCurrentTab } = useSimFullKit();
    const { user } = useUserData()
    const navigate = useNavigate();
    const themeUi = user.user.theme_ui
    return (
        <>
            <div style={{ zoom: 1.25 }}>

                <ActionToolBar
                    isExcelExport
                    isGoBackButton
                    handleGoBack={() => {
                        navigate('/procurement-planning/planning')
                    }}
                    themeUi={themeUi}
                    comp={'Procurement Planning'}
                    onDateChange={() => { console.log('') }}
                    submitDate={() => { console.log('') }}
                />
            </div>
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


