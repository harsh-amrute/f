import React, { useState, useEffect } from "react";
import {
  filterGroup,
  filterColumn,
  textWrapper,
  dropDownWrapper,
} from "./style.css";
// import Select, { components } from "react-select";
import { useColorThemeStyles } from "../../../../../hooks/useVFFilterContent";
import useGetLocation from "../../../../../hooks/useGetLocation";
import { useUserData } from "../../../../../context";
import { useGetAllLocations } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { BPRFilter, BPRFilterState } from "../../../../../VectorFlow/types/BPR";
import { useVFMultiFilter } from "./useVFFilterContent";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import DownshiftMultiSelect from "./DownshiftSelect/DownshiftMultiSelect";
import {
  COptCheckboxNoBorder,
  COptCheckboxWithBorder,
} from "./DownshiftSelect/utils/custom-options";

interface FilterSectionProps {
  filters: any;
  multiFilter: BPRFilterState;
  onMultiFilterChange: (newMultiFilter: BPRFilterState) => void;
}

// interface CustomOptionProps {
//   item: { value: string; label: string };
//   isSelected: boolean;
//   isHighlighted: boolean;
// }

// const CustomOption = ({
//   item,
//   isSelected,
//   isHighlighted,
// }: CustomOptionProps) => {
//   const optionStyles = useColorOptionStyles();

//   return (
//     <div
//       style={{
//         ...optionStyles.optionContainer,
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         gap: "6px",
//         padding: "6px 8px",
//         border: isHighlighted
//           ? "2px solid #BC3D80"
//           : isSelected
//           ? "2px solid #BC3D80"
//           : "",
//       }}
//     >
//       <input
//         type="checkbox"
//         style={{
//           width: 18,
//           height: 18,
//           accentColor: "#BC3D80",
//         }}
//         checked={isSelected}
//         readOnly
//       />
//       <span>{item.label}</span>
//     </div>
//   );
// };

export const SupplyChainNodeFilters: React.FC<FilterSectionProps> = ({
  multiFilter,
  onMultiFilterChange,
}) => {
  const { locations } = useGetLocation();
  const colorStyles = useColorThemeStyles();

  const { handleSelectChange, getSelectedValues, setSelectedValues } =
    useVFMultiFilter({
      multiFilter,
      onMultiFilterChange,
    });

  const [selectedOptions, setSelectedOptions] = useState<{
    ForLocation: string[];
    ForChildren: string[];
    ForChildrenLocationCode: string[];
  }>({
    ForLocation: [],
    ForChildren: [],
    ForChildrenLocationCode: [],
  });

  const { data: locationData, isLoading: isLocationDataLoading } =
    useGetAllLocations();

  const locationCheckboxOptions =
    locationData?.data?.data?.map((location: any) => ({
      label: `${location.wc} (${location.wd})`,
      id: location.wc,
      value: location.wc,
    })) || [];

  const locationOptionsWithValue = locations.map((location: any) => ({
    label: location.label,
    id: location.id,
    value: location.id || location.label,
  }));

  useEffect(() => {
    if (multiFilter?.supplyChainFilter) {
      const forLocationFilters = multiFilter.supplyChainFilter.filters.filter(
        (f: BPRFilter) => f.name === "SCF1"
      );
      const forChildrenFilters = multiFilter.supplyChainFilter.filters.filter(
        (f: BPRFilter) => f.name === "SCF2"
      );

      const forChildrenLocationCode =
        multiFilter.supplyChainFilter.filters.filter(
          (f: BPRFilter) => f.name === "SCF3"
        );

      setSelectedOptions((prev) => ({
        ...prev,
        ForLocation: forLocationFilters.map((f: BPRFilter) => f.value),
        ForChildren: forChildrenFilters.map((f: BPRFilter) => f.value),
        ForChildrenLocationCode: forChildrenLocationCode.map(
          (f: BPRFilter) => f.value
        ),
      }));
    }
  }, [multiFilter]);

  if (isLocationDataLoading) {
    return <VFLoader />;
  }

  return (
    <>
      <div className={filterGroup}>
        <div className={filterColumn}>
          <div className={textWrapper}>For Location</div>
          <div
            className={dropDownWrapper}
            style={{ gap: "20px", maxWidth: "360px" }}
          >
            <DownshiftMultiSelect
              options={locationOptionsWithValue}
              hideSelectedOptions={false}
              OptionComponent={COptCheckboxNoBorder}
              MenuWrapperComponent={({ children }) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4px",
                    width: "750px",
                    padding: "6px 0px",
                  }}
                >
                  {children}
                </div>
              )}
              placeholder="Location Type"
              value={selectedOptions.ForLocation.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange({
                  newValue,
                  header: "ForLocation",
                  filterId: "SCF1",
                  parentId: "supplyChainFilter",
                })
              }
            />
          </div>
        </div>

        <div className={filterColumn}>
          <div className={textWrapper}>For Children</div>
          <div
            className={dropDownWrapper}
            style={{ gap: "20px", maxWidth: "360px" }}
          >
            <DownshiftMultiSelect
              options={locationOptionsWithValue}
              hideSelectedOptions={false}
              OptionComponent={COptCheckboxNoBorder}
              MenuWrapperComponent={({ children }) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4px",
                    width: "750px",
                    padding: "6px 0px",
                  }}
                >
                  {children}
                </div>
              )}
              placeholder="Location Type"
              value={selectedOptions.ForChildren.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange({
                  newValue,
                  header: "ForChildren",
                  filterId: "SCF2",
                  parentId: "supplyChainFilter",
                })
              }
            />
          </div>
        </div>
      </div>

      <div
        className={filterGroup}
        style={{ paddingTop: "10px", maxWidth: "746px" }}
      >
        <div
          className={filterColumn}
          style={{ maxWidth: "100%", flex: 1, width: "100%" }}
        >
          <div className={textWrapper}>Select Location</div>
          <div className={dropDownWrapper} style={{ gap: "20px" }}>
            <DownshiftMultiSelect
              options={locationCheckboxOptions}
              hideSelectedOptions={false}
              OptionComponent={COptCheckboxWithBorder}
              placeholder="Search By Locations"
              value={selectedOptions.ForChildrenLocationCode.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(newValue) =>
                handleSelectChange({
                  newValue,
                  header: "ForChildrenLocationCode",
                  filterId: "SCF3",
                  parentId: "supplyChainFilter",
                })
              }
              MenuWrapperComponent={({ children }) => (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    width: "750px",
                    padding: "8px",
                  }}
                >
                  {children}
                </div>
              )}
              DropdownIndicatorComponent={() => (
                <img
                  src="/assets/img/VectorFLOW/NMS/search.svg"
                  alt="search"
                  style={{
                    marginRight: "8px",
                    width: "14px",
                    height: "14px",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const useColorOptionStyles = () => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  const themeColor = theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80";

  return {
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: themeColor,
      cursor: "pointer",
      flexShrink: 0,
    },
    colorPanel: {
      width: "20px",
      height: "20px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      order: 2,
    },
    colorName: {
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
      color: "#333",
      flex: 1,
      textAlign: "left" as const,
      order: 1,
    },
    optionContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      padding: "4px 0",
    },
  };
};
