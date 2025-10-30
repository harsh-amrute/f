import VFButton from "../VFButton";
import VFModalCard from "../VFModalCard";
import { useUserData } from "../../../../context";
import {
  ButtonFilterWrapper,
  FilterCardWrapper,
  FilterBody,
  FilterHeader,
  ButtonContainer,
  FilterComponent,
  SelectDropdownComponent,
  DropdownGroupWrapper,
  MultiSelectCheckBoxComponent,
  TextFieldHeader,
  RangeSliderComponent,
  VFHorizonText,
  SkeletonWrapper,
  SkeletonGroup,
  SkeletonContainer,
  SkeletonFooter,
  MultiSelectTheme,
  checkboxInput,
  optionLabel,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import VFButtonOutline from "../VFButtonOutline";
import React, { useEffect, useState } from "react";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import { useSpring, animated } from "react-spring";
import Select, { components, StylesConfig } from "react-select";
import "./styles.css";
import "./react-select.css";

import { notifyError, notifySuccess } from "../../../../helpers/notify";

import {
  useGetAllSKUs,
  useGetAllLocations,
} from "../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";

import VFRangeSlider from "../VFRangeSlider";
import { BPRFilter, BPRFilterState } from "../../../../VectorFlow/types/BPR";
import { BTRCategoryNumberToTextMapper } from "../../../../helpers/BPRConstants";
import { skeleton } from "../../../commons/styled/index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

// import { generalFilterOptions } from '../../utils';

interface VFMultiFilterProps {
  isFilterOpen: boolean;
  onApplyFilter: (params: any) => void;
  onGoBack: () => void;
  selectedOption?: () => void;
  toggleAdd?: () => void;
  placeholder?: string;
  supplyChainNodeFilterActive?: boolean;
  locationFilterActive?: boolean;
  productFilterActive?: boolean;
  availabilityFilterActive?: boolean;
  colorFilterActive?: boolean;
  coverageFilterActive?: boolean;
  generalFilterActive?: boolean;
  horizon?: number;
  onChangeHorizon?: (value: number) => void;
  multiFilter: BPRFilterState;
  setMultiFilter: any;
  supplyChainForLocationCheckBoxList: Array<any>;
  supplyChainForChildrenOfCheckBoxList: Array<any>;
  currentTab?: any;
  currCategory?: any;
  generalFilterOptions?: any;
}

const FilterCheckboxAccordian = ({
  filterType,
  filterKey,
  isOpen,
  setOpenStatus,
  children,
}: any) => {
  const openStatusReducer = (prevStatus: any) => {
    Object.keys(prevStatus).forEach((filterType) => {
      if (filterKey !== filterType) {
        prevStatus[filterType] = false;
      }
    });
    return { ...prevStatus, [filterKey]: !prevStatus[filterKey] };
  };

  const openAnimation = useSpring<any>({
    from: { opacity: "0", maxHeight: "25px" },
    to: { opacity: "1", maxHeight: isOpen ? "200px" : "25px" },
    config: { duration: "300" },
  });

  const closeAnimation = useSpring<any>({
    from: { opacity: "0", maxHeight: "0px" },
    to: { opacity: "1", maxHeight: isOpen ? "144px" : "0px" },
    config: { duration: "300" },
  });

  const iconAnimation = useSpring<any>({
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    },
    config: { duration: "120" },
  });

  return (
    <>
      <animated.div className="filter-accordian" style={openAnimation}>
        <div
          className="accordian-header "
          onClick={() => {
            setOpenStatus(openStatusReducer);
          }}
          style={{ display: "flex", gap: "1rem" }}
        >
          <p
            className="accordian-title"
            style={{ fontWeight: isOpen ? "500" : "" }}
          >
            {filterType}
          </p>
          <animated.img
            style={iconAnimation}
            src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
            data-testid="down-arrow"
          ></animated.img>
        </div>
        <animated.div
          className="accordian-body  custom-scrollbar"
          style={closeAnimation}
        >
          {children}
        </animated.div>
      </animated.div>
    </>
  );
};

interface FilterMultiSelectCheckboxProps {
  filterOptions: Array<{ label: string; id: string }>;
  filterState: Array<any>;
  header?: string;
  onChange: any;
  filterId?: any;
}

const FilterMultiSelectCheckbox = ({
  filterOptions,
  header,
  onChange,
  filterState,
}: FilterMultiSelectCheckboxProps) => {
  const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;
  return (
    <>
      {filterOptions.map(
        (option: { label: string; id: string }, index: number) => {
          const color = colorMap[index];

          const themeKey = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";
          const isChecked = !!filterState.find(
            (f: any) => option.label === f.value && header === f.attributeName
          );

          return (
            <>
              <div
                key={option.id}
                className={`${MultiSelectCheckBoxComponent} ${MultiSelectTheme[themeKey]}`}
              >
                <input
                  className={checkboxInput}
                  type="checkbox"
                  name={option.label}
                  onChange={(e: any) => onChange(e, "value")}
                  checked={isChecked}
                />

                {header === "Coverage" ? (
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: color,
                    }}
                  ></div>
                ) : null}
                <label className={optionLabel}>{option.label}</label>
              </div>
            </>
          );
        }
      )}
    </>
  );
};

