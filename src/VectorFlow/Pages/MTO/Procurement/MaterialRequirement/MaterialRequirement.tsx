import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import useMaterialReq from './useMaterialRequirements';
import MaterialRequirementComponent from './MaterialRequirementComponent';
import OverlayLoader from '../../Common/Loader';


const MaterialRequirement = () => {
    const { 
        renderView, 
        toggleCurrentTab, 
        onDateChangeReq, 
        onDateSubmitReq, 
        date, 
        currentTab, 
        isMatReqLoading,
        isMatReqDayWiseLoading,
        isUpdateUserConfig,
        isGetUserConfig,
        handleResetClick,
        handleSaveClick, } = useMaterialReq();
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingBottom: "2rem" }}>
            {(isMatReqLoading || isMatReqDayWiseLoading || isUpdateUserConfig || isGetUserConfig) && (
                <OverlayLoader />
            )}
            <ActionToolBar
                isReleaseDate
                isAddFilterButton
                isExcelExport
                comp={"MaterialRequirement"}
                onDateChange={onDateChangeReq}
                submitDate={() => onDateSubmitReq()}
                date={date}
                handleSaveClick={handleSaveClick}
                handleResetClick={handleResetClick}

            />
            <MaterialRequirementComponent currentTab={currentTab} renderView={renderView} toggleCurrentTab={toggleCurrentTab} date={date} />
        </div>
    )
}

export default MaterialRequirement;


