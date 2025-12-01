import {
  VFFilterDustbinIcon,
  VFFilterInputField,
  VFFilterSeperator,
  VFFilterWrapper,
} from "./styles.css";
import Select, { CSSObjectWithLabel } from "react-select";
import { type Option as MDMOption, type Filter } from "../../../../VectorFlow/types/MDM";
import { useDispatch, useSelector } from "react-redux";
import {
  SYNC_ACTIVE_MASTER_TO_MASTER,
  UPDATE_FILTER,
} from "../../../../redux/actions/MDM";
import { useUserData } from "../../../../context";
import { useState } from "react";
import type { RootState } from "../../../../redux/store/store";
import { operatorDataTypeMapper } from "../../../../helpers/MDMConstants";
import { Field } from "../../../../VectorFlow/types/MDM";

// type Option = {
//   value: string;
//   label: string | null;
// };

export interface VFFilterProps {
  onDelete: () => void;
  fields: any[];
  operators: any[];
  currFilter: Filter;
  filters: Filter[];
  isDisabled: boolean;
}

export interface CustomSelectProps {
  width: string;
  placeholder: string;
  onChange: (...params: any) => void;
  options: any[];
  value: any;
  isDisabled: boolean;
}

export interface CustomInputProps {
  value: string;
  onChange: (e: any) => void;
  disabled?: boolean;
}

const VFFilter = (props: VFFilterProps) => {
  const dispatch = useDispatch();

  const { fields, operators, onDelete, currFilter, isDisabled } = props;

  const [validOperators, setValidOperators] = useState(operators);
  const activeMaster = useSelector(
    (state: RootState) => state.mdm.activeMaster
  );
  const updateOperators = (value: string) => {
    const selectedFieldObject: any = activeMaster.fields.find(
      (field: Field) => field.key === value
    );
    if (selectedFieldObject)
      setValidOperators([
        ...operators.filter((operator: { value: string; label: string }) =>
          operatorDataTypeMapper[selectedFieldObject.dataType]?.includes(
            operator.value
          )
        ),
      ]);
    setValidOperators(operators);
  };

  const handleOnChange = (value: string, property: string) => {
    updateOperators(value);
    dispatch(
      UPDATE_FILTER({
        value: value,
        property: property,
        filterId: currFilter.id,
      })
    );
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
  };

  return (
    <div className={VFFilterWrapper} data-testid="vffilter-wrapper">
      <CustomSelect
        width="588px"
        placeholder="Select"
        onChange={(e: any) => handleOnChange(e.value, "field")}
        options={fields}
        value={fields.find((field) => field.value === currFilter.field)}
        isDisabled={isDisabled}
      />
      <div className={VFFilterSeperator} />
      <CustomSelect
        width="298px"
        placeholder="Select"
        onChange={(e: any) => handleOnChange(e.value, "operator")}
        options={validOperators}
        value={validOperators.find(
          (field) => field.value === currFilter.operator
        )}
        isDisabled={isDisabled}
      />
      <div className={VFFilterSeperator} />
      <CustomInput
        value={currFilter.text}
        onChange={(e: any) => handleOnChange(e.target.value, "text")}
        disabled={isDisabled}
      />
      <div className={VFFilterSeperator} />
      <img
        className={VFFilterDustbinIcon}
        src="/assets/img/VectorFLOW/NMS/dustbin.svg"
        onClick={onDelete}
        data-testid="delete-icon"
        alt="Delete"
      />
    </div>
  );
};

const CustomSelect = (props: CustomSelectProps) => {
  const { placeholder, onChange, options, value, isDisabled } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <Select
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
              themeUi === "REGALBLAZE" ? "rgb(252, 163, 17,0.3)" : "#bc3d814d",
            color: "black",
          },
        }as CSSObjectWithLabel),
        container: (styles) => ({
          ...styles,
          width: "100%",
        }as CSSObjectWithLabel),
        control: (styles, { isFocused }) => ({
          ...styles,
          // borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",

          height: "37px",
          width: "100%",
          background: " #FFFFFF ",
          fontSize: "13px",
          border: "none",
          borderRadius: "6px",
          paddingLeft: "8px",
          borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
          // border: "none",
          // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
          boxShadow: "none",
          "&:hover": {
            borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
          },
        }as CSSObjectWithLabel),
      }}
      placeholder={placeholder}
      components={{
        IndicatorSeparator: null,
      }}
      value={value}
      onChange={onChange}
      options={options}
      isDisabled={isDisabled}
    />
  );
};

const CustomInput = (props: CustomInputProps) => {
  const { value, onChange, disabled = false } = props;

  return (
    <input
      className={VFFilterInputField}
      type="text"
      placeholder="Value"
      value={value}
      onChange={onChange}
      disabled={disabled}
      data-testid="text-input"
    />
  );
};

export default VFFilter;
