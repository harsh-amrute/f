import Checkbox from "../../../../../components/VectorFLOW/commons/MTO/Checkbox";
import { useUserData } from "../../../../../context";
import {
  filterWrapper,
  filterHeaderWrapper,
  filterHeaderTitle,
  closeButton,
  filterContent,
  filterTabLayout,
  filterTab,
  filterTabHeader,
  filterSearchBar,
  filterList,
} from "./styles.css";

const FilterModal = ({ setIsFilterModalOpen }: any) => {
  const Stages = [
    "Granulation",
    "Mixing",
    "Drying",
    "Compression",
    "Coating",
    "Packaging",
    "Quality Control",
    "Storage",
    "Distribution",
  ];
  const themeUi = useUserData().user.user.themeUi;
  return (
    <div className={filterWrapper}>
      <div className={filterHeaderWrapper}>
        <div className={filterHeaderTitle}>
          <img
            src="/assets/img/scheduling/filter-icon.svg"
            alt="Filter"
            style={{ width: "16px", height: "16px", marginRight: "8px" }}
          />
          Select Filter
        </div>
        <button
          className={closeButton}
          onClick={() => setIsFilterModalOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className={filterContent}>
        <div className={filterTabLayout}>
          {/* Tab 1 */}
          <div className={filterTab}>
            <div className={filterTabHeader}>Stage</div>
            <input
              className={filterSearchBar}
              type="text"
              placeholder="Search Stage..."
            />
            <div className={filterList}>
              {Stages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 0",
                    gap: "6px",
                  }}
                >
                  <Checkbox style={{ zoom: 0.5 }} theme={themeUi} checked />
                  <label htmlFor={`stage-${index}`}>{stage}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Tab 2 */}
          <div className={filterTab}>
            <div className={filterTabHeader}>WorkStation</div>
            <input
              className={filterSearchBar}
              type="text"
              placeholder="Search Stage..."
            />
            <div className={filterList}>
              {Stages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 0",
                    gap: "6px",
                  }}
                >
                  <Checkbox style={{ zoom: 0.5 }} theme={themeUi} checked />
                  <label htmlFor={`ws-${index}`}>{stage}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Tab 3 */}
          <div className={filterTab}>
            <div className={filterTabHeader}>Job List</div>
            <input
              className={filterSearchBar}
              type="text"
              placeholder="Search Stage..."
            />
            <div className={filterList}>
              {Stages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 0",
                    gap: "6px",
                  }}
                >
                  <Checkbox style={{ zoom: 0.5 }} theme={themeUi} checked />
                  <label htmlFor={`job-${index}`}>{stage}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Tab 4 */}
          <div className={filterTab}>
            <div className={filterTabHeader}>Action Preference</div>
            <div className={filterList}>
              {Stages.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 0",
                    gap: "6px",
                  }}
                >
                  <Checkbox style={{ zoom: 0.5 }} theme={themeUi} checked />
                  <label htmlFor={`action-${index}`}>{stage}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