function FilterSelectDropdown({
  placeholder,
  options,
  hideDropdownArrow,
  onChange,
  filterId,
  value,
}: any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const styles: StylesConfig = {
    control: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "39px",
      height: "39px",
      paddingLeft: hideDropdownArrow ? "10px" : "16px",
      paddingRight: hideDropdownArrow ? "10px" : "8px",
      border: "none",
      boxShadow: "none",
      backgroundColor: "#F2F2F2",
      borderRadius: isMenuOpen ? "20px 20px 0 0" : "20px",
      cursor: "pointer",
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "12px",
      color: "#313131",
      lineHeight: "16px",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),

    singleValue: (base) => ({
      ...base,
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "16px",
      padding: "0 5px",
      boxSizing: "border-box",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "16px",
      padding: "0 5px",
      boxSizing: "border-box",
      textAlign: hideDropdownArrow ? "center" : undefined,
    }),

    menu: (base) => ({
      ...base,
      marginTop: 0,
      boxShadow: "none",
      backgroundColor: "#F2F2F2",
      borderRadius: "0 0 20px 20px",
      border: "none",
      zIndex: 9999,
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "140px",
      overflowY: "auto",
      overflowX: "hidden",
      paddingLeft: "5px",
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    }),

    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      borderTop: "1px solid #B7B7B7",
      backgroundColor: state.isFocused ? "#E2EFFF" : "transparent",
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "16px",
      paddingTop: "3px",
      paddingBottom: "3px",
    }),

    indicatorsContainer: (base) => ({
      ...base,
      display: hideDropdownArrow ? "none" : "flex",
      paddingRight: "10px",
      alignItems: "center",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const DropdownIndicator = (props: any) =>
    hideDropdownArrow ? null : (
      <components.DropdownIndicator {...props}>
        <img
          src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
          alt=""
          style={{ width: 12, height: 12 }}
        />
      </components.DropdownIndicator>
    );

  return (
    <Select
      classNamePrefix="rs"         // stable class names like rs__dummyInput
      unstyled={true}              // don't inject emotion styles
      styles={styles}              // our full visual spec inline
      options={options}
      isClearable={false}
      isSearchable={false}
      placeholder={placeholder}
      aria-label={filterId}
      value={value}
      inputId="lf1-input"
      onChange={onChange}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
    />
  );
}
const FilterTextInput = ({
  placeholder,
  onChange,
  disabled = false,
  value,
}: any) => {
  return (
    <input
      type="text"
      disabled={disabled}
      style={{
        width: "100%",
        height: "38px",
        background: "#F2F2F2 0% 0% no-repeat padding-box",
        borderRadius: "20px",
        outline: "none",
        color: "#313131",
        fontFamily: "Roboto",
        fontWeight: "300",
        fontSize: "12px",
        textAlign: "center",
        border: "none",
      }}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

const AvailabilityFilter = ({
  placeholder,
  header,
  onChange,
  filterId,
  filterState,
  generalFilterOptions,
}: any) => {
  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);

  const PRODUCT_PERMISSION_L1 = EnvConfig["PRODUCT_PERMISSION_L1"];
  const PRODUCT_PERMISSION_L2 = EnvConfig["PRODUCT_PERMISSION_L2"];
  const PRODUCT_PERMISSION_L3 = EnvConfig["PRODUCT_PERMISSION_L3"];

  const LOCATION_PERMISSION_L1 = EnvConfig["LOCATION_PERMISSION_L1"];
  const LOCATION_PERMISSION_L2 = EnvConfig["LOCATION_PERMISSION_L2"];
  const LOCATION_PERMISSION_L3 = EnvConfig["LOCATION_PERMISSION_L3"];

  const filterLocationOptions = [
    { value: "l1", label: LOCATION_PERMISSION_L1 },
    { value: "l2", label: LOCATION_PERMISSION_L2 },
    { value: "l3", label: LOCATION_PERMISSION_L3 },
  ];

  const filterProductOptions = [
    { value: "p1", label: PRODUCT_PERMISSION_L1 },
    { value: "p2", label: PRODUCT_PERMISSION_L2 },
    { value: "p3", label: PRODUCT_PERMISSION_L3 },
  ];

  const colorFilterOptions = [
    { value: "black", label: "Black" },
    { value: "black/red", label: "Black/Red" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "white", label: "White" },
  ];

  const colorTypeFilterOptions = [
    { value: "colorcount", label: "Color Count" },
    { value: "colorage", label: "Color Age" },
  ];

  const comparisionOptions = [
    { value: "equalto", label: "Equal to" },
    { value: "notequalto", label: "Not Equal to" },
    // {value:'greaterthan',label:'>'},
    // {value:'greaterthanequalto',label:'>='},
    // {value:'smallerthan',label:'<'},
    // {value:'smallerthanequalto',label:'<='},
    { value: "doesnotcontain", label: "Does not contain" },
    // {value:'contain',label:'contains'},
    { value: "startswith", label: "Starts with" },
    { value: "doesnotstartwith", label: "Does not start with" },
    { value: "endswith", label: "Ends with" },
    { value: "doesnotendwith", label: "Does not end with" },
    // {value:'hasvalue',label:'Has value'},
    { value: "hasnovalue", label: "Has no value" },
  ];

  const comparisionIntegerOptions = [
    { value: "equalto", label: "=" },
    { value: "greaterthan", label: ">" },
    { value: "smallerthan", label: "<" },
    { value: "greaterthanequalto", label: ">=" },
    { value: "smallerthanequalto", label: "<=" },
    { value: "notequalto", label: "!=" },
  ];

  const getOperatorValue = (comparisionOptions: any) => {
    const doesFilterExist = filterState.find(
      (filter: any) => filter.name === filterId
    );
    if (doesFilterExist) {
      return comparisionOptions.find(
        (c: any) => c.value === doesFilterExist.operator
      );
    }
    // return comparisionOptions[0]
    return "OP";
  };

  const getValue = () => {
    const doesFilterExist = filterState.find((o: any) => o.name == filterId);
    if (doesFilterExist) {
      // console.log('Filter value:', doesFilterExist.value);
      return doesFilterExist.value || "";
      // return doesFilterExist.value
    }
    return "";
  };

  const getDropDownValue = (options: any) => {
    const doesFilterExist = filterState.find((m: any) => m.name == filterId);
    if (doesFilterExist) {
      if (options === "colorFilterOptions")
        return colorFilterOptions.find(
          (n: any) => n.value == doesFilterExist.attributeName
        );
      if (options === "filterLocationOptions") {
        return filterLocationOptions.find(
          (n: any) => n.value == doesFilterExist.attributeName
        );
      }
      if (options === "filterProductOptions") {
        return filterProductOptions.find(
          (n: any) => n.value == doesFilterExist.attributeName
        );
      }
      if (options === "colorTypeFilterOptions") {
        return colorTypeFilterOptions.find(
          (n: any) => n.value == doesFilterExist.type
        );
      }
    }
    return "";
  };

  return (
    <>
      <div className={DropdownGroupWrapper}>
        {header === "Availabilty Filter" ? (
          <div
            className={SelectDropdownComponent}
            data-testid="BPR-filter-dropdown"
          >
            <FilterTextInput disabled placeholder={placeholder} />
          </div>
        ) : (
          <div
            className={SelectDropdownComponent}
            data-testid="BPR-filter-dropdown"
          >
            {header === "General Filter" && (
              <FilterSelectDropdown
                className="custom-scrollbar"
                placeholder={placeholder}
                options={generalFilterOptions}
                onChange={(e: any) => onChange(e, "attributeName", true)}
                filterId={filterId}
                value={getDropDownValue("generalFilterOptions")}
              />
            )}

            {header === "Product Filter" && (
              <FilterSelectDropdown
                className="custom-scrollbar"
                placeholder={placeholder}
                options={filterProductOptions}
                onChange={(e: any) => onChange(e, "attributeName", true)}
                filterId={filterId}
                value={getDropDownValue("filterProductOptions")}
              />
            )}

            {header === "Location Filter" && (
              <FilterSelectDropdown
                className="custom-scrollbar"
                placeholder={placeholder}
                options={filterLocationOptions}
                onChange={(e: any) => onChange(e, "attributeName", true)}
                filterId={filterId}
                value={getDropDownValue("filterLocationOptions")}
              />
            )}

            {header === "Color Filter" && (
              <FilterSelectDropdown
                className="custom-scrollbar"
                placeholder={placeholder}
                options={colorTypeFilterOptions}
                onChange={(e: any) => onChange(e, "type")}
                filterId={filterId}
                value={getDropDownValue("colorTypeFilterOptions")}
              />
            )}
          </div>
        )}

        {header === "Color Filter" && (
          <div
            className={SelectDropdownComponent}
            data-testid="BPR-filter-dropdown"
          >
            <FilterSelectDropdown
              className="custom-scrollbar"
              placeholder="Color"
              options={colorFilterOptions}
              hideDropdownArrow
              onChange={(e: any) => onChange(e, "attributeName")}
              filterId={filterId}
              value={getDropDownValue("colorFilterOptions")}
            />
          </div>
        )}

        <div
          className={SelectDropdownComponent}
          data-testid="BPR-filter-dropdown"
        >
          {header === "Availabilty Filter" || header === "Color Filter" ? (
            <FilterSelectDropdown
              className="custom-scrollbar"
              placeholder="OP"
              options={comparisionIntegerOptions}
              hideDropdownArrow
              onChange={(e: any) => onChange(e, "operator", false)}
              filterId={filterId}
              value={getOperatorValue(comparisionIntegerOptions)}
            />
          ) : (
            <FilterSelectDropdown
              className="custom-scrollbar"
              placeholder="OP"
              options={comparisionOptions}
              hideDropdownArrow
              onChange={(e: any) => onChange(e, "operator", false)}
              filterId={filterId}
              value={getOperatorValue(comparisionOptions)}
            />
          )}
        </div>

        <div
          className={SelectDropdownComponent}
          data-testid="BPR-filter-dropdown"
        >
          <FilterTextInput
            placeholder="Value"
            onChange={(e: any) => onChange(e, "value")}
            header={header}
            value={getValue()}
          />
        </div>
      </div>
    </>
  );
};
const VFMultiFilter = (props: VFMultiFilterProps) => {
  const { user } = useUserData();
  // const selectValues = useRef<object[]>([]);
  //const selectValues = useRef<any>([]);
  //  let selectValues={
  //     current:[]
  //  }

  const {
    isFilterOpen,
    onGoBack,
    multiFilter,
    setMultiFilter,
    supplyChainNodeFilterActive = false,
    productFilterActive = false,
    locationFilterActive = false,
    availabilityFilterActive = false,
    colorFilterActive = false,
    coverageFilterActive = false,
    generalFilterActive = false,
    onChangeHorizon,
    onApplyFilter,
    supplyChainForLocationCheckBoxList,
    supplyChainForChildrenOfCheckBoxList,
    horizon = 0,
    currentTab,
    currCategory,
    generalFilterOptions,
  } = props;

  const onFilterChange = (
    filterId: string,
    e: any,
    parentId: string,
    property: string,
    header?: string,
    updateLabel?: boolean
  ) => {
    // if(filterId==="Horizon"){
    //     setMultiFilter({...multiFilter,horizon:e})
    // }

    const filterObj: BPRFilter = {
      attributeName: "",
      value: "",
      operator: "",
      label: "",
      name: filterId,
    };
    // if(filterId==='SCF2'){
    //     filterObj.attributeName='ForLocationLocationCode';
    //     filterObj.operator='='
    // }
    if (filterId === "SCF3") {
      filterObj.attributeName = "ForChildrenLocationCode";
      filterObj.label = "ForChildrenLocationCode";
      filterObj.operator = "=";
    }
    if (filterId === "PF6") {
      filterObj.attributeName = "SKU"; //enter sku
      filterObj.label = "SKU";

      filterObj.operator = "=";
    }
    if (filterId === "PF7") {
      filterObj.attributeName = "EnterDescription";
      filterObj.label = "EnterDescription";
      //omit
      filterObj.operator = "=";
    }
    if (filterId === "LF6") {
      filterObj.attributeName = "Location";
      filterObj.label = "LocationCode";
      //location
      filterObj.operator = "=";
    }
    // if(filterId ==='SCF2'){ //locatipon code tha og
    //     filterObj.attributeName='Location';
    //     filterObj.operator='='
    // }
    // if(filterId ==='SCF3' || filterId==='SCF6'){   //omit
    //     filterObj.attributeName='LocationDescription';
    //     filterObj.operator='='
    // }
    if (filterId === "SCF1") {
      filterObj.attributeName = "ForLocation";
      filterObj.label = "ForLocation";
      filterObj.operator = "=";
    }
    if (filterId === "SCF2") {
      filterObj.attributeName = "ForChildren";
      filterObj.label = "ForChildren";
      filterObj.operator = "=";
    }
    if (filterId === "AF5") {
      filterObj.attributeName = "OHIC";
      filterObj.label = "OHIC";
      filterObj.operator = "=";
    }
    if (filterId === "AF6") {
      filterObj.attributeName = "PIC";
      filterObj.label = "PIC";
      filterObj.operator = "=";
    }
    if (filterId === "AF7") {
      filterObj.attributeName = "PIPO,Seasonality";
      filterObj.label = "Tags";
      filterObj.operator = "=";
    }
    if (filterId === "AF8") {
      filterObj.attributeName = "Category";
      filterObj.label = "Category";
      filterObj.operator = "=";
    }
    if (filterId === "CGF3") {
      filterObj.attributeName = "Coverage";
      filterObj.label = "Coverage";
      filterObj.operator = "=";
    }
    if (filterId === "AF1") {
      filterObj.attributeName = "Norm";
      filterObj.label = "Norm";
    }
    if (filterId === "AF3") {
      filterObj.attributeName = "Git";
      filterObj.label = "Git";
    }
    if (filterId === "AF2") {
      filterObj.attributeName = "Stock";
      filterObj.label = "Stock";
    }
    if (filterId === "AF4") {
      filterObj.attributeName = "Availability";
      filterObj.label = "Availabilty";
    }

    const currGroupKey: any = Object.keys(filterState).find(
      (key: string) => filterState[key as keyof BPRFilterState].id === parentId
    );
    // let currentKey:any=""
    let finalValue: any | [];
    let selectedValues: any = [];
    const finalLabel: string = e.label;

    const getTrimmedValue = (finalValue: any) => {
      return finalValue.split(" ")[0];
    };

    if (e.value) {
      finalValue = e.value;
    } else if (e.target && e.target.type === "checkbox") {
      finalValue = e.target.name;

      filterObj.value = finalValue;
      filterObj.name = filterId;

      const newFilterObj = { ...filterObj, value: finalValue };
      const currGroupKey: any | undefined = Object.keys(filterState).find(
        (key: string) => {
          if (filterState[key as keyof BPRFilterState].id === parentId) {
            // currentKey = key
            return filterState[key as keyof BPRFilterState].id === parentId;
          }
        }
      );
      if (currGroupKey) {
        selectedValues = [
          ...filterState[currGroupKey as keyof BPRFilterState].filters,
        ];
      }

      if (
        !selectedValues.some(
          (obj: any) => obj.value === finalValue && obj.name === filterId
        )
      ) {
        selectedValues.push(newFilterObj);
      } else {
        selectedValues = selectedValues.filter(
          (obj: any) => !(obj.value === finalValue && obj.name === filterId)
        );
        //(obj.value !== finalValue) &&
      }

      setFilterState({
        ...filterState,
        [currGroupKey]: {
          ...filterState[currGroupKey as keyof BPRFilterState],
          filters: [...selectedValues],
        },
      });
      return;
    } else if (e.target) {
      finalValue = e.target.value;
    } else if (Array.isArray(e)) {
      finalValue = e.map((ele: any) => {
        const newfilterObj = { ...filterObj };
        // newfilterObj.value = ele.label;
        newfilterObj.value = getTrimmedValue(ele.label);

        return newfilterObj;
      });
    }

    const currGroup: string | undefined = Object.keys(filterState).find(
      (key: string) => {
        return filterState[key as keyof BPRFilterState].id === parentId;
      }
    );

    if (currGroup) {
      const currFilter: BPRFilter | undefined = filterState[
        currGroup as keyof BPRFilterState
      ].filters.find((filter: BPRFilter) => {
        return filter.name === filterId;
      });
      if (currFilter) {
        //if((e.target && e.target.type ==="checkbox") || Array.isArray(e) ){
        if (Array.isArray(e)) {
          let tempFilteredArray = filterState[
            currGroupKey as keyof BPRFilterState
          ].filters.filter((f: BPRFilter) => f.name !== filterId);
          tempFilteredArray = [...tempFilteredArray, ...finalValue];
          setFilterState({
            ...filterState,
            [currGroupKey]: {
              ...filterState[currGroupKey as keyof BPRFilterState],
              filters: tempFilteredArray,
            },
          });
        } else {
          setFilterState({
            ...filterState,
            [currGroupKey]: {
              ...filterState[currGroupKey as keyof BPRFilterState],
              filters: [
                ...filterState[
                  currGroupKey as keyof BPRFilterState
                ].filters.map((filter: BPRFilter) => {
                  if (filter.name === filterId) {
                    const result: any = {
                      ...filter,
                    };

                    if (finalLabel && updateLabel) {
                      result["label"] = finalLabel;
                    }
                    if (finalValue !== undefined) {
                      result[property] = finalValue;
                    }
                    return result;
                  }
                  return filter;
                }),
              ],
            },
          });
        }
      } else if (header === "Color Filter") {
        const filterObj: BPRFilter = {
          type: "",
          attributeName: "",
          value: "",
          operator: "",
          label: "",
          name: filterId,
        };

        filterObj[property as keyof BPRFilter] = finalValue;
        filterObj.label = String(filterObj.type);
        setFilterState({
          ...filterState,
          [currGroupKey]: {
            ...filterState[currGroupKey as keyof BPRFilterState],
            filters: [
              ...filterState[currGroupKey as keyof BPRFilterState].filters,
              { ...filterObj },
            ],
          },
        });
      } else {
        if (Array.isArray(e) && e.length === 1) {
          filterObj[property as keyof BPRFilter] = finalValue[0].value;
          setFilterState({
            ...filterState,
            [currGroupKey]: {
              ...filterState[currGroupKey as keyof BPRFilterState],
              filters: [
                ...filterState[currGroupKey as keyof BPRFilterState].filters,
                { ...filterObj },
              ],
            },
          });
          return;
        }
        filterObj[property as keyof BPRFilter] = finalValue;
        if (finalLabel && updateLabel) filterObj["label"] = finalLabel;
        setFilterState({
          ...filterState,
          [currGroupKey]: {
            ...filterState[currGroupKey as keyof BPRFilterState],
            filters: [
              ...filterState[currGroupKey as keyof BPRFilterState].filters,
              { ...filterObj },
            ],
          },
        });
      }
    }
  };

  const [filterState, setFilterState] = useState<BPRFilterState>(multiFilter);
  const [openStatus, setOpenStatus] = useState({
    category: false,
    location: false,
    loc_children: false,
    availabilty_tech_color: false,
    availabilty_eco_color: false,
    availabilty_tags: false,
    coverage_filter: false,
    model: false,
    btrCategory: false,
  });

  const [child, setChild] = useState({
    location_type: true,
    loc_children_type: true,
  });

  // const {data,isLoading} = useGetAllSKUs()

  // const options = data?.data?.data.map((ele: any)=> {
  //     // return {label: ele.sc, value: ele.sd}
  //     return {label: `${ele.sc} (${ele.sd})`, value: ele.sc}

  // })

  const { data, isLoading } = useGetAllSKUs();
  const { data: locationData, isLoading: isLocationDataLoading } =
    useGetAllLocations();

  const getOptions = (data: Array<any>, isSku?: boolean) => {
    if (isSku) {
      return data?.map((sku: any) => {
        return { label: `${sku.sc} (${sku.sd})`, value: sku.sc };
      });
    }

    return data?.map((location: any) => {
      return { label: `${location.wc} (${location.wd})`, value: location.wc };
    });
  };

  const getAPIValue = (filterId: any, filterState: any) => {
    return filterState.map((f: BPRFilter) => {
      if (f.name === filterId) {
        return {
          label: f.value,
          value: f.value,
        };
      }
    });
  };

  const loading = isLoading || isLocationDataLoading;

  const validation = () => {
    const requiredFilters = ["Norm", "Git", "Stock"];
    const emptyFilters = requiredFilters.filter((filterName) =>
      filterState.availabilityFilter.filters.some(
        (filter: any) =>
          filter.attributeName === filterName && filter.value === ""
      )
    );

    return emptyFilters;
  };

  const resetFilters = () => {
    const resetMultiFilter = { ...multiFilter };
    Object.keys(resetMultiFilter).forEach((key) => {
      resetMultiFilter[key as keyof BPRFilterState].filters = [];
    });
    setFilterState(resetMultiFilter);
    setMultiFilter(resetMultiFilter); // Update the parent state as well
    notifySuccess(`Filters reset Successfully`);
  };

  useEffect(() => {
    if (multiFilter) {
      if (Object.keys(multiFilter).length) {
        setFilterState(JSON.parse(JSON.stringify(multiFilter)));
      }
    }
  }, []);

  const hasAppliedFilters = () => {
    if (!filterState) return false;
    return Object.values(filterState).some(
      (filterGroup) => filterGroup.filters && filterGroup.filters.length > 0
    );
  };

  return (
    <>
      <VFModalCard
        zoom="0.73"
        openModal={isFilterOpen}
        closeModal={onGoBack}
        headerIcon="/assets/img/VectorFLOW/BPR/select-filter.svg"
        headerText={
          loading ? (
            <div className={skeleton} style={{ height: 20, width: 80 }} />
          ) : (
            "Select Filter"
          )
        }
        closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
        paddingLeftAndRight={0}
        backgroundColor="#f4f4f4"
        data-testid="vfmultifilter-img"
      >
        {loading ? (
          <div className={SkeletonWrapper}>
            <div className={SkeletonContainer}>
              <div className={SkeletonGroup}>
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
              </div>
              <div className={SkeletonGroup}>
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 200,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 100,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
              </div>
              <div className={SkeletonGroup}>
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
              </div>
              <div className={SkeletonGroup}>
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
                <div
                  className={skeleton}
                  style={{
                    height: 50,
                    width: "100%",
                    marginTop: 10,
                  }}
                />
              </div>
            </div>
            <div className={SkeletonFooter}>
              <div
                className={skeleton}
                style={{
                  height: 40,
                  width: 160,
                }}
              />
              <div
                className={skeleton}
                style={{
                  height: 40,
                  width: 160,
                  marginLeft: 20,
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {onChangeHorizon ? (
              <>
                <div
                  className={RangeSliderComponent}
                  data-testid="horizonActive"
                >
                  <div className={VFHorizonText}>
                    <p>Horizon</p>
                  </div>
                  <VFRangeSlider
                    min={1}
                    max={90}
                    milestones={[-1, 1, 30, 60, 90]}
                    strictMode={false}
                    width={500}
                    defaultValue={horizon}
                    handleChange={(v: number) => onChangeHorizon(v)}
                    showTriangle
                  />
                </div>
                <hr style={{ marginLeft: "30px", marginRight: "30px" }} />
              </>
            ) : null}

            <div
              className={FilterBody}
              style={{ maxHeight: onChangeHorizon ? "450px" : "unset" }}
            >
              <div>
                {/* Example card */}
                {supplyChainNodeFilterActive && (
                  <div
                    className={FilterCardWrapper}
                    data-testid="supplyChainNodeFilter"
                  >
                    <div className={FilterHeader}>
                      <p>Supply Chain Node Filter</p>
                    </div>
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.location ? "unset" : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="For Locations"
                        filterKey="location"
                        isOpen={openStatus.location}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterCheckboxAccordian
                          filterType="Location Type"
                          filterKey="location_type"
                          isOpen={child.location_type}
                          setOpenStatus={setChild}
                          style={{ paddingLeft: "50px", maxHeight: "unset" }}
                        >
                          <FilterMultiSelectCheckbox
                            header={"ForLocation"}
                            filterOptions={supplyChainForLocationCheckBoxList}
                            filterState={filterState.supplyChainFilter.filters}
                            onChange={(e: any, key: string) =>
                              onFilterChange("SCF1", e, "1", key)
                            }
                          />
                        </FilterCheckboxAccordian>
                      </FilterCheckboxAccordian>{" "}
                    </div>
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.loc_children ? "unset" : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="For Children Of"
                        filterKey="loc_children"
                        isOpen={openStatus.loc_children}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterCheckboxAccordian
                          filterType="Location Type"
                          filterKey="loc_children_type"
                          isOpen={child.loc_children_type}
                          setOpenStatus={setChild}
                          style={{ paddingLeft: "50px" }}
                        >
                          <FilterMultiSelectCheckbox
                            header={"ForChildren"}
                            filterOptions={supplyChainForChildrenOfCheckBoxList}
                            filterState={filterState.supplyChainFilter.filters}
                            onChange={(e: any, key: string) =>
                              onFilterChange("SCF2", e, "1", key)
                            }
                          />
                        </FilterCheckboxAccordian>
                      </FilterCheckboxAccordian>
                    </div>
                    {openStatus.loc_children ? (
                      <>
                        <div
                          className={FilterComponent}
                          style={{
                            borderTop: "0.5px solid #B7B7B7",
                            marginBottom: "5px",
                          }}
                        >
                          <div className={TextFieldHeader}>
                            <p>Specific Locations</p>
                          </div>
                          <VFMasterFieldSearch
                            value={getAPIValue(
                              "SCF3",
                              filterState.supplyChainFilter.filters
                            )}
                            setValue={(e: any) =>
                              onFilterChange("SCF3", e, "1", "value")
                            }
                            options={getOptions(locationData?.data.data)}
                            placeholder={"Enter Location"}
                            handleListChild={() => console.log("")}
                            maxToShow={3}
                            backgroundColor={"#F2F2F2"}
                            borderRadius={40}
                            disabled={false}
                            boxShadow={"0"}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                )}

                {/* General Filter */}
                {generalFilterActive && (
                  <div
                    className={FilterCardWrapper}
                    data-testid="locationFilter"
                    style={{ marginTop: "-30px" }}
                  >
                    <div className={FilterHeader}>
                      <p>General Filter</p>
                    </div>
                    <div
                      className={FilterComponent}
                      style={{ borderTop: "0.5px solid #B7B7B7" }}
                    >
                      <AvailabilityFilter
                        placeholder="Select"
                        onChange={(e: any, key: string, updateLabel: boolean) =>
                          onFilterChange("GF1", e, "7", key, "", updateLabel)
                        }
                        header="General Filter"
                        filterId="GF1"
                        filterState={filterState.generalFilter.filters}
                        generalFilterOptions={generalFilterOptions}
                      />
                    </div>
                  </div>
                )}
              </div>

              {locationFilterActive && (
                <div className={FilterCardWrapper} data-testid="locationFilter">
                  <div className={FilterHeader}>
                    <p>Location Filter</p>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("LF1", e, "2", key, "", updateLabel)
                      }
                      header="Location Filter"
                      filterId={"LF1"}
                      filterState={filterState.locationFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("LF2", e, "2", key, "", updateLabel)
                      }
                      header="Location Filter"
                      filterId={"LF2"}
                      filterState={filterState.locationFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("LF3", e, "2", key, "", updateLabel)
                      }
                      header="Location Filter"
                      filterId={"LF3"}
                      filterState={filterState.locationFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("LF4", e, "2", key, "", updateLabel)
                      }
                      header="Location Filter"
                      filterId={"LF4"}
                      filterState={filterState.locationFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("LF5", e, "2", key, "", updateLabel)
                      }
                      header="Location Filter"
                      filterId={"LF5"}
                      filterState={filterState.locationFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{
                      borderTop: "0.5px solid #B7B7B7",
                      marginBottom: "7px",
                    }}
                  >
                    <VFMasterFieldSearch
                      value={getAPIValue(
                        "LF6",
                        filterState.locationFilter.filters
                      )}
                      setValue={(e: any) =>
                        onFilterChange("LF6", e, "2", "value")
                      }
                      options={getOptions(locationData?.data.data)}
                      placeholder={"Enter Location"}
                      handleListChild={() => console.log("")}
                      maxToShow={3}
                      backgroundColor={"#F2F2F2"}
                      borderRadius={40}
                      disabled={false}
                      boxShadow={"0"}
                    />
                  </div>
                </div>
              )}

              {productFilterActive && (
                <div className={FilterCardWrapper} data-testid="productFilter">
                  <div className={FilterHeader}>
                    <p>Product Filter</p>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("PF1", e, "3", key, "", updateLabel)
                      }
                      filterState={filterState.productFilter.filters}
                      filterId={"PF1"}
                      header="Product Filter"
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("PF2", e, "3", key, "", updateLabel)
                      }
                      filterState={filterState.productFilter.filters}
                      filterId={"PF2"}
                      header="Product Filter"
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("PF3", e, "3", key, "", updateLabel)
                      }
                      filterState={filterState.productFilter.filters}
                      filterId={"PF3"}
                      header="Product Filter"
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("PF4", e, "3", key, "", updateLabel)
                      }
                      filterState={filterState.productFilter.filters}
                      filterId={"PF4"}
                      header="Product Filter"
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Select"}
                      onChange={(e: any, key: string, updateLabel: boolean) =>
                        onFilterChange("PF5", e, "3", key, "", updateLabel)
                      }
                      filterState={filterState.productFilter.filters}
                      filterId={"PF5"}
                      header="Product Filter"
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{
                      borderTop: "0.5px solid #B7B7B7",
                      marginBottom: "7px",
                    }}
                  >
                    <VFMasterFieldSearch
                      value={getAPIValue(
                        "PF6",
                        filterState.productFilter.filters
                      )}
                      setValue={(e: any) =>
                        onFilterChange("PF6", e, "3", "value")
                      }
                      options={getOptions(data?.data.data, true)}
                      placeholder={"Enter SKU"}
                      handleListChild={() => console.log("")}
                      maxToShow={3}
                      backgroundColor={"#F2F2F2"}
                      borderRadius={40}
                      disabled={false}
                      margin-bottom={"10px"}
                      boxShadow={"0"}
                    />
                  </div>
                </div>
              )}

              {availabilityFilterActive && (
                <div
                  className={FilterCardWrapper}
                  data-testid="availabilityFilter"
                >
                  <div className={FilterHeader}>
                    <p>Availabilty Filter</p>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Norm"}
                      onChange={(e: any, key: string) =>
                        onFilterChange("AF1", e, "4", key)
                      }
                      header="Availabilty Filter"
                      filterState={filterState.availabilityFilter.filters}
                      filterId={"AF1"}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Stock"}
                      onChange={(e: any, key: string) =>
                        onFilterChange("AF2", e, "4", key)
                      }
                      header="Availabilty Filter"
                      filterState={filterState.availabilityFilter.filters}
                      filterId={"AF2"}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Git"}
                      onChange={(e: any, key: string) =>
                        onFilterChange("AF3", e, "4", key)
                      }
                      header="Availabilty Filter"
                      filterState={filterState.availabilityFilter.filters}
                      filterId={"AF3"}
                    ></AvailabilityFilter>
                  </div>
                  {/* <div className={FilterComponent} style={{borderTop:'0.5px solid #B7B7B7'}}>
                              <AvailabilityFilter placeholder={"Availabilty"} onChange={(e:any,key:string)=>onFilterChange('AF4',e,'4',key)} header="Availabilty Filter" filterState={multiFilter.availabilityFilter.filters} filterId={'AF4'}></AvailabilityFilter>
                          </div> */}
                  {(currentTab === "on-hand" ||
                    currentTab === "both" ||
                    currCategory === "BPR" ||
                    currCategory === "RRR" ||
                    currCategory === "BOR") && (
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.availabilty_tech_color
                          ? "unset"
                          : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="On Hand Inventory Color"
                        filterKey="availabilty_tech_color"
                        isOpen={openStatus.availabilty_tech_color}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterMultiSelectCheckbox
                          header={"OHIC"}
                          filterOptions={[
                            { label: "Red", id: "1" },
                            { label: "Yellow", id: "2" },
                            { label: "Green", id: "3" },
                            { label: "Black", id: "4" },
                            { label: "White", id: "5" },
                            { label: "Blue", id: "6" },
                            { label: "Grey", id: "7" },
                          ]}
                          filterState={filterState.availabilityFilter.filters.filter(
                            (f: any) => f.name === "AF5"
                          )}
                          onChange={(e: any, key: string) =>
                            onFilterChange("AF5", e, "4", key)
                          }
                          filterId={"AF5"}
                        />
                      </FilterCheckboxAccordian>
                    </div>
                  )}
                  {(currentTab === "pipeline" ||
                    currentTab === "both" ||
                    currCategory === "BOR" ||
                    currCategory === "BPR" ||
                    currCategory === "RRR") && (
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.availabilty_eco_color
                          ? "unset"
                          : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="Pipeline Inventory Color"
                        filterKey="availabilty_eco_color"
                        isOpen={openStatus.availabilty_eco_color}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterMultiSelectCheckbox
                          header={"PIC"}
                          filterOptions={[
                            { label: "Red", id: "1" },
                            { label: "Yellow", id: "2" },
                            { label: "Green", id: "3" },
                            { label: "Black", id: "4" },
                            { label: "White", id: "5" },
                            { label: "Blue", id: "6" },
                            { label: "Grey", id: "7" },
                          ]}
                          filterState={filterState.availabilityFilter.filters.filter(
                            (f: any) => f.name === "AF6"
                          )}
                          onChange={(e: any, key: string) =>
                            onFilterChange("AF6", e, "4", key)
                          }
                          filterId={"AF6"}
                        />
                      </FilterCheckboxAccordian>
                    </div>
                  )}
                  {(currCategory === "BPR" ||
                    currentTab === "both" ||
                    currentTab === "pipeline" ||
                    currentTab === "on-hand") && (
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.availabilty_tags ? "unset" : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="Tags(PIPO, Seasonality)"
                        filterKey="availabilty_tags"
                        isOpen={openStatus.availabilty_tags}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterMultiSelectCheckbox
                          header={"PIPO,Seasonality"}
                          filterOptions={[
                            { label: "PIPO", id: "1" },
                            { label: "Seasonality", id: "2" },
                          ]}
                          filterState={filterState.availabilityFilter.filters.filter(
                            (f: any) => f.name === "AF7"
                          )}
                          onChange={(e: any, key: string) =>
                            onFilterChange("AF7", e, "4", key)
                          }
                          filterId={"AF7"}
                        />
                      </FilterCheckboxAccordian>
                    </div>
                  )}

                  {/* <div className={FilterComponent} style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tags?'unset' : '50px'}}>
                              <FilterCheckboxAccordian filterType="Tags(PIPO, Seasonality)" filterKey="availabilty_tags" isOpen={openStatus.availabilty_tags} setOpenStatus={setOpenStatus}>
                              <FilterMultiSelectCheckbox header={'PIPO,Seasonality'} filterOptions={[ 
                                  { label: 'PIPO', id: '1' },
                                  { label: 'Seasonality', id: '2' },
                                  ]} 
                                  
                                  filterState={multiFilter.availabilityFilter.filters.filter((f)=>f.name==='AF7')}
                                  onChange={(e:any,key:string)=>onFilterChange('AF7',e,'4',key)} filterId={'AF7'}/> 
                              </FilterCheckboxAccordian>
                          </div> */}
                  {location.pathname ===
                    "/mta/insights-and-trends/buffer-trend-report" && (
                    <div
                      className={FilterComponent}
                      style={{
                        borderTop: "0.5px solid #B7B7B7",
                        height: openStatus.btrCategory ? "unset" : "50px",
                      }}
                    >
                      <FilterCheckboxAccordian
                        filterType="Category"
                        filterKey="btrCategory"
                        isOpen={openStatus.btrCategory}
                        setOpenStatus={setOpenStatus}
                      >
                        <FilterMultiSelectCheckbox
                          header={"Category"}
                          filterOptions={Object.keys(
                            BTRCategoryNumberToTextMapper
                          ).map((key: string) => {
                            return {
                              label: BTRCategoryNumberToTextMapper[key],
                              id: key,
                            };
                          })}
                          filterState={filterState.availabilityFilter.filters.filter(
                            (f: any) => f.name === "AF8"
                          )}
                          onChange={(e: any, key: string) =>
                            onFilterChange("AF8", e, "4", key)
                          }
                          filterId={"AF8"}
                        />
                      </FilterCheckboxAccordian>
                    </div>
                  )}
                </div>
              )}

              {colorFilterActive && (
                <div className={FilterCardWrapper} data-testid="colorFilter">
                  <div className={FilterHeader}>
                    <p>Color Filter</p>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Type"}
                      header="Color Filter"
                      onChange={(e: any, key: string) =>
                        onFilterChange("CF1", e, "6", key, "Color Filter")
                      }
                      filterId={"CF1"}
                      filterState={filterState.colorFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Type"}
                      header="Color Filter"
                      onChange={(e: any, key: string) =>
                        onFilterChange("CF2", e, "6", key, "Color Filter")
                      }
                      filterId={"CF2"}
                      filterState={filterState.colorFilter.filters}
                    ></AvailabilityFilter>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{ borderTop: "0.5px solid #B7B7B7" }}
                  >
                    <AvailabilityFilter
                      placeholder={"Type"}
                      header="Color Filter"
                      onChange={(e: any, key: string) =>
                        onFilterChange("CF3", e, "6", key, "Color Filter")
                      }
                      filterId={"CF3"}
                      filterState={filterState.colorFilter.filters}
                    >
                      {" "}
                    </AvailabilityFilter>
                  </div>
                </div>
              )}

              {coverageFilterActive && (
                <div className={FilterCardWrapper} data-testid="coverageFilter">
                  <div className={FilterHeader}>
                    <p>Coverage Filter</p>
                  </div>
                  <div
                    className={FilterComponent}
                    style={{
                      borderTop: "0.5px solid #B7B7B7",
                      paddingTop: "12px",
                    }}
                  >
                    <FilterCheckboxAccordian
                      filterType="Coverage"
                      filterKey="coverage_filter"
                      isOpen={openStatus.coverage_filter}
                      setOpenStatus={setOpenStatus}
                    >
                      <FilterMultiSelectCheckbox
                        header="Coverage"
                        filterOptions={[
                          { label: "Gap > 67%", id: "1" },
                          { label: "33% <= Gap <= 67%", id: "2" },
                          { label: "Gap < 33%", id: "3" },
                        ]}
                        filterState={filterState.coverageFilter.filters}
                        onChange={(e: any, key: string) =>
                          onFilterChange("CGF3", e, "5", key)
                        }
                      />
                    </FilterCheckboxAccordian>
                  </div>
                </div>
              )}
              {/* ...repeat for other sections using S.FilterCardWrapper / S.FilterHeader / S.FilterComponent... */}
            </div>

            <div className={ButtonFilterWrapper}>
              <div className={ButtonContainer}>
                <VFButtonOutline
                  themeUi={user.user.theme_ui}
                  onClick={resetFilters}
                >
                  Reset Filters
                </VFButtonOutline>
                <VFButton
                  themeUi={user.user.theme_ui}
                  onClick={() => {
                    const invalid = validation();
                    if (invalid.length === 0) {
                      setMultiFilter(filterState);
                      onApplyFilter(filterState);
                    } else {
                      notifyError(
                        `The following filters cannot be empty: ${invalid.join(
                          ", "
                        )}`
                      );
                    }
                  }}
                >
                  Apply Filter
                </VFButton>
              </div>
            </div>
          </>
        )}
      </VFModalCard>{" "}
    </>
  );
};
//value={getDisabledValue()}
export default VFMultiFilter;
