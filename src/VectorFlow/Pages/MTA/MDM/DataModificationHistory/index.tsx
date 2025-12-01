import { useMemo, useRef, useState } from "react";
import { useSelect } from "downshift";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import {
  FilterWrapper,
  SelectSearchWrapper,
  ButtonWrapper,
  VerticalDivider,
  SelectWrapper,
  TextWrapper,
  DropDownWrapper,
  DualDropDownWrapper,
  ArroWrapper,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import Select from "react-select";
import useDataModificationHistory from "./useDataModificationHistory";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
// import './react-select.css'; // your external sheet (bundled by webpack/MiniCssExtract)


const DataModificationHistory = () => {
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

  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  
  const safeOptions      = Array.isArray(options) ? options : [];
  const safeSkuOptions   = Array.isArray(skuOptions) ? skuOptions : [];
  const safeLocOptions   = Array.isArray(locOptions) ? locOptions : [];

  const safeSelected     = selectedOption ?? null;
  const safeSelectedSku  = selectedSkuOption ?? null;
  const safeSelectedLoc  = selectedLocOption ?? null;

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
    menu: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 9999,
      position: "absolute",
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

  return (
    <>
      <div className={FilterWrapper}>
        <div className={SelectSearchWrapper}>
          <div className={SelectWrapper}>
            <div className={TextWrapper}>
              {/* theme-based icon */}
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

            <div className={DropDownWrapper}>
            <Select
                options={safeOptions}           
                value={safeSelected}
                // menuIsOpen
                placeholder="Select Master"
                // menuPortalTarget={document.body} 
                styles={styles}             
                onChange={(v: any) => onMasterChange(v)}
              />
            </div>
          </div>

          <div className={ArroWrapper}>
            <img src="/assets/img/VectorFLOW/NMS/arrow.svg" alt="" />
          </div>

          <div className={SelectWrapper}>
            <div className={TextWrapper}>
              <img
                src={
                  theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/NMS/02-RegalBlaze.svg"
                    : "/assets/img/VectorFLOW/NMS/02.svg"
                }
                alt=""
                style={{ marginLeft: "-20px" }}
              />
              <p>Search Key</p>
            </div>

            <div className={DualDropDownWrapper}>
              <Select
                options={skuOptions || []}
                value={selectedSkuOption}
                placeholder="Select SKU Code"
                styles={{ ...styles, ...specificStyles }}
                onChange={(v: any) => {
                  setSelectedSkuOption(v);
                  setRowData([]);
                }}
                isDisabled={isSkuDisabled()}
              />
              <Select
                options={locOptions || []}
                value={selectedLocOption}
                placeholder="Select Location"
                styles={{ ...styles, ...specificStyles }}
                onChange={(v: any) => {
                  setSelectedLocOption(v);
                  setRowData([]);
                }}
                isDisabled={isLocDisabled()}
              />
            </div>
          </div>
        </div>

        <div className={VerticalDivider} />

        <div className={ButtonWrapper}>
          <VFButton
            onClick={handleChange}
            themeUi={theme_ui}
            style={{ fontSize: "12px", height: "40px" }}
          >
            Submit
          </VFButton>
          <VFButtonOutline
            onClick={handleReset}
            themeUi={theme_ui}
            style={{ fontSize: "12px", height: "40px" }}
          >
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

export default DataModificationHistory;
