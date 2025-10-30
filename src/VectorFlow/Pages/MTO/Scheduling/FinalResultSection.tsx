import { useState } from "react";
import SchedulingActionToolbar from "./components/SchedulingActionToolbar";
import ResourceView from "./Sections/ResourceView";
import JobView from "./Sections/JobView";
import GridViewResource from "./Sections/GridViewResource";
import GridViewJob from "./Sections/GridViewJob";
import VFOverlayModal from "../../../../components/VectorFLOW/commons/VFOverlayModal";
import FilterModal from "./components/FilterModal";
import { finalResultSectionWrapper } from "./styles.css";

const FinalResultSection = ({ setStep }: any) => {
  const [currentView, setCurrentView] = useState("ResourceView");
  const getCurrentView = () => {
    switch (currentView) {
      case "ResourceView":
        return <ResourceView />;
      case "JobView":
        return <JobView />;
      case "GridViewR":
        return <GridViewResource />;
      case "GridViewJ":
        return <GridViewJob />;
      default:
        return <ResourceView />;
    }
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className={finalResultSectionWrapper}>
      {/* Note: there was a stray `on` prop in your original; removed below */}
      <SchedulingActionToolbar
        onGoBack={() => {
          setStep("Upload");
        }}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setIsFilterModalOpen={setIsFilterModalOpen}
      />
      {getCurrentView()}

      {isFilterModalOpen && (
        <VFOverlayModal
          parentSelector="#main-content"
          openModal={isFilterModalOpen}
        >
          <FilterModal setIsFilterModalOpen={setIsFilterModalOpen} />
        </VFOverlayModal>
      )}
    </div>
  );
};

export default FinalResultSection;
