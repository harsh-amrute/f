import React, { useState, useEffect, useMemo, useCallback } from "react";

import Select from "react-select";

import {
  InputWrapper,
  URLsForm,
  Label,
  ButtonsWrapper,
} from "../UserURLsDrawer/styles";
import { Input, PrimaryButton, Skeleton } from "../../commons/styled";
import { useUserData } from "../../../context";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useAddLocationPermissions } from "../../../VectorFlow/Services/MTA/MDM";

interface FormDataType {
  location_heirarchy_1: string;
  location_heirarchy_2: string;
  location_heirarchy_3: string;
  
}

const AddLocationPermission = (props: { cb: () => void }) => {
  const { cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const [formData, setFormData] = useState<FormDataType>({
    location_heirarchy_1: "",
    location_heirarchy_2: "",
    location_heirarchy_3: "",
  });

  const {mutateAsync : addLocationPermission} = useAddLocationPermissions();

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      const data = {permissionType : "Location" , data :[ {...formData } ]} as any;
      const response = await addLocationPermission(data);
      notifySuccess(response?.data?.data);
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
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    });
  }, [formData]);

  if (isLoading) {
    return (
      <URLsForm>
        <div style={{ display: "flex", height: 30, gap: 20 }}>
          <Skeleton style={{ height: "100%", flex: 1, width: "100%" }} />
          <Skeleton style={{ height: "100%", flex: 1, width: "100%" }} />
        </div>
        <Skeleton style={{ height: 30, width: "100%", marginTop: 20 }} />
        <Skeleton style={{ height: 30, width: "100%", marginTop: 20 }} />

        <Skeleton style={{ height: 80, width: "100%", marginTop: 20 }} />
        <ButtonsWrapper
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 10,
          }}
        >
          <Skeleton style={{ height: 30, width: "100px" }} />
        </ButtonsWrapper>
      </URLsForm>
    );
  }

  return (
    <URLsForm onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
       
        <InputWrapper >
          <Label htmlFor="location_heirarchy_1"> Location Heirarchy 1</Label>
          <Input
            type={"text"}
            required
            name="location_heirarchy_1"
            placeholder="Any location heirarchy 1"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="location_heirarchy_2"> Location Heirarchy 2</Label>
          <Input
            type={"text"}
            required
            name="location_heirarchy_2"
            placeholder="Any location heirarchy 2"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
      </div>
      <div style={{ display: "flex" }}>
       
        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="location_heirarchy_3"> Location Heirarchy 3</Label>
          <Input
            type={"text"}
            required
            name="location_heirarchy_3"
            placeholder="Any location heirarchy 3"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
      </div>
      
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

export default AddLocationPermission;
