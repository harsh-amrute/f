import React, { useState, useMemo } from "react";

import {
  inputWrapper,
  urlsForm,
  label,
  focusOutlineVar,
} from "../UserURLsDrawer/styles.css";
import {
  input,
  primaryButton,
  secondaryButton,
  textArea,
} from "../../commons/styled/index.css";
import { useUserData } from "../../../context";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useEditMDMConfiguration } from "../../../VectorFlow/Services/MTA/MDM/index";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";
import { useSelect } from "downshift";

interface FormDataType {
  MasterId: string;
  MasterName: string;
  Col_Code: string;
  TableField: string;
  Col_Position: string;
  Header: string;
  Visible: string;
  CellAlignment: string;
  IsAdd: string;
  IsEdit: string;
  IsFilter: string;
  IsDownload: string;
  IsApplicable: string;
  DataType: string;
  IsDelete: string;
}

interface OptionType {
  label: string;
  value: any;
}

const Dropdown = ({
  labelText,
  name,
  options,
  value,
  onChange,
  disabled,
  themeColor,
  themeUi,
}: {
  labelText: string;
  name: string;
  options: OptionType[];
  value: any;
  onChange: (val: any) => void;
  disabled?: boolean;
  themeColor: string;
  themeUi: string;
}) => {
  const selectedItem = options.find((opt) => opt.value === value);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem.value);
    },
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label
        htmlFor={name}
        style={{
          fontSize: 12,
          fontWeight: 500,
          display: "block",
          marginBottom: 4,
        }}
      >
        {labelText}
      </label>
      <div
        {...getToggleButtonProps()}
        style={{
          fontSize: 12,
          border: "2px solid transparent",
          boxShadow: "none",
          borderRadius: 4,
          padding: "6px 8px",
          backgroundColor: disabled ? "#f3f3f3" : "rgb(247,247,247)",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
          outline: "none",
          ...(isOpen
            ? { borderColor: themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80" }
            : {}),
        }}
      >
        {selectedItem ? selectedItem.label : "Select..."}
      </div>

      <ul
        {...getMenuProps()}
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "absolute",
          width: "100%",
          background: "#fff",
          zIndex: 10,
          maxHeight: isOpen ? 150 : 0,
          overflowY: "auto",
          transition: "max-height 0.2s ease-in-out",
          border: isOpen ? "1px solid #ccc" : "none",
          borderRadius: 4,
        }}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              key={item.value}
              {...getItemProps({ item, index })}
              style={{
                padding: "6px 8px",
                fontSize: 12,
                backgroundColor:
                  highlightedIndex === index
                    ? themeUi === "REGALBLAZE"
                      ? "rgba(252,163,17,0.3)"
                      : "#bc3d814d"
                    : selectedItem?.value === item.value
                    ? themeUi === "REGALBLAZE"
                      ? "#FCA311"
                      : "#BC3D80"
                    : "#fff",
                color:
                  highlightedIndex === index ||
                  selectedItem?.value === item.value
                    ? "black"
                    : "inherit",
                cursor: "pointer",
              }}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

const EditUIMDMConfig = (props: { data: any; cb: () => void }) => {
  const { data, cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [formData, setFormData] = useState<FormDataType>({ ...data });

  const { mutateAsync: editEnvConfiguration } = useEditMDMConfiguration();
  const [isDisableOptions] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isChanged = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(data),
    [formData, data]
  );

  const formatData = (data: any) => {
    const formatted: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        formatted[key] = typeof value === "boolean" ? (value ? 1 : 0) : value;
      }
    }
    return formatted;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formattedData = formatData(formData);
    const data = { ...formattedData } as any;
    try {
      const response = await editEnvConfiguration(data);
      if (response.status !== 200) notifyError("Server Went Unresponsive");
      else notifySuccess(response?.data?.data);
      cb();
    } catch (error) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
  };

  const isFormValid = useMemo((): boolean => {
    return Object.keys(formData).every((k) => {
      const key = k as keyof FormDataType;
      const value = formData[key];
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    });
  }, [formData]);

  const handleSelectChange = (name: any, value: any) => {
    if (name === "CellAlignment")
      return setFormData({ ...formData, [name]: value });
    else setFormData({ ...formData, [name]: value ? 1 : 0 });
  };

  const flagOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const alignmentOptions: any = [
    { label: "left", value: "left" },
    { label: "right", value: "right" },
  ];

  const themeColor =
    (themeUi && globalStyles.chooseThemeColor[themeUi]?.color5) || "#820F4C";

  return (
    <form className={urlsForm} onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="MasterId">
            MasterId
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="MasterId"
            value={formData.MasterId}
            placeholder="Any Master Id"
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="MasterName">
            MasterName
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="MasterName"
            placeholder="Any Master Name"
            value={formData.MasterName}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="Col_Code">
            {" "}
            Column Code
          </label>

          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="Col_Code"
            value={formData.Col_Code}
            placeholder="Any Column Code"
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="TableField">
            {" "}
            Table Field
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="TableField"
            placeholder="Any Table Field"
            value={formData.TableField}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="Col_Position">
            {" "}
            Column Position
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="Col_Position"
            placeholder="Any Column Position"
            value={formData.Col_Position}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
        </div>

        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="DataType">
            {" "}
            Data Type
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="DataType"
            placeholder="Any Data Type"
            value={formData.DataType}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <Dropdown
            labelText="Is Edit"
            name="IsEdit"
            options={flagOptions}
            value={formData.IsEdit}
            onChange={(val) => handleSelectChange("IsEdit", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <Dropdown
            labelText="Is Add"
            name="IsAdd"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("IsAdd", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <Dropdown
            labelText=" Is Download"
            name="IsDownload"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("IsDownload", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <Dropdown
            labelText=" Is Filter"
            name="IsFilter"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("IsFilter", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <Dropdown
            labelText=" Is Applicable"
            name="IsApplicable"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("IsApplicable", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <Dropdown
            labelText=" Is Delete"
            name="IsDelete"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("IsDelete", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <Dropdown
            labelText="Visible"
            name="Visible"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("Visible", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <Dropdown
            labelText="Cell Alignment"
            name="CellAlignment"
            options={flagOptions}
            value={formData.IsAdd}
            onChange={(val) => handleSelectChange("CellAlignment", val)}
            disabled={isDisableOptions}
            themeColor={themeColor}
            themeUi={themeUi}
          />
        </div>
      </div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="Header">
            {" "}
            Header
          </label>
          <textarea
            className={textArea}
            name="Header"
            value={formData.Header}
            required
            placeholder="Any Header name"
            style={{
              minHeight: 50,
              ...assignInlineVars({
                [focusOutlineVar]: themeColor,
              }),
            }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 1,
          marginTop: "auto",
          gap: 20,
        }}
      >
        <button
          className={secondaryButton}
          type="button"
          onClick={cb}
          style={assignInlineVars({
            [focusOutlineVar]: themeColor,
          })}
        >
          Cancel
        </button>
        <button
          className={primaryButton}
          disabled={!isFormValid || !isChanged}
          style={assignInlineVars({
            [focusOutlineVar]: themeColor,
          })}
        >
          Update UI MDM Config
        </button>
      </div>
    </form>
  );
};

export default EditUIMDMConfig;
