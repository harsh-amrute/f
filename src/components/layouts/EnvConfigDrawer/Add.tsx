import React, { useState, useEffect, useMemo, useCallback } from "react";

import Select from "react-select";

import {
  InputWrapper,
  URLsForm,
  Label,
  ButtonsWrapper,
  CheckBoxesWrapper,
  CheckBoxesHeader,
  CheckBoxesContainer,
  CheckBoxWrapper,
  CheckBoxLabel,
  CheckBoxesHeaderContainer,
  SearchWrapper,
  URLSearch,
} from "../UserURLsDrawer/styles";
import { Input, PrimaryButton, Skeleton, TextArea } from "../../commons/styled";
import { useUserData } from "../../../context";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useAddEnvironmentConfiguration } from "../../../VectorFlow/Services/MTA/MDM/index";

interface FormDataType {
  ConfigKey: string;
  ConfigValue: string;
  Description: string;
  Category: string;
}

const AddRole = (props: { cb: () => void }) => {
  const { cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;


  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {mutateAsync : addEnvConfiguration} = useAddEnvironmentConfiguration();


  const [formData, setFormData] = useState<FormDataType>({
    ConfigKey: "",
    ConfigValue: "",
    Description: "",
    Category: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const changedData = JSON.parse(JSON.stringify(formData));
      changedData.LastModifiedByUserEmail = user?.user?.email;
      changedData.LastModifiedByUserRole = "admin";
      const response = await addEnvConfiguration(changedData);
      if (response.status !== 200) notifyError("Server Went Unresponsive");
      else notifySuccess("Successfully Added " + formData.ConfigKey);
      cb();
    } catch (error) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
  };


 



  const isFormValid = useMemo((): boolean => {
    return !Object.keys(formData).every((k) => {
      const key = k as keyof FormDataType;
      const value = formData[key];
      console.log("VALUE",value , key);
      
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    });
  }, [formData]);
console.log("ISSSS",isFormValid);



  

  return (
    <URLsForm onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <InputWrapper>
          <Label htmlFor="ConfigKey"> Config Key</Label>
          <Input
            type={"text"}
            required
            name="ConfigKey"
            placeholder="Any Config Key"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="ConfigValue"> Config Value</Label>
          <Input
            type={"text"}
            required
            name="ConfigValue"
            placeholder="Any Config Value"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="Category"> Category</Label>
          <Input
            type={"text"}
            required
            name="Category"
            placeholder="Any Category"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
      </div>
  
      <InputWrapper>
        <Label htmlFor="Description"> Description</Label>
        <TextArea
          name="Description"
          style={{ minHeight: 50 }}
          required
          placeholder="Config Description"
          themeUi={themeUi}
          onChange={handleChange}
        />
      </InputWrapper>
     
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 10,
        }}
      >
        <PrimaryButton disabled={isFormValid || isSubmitting} themeUi={themeUi}>
          Add Role
        </PrimaryButton>
      </div>
    </URLsForm>
  );
};

export default AddRole;
