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

import Select, { CSSObjectWithLabel } from "react-select";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global"; // keep import unchanged

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

const EditUIMDMConfig = (props: { data: any; cb: () => void }) => {
  const { data, cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [formData, setFormData] = useState<FormDataType>({ ...data });

  const { mutateAsync: editEnvConfiguration } = useEditMDMConfiguration();

  const [isDisableOptions, setIsDisabledOptions] = useState(true);

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
          <label className={label} htmlFor="IsEdit">
            {" "}
            Is Edit
          </label>
          <Select
            options={flagOptions}
            placeholder={"Select Edit"}
            onChange={(data: any) => handleSelectChange("IsEdit", data.value)}
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
            isDisabled={isDisableOptions}
            value={flagOptions.find(
              (option: any) => option.value === formData.IsEdit
            )}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="IsAdd">
            {" "}
            Is Add
          </label>

          <Select
            options={flagOptions}
            placeholder={"Select Add"}
            onChange={(data: any) => handleSelectChange("IsAdd", data.value)}
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
              (option: any) => option.value === formData.IsAdd
            )}
            isDisabled={isDisableOptions}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="IsDownload">
            {" "}
            Is Download
          </label>
          <Select
            options={flagOptions}
            placeholder={"Select Download"}
            onChange={(data: any) =>
              handleSelectChange("IsDownload", data.value)
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
            value={flagOptions.find(
              (option: any) => option.value === formData.IsDownload
            )}
            isDisabled={isDisableOptions}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="IsFilter">
            {" "}
            Is Filter
          </label>
          <Select
            options={flagOptions}
            placeholder={"Select Filter"}
            onChange={(data: any) => handleSelectChange("IsFilter", data.value)}
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
              (option: any) => option.value === formData.IsFilter
            )}
            isDisabled={isDisableOptions}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="IsApplicable">
            {" "}
            Is Applicable
          </label>

          <Select
            options={flagOptions}
            placeholder={"Select Applicable"}
            onChange={(data: any) =>
              handleSelectChange("IsApplicable", data.value)
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
            value={flagOptions.find(
              (option: any) => option.value === formData.IsApplicable
            )}
            isDisabled={isDisableOptions}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="IsDelete">
            {" "}
            Is Delete
          </label>

          <Select
            options={flagOptions}
            placeholder={"Select Delete"}
            onChange={(data: any) => handleSelectChange("IsDelete", data.value)}
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
              (option: any) => option.value === formData.IsDelete
            )}
            isDisabled={isDisableOptions}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
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
            isDisabled={isDisableOptions}
          />
        </div>
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
                String(formData.CellAlignment || "").trim() ===
                option.value?.trim()
            )}
            isDisabled={isDisableOptions}
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
