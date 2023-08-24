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
  const [select, setSelect] = useState<any>();

  useEffect(() => {
    const newListLcRegion: any = [];
    const newListLcType: any = [];
    const newListLcCluster: any = [];

    Object.keys(location)?.forEach((keyLcRegion: any) => {
      const dataLcRegion = { label: keyLcRegion, value: keyLcRegion };
      newListLcRegion.push(dataLcRegion);

      Object.keys(location[keyLcRegion])?.forEach((keyLcType: any) => {
        const valueLcType = `${keyLcRegion} > ${keyLcType}`;
        const dataLcType = {
          label: valueLcType,
          value: valueLcType,
        };

        newListLcType.push(dataLcType);

        location[keyLcRegion][keyLcType]?.forEach((eleLcCluster: any) => {          
          const valueLcCluster = `${valueLcType} > ${eleLcCluster.wh_location_group}`;
          const dataLcCluster = {
            label: valueLcCluster,
            value: valueLcCluster,
          };
          newListLcCluster.push(dataLcCluster);
        });
      });
    });

    setListLcRegion(newListLcRegion);
    setListLcType(newListLcType);
    setListLcCluster(newListLcCluster);

    setLcRegion(valueSelectLc?.lcRegion);
    setLcType(valueSelectLc?.lcType);
    setLcCluster(valueSelectLc?.lcCluster);
  }, []);

  const handleSelectLcRegion = (e: any) => {
    handleSelectParent({
      e,
      dataAll: location,
      child: lcType,
      grandChild: lcCluster,
      setChild: setLcType,
      setGrandChild: setLcCluster,
    });
  };

  const handleSelectLcType = (e: any) => {
    handleSelectChild({
      e,
      grandChild: lcCluster,
      valueParent: lcRegion,
      setParent: setLcRegion,
      setGrandChild: setLcCluster,
    });
  };

  const handleSelectLcCluster = (e: any) => {
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
      title: t(
        "profile.tabContent.manageUsers.advancedPermission.locationPermission.locationRegion"
      ),
      placeholder: "",
      options: listLcRegion,
      value: lcRegion,
      setValue: setLcRegion,
      handleAction: handleSelectLcRegion,
      disabled: false,
    },
    {
      title: t(
        "profile.tabContent.manageUsers.advancedPermission.locationPermission.locationType"
      ),
      placeholder: "",
      options: listLcType,
      value: lcType,
      setValue: setLcType,
      handleAction: handleSelectLcType,
      disabled: false,
    },
    {
      title: t(
        "profile.tabContent.manageUsers.advancedPermission.locationPermission.locationCluster"
      ),
      placeholder: "",
      options: listLcCluster,
      value: lcCluster,
      setValue: setLcCluster,
      handleAction: handleSelectLcCluster,
      disabled: false,
    },
    {
      title: "P-L4",
      placeholder: "",
      options: [],
      value: select,
      setValue: setSelect,
      handleAction: () => {
        return;
      },
      disabled: false,
    },
    {
      title: "P-L5",
      placeholder: "",
      options: [],
      value: select,
      setValue: setSelect,
      handleAction: () => {
        return;
      },
      disabled: false,
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
