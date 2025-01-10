import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ProductPermission from "./index";
import { useTranslation } from "react-i18next";

export default forwardRef(({ ...props }: any, ref) => {
  const { t } = useTranslation();
  const {
    product,
    valueSelectPrd,
    handleSelectParent,
    handleSelectChild,
    handleSelectGrandChild,
    headers
  } = props;
  const [listBrand, setListBrand] = useState<any>([]);
  const [listSubBrand, setListSubBrand] = useState<any>([]);
  const [listCategory, setListCategory] = useState<any>([]);

  const [brand, setBrand] = useState<any>([]);
  const [subBrand, setSubBrand] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  // const [select, setSelect] = useState<any>();
  
  useEffect(() => {
    const newListBrand: any = [];
    const newListSubBrand: any = [];
    const newListCategory: any = [];


    product && Object.keys(product)?.forEach((keyBrand: any) => {
      const dataBrand = { label: keyBrand, value: keyBrand };
      newListBrand.push(dataBrand);

      Object.keys(product[keyBrand])?.forEach((keySubBrand: any) => {
        const valueSubBrand = `${keyBrand} > ${keySubBrand}`;
        const dataSubBrand = {
          label: valueSubBrand,
          value: valueSubBrand,
        };

        newListSubBrand.push(dataSubBrand);

        product[keyBrand][keySubBrand]?.forEach((eleCategory: any) => {
          const valueCategory = `${valueSubBrand} > ${eleCategory.product_hierarchy_3}`;
          const dataCategory = {
            label: valueCategory,
            value: valueCategory,
          };
          newListCategory.push(dataCategory);
        });
      });
    });

    console.log('effect called')
    console.log("ALL OPTIONS",newListBrand);
    console.log("CURRENT SELECTED OPTIONS",valueSelectPrd?.brand)

    setListBrand(newListBrand);
    setListSubBrand(newListSubBrand);
    setListCategory(newListCategory);
    console.log(valueSelectPrd?.brand)
    setBrand(valueSelectPrd?.brand);
    setSubBrand(valueSelectPrd?.subBrand);
    setCategory(valueSelectPrd?.category);
  }, [valueSelectPrd]);

  const handleSelectBrand = (e: any) => {
    handleSelectParent({
      e,
      dataAll: product,
      child: subBrand,
      grandChild: category,
      setChild: setSubBrand,
      setGrandChild: setCategory,
    });
  };

  const handleSelectSubBrand = (e: any) => {
    handleSelectChild({
      e,
      grandChild: category,
      valueParent: brand,
      setParent: setBrand,
      setGrandChild: setCategory,
    });
  };

  const handleSelectCategory = (e: any) => {
    handleSelectGrandChild({
      e,
      valueParent: brand,
      setParent: setBrand,
      valueChild: subBrand,
      setChild: setSubBrand,
    });
  };

  useImperativeHandle(ref, () => ({
    getPrdPermissionValue() {
      return getPrdPermissionValue();
    },
    removePrdPermissionValue() {
      removePrdPermissionValue();
    },
    getSetPrdPermission() {
      return getSetPrdPermission();
    },
    setBrand,
  }));

  const removePrdPermissionValue = () => {
    setBrand([]);
    setSubBrand([]);
    setCategory([]);
  };

  const getPrdPermissionValue = () => {
    return {
      brand,
      subBrand,
      category,
    };
  };

  const getSetPrdPermission = () => {
    return {
      setBrand,
      setSubBrand,
      setCategory,
    };
  };
  
  const prdPermissions = [
    {
      title: process.env.REACT_APP_PRODUCT_PERMISSION_L1 || '',
      placeholder: "",
      options: listBrand,
      value: brand,
      setValue: setBrand,
      handleAction: handleSelectBrand,
      disabled: false,
    },
    {
      title: process.env.REACT_APP_PRODUCT_PERMISSION_L2 || '',
      placeholder: "",
      options: listSubBrand,
      value: subBrand,
      setValue: setSubBrand,
      handleAction: handleSelectSubBrand,
      disabled: false,
    },
    {
      title: process.env.REACT_APP_PRODUCT_PERMISSION_L3 || '',
      placeholder: "",
      options: listCategory,
      value: category,
      setValue: setCategory,
      handleAction: handleSelectCategory,
      disabled: false,
    },
    // {
    //   title: "P-L4",
    //   placeholder: "",
    //   options: [],
    //   value: select,
    //   setValue: setSelect,
    //   handleAction: () => {
    //     return;
    //   },
    //   disabled: false,
    // },
    // {
    //   title: "P-L5",
    //   placeholder: "",
    //   options: [],
    //   value: select,
    //   setValue: setSelect,
    //   handleAction: () => {
    //     return;
    //   },
    //   disabled: false,
    // },
  ];

  const updatedPermissions =prdPermissions.map((permission:any,index:any)=>({
    ...permission,
    title: headers && headers?.Orders && headers?.Orders[index] ? headers.Orders[index] :  permission.title
  })) 
  console.log(prdPermissions)

  return (
    <ProductPermission
      title={ headers && Object.keys(headers).length > 0 ? Object.keys(headers)[0] + " Permissions" : t(
        "profile.tabContent.manageUsers.advancedPermission.productPermission.title"
      )}
      prdPermissions={updatedPermissions }
    />
  );
});
