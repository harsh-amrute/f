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
import UserPermissionsView from "./UserPermissionsView";

const Permissions = ({ roles }: any) => {

  return (
    <UserPermissionsView />
  );
};

export default Permissions;
