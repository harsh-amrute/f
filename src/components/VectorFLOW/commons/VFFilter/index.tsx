import {
  VFFilterDustbinIcon,
  VFFilterInputField,
  VFFilterSeperator,
  VFFilterWrapper,
} from "./styles.css";
// import Select from "react-select";
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
import { useRef } from "react";
import { useSelect } from "downshift";
export interface VFFilterProps {
  onDelete: () => void;
  fields: Option[];
  operators: Option[];
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

interface Option {
  label: string;
  value: any;
}

const CustomSelect = ({
  placeholder,
  onChange,
  options,
  value,
  isDisabled = false,
}: CustomSelectProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect<Option>({
    items: options,
    selectedItem: value,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem || null);
    },
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        {...getToggleButtonProps({
          disabled: isDisabled,
          onClick: () => {
            if (isDisabled) return;
            if (inputRef.current) inputRef.current.focus();
          },
        })}
        style={{
          display: "flex",
          alignItems: "center",
          height: 37,
          width: "100%",
          background: "#FFFFFF",
          fontSize: 13,
          borderRadius: 6,
          paddingLeft: 8,
          border: "none",
          boxShadow: "none",
          cursor: isDisabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
      >
        <input
          ref={inputRef}
          placeholder={placeholder}
          value={value ? value.label : ""}
          readOnly
          disabled={isDisabled}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            cursor: isDisabled ? "not-allowed" : "pointer",
            fontSize: 13,
            background: "transparent",
          }}
          tabIndex={-1}
          aria-readonly
        />
        {/* Indicator could be added here if needed */}
        <svg
          style={{
            width: 20,
            height: 20,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            pointerEvents: "none",
            color: "darkgrey",
            flexShrink: 0, // prevent shrinking
            margin: "0 6px",
          }}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 8 10 12 14 8" />
        </svg>
      </div>

      <ul
        {...getMenuProps()}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "absolute",
          width: "100%",
          maxHeight: 150,
          overflowY: "auto",
          backgroundColor: "white",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          display: isOpen ? "block" : "none",
          scrollbarWidth: "thin",
        }}
      >
        {isOpen &&
          options.map((item, index) => {
            const isSelected = value?.value === item.value;
            return (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  backgroundColor: isSelected
                    ? themeUi === "REGALBLAZE"
                      ? "#FCA311"
                      : "#BC3D80"
                    : highlightedIndex === index
                    ? themeUi === "REGALBLAZE"
                      ? "rgba(252, 163, 17, 0.3)"
                      : "rgba(188, 61, 129, 0.3)"
                    : "white",
                  padding: 8,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  color: isSelected ? "white" : "black",
                  borderBottom:
                    index < options.length - 1 ? "1px solid #eee" : "none",
                  userSelect: "none",
                }}
                aria-selected={highlightedIndex === index}
              >
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

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
