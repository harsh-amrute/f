import React, { useState, useMemo } from "react";
import { useCombobox } from "downshift";
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
import { useEditReportConfiguration } from "../../../VectorFlow/Services/MTA/MDM/index";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global"; // keep import unchanged

interface FormDataType {
  ReportName: string;
  Col_Code: string;
  Col_Position: string;
  Category: string;
  Header: string;
  Visible: string;
  CellAlignment: string;
  Value: string;
  TagID: string;
}

interface DropdownProps {
  options: any[];
  selectedValue: any;
  onChange: (value: any) => void;
  placeholder?: string;
  themeUi: string;
  width?: string;
}

// ✅ Reusable CSP-safe Downshift dropdown
const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder,
  themeUi,
  width = "180px",
}) => {
  const selectedItem = options.find((opt) => opt.value === selectedValue);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectItem,
  } = useCombobox({
    items: options,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onChange(selectedItem.value);
    },
  });

  const themeColor = themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80";

  return (
    <div style={{ position: "relative", width }}>
      <button
        type="button"
        {...getToggleButtonProps()}
        style={{
          width: "100%",
          backgroundColor: "rgb(247,247,247)",
          border: `2px solid transparent`,
          borderRadius: 6,
          fontSize: 12,
          padding: "6px 8px",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {selectedItem ? selectedItem.label : placeholder}
      </button>
      <ul
        {...getMenuProps()}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          maxHeight: "140px",
          overflowY: "auto",
          backgroundColor: "white",
          border: isOpen ? `1px solid ${themeColor}` : "none",
          borderRadius: 6,
          marginTop: 2,
          padding: 0,
          listStyle: "none",
          zIndex: 999,
        }}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              key={item.value}
              {...getItemProps({ item, index })}
              style={{
                fontSize: 11,
                padding: "5px 8px",
                backgroundColor:
                  highlightedIndex === index
                    ? themeUi === "REGALBLAZE"
                      ? "rgba(252, 163, 17, 0.3)"
                      : "#bc3d814d"
                    : item.value === selectedValue
                    ? themeColor
                    : "white",
                color:
                  highlightedIndex === index || item.value === selectedValue
                    ? "black"
                    : "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={() => selectItem(item)}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

const EditReportConfig = (props: { data: any; cb: () => void }) => {
  const { data, cb } = props;
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const [formData, setFormData] = useState<FormDataType>({ ...data });
  const { mutateAsync: editReportConfiguration } = useEditReportConfiguration();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isChanged = useMemo((): boolean => {
    return JSON.stringify(formData) !== JSON.stringify(data);
  }, [formData, data]);

  const formatData = (data: any) => {
    const formatted: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (typeof value === "boolean") {
          formatted[key] = value ? 1 : 0;
        } else {
          formatted[key] = value;
        }
      }
    }
    return formatted;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formattedData = formatData(formData);
    const data = { ...formattedData } as any;
    try {
      const response = await editReportConfiguration(data);
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

  const themeColor =
    (themeUi && globalStyles.chooseThemeColor[themeUi]?.color5) || "#820F4C";

  return (
    <form className={urlsForm} onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="ReportName">
            {" "}
            Report Name
          </label>
          <input
            className={input}
            style={assignInlineVars({ [focusOutlineVar]: themeColor })}
            type={"text"}
            required
            name="ReportName"
            value={formData.ReportName}
            placeholder="Any Report Name"
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
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
            placeholder="Any Column Code"
            value={formData.Col_Code}
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
            value={formData.Col_Position}
            placeholder="Any Column Position"
            onChange={handleChange}
            readOnly
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label}>Cell Alignment</label>
          <Dropdown
            options={alignmentOptions}
            selectedValue={formData.CellAlignment}
            onChange={(v) => handleSelectChange("CellAlignment", v)}
            placeholder="Select Cell Alignment"
            themeUi={themeUi}
          />
        </div>
        <div className={inputWrapper}>
          <label className={label}>Visible</label>
          <Dropdown
            options={flagOptions}
            selectedValue={formData.Visible}
            onChange={(v) => handleSelectChange("Visible", v)}
            placeholder="Select Visible"
            themeUi={themeUi}
          />
        </div>
      </div>
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

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 10,
          gap: 10,
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
          Update UI Report Config
        </button>
      </div>
    </form>
  );
};

export default EditReportConfig;
