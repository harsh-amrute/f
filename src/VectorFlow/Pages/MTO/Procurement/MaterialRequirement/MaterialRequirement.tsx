import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useMaterialReq from './useMaterialRequirements';
import MaterialRequirementComponent from './MaterialRequirementComponent';



const MaterialRequirement = () => {
    const { renderView, toggleCurrentTab, onDateChangeReq, onDateSubmitReq, date, currentTab } = useMaterialReq();
    return (
        <>
            <ActionToolBar
                isReleaseDate
                isAddFilterButton
                isExcelExport
                comp={"MaterialRequirement"}
                onDateChange={onDateChangeReq}
                submitDate={() => onDateSubmitReq()}
                date={date}

            />
            <MaterialRequirementComponent currentTab={currentTab} renderView={renderView} toggleCurrentTab={toggleCurrentTab} date={date} />
        </>
    )
}

export default MaterialRequirement;


