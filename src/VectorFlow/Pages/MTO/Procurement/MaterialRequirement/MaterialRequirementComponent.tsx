import moment from "moment";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import {
  MaterialRequirementHeading,
  MaterialRequirementTest,
  MaterialRequirementDate,
  MaterialRequiremetLayout,
} from "./styles.css";

const MaterialRequirementComponent = ({
  currentTab,
  toggleCurrentTab,
  renderView,
  date,
}: any) => {
  return (
    <>
      <div
        style={{
          zoom: 0.75,
          display: "flex",
          justifyContent: "center",
          marginBottom: "2px",
        }}
      >
        <VFFloatingTab
          handleClick={(tab) => toggleCurrentTab(tab)}
          tabs={[
            {
              id: "sdv",
              label: "Selected Day View",
              value: "sdv",
            },
            {
              id: "cv",
              label: "Cumulative View",
              value: "cv",
            },
          ]}
        />
      </div>

      <div className={MaterialRequirementHeading}>
        <div className={MaterialRequirementTest}>
          {`For all orders with release date ${
            currentTab.id === "sdv" ? "as on" : "till"
          }`}
        </div>
        <div className={MaterialRequirementDate}>
          {moment(date).format("Do MMMM YYYY")}
        </div>
      </div>
      <div
        className={MaterialRequiremetLayout}
        style={{ position: "relative", marginLeft: "30px", flex: "1" }}
      >
        {renderView()}
      </div>
    </>
  );
};

export default MaterialRequirementComponent;
