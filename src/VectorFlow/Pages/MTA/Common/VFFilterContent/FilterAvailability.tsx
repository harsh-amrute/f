import React, { useState } from "react";
import {
  FilterGroup,
  FilterColumn,
  FilterTitle,
  InputField,
  SelectField,
  TextWrapper,
  DropDownWrapper,
  DropDownRow,
  IconWrapper,
  CheckboxWrapper,
} from "./style";
import Select, { components } from "react-select";
import {
  useThemeStyles,
  useColorThemeStyles,
  useColorOptionStyles,
} from "../../../../../hooks/useVFFilterContent";
import { numericOperators, colorOptions } from "./useVFFilterContent";
import { useUserData } from "../../../../../context";
import { BTRCategoryNumberToTextMapper } from "../../../../../helpers/BPRConstants";
import { RootState } from "../../../../../redux/store/store";
import "./styles.css";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useSelector } from "react-redux";

interface AvailabilityFilterProps {
  filters: any;
  onFilterChange: (field: string, value: any) => void;
  onApplyFilter: (filters: any) => void;
  initialFilters?: any;
}
interface TagsFilterProps {
  name: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const CustomCategoryOption = (props: any) => {
  const optionStyles = useColorOptionStyles();

  return (
    <components.Option {...props}>
      <div style={optionStyles.optionContainer}>
        <input
          type="checkbox"
          checked={props.isSelected}
          style={optionStyles.checkbox}
          readOnly
        />
        <span style={optionStyles.colorName}>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const CustomOption = (props: any) => {
  const optionStyles = useColorOptionStyles();

  return (
    <components.Option {...props}>
      <div style={optionStyles.optionContainer}>
        <input
          type="checkbox"
          checked={props.isSelected}
          style={optionStyles.checkbox}
          readOnly
        />
        <div
          style={{
            ...optionStyles.colorPanel,
            backgroundColor: props.data.color || "#ccc",
          }}
        />
        <span style={optionStyles.colorName}>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const CustomMultiValue = (props: any) => {
  return (
    <components.MultiValue {...props}>
      <span
        style={{
          backgroundColor: props.data.color,
          width: "12px",
          height: "12px",
          borderRadius: "3px",
          display: "inline-block",
          marginRight: "5px",
        }}
      />
      {props.children}
    </components.MultiValue>
  );
};

const TagsFilter: React.FC<TagsFilterProps> = ({ name, checked, onChange }) => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  const themeColor = theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80";

  const handleClick = () => {
    onChange(name, !checked);
  };

  return (
    <CheckboxWrapper
      style={{
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        backgroundColor: checked ? `${themeColor}15` : "white",
        borderColor: checked ? themeColor : "#c7c0c0ff",
        borderWidth: checked ? "2px" : "1px",
        boxShadow: checked ? `0 2px 8px ${themeColor}25` : "none",
      }}
      onClick={handleClick}
    >
      <input
        style={{
          height: "18px",
          width: "18px",
          accentColor: themeColor,
          pointerEvents: "none",
        }}
        type="checkbox"
        id={name.toLowerCase()}
        checked={checked}
        onChange={() => {
          console.log("Clicked");
        }}
        readOnly
      />
      <label
        style={{
          marginTop: "1px",
          cursor: "pointer",
          userSelect: "none",
          color: checked ? themeColor : "black",
          fontWeight: checked ? "600" : "400",
          transition: "all 0.1s ease-in-out",
        }}
        htmlFor={name.toLowerCase()}
      >
        {name}
      </label>
    </CheckboxWrapper>
  );
};

// Availability Filter Component
export const AvailabilityFilters: React.FC<AvailabilityFilterProps> = ({
  filters,
  onFilterChange,
  onApplyFilter,
  initialFilters,
}) => {
  const styles = useThemeStyles();
  const colorStyles = useColorThemeStyles();
  const [tagStates, setTagStates] = useState<{ [key: string]: boolean }>({
    PIPO: false,
    Seasonality: false,
  });
  const handleTagChange = (name: string, checked: boolean) => {
    setTagStates((prev) => ({
      ...prev,
      [name]: checked,
    }));
    onFilterChange("tags", JSON.stringify({ ...tagStates, [name]: checked }));
  };
  return (
    <>
      <FilterGroup>
        <FilterColumn style={{ minWidth: "400px", maxWidth: "none" }}>
          <TextWrapper>Select Operation</TextWrapper>
          <DropDownRow>
            <DropDownWrapper>
              <Select
                placeholder={"VirtualNorm"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Virtual Norm", value: "Virtual Norm" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                options={numericOperators}
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </DropDownWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </IconWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select
                placeholder={"Norm"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Norm", value: "Norm" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </DropDownWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </IconWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select
                placeholder={"Stock"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "Stock", value: "Stock" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </DropDownWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </IconWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </IconWrapper>
          </DropDownRow>
          <DropDownRow>
            <DropDownWrapper>
              <Select
                placeholder={"GIT"}
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isDisabled={true}
                value={{ label: "GIT", value: "GIT" }}
                options={[]}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder={"Select an Operation"}
                styles={styles}
                components={{ IndicatorSeparator: () => null }}
                options={numericOperators}
              />
            </DropDownWrapper>
            <DropDownWrapper>
              <Select
                placeholder="Enter a value"
                styles={styles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                  Menu: () => null,
                }}
                isSearchable={true}
                inputValue={filters.someValue || ""}
                onInputChange={(inputValue) =>
                  onFilterChange("someValue", inputValue)
                }
                menuIsOpen={false}
                options={[]}
              />
            </DropDownWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/Error.svg"} />
            </IconWrapper>
            <IconWrapper>
              <img src={"/assets/img/MTAVFMultiFilter/refresh.svg"} />
            </IconWrapper>
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ marginTop: "1px" }}>
        <FilterColumn>
          <TextWrapper>On Hand Inventory Color</TextWrapper>
          <DropDownWrapper>
            <Select
              options={colorOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomOption,
                MultiValue: CustomMultiValue,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              styles={colorStyles}
              placeholder="Select Color"
            />
          </DropDownWrapper>
        </FilterColumn>

        <FilterColumn>
          <TextWrapper>Pipeline Inventory Color</TextWrapper>
          <DropDownWrapper>
            <Select
              options={colorOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomOption,
                MultiValue: CustomMultiValue,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              styles={colorStyles}
              placeholder="Select Color"
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ marginTop: "1px" }}>
        <FilterColumn>
          <TextWrapper>Tags</TextWrapper>
          <DropDownRow style={{ gap: "20px" }}>
            <TagsFilter
              name="PIPO"
              checked={tagStates.PIPO}
              onChange={handleTagChange}
            />
            <TagsFilter
              name="Seasonality"
              checked={tagStates.Seasonality}
              onChange={handleTagChange}
            />
          </DropDownRow>
        </FilterColumn>
      </FilterGroup>

      <FilterGroup style={{ marginTop: "1px" }}>
        <FilterColumn>
          <TextWrapper>Category</TextWrapper>
          <DropDownWrapper style={{ gap: "20px"}}>
            <Select
              options={Object.keys(BTRCategoryNumberToTextMapper).map(
                (key: string) => {
                  return {
                    label: BTRCategoryNumberToTextMapper[key],
                    value: key,
                  };
                }
              )}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option: CustomCategoryOption,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              styles={{
                ...colorStyles,
                menuList: (base) => ({
                  ...base,
                  maxHeight: 150,
                  overflowY: "auto",
                }),
              }}
              placeholder="Select Category"
            />
          </DropDownWrapper>
        </FilterColumn>
      </FilterGroup>
    </>
  );
};
