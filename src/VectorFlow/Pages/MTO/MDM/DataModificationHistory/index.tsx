import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import {
  filterWrapper,
  selectSearchWrapper,
  buttonWrapper,
  verticalDivider,
  selectWrapper,
  textWrapper,
  dropDownWrapper,
  dualDropDownWrapper,
  arrowWrapper,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import Select from "react-select";
import useDataModificationHistory from "./useDataModificationHistory";
import VFTable from "../../Common/VFTable";

const MTODataModificationHistory = () => {
  const {
    colDefs,
    rowData,
    options,
    skuOptions,
    locOptions,
    handleChange,
    handleReset,
    // setSelectedOption,
    setSelectedSkuOption,
    setSelectedLocOption,
    selectedOption,
    selectedSkuOption,
    selectedLocOption,
    isSkuDisabled,
    isLocDisabled,
    onMasterChange,
    setRowData,
  } = useDataModificationHistory();

  const styles = {
    option: (baseStyles: any, { isSelected }: any) => ({
      ...baseStyles,
      backgroundColor: isSelected
        ? theme_ui === "REGALBLAZE"
          ? "#FCA311"
          : "#BC3D80"
        : "white",
      fontSize: "12px",
      "&:hover": {
        // backgroundColor: '#bc3d814d',
        color: "black",
        backgroundColor:
          theme_ui === "REGALBLAZE" ? "rgb(252, 163, 17,0.3) " : "#bc3d814d",
      },
    }),
    control: (baseStyles: any, { isFocused }: any) => ({
      ...baseStyles,
      borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
      fontSize: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
      },
    }),
  };
  const specificStyles = {
    control: (baseStyles: any, { isFocused }: any) => ({
      ...baseStyles,
      borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
      fontSize: "12px",
      width: "170px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
      },
    }),
  };

  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const safeOptions = Array.isArray(options) ? options : [];
  const safeSkuOptions = Array.isArray(skuOptions) ? skuOptions : [];
  const safeLocOptions = Array.isArray(locOptions) ? locOptions : [];

  return (
    <>
      <div className={filterWrapper}>
        <div className={selectSearchWrapper}>
          <div className={selectWrapper}>
            <div className={textWrapper}>
              {/* <img src={themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/eye-filled-regal.svg":"/assets/img/VectorFLOW/BPR/eye-filled-purple.svg"}/> */}

              <img
                src={
                  theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/NMS/01-RegalBlaze.svg"
                    : "/assets/img/VectorFLOW/NMS/01.svg"
                }
                alt=""
              />
              <p>Select Master</p>
            </div>

            <div className={dropDownWrapper}>
              <Select
                options={options}
                value={selectedOption}
                placeholder={"Select Master"}
                styles={styles}
                onChange={(newValue: any) => {
                  onMasterChange(newValue);
                }}
              ></Select>
            </div>
          </div>

          <div className={arrowWrapper}>
            <img src="/assets/img/VectorFLOW/NMS/arrow.svg"></img>
          </div>

          <div className={selectWrapper}>
            <div className={textWrapper}>
              <img
                src={
                  theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/NMS/02-RegalBlaze.svg"
                    : "/assets/img/VectorFLOW/NMS/02.svg"
                }
                alt=""
                style={{ marginLeft: "-20px" }}
              ></img>
              <p>Search Key</p>
            </div>
            <div className={dualDropDownWrapper}>
              <Select
                options={skuOptions}
                value={selectedSkuOption}
                placeholder={"Select SKU Code"}
                styles={{ ...styles, ...specificStyles }}
                onChange={(newValue: any) => {
                  setSelectedSkuOption(newValue);
                }}
                isDisabled={isSkuDisabled()}
              ></Select>
              <Select
                options={locOptions}
                value={selectedLocOption}
                placeholder={"Select Location"}
                styles={{ ...styles, ...specificStyles }}
                onChange={(newValue: any) => {
                  setSelectedLocOption(newValue);
                }}
                isDisabled={isLocDisabled()}
              ></Select>
            </div>
          </div>
        </div>
        <div className={verticalDivider} />
        <div className={buttonWrapper}>
          <VFButton
            onClick={() => handleChange()}
            themeUi={theme_ui}
            width={175}
          >
            Submit
          </VFButton>
          <VFButtonOutline onClick={handleReset} themeUi={theme_ui} width={175}>
            Reset
          </VFButtonOutline>
        </div>
      </div>

      <VFTable
        columnDefs={colDefs}
        rowData={rowData}
        enableRangeSelection={true}
        pagination={true}
        rowSelection="multiple"
        statusBar={{
          statusPanels: [
            {
              statusPanel: "agTotalAndFilteredRowCountComponent",
              align: "left",
            },
            { statusPanel: "agTotalRowCountComponent", align: "left" },
            { statusPanel: "agFilteredRowCountComponent", align: "left" },
            { statusPanel: "agSelectedRowCountComponent", align: "left" },
            { statusPanel: "agAggregationComponent", align: "left" },
          ],
        }}
        height={"70%"}
      />
    </>
  );
};
export default MTODataModificationHistory;
