import {
  SCWrap,
  SCLeft,
  SCRight,
  SCWrapLogo,
  SCLogo,
  SCWrapBreadcrumb,
  SCBreadCrumb,
  SCImg,
  SCTxt,
  SCImgLink,
  SCVerticalPartitions,
  wrapBgVar,
  breadcrumbColorVar,
  userNameColorVar,
} from "./styles.css";
import { useUserData } from "../../../context";
import BreadCrumb from "../BreadCrumb";
import { useState } from "react";
import { ModalReportIssue, ModalSuccess } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import * as globalStyles from "../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const NavbarTop = ({
  setIsOpenNavbarRight,
  setIsLoadSpinner,
  isLoadSpinner,
}: any) => {
  const { user } = useUserData();
  const colorTheme = user?.user?.theme_ui;
  const [isOpenReportIssue, setIsOpenReportIssue] = useState<boolean>(false);
  const [isOpenReportSuccess, setIsOpenReportSuccess] =
    useState<boolean>(false);

  const openNavbarRight = () => {
    setIsOpenNavbarRight(true);
  };

  const openReportIssue = () => {
    setIsOpenReportIssue(true);
  };

  const onCloseReportIssue = () => {
    setIsOpenReportIssue(false);
  };

  const onCloseModalSuccess = () => {
    setIsOpenReportSuccess(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/landing-page"); // Navigating to the desired route
  };

    // derive runtime theme colors
    const theme = globalStyles.chooseThemeColor[colorTheme] || {};
    const wrapBg = theme?.color1 || "#000";
    const breadcrumbColor =
      colorTheme === "PUREELEGANCE" ? theme?.color3 || "#000" : globalStyles.white;
    const userNameColor =
      colorTheme === "PUREELEGANCE" ? theme?.color3 || "#000" : globalStyles.white;
  

  return (
    <>
      <div
        className={SCWrap}
        style={assignInlineVars({
          [wrapBgVar]: wrapBg,
        })}
      >
        <div className={SCLeft}>
          <div className={SCWrapLogo}>
            <img
              className={SCLogo}
              src={
                colorTheme === "PUREELEGANCE"
                  ? "/assets/img/header/VectorFlowLogoBlackNew.svg"
                  : "/assets/img/header/VectorFlowLogoWhite.svg"
              }
              onClick={handleClick}
              alt="VectorFlow"
            />
          </div>

          <div className={SCVerticalPartitions} />

          <div className={SCWrapBreadcrumb}>
            <div
              className={SCBreadCrumb}
              style={assignInlineVars({
                [breadcrumbColorVar]: breadcrumbColor,
              })}
            >
              <BreadCrumb />
            </div>
          </div>
        </div>

        <div className={SCRight}>
          <img
            className={SCImg}
            src={`/assets/img/header/${
              colorTheme === "REGALBLAZE"
                ? "notifications_yellow"
                : "notifications_purple"
            }.svg`}
            alt="Notifications"
          />

          <img
            className={SCImg}
            src="/assets/img/header/icon_theme_colors.svg"
            onClick={openNavbarRight}
            alt="Theme"
          />

          <img
            className={SCImg}
            src="/assets/img/header/report-bug.svg"
            onClick={openReportIssue}
            alt="Report bug"
          />

          <Link to="/profile" className={SCImgLink}>
            <img
              className={SCImg}
              src="/assets/img/header/profile_new.svg"
              alt="Profile"
            />
          </Link>

          <span
            className={SCTxt}
            style={assignInlineVars({
              [userNameColorVar]: userNameColor,
            })}
            title={user?.user?.name}
          >
            {user?.user?.name}
          </span>
        </div>
      </div>

      {isOpenReportIssue && (
        <ModalReportIssue
          openModal={isOpenReportIssue}
          closeModal={onCloseReportIssue}
          setIsLoadSpinner={setIsLoadSpinner}
          isLoadSpinner={isLoadSpinner}
          setIsOpenReportSuccess={setIsOpenReportSuccess}
        />
      )}
      <ModalSuccess
        openModal={isOpenReportSuccess}
        closeModal={onCloseModalSuccess}
        setIsOpenReportIssue={setIsOpenReportIssue}
        colorTheme={colorTheme}
      />
    </>
  );
};

export default NavbarTop;
