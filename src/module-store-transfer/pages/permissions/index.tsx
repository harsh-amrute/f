import { useTranslation } from "react-i18next";
import {
  SCProfileOverView,
  SCSubTitleBox,
  SCSubTitlePad,
  SCSubTitleSpan,
  SCOverviewInfo,
  SCOverviewItem,
  SCOverviewItemTitle,
  SCOverViewSignItem,
  SCIconChecked,
  SCOverviewWrap,
  SCOverviewFlex,
  SCProfileOverViewCol,
  SCSubTitleSpanItem,
  SCOverviewItemContent,
  SCOverviewInfoPermis,
  SCOverviewItemPerTitle,
  SCOverviewItemPerTitleLoca,
  SCOverviewWrapTitle,
  SCOverviewWrapItem,
} from "./styles";

const Permissions = ({ roles }: any) => {
  const { t } = useTranslation();

  const listBrand = roles.product_permission.product_hierarchy_1;
  const listSubBrand = roles.product_permission.product_hierarchy_2;
  const listCategories = roles.product_permission.product_hierarchy_3;

  const listLCRegion = roles.location_permission.wh_region;
  const listLCType = roles.location_permission.wh_type;
  const listLCCluster = roles.location_permission.wh_location_group;

  const listDataPrdPermission = [
    {
      title: t("profile.tabContent.permissions.L1"),
      name: t("profile.tabContent.permissions.productPermission.brand"),
      data: listBrand,
    },
    {
      title: t("profile.tabContent.permissions.L2"),
      name: t("profile.tabContent.permissions.productPermission.subBrand"),
      data: listSubBrand,
    },
    {
      title: t("profile.tabContent.permissions.L3"),
      name: t("profile.tabContent.permissions.productPermission.category"),
      data: listCategories,
    },
  ];

  const listDataLcPermission = [
    {
      title: t("profile.tabContent.permissions.L1"),
      name: t(
        "profile.tabContent.permissions.locationPermission.locationRegion"
      ),
      data: listLCRegion,
    },
    {
      title: t("profile.tabContent.permissions.L2"),
      name: t("profile.tabContent.permissions.locationPermission.locationType"),
      data: listLCType,
    },
    {
      title: t("profile.tabContent.permissions.L3"),
      name: t(
        "profile.tabContent.permissions.locationPermission.locationCluster"
      ),
      data: listLCCluster,
    },
  ];

  return (
    <>
      <SCProfileOverView>
        <SCSubTitleBox>
          <SCSubTitlePad>
            <SCSubTitleSpan>
              {t("profile.tabContent.permissions.title")}
            </SCSubTitleSpan>
          </SCSubTitlePad>
        </SCSubTitleBox>
        <SCOverviewInfo>
          <SCOverviewWrap>
            <SCOverviewWrapTitle>
              {t(
                "profile.tabContent.permissions.roleAndPermissions.interStoreTransfer"
              )}
            </SCOverviewWrapTitle>
            <SCOverviewWrapItem checkBackGround={roles.permission.length === 3}>
              {roles.permission.map((item: any, index: number) => (
                <SCOverviewItem
                  key={index}
                  checkBorderBottom={roles.permission.length > 2}
                >
                  <SCIconChecked src="../assets/img/check/checked_black.svg" />
                  <SCOverviewItemTitle>{item}</SCOverviewItemTitle>
                </SCOverviewItem>
              ))}
            </SCOverviewWrapItem>
          </SCOverviewWrap>
        </SCOverviewInfo>
      </SCProfileOverView>

      <SCOverviewFlex>
        <SCProfileOverViewCol>
          <SCSubTitleBox>
            <SCSubTitlePad>
              <SCSubTitleSpan>
                {t("profile.tabContent.permissions.productPermission.title")}
              </SCSubTitleSpan>
            </SCSubTitlePad>
          </SCSubTitleBox>

          <SCOverviewInfoPermis>
            {listDataPrdPermission.map((dataPrd: any) => (
              <SCOverViewSignItem>
                <SCSubTitleSpan>{dataPrd.title}</SCSubTitleSpan>
                <SCSubTitleSpanItem>
                  <SCOverviewItemPerTitle>
                    {dataPrd.name}
                  </SCOverviewItemPerTitle>
                  <SCOverviewItemContent>-</SCOverviewItemContent>
                  <SCOverviewItemContent>
                    {dataPrd.data.toString().replace(/,/g, " | ")}
                  </SCOverviewItemContent>
                </SCSubTitleSpanItem>
              </SCOverViewSignItem>
            ))}
          </SCOverviewInfoPermis>
        </SCProfileOverViewCol>

        <SCProfileOverViewCol>
          <SCSubTitleBox>
            <SCSubTitlePad>
              <SCSubTitleSpan>
                {t("profile.tabContent.permissions.locationPermission.title")}
              </SCSubTitleSpan>
            </SCSubTitlePad>
          </SCSubTitleBox>
          <SCOverviewInfoPermis>
            {listDataLcPermission.map((dataLc: any) => (
              <SCOverViewSignItem>
                <SCSubTitleSpan>
                  {dataLc.title}
                </SCSubTitleSpan>
                <SCSubTitleSpanItem>
                  <SCOverviewItemPerTitleLoca>
                    {dataLc.name}
                  </SCOverviewItemPerTitleLoca>
                  <SCOverviewItemContent>-</SCOverviewItemContent>
                  <SCOverviewItemContent>
                    {dataLc.data.toString().replace(/,/g, " | ")}
                  </SCOverviewItemContent>
                </SCSubTitleSpanItem>
              </SCOverViewSignItem>
            ))}
          </SCOverviewInfoPermis>
        </SCProfileOverViewCol>
      </SCOverviewFlex>
    </>
  );
};

export default Permissions;
