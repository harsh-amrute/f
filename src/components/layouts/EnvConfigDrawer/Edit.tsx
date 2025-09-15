import React,{ useState, useMemo } from "react";

import {
  InputWrapper,
  URLsForm,
  Label,
} from "../UserURLsDrawer/styles";
import {
  Input,
  PrimaryButton,
  SecondaryButton,
  TextArea,
} from "../../commons/styled";
import { useUserData } from "../../../context";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useEditEnvironmentConfiguration } from "../../../VectorFlow/Services/MTA/MDM/index";

interface FormDataType {
  ConfigKey: string;
  ConfigValue: string;
  Description: string;
  Category:string
}

const EditRole = (props: { data: any; cb: () => void }) => {
  const { data, cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;



  const [formData, setFormData] = useState<FormDataType>({ ...data });

  const {mutateAsync : editEnvConfiguration} = useEditEnvironmentConfiguration();



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


const isChanged = useMemo((): boolean => {
  return JSON.stringify(formData) !== JSON.stringify(data);
}, [formData, data]);


const getChangedFields = (original: any,current: any,keysToIgnore: string[] = []): any => {
  const payload:any = {};
  for (const key in current) {
    if (keysToIgnore.includes(key) || original[key] !== current[key]) payload[key] = current[key];
  }
  return payload;
};


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const changedData = getChangedFields(data ,formData , ['Id', 'ConfigKey']) as any;
    changedData.LastModifiedByUserEmail = user?.user?.email;
    try {
      const response = await editEnvConfiguration(changedData);
      console.log("RESPONSE",response);
      
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




  return (
    <URLsForm onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <InputWrapper>
          <Label htmlFor="ConfigKey"> Config Key</Label>
          <Input
            type={"text"}
            required
            name="ConfigKey"
            value={formData.ConfigKey}
            placeholder="Any Config Key"
            themeUi={themeUi}
            onChange={handleChange}
            readOnly 
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
            value={formData.ConfigValue}
            onChange={handleChange}
            maxLength={50}
          />
        </InputWrapper>
      </div>
     
      <InputWrapper>
        <Label htmlFor="Description"> Description</Label>
        <TextArea
          name="Description"
          value={formData.Description}
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
          gap: 10,
        }}
      >
        <SecondaryButton type="button" onClick={cb} themeUi={themeUi}>
          Cancel
        </SecondaryButton>
        <PrimaryButton disabled={!isFormValid ||  !isChanged} themeUi={themeUi}>
          Update Env Config
        </PrimaryButton>
      </div>
    </URLsForm>
  );
};

export default EditRole;
