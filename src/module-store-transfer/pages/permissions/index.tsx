import { useTranslation } from "react-i18next";
import {
  profileOverView,
  subTitleBox,
  subTitlePad,
  subTitleSpan,
  overviewInfo,
  overviewItem,
  overviewItemTitle,
  overViewSignItem,
  iconChecked,
  overviewWrap,
  overviewFlex,
  profileOverViewCol,
  subTitleSpanItem,
  overviewItemContent,
  overviewInfoPermis,
  overviewItemPerTitle,
  overviewWrapTitle,
  overviewWrapItem,
  overviewWrapItemBg,
  overviewItemBorderedFirstTwo,
} from "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

const Permissions = ({ roles }: any) => {
  console.log(roles);
  const { t } = useTranslation();

  const generateProductPermissionsList = (roles: any) => {
    const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
    const PRODUCT_PERMISSION_L1 = EnvConfig["PRODUCT_PERMISSION_L1"];
    const PRODUCT_PERMISSION_L2 = EnvConfig["PRODUCT_PERMISSION_L2"];
    const PRODUCT_PERMISSION_L3 = EnvConfig["PRODUCT_PERMISSION_L3"];

    return roles?.product_permission.map((application: any) => {
      const listBrand = application.product_hierarchy_1;
      const listSubBrand = application.product_hierarchy_2;
      const listCategories = application.product_hierarchy_3;
      return {
        application_name: application["application_name"],
        permissions: [
          {
            title: t("profile.tabContent.permissions.L1"),
            name: PRODUCT_PERMISSION_L1,
            data: listBrand,
          },
          {
            title: t("profile.tabContent.permissions.L2"),
            name: PRODUCT_PERMISSION_L2,
            data: listSubBrand,
          },
          {
            title: t("profile.tabContent.permissions.L3"),
            name: PRODUCT_PERMISSION_L3,
            data: listCategories,
          },
        ],
      };
    });
  };

  const generateLocationPermissionsList = (roles: any) => {
    const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
    const LOCATION_PERMISSION_L1 = EnvConfig["LOCATION_PERMISSION_L1"];
    const LOCATION_PERMISSION_L2 = EnvConfig["LOCATION_PERMISSION_L2"];
    const LOCATION_PERMISSION_L3 = EnvConfig["LOCATION_PERMISSION_L3"];
    return roles?.location_permission.map((application: any) => {
      const listLCRegion = application.location_heirarchy_1;
      const listLCType = application.location_heirarchy_2;
      const listLCCluster = application.location_heirarchy_3;
      return {
        application_name: application["application_name"],
        permissions: [
          {
            title: t("profile.tabContent.permissions.L1"),
            name: LOCATION_PERMISSION_L1,
            data: listLCRegion,
          },
          {
            title: t("profile.tabContent.permissions.L2"),
            name: LOCATION_PERMISSION_L2,
            data: listLCType,
          },
          {
            title: t("profile.tabContent.permissions.L3"),
            name: LOCATION_PERMISSION_L3,
            data: listLCCluster,
          },
        ],
      };
    });
  };

  const has3Perms = roles?.permission?.length === 3;
  const hasMoreThan2 = (roles?.permission?.length ?? 0) > 2;

  return (
    <>
      <div className={profileOverView}>
        <div className={subTitleBox}>
          <div className={subTitlePad}>
            <span className={subTitleSpan}>
              {t("profile.tabContent.permissions.title")}
            </span>
          </div>
        </div>

        <div className={overviewInfo}>
          <div className={overviewWrap}>
            <div
              className={[overviewWrapItem, has3Perms && overviewWrapItemBg]
                .filter(Boolean)
                .join(" ")}
            >
              {roles?.permission?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={[
                    overviewItem,
                    hasMoreThan2 && overviewItemBorderedFirstTwo,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <img
                    className={iconChecked}
                    src="/assets/img/check/checked_black.svg"
                  />
                  <div className={overviewItemTitle}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={overviewFlex}>
        <div className={profileOverViewCol}>
          <div className={subTitleBox}>
            <div className={subTitlePad}>
              <span className={subTitleSpan}>
                {t("profile.tabContent.permissions.productPermission.title")}
              </span>
            </div>
          </div>

          <div className={overviewInfoPermis}>
            {generateProductPermissionsList(roles)?.map(
              (application: any, i: number) => (
                <div key={`prd-${i}`} style={{ margin: "5px" }}>
                  <div className={overviewWrapTitle}>
                    {application?.application_name}
                  </div>
                  {application?.permissions?.map((dataPrd: any, j: number) => (
                    <div key={`prd-line-${j}`} className={overViewSignItem}>
                      <span className={subTitleSpan}>{dataPrd?.title}</span>
                      <div className={subTitleSpanItem}>
                        <div className={overviewItemPerTitle}>
                          {dataPrd?.name}
                        </div>
                        <div className={overviewItemContent}>-</div>
                        <div className={overviewItemContent}>
                          {dataPrd?.data?.toString()?.replace(/,/g, " | ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        <div className={profileOverViewCol}>
          <div className={subTitleBox}>
            <div className={subTitlePad}>
              <span className={subTitleSpan}>
                {t("profile.tabContent.permissions.locationPermission.title")}
              </span>
            </div>
          </div>

          <div className={overviewInfoPermis}>
            {generateLocationPermissionsList(roles)?.map(
              (application: any, i: number) => (
                <div key={`loc-${i}`} style={{ margin: "10px 5px" }}>
                  <div className={overviewWrapTitle}>
                    {application?.application_name}
                  </div>
                  {application?.permissions?.map((dataPrd: any, j: number) => (
                    <div key={`loc-line-${j}`} className={overViewSignItem}>
                      <span className={subTitleSpan}>{dataPrd.title}</span>
                      <div className={subTitleSpanItem}>
                        <div className={overviewItemPerTitle}>
                          {dataPrd.name}
                        </div>
                        <div className={overviewItemContent}>-</div>
                        <div className={overviewItemContent}>
                          {dataPrd?.data?.toString()?.replace(/,/g, " | ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Permissions;
