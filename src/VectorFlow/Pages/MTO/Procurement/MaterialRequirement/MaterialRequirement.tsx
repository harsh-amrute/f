import { MaterialRequiremetLayout, MaterialRequirementTest, MaterialRequirementDate, MaterialRequirementHeading } from './styles';
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useMaterialReq from './useMaterialRequirements';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import moment from 'moment';



const MaterialRequirement = () => {
    const { renderView, toggleCurrentTab, onDateChangeReq, onDateSubmitReq, date } = useMaterialReq();
    return (
        <>
            <ActionToolBar
                comp={"MaterialRequirement"}
                onDateChange={onDateChangeReq}
                submitDate={() => onDateSubmitReq()}
                date={date}

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
                            label: 'Cumulative View',
                            value: 'cv'
                        }
                    ]}
                />

            </div>

            <MaterialRequirementHeading>
                <MaterialRequirementTest>
                    {`For all orders with release date till`}
                </MaterialRequirementTest>
                <MaterialRequirementDate>
                    {moment(date).format('Do MMMM YYYY')}
                </MaterialRequirementDate>
            </MaterialRequirementHeading>
            <MaterialRequiremetLayout>
                {renderView()}
            </MaterialRequiremetLayout>



        </>
    )
}

export default MaterialRequirement;


