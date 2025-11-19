import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import { SCVerticalDivider } from "../../VectorFLOW/commons/DailyDataGraphModal/styles.css";
// import { useUserData } from "../../../context";
import {
  CheckboxConatiner,
  CheckboxWrapper,
  DropDownContainer,
  ActionableConatiner,
  ShowAllWrapper,
  ButtonWrapper,
} from "./styles.css";
import {
  SCViewBackground,
  SCViewContainer,
  SCViewImage,
} from "../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/Planning/ActionToolBar/styles.css";
import { useState } from "react";
import { useCombobox } from "downshift";

const Options = [
  { label: "Submit", value: "submit" },
  { label: "Accept", value: "accept" },
];

interface RetailActionToolBarProps {
  themeUi: string;
  onViewChange: (view: string) => void;
  view: string;
  onCallBack: any;
  handleSelectChange: any;
  handleGoButton: any;
  currentStatus: string;
  handleOnCancel: any;
}

const RetailActionToolBar = ({
  themeUi,
  onViewChange,
  onCallBack,
  view,
  handleSelectChange,
  handleGoButton,
  currentStatus,
  handleOnCancel,
}: RetailActionToolBarProps) => {
  const [selectedOption, setSelectedOption] = useState(Options[0]);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: Options,
    selectedItem: selectedOption,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedOption(selectedItem);
        handleSelectChange(selectedItem);
      }
    },
  });

  const themeColor = themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80";
  const hoverColor =
    themeUi === "REGALBLAZE"
      ? "rgba(252, 163, 17, 0.3)"
      : "rgba(188, 61, 129, 0.3)";

  return (
    <>
      {view === "grid" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            marginLeft: "23px",
            height: "80px",
            zoom: "0.8",
          }}
        >
          {/* Checkbox + Dropdown */}
          <div className={CheckboxWrapper}>
            <div className={CheckboxConatiner}>
              <input
                type="checkbox"
                style={{ zoom: 1.4, accentColor: "white" }}
              />
            </div>

            <div className={DropDownContainer}>
              <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                Select All For Action
              </p>

              {/* Downshift Dropdown */}
              <div style={{ position: "relative", width: "130px" }}>
                <button
                  type="button"
                  {...getToggleButtonProps()}
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(247, 247, 247)",
                    border: "1px solid #ccc",
                    padding: "6px 8px",
                    fontSize: "12px",
                    textAlign: "left",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {selectedOption.label}
                </button>
                <ul
                  {...getMenuProps()}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    border: "1px solid #eee",
                    borderRadius: "4px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    display: isOpen ? "block" : "none",
                    maxHeight: "120px",
                    overflowY: "auto",
                  }}
                >
                  {isOpen &&
                    Options.map((item, index) => (
                      <li
                        key={item.value}
                        {...getItemProps({ item, index })}
                        style={{
                          padding: "6px 8px",
                          fontSize: "11px",
                          backgroundColor:
                            highlightedIndex === index
                              ? hoverColor
                              : selectedOption.value === item.value
                              ? themeColor
                              : "white",
                          color:
                            highlightedIndex === index ||
                            selectedOption.value === item.value
                              ? "black"
                              : "#333",
                          cursor: "pointer",
                        }}
                      >
                        {item.label}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Go Button */}
          <img
            style={{ cursor: "pointer", marginLeft: "20px" }}
            src={
              themeUi === "REGALBLAZE"
                ? "/assets/img/Group 627-regal.svg"
                : "/assets/img/Group 627.svg"
            }
            height={50.02}
            width={76.83}
            onClick={handleGoButton}
          />

          <div className={SCVerticalDivider} />

          {/* Show All / Show Actionable */}
          <div className={ActionableConatiner}>
            <div className={ShowAllWrapper}>
              <div className={CheckboxConatiner}>
                <input
                  type="checkbox"
                  style={{
                    zoom: 1.5,
                    accentColor: themeColor,
                  }}
                  onClick={onCallBack}
                />
              </div>
              <p style={{ fontSize: "16px", fontWeight: 500 }}>Show All</p>
            </div>

            <div className={ShowAllWrapper} style={{ paddingLeft: "10px" }}>
              <div className={CheckboxConatiner}>
                <input
                  type="checkbox"
                  style={{
                    zoom: 1.5,
                    accentColor: themeColor,
                  }}
                  onClick={onCallBack}
                />
              </div>
              <p style={{ fontSize: "16px", fontWeight: 500 }}>
                Show Actionable
              </p>
            </div>
          </div>

          {currentStatus === "Save" ? (
            <div className={ButtonWrapper}>
              <button
                style={{
                  backgroundColor: "white",
                  height: "50px",
                  width: "100px",
                  fontSize: "20px",
                  fontWeight: 500,
                  marginRight: "20px",
                }}
                onClick={handleOnCancel}
              >
                Cancel
              </button>
              <VFButton
                onClick={() => console.log("")}
                themeUi={""}
                disabled={false}
              >
                Save Options
              </VFButton>

              <div className={SCVerticalDivider} />
              {renderViewSwitcher(themeUi, onViewChange)}
            </div>
          ) : currentStatus === "Edit" ? (
            <div className={ButtonWrapper}>
              <VFButton
                onClick={() => console.log("")}
                themeUi={""}
                disabled={false}
              >
                Edit Options
              </VFButton>
              <div className={SCVerticalDivider} />
              {renderViewSwitcher(themeUi, onViewChange)}
            </div>
          ) : (
            <div className={ButtonWrapper}>
              {renderViewSwitcher(themeUi, onViewChange)}
            </div>
          )}
        </div>
      )}
    </>
  );
};

function renderViewSwitcher(themeUi: string, onViewChange: (view: string) => void) {
  const color = themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81";
  return (
    <div className={SCViewBackground} style={{ zoom: "0.8" }}>
      <div className={SCViewContainer}>
        <img
          className={SCViewImage}
          src={
            themeUi === "REGALBLAZE"
              ? "/assets/img/VectorFLOW/BPR/chart-view-regal.svg"
              : "/assets/img/VectorFLOW/BPR/chart-view-pink.svg"
          }
          alt=""
        />
        <p style={{ color }}>{`Chart View`}</p>
      </div>
      <div>
        <div className={SCVerticalDivider} />
      </div>
      <div className={SCViewContainer} onClick={() => onViewChange("grid")}>
        <img
          className={SCViewImage}
          src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"}
          alt=""
        />
        <p style={{ color: "#b0acac" }}>Grid View</p>
      </div>
    </div>
  );
}

export default RetailActionToolBar;
