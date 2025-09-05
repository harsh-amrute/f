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
import { useAddProductPermissions } from "../../../VectorFlow/Services/MTA/MDM";

interface FormDataType {
  productHierarchy1: string;
  productHierarchy2: string;
  productHierarchy3: string;

}

const AddProductPermission = (props: { cb: () => void }) => {
  const { cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {mutateAsync : addProductPermissions} = useAddProductPermissions();


  const [formData, setFormData] = useState<FormDataType>({
    productHierarchy1: "",
    productHierarchy2: "",
    productHierarchy3: ""
  });


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
    const data = {permissionType : "Product" , data :[ {...formData } ]} as any;

     const response = await addProductPermissions(data);
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
      <InputWrapper>
          <Label htmlFor="productHierarchy1"> Product Heirarchy 1</Label>
          <Input
            type={"text"}
            required
            name="productHierarchy1"
            placeholder="Any Product heirarchy 1"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper style={{ marginLeft: "10px" }}>
          <Label htmlFor="productHierarchy2"> Product Heirarchy 2</Label>
          <Input
            type={"text"}
            required
            name="productHierarchy2"
            placeholder="Any Product heirarchy 2"
            themeUi={themeUi}
            onChange={handleChange}
          />
        </InputWrapper>
      </div>
      <div style={{ display: "flex" }}>
       
        <InputWrapper >
          <Label htmlFor="productHierarchy3"> Product Heirarchy 3</Label>
          <Input
            type={"text"}
            required
            name="productHierarchy3"
            placeholder="Any Product heirarchy 3"
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

export default AddProductPermission;
