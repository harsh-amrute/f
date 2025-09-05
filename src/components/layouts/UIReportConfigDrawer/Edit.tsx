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
  ReportName: string;
  Col_Code: string;
  Col_Position: string;
  Category:string;
  Header:string;
  Visible:string;
  CellAlignment:string;
  Value:string;
  TagID:string;
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
          <Label htmlFor="ReportName"> Report Name</Label>
          <Input
            type={"text"}
            required
            name="ReportName"
            value={formData.ReportName}
            placeholder="Any Report Name"
            themeUi={themeUi}
            onChange={handleChange}
            readOnly 
          />
        </InputWrapper>
        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="Col_Code"> Column Code</Label>
          <Input
            type={"text"}
            required
            name="Col_Code"
            placeholder="Any Column Code"
            themeUi={themeUi}
            value={formData.Col_Code}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
        </InputWrapper>
      </div>
      <div style={{ display: "flex" }}>
      <InputWrapper >
        <Label htmlFor="Col_Position"> Column Position</Label>
      
          <Input
            type={"text"}
            required
            name="Col_Position"
            value={formData.Col_Position}
            placeholder="Any Column Position"
            themeUi={themeUi}
            onChange={handleChange}
            readOnly 
          />
      </InputWrapper>
    
      <InputWrapper style={{ marginLeft: "10px" }}>
        <Label htmlFor="CellAlignment"> Cell Alignment</Label>
        <Input
            type={"text"}
            required
            name="CellAlignment"
            placeholder="Any Cell Alignment : left or right"
            themeUi={themeUi}
            value={formData.CellAlignment}
            onChange={handleChange}
            maxLength={50}
            readOnly
          />
      </InputWrapper>
      </div>
     
      <InputWrapper>
        <Label htmlFor="Visible"> Visible</Label>
        <TextArea
          name="Visible"
          value={formData.Visible}
          style={{ minHeight: 50 }}
          required
          placeholder="Visiblity : 0 or 1"
          themeUi={themeUi}
          onChange={handleChange}
        />
        
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="Header"> Header</Label>
        <TextArea
          name="Header"
          value={formData.Header}
          style={{ minHeight: 50 }}
          required
          placeholder="Any Header name"
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
          Update Role
        </PrimaryButton>
      </div>
    </URLsForm>
  );
};

export default EditRole;
