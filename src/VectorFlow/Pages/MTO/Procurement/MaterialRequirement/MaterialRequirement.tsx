import { MaterialRequiremetLayout } from './styles';
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useMaterialReq from './useMaterialRequirements';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";

const MaterialRequirement = () => {
    const { renderView, toggleCurrentTab } = useMaterialReq();
    return (
        <>
            <ActionToolBar
                comp={"Fristan"}
                onDateChange={() => { console.log('') }}
                submitDate={() => { console.log('') }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>

                <VFFloatingTab
                    handleClick={(tab) => toggleCurrentTab(tab)}
                    tabs={[
                        {
                            id: 'sdv',
                            label: 'Selected Day View',
                            value: 'sdv'
                        },
                        {
                            id: 'cv',
                            label: 'Cummuulative View',
                            value: 'cv'
                        }
                    ]}
                />

            </div>
            <MaterialRequiremetLayout>
                {renderView()}
            </MaterialRequiremetLayout>
        </>
    )
}

export default MaterialRequirement;


