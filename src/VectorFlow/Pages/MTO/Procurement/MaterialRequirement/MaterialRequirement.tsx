import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useMaterialReq from './useMaterialRequirements';
import MaterialRequirementComponent from './MaterialRequirementComponent';



const MaterialRequirement = () => {
    const { renderView, toggleCurrentTab, onDateChangeReq, onDateSubmitReq, date, currentTab } = useMaterialReq();
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingBottom: "2rem" }}>
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
        </div>
    )
}

export default MaterialRequirement;


