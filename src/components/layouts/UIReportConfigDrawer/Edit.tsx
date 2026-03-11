import React, { useState, useMemo } from "react";

import {
  inputWrapper,
  urlsForm,
  label,
} from "../UserURLsDrawer/styles.css";
import {
  input,
  primaryButton,
  secondaryButton,
  textArea,
  primaryBgVar,
  focusOutlineVar
} from "../../commons/styled/index.css";
import { useUserData } from "../../../context";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useEditReportConfiguration } from "../../../VectorFlow/Services/MTA/MDM/index";
import Select, { CSSObjectWithLabel } from "react-select";
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
    (themeUi && globalStyles.chooseThemeColor[themeUi]?.color4) || "#820F4C";
   const bgColor =
      globalStyles.chooseThemeColor[themeUi]?.color5 ?? "transparent";
  

  return (
    <form className={urlsForm}  onSubmit={handleSubmit} >
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
          <label className={label} htmlFor="CellAlignment">
            {" "}
            Cell Alignment
          </label>
          <Select
            options={alignmentOptions}
            placeholder={"Select Cell Alignment"}
            onChange={(data: any) =>
              handleSelectChange("CellAlignment", data.value)
            }
            styles={{
              option: (baseStyles, { isSelected }) => ({
                ...baseStyles,
                fontSize: 11,
                backgroundColor: isSelected
                  ? themeUi === "REGALBLAZE"
                    ? "#FCA311"
                    : "#BC3D80"
                  : "white",

                "&:hover": {
                  backgroundColor:
                    themeUi === "REGALBLAZE"
                      ? "rgb(252, 163, 17,0.3) "
                      : "#bc3d814d",
                  color: "black",
                },
              }as CSSObjectWithLabel),
              control: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                fontSize: 12,
                borderColor: !isFocused ? "transparent" : "#BC3D80",
                borderWidth: 2,
                boxShadow: "none",
                backgroundColor: "rgb(247, 247, 247)",
                "&:hover": {
                  borderColor: "#BC3D80",
                },
              }as CSSObjectWithLabel),
            }}
            value={alignmentOptions.find(
              (option: any) =>
                option.value.trim() === formData.CellAlignment.trim()
            )}
          />
        </div>
        <div className={inputWrapper}>
          <label className={label} htmlFor="Visible">
            {" "}
            Visible
          </label>
          <Select
            options={flagOptions}
            placeholder={"Select Visible"}
            onChange={(data: any) => handleSelectChange("Visible", data.value)}
            styles={{
              option: (baseStyles, { isSelected }) => ({
                ...baseStyles,
                fontSize: 11,
                backgroundColor: isSelected
                  ? themeUi === "REGALBLAZE"
                    ? "#FCA311"
                    : "#BC3D80"
                  : "white",

                "&:hover": {
                  backgroundColor:
                    themeUi === "REGALBLAZE"
                      ? "rgb(252, 163, 17,0.3) "
                      : "#bc3d814d",
                  color: "black",
                },
              }as CSSObjectWithLabel),
              control: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                fontSize: 12,
                borderColor: !isFocused ? "transparent" : "#BC3D80",
                borderWidth: 2,
                boxShadow: "none",
                backgroundColor: "rgb(247, 247, 247)",
                "&:hover": {
                  borderColor: "#BC3D80",
                },
              }as CSSObjectWithLabel),
            }}
            value={flagOptions.find(
              (option: any) => option.value === formData.Visible
            )}
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
            [primaryBgVar]: bgColor,  
          })}
        >
          Update UI Report Config
        </button>
      </div>
    </form>
  );
};

export default EditReportConfig;
