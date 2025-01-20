import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ProductPermission from "./index";
import { useTranslation } from "react-i18next";

type Option = {
  label: string;
  value: string;
};

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

  const [listBrand, setListBrand] = useState<Option[]>([]);
  const [listSubBrand, setListSubBrand] = useState<Option[]>([]);
  const [listCategory, setListCategory] = useState<Option[]>([]);

  const [brand, setBrand] = useState<Option[]>([]);
  const [subBrand, setSubBrand] = useState<Option[]>([]);
  const [category, setCategory] = useState<Option[]>([]);

  // Update the lists whenever the product data or initial values change
  useEffect(() => {
    const newListBrand: Option[] = [];
    const newListSubBrand: Option[] = [];
    const newListCategory: Option[] = [];


    product && Object.keys(product)?.forEach((keyBrand: any) => {
      const dataBrand = { label: keyBrand, value: keyBrand };
      newListBrand.push(dataBrand);

      Object.keys(product[keyBrand])?.forEach((keySubBrand: string) => {
        const valueSubBrand = `${keyBrand} > ${keySubBrand}`;
        if (keySubBrand.length > 0) {
          const dataSubBrand = {
            label: valueSubBrand,
            value: valueSubBrand,
          };

          newListSubBrand.push(dataSubBrand);
        }

        product[keyBrand][keySubBrand]?.forEach((eleCategory: any) => {
          const valueCategory = `${valueSubBrand} > ${eleCategory['product_hierarchy_3']}`;
          if (eleCategory['product_hierarchy_3'].length > 0) {
            const dataCategory = {
              label: valueCategory,
              value: valueCategory,
            };
            newListCategory.push(dataCategory);
          }
        });
      });
    });

    setListBrand(newListBrand);
    setListSubBrand(newListSubBrand);
    setListCategory(newListCategory);

    
    setBrand(valueSelectPrd?.brand || []);
    setSubBrand(valueSelectPrd?.subBrand || []);
    setCategory(valueSelectPrd?.category || []);
  }, [valueSelectPrd, product]);

  
  const handleSelectBrand = (e: Option[]) => {
    setBrand(e);
    
    setSubBrand([]);
    setCategory([]);

    handleSelectParent({
      e,
      dataAll: product,
      child: subBrand,
      grandChild: category,
      setChild: setSubBrand,
      setGrandChild: setCategory,
    });
  };

  // Handle subBrand selection
  const handleSelectSubBrand = (e: Option[]) => {
    setSubBrand(e);
    // Reset category whenever subBrand is changed
    setCategory([]);

    handleSelectChild({
      e,
      grandChild: category,
      valueParent: brand,
      setParent: setBrand,
      setGrandChild: setCategory,
    });
  };

  // Handle category selection
  const handleSelectCategory = (e: Option[]) => {
    setCategory(e);
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
      placeholder:"", 
      options: brand.length === 0 ? [] : listSubBrand.filter((sub: Option) =>
        brand.some((b) => sub.value.startsWith(b.value.split(' ')[0])) // Filter based on selected brand
      ),
      value: subBrand,
      setValue: setSubBrand,
      handleAction: handleSelectSubBrand,
      disabled: brand.length === 0, // Disable if no brand is selected
    },
    {
      title: process.env.REACT_APP_PRODUCT_PERMISSION_L3 || '',
      placeholder:"", 
      options: subBrand.length === 0 ? [] : listCategory.filter((cat: Option) =>
        subBrand.some((s) => cat.value.startsWith(s.value.split(' ')[0])) // Filter based on selected sub-brand
      ),
      value: category,
      setValue: setCategory,
      handleAction: handleSelectCategory,
      disabled: subBrand.length === 0, 
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
