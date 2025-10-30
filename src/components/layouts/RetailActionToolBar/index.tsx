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
import Select from "react-select";

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
          <div className={CheckboxWrapper}>
            <div className={CheckboxConatiner}>
              <input
                type="checkbox"
                style={{ zoom: 1.4, accentColor: "white" }}
              />
            </div>

            <div className={DropDownContainer}>
              <p style={{ fontSize: "12px" }}>Select All For Action</p>
              <Select
                options={Options}
                placeholder={""}
                defaultValue={Options[0]}
                onChange={handleSelectChange}
                // (keep your react-select inline styles as-is)
                styles={{
                  option: (baseStyles, { isSelected }) => ({
                    ...baseStyles,
                    backgroundColor: isSelected
                      ? themeUi === "REGALBLAZE"
                        ? "#FCA311"
                        : "#BC3D80"
                      : "white",
                    "&:hover": {
                      backgroundColor:
                        themeUi === "REGALBLAZE"
                          ? "rgb(252, 163, 17, 0.3)"
                          : "#bc3d814d",
                      color: "black",
                    },
                  }),
                  control: (baseStyles, { isFocused }) => ({
                    ...baseStyles,
                    borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                    width: "130px",
                    height: "10px",
                    border: "none",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                    },
                  }),
                }}
              />
            </div>
          </div>

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

          <div className={ActionableConatiner}>
            <div className={ShowAllWrapper}>
              <div className={CheckboxConatiner}>
                <input
                  type="checkbox"
                  style={{
                    zoom: 1.5,
                    accentColor:
                      themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
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
                    accentColor:
                      themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
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
                  <p
                    style={{
                      color: themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
                    }}
                  >
                    Chart View
                  </p>
                </div>
                <div>
                  <div className={SCVerticalDivider} />
                </div>
                <div
                  className={SCViewContainer}
                  onClick={() => {
                    onViewChange("grid");
                  }}
                >
                  <img
                    className={SCViewImage}
                    src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"}
                    alt=""
                  />
                  <p style={{ color: "#b0acac" }}>Grid View</p>
                </div>
              </div>
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
                  <p
                    style={{
                      color: themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
                    }}
                  >
                    Chart View
                  </p>
                </div>
                <div>
                  <div className={SCVerticalDivider} />
                </div>
                <div
                  className={SCViewContainer}
                  onClick={() => onViewChange("grid")}
                >
                  <img
                    className={SCViewImage}
                    src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"}
                    alt=""
                  />
                  <p style={{ color: "#b0acac" }}>Grid View</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={ButtonWrapper}>
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
                  <p
                    style={{
                      color: themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81",
                    }}
                  >
                    Chart View
                  </p>
                </div>
                <div>
                  <div className={SCVerticalDivider} />
                </div>
                <div
                  className={SCViewContainer}
                  onClick={() => onViewChange("grid")}
                >
                  <img
                    className={SCViewImage}
                    src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"}
                    alt=""
                  />
                  <p style={{ color: "#b0acac" }}>Grid View</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RetailActionToolBar;
