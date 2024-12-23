import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import LocationPermission from "./index";
import { useTranslation } from "react-i18next";

export default forwardRef(({ ...props }: any, ref) => {
  const { t } = useTranslation();
  const {
    location,
    valueSelectLc,
    handleSelectParent,
    handleSelectChild,
    handleSelectGrandChild,
  } = props;

  const [listLcRegion, setListLcRegion] = useState<any>([]);
  const [listLcType, setListLcType] = useState<any>([]);
  const [listLcCluster, setListLcCluster] = useState<any>([]);

  const [lcRegion, setLcRegion] = useState<any>([]); 
  const [lcType, setLcType] = useState<any>([]);
  const [lcCluster, setLcCluster] = useState<any>([]);

  useEffect(() => {
    const newListLcRegion: any = [];
    const newListLcType: any = [];
    const newListLcCluster: any = [];

    Object.keys(location)?.forEach((keyLcRegion: any) => {
      const dataLcRegion = { label: keyLcRegion, value: keyLcRegion };
      newListLcRegion.push(dataLcRegion);

      Object.keys(location[keyLcRegion])?.forEach((keyLcType: any) => {
        const valueLcType = `${keyLcRegion} > ${keyLcType}`;
        if (keyLcType.length > 0) {
          const dataLcType = {
            label: valueLcType,
            value: valueLcType,
          };

          newListLcType.push(dataLcType);
        }

        location[keyLcRegion][keyLcType]?.forEach((eleLcCluster: any) => {
          const valueLcCluster = `${valueLcType} > ${eleLcCluster['location_heirarchy_3']}`;
          if (eleLcCluster['location_heirarchy_3'].length > 0) {
            const dataLcCluster = {
              label: valueLcCluster,
              value: valueLcCluster,
            };
            newListLcCluster.push(dataLcCluster);
          }
        });
      });
    });

    setListLcRegion(newListLcRegion);
    setListLcType(newListLcType);
    setListLcCluster(newListLcCluster);

    // Safely set initial selected values or default to empty arrays
    setLcRegion(valueSelectLc?.lcRegion || []);
    setLcType(valueSelectLc?.lcType || []);
    setLcCluster(valueSelectLc?.lcCluster || []);
  }, [valueSelectLc]);

  // Handle region selection
  const handleSelectLcRegion = (e: any) => {
    setLcRegion(e);
    setLcType([]); // Reset lcType when lcRegion is changed
    setLcCluster([]); // Reset lcCluster when lcRegion is changed

    handleSelectParent({
      e,
      dataAll: location,
      child: lcType,
      grandChild: lcCluster,
      setChild: setLcType,
      setGrandChild: setLcCluster,
    });
  };

  // Handle type selection
  const handleSelectLcType = (e: any) => {
    setLcType(e);
    setLcCluster([]); // Reset lcCluster when lcType is changed

    handleSelectChild({
      e,
      grandChild: lcCluster,
      valueParent: lcRegion,
      setParent: setLcRegion,
      setGrandChild: setLcCluster,
    });
  };

  // Handle cluster selection
  const handleSelectLcCluster = (e: any) => {
    setLcCluster(e);
    handleSelectGrandChild({
      e,
      valueParent: lcRegion,
      setParent: setLcRegion,
      valueChild: lcType,
      setChild: setLcType,
    });
  };

  useImperativeHandle(ref, () => ({
    getLcPermissionValue() {
      return getLcPermissionValue();
    },
    removeLcPermissionValue() {
      removeLcPermissionValue();
    },
  }));

  const removeLcPermissionValue = () => {
    setLcRegion([]);
    setLcType([]);
    setLcCluster([]);
  };

  const getLcPermissionValue = () => {
    return {
      lcRegion,
      lcType,
      lcCluster,
    };
  };

  const prdPermissions = [
    {
      title: process.env.REACT_APP_LOCATION_PERMISSION_L1 || '',
      placeholder: "",
      options: listLcRegion,
      value: lcRegion,
      setValue: setLcRegion,
      handleAction: handleSelectLcRegion,
      disabled: false,
    },
    {
      title: process.env.REACT_APP_LOCATION_PERMISSION_L2 || '',
      placeholder: "", 
      options: lcRegion.length === 0 ? [] : listLcType.filter((type: any) =>
        lcRegion.some((region: any) => type.value.startsWith(region.value.split(' ')[0])) // Filter lcType based on selected lcRegion
      ),
      value: lcType,
      setValue: setLcType,
      handleAction: handleSelectLcType,
      disabled: lcRegion.length === 0, // Disable if no region is selected
    },
    {
      title: process.env.REACT_APP_LOCATION_PERMISSION_L3 || '',
      placeholder: "", 
      options: lcType.length === 0 ? [] : listLcCluster.filter((cluster: any) =>
        lcType.some((type: any) => cluster.value.startsWith(type.value.split(' ')[0])) // Filter lcCluster based on selected lcType
      ),
      value: lcCluster,
      setValue: setLcCluster,
      handleAction: handleSelectLcCluster,
      disabled: lcType.length === 0, // Disable if no lcType is selected
    },
  ];

  return (
    <LocationPermission
      title={t(
        "profile.tabContent.manageUsers.advancedPermission.locationPermission.title"
      )}
      prdPermissions={prdPermissions}
    />
  );
});
