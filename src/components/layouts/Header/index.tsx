import { ISTStatusContext } from "../../../context/ISTStatusContext";
import { useUserData } from "../../../context";
import * as H from "./style.css";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { assignInlineVars } from "@vanilla-extract/dynamic";
interface HeaderProps {
  urlExcludeHeader: Array<string>;
}

const Header = (props: HeaderProps) => {
  const { urlExcludeHeader } = props;

  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [isHideLogo, setIsHideLogo] = useState<boolean>(true);
  let timeoutId: any;

  const renderNamePage = () => {
    if (location.pathname === "/profile") {
      if (
        user.user.is_admin ||
        user?.roles?.permission?.includes("IST Admin")
      ) {
        return <span style={{paddingLeft: '24px'}}>{t("header.userAdministration")}</span>;
      } else {
        return <span style={{paddingLeft: '24px'}}>{t("header.myProfile")}</span>;
      }
    }
  };

  const {
    currentAction,
    setCurrentAction,
    setExportView,
    currentViewName,
    currentViewCount,
    currentDataCount,
  } = useContext(ISTStatusContext);

  const hideLogo = () => {
    setIsHideLogo(false);
  };

  useEffect(() => {
    timeoutId = setTimeout(() => {
      hideLogo();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const onMouseEnterLogo = () => {
    setIsHideLogo(true);
    clearTimeout(timeoutId);
  };

  const onMouseLeaveLogo = () => {
    timeoutId = setTimeout(() => {
      hideLogo();
    }, 300);
  };

  const CLIENT_LOGO_PATH = user?.config_data?.CLIENT_LOGO;

  const CLIENT_NAME = user?.config_data?.CLIENT_NAME;
  const headerBtnClass =
    themeUi === "REGALBLAZE"
      ? H.SCHeaderButtonIstRegal
      : H.SCHeaderButtonIstGradient;

  const logoWrapperVars = assignInlineVars({
    [H.wrapperWidthVar]: isHideLogo ? "fit-content" : "1vw",
  });

  const renderHeader = () => {
    if (location.pathname === "/ist-status") {
      return (
        <>
          <div className={H.SCHeaderBoxIst}>
            <p className={H.SCHeaderText}>
              {t("header.ISTStatus")}{" "}
              {currentDataCount > 0 && (
                <span className={H.SCHeaderSubTextIst}>
                  ({currentViewName})
                </span>
              )}{" "}
            </p>

            {currentViewCount > 0 && currentDataCount > 0 && (
              <div className={H.SCHeaderContent}>
                <div
                  className={H.SCExportAllBox}
                  onClick={() => {
                    setExportView(true);
                  }}
                >
                  <button className={H.SCExportAllBoxButton}>
                    <img src="/assets/img/forced/excel.png" alt="and" />
                    <span className={H.SCExportAllBoxSpan}>
                      {t("header.exportAllBtn")}
                    </span>
                    <img src="/assets/img/forced/export.svg" alt="and" />
                  </button>
                </div>

                {currentAction === "view" && (
                  <span
                    className={headerBtnClass}
                    onClick={() => {
                      setCurrentAction("edit");
                    }}
                  >
                    {t("header.editBtn")}
                  </span>
                )}

                {currentAction === "edit" && (
                  <span
                    className={H.SCHeaderButtonIstDelete}
                    onClick={() => {
                      setCurrentAction("deleting");
                    }}
                  >
                    {t("header.deleteBtn")}
                  </span>
                )}

                {currentAction === "edit" && (
                  <span
                    className={headerBtnClass}
                    onClick={() => {
                      setCurrentAction("saving");
                    }}
                  >
                    {t("header.saveBtn")}
                  </span>
                )}

                {currentAction === "saving" && (
                  <span className={H.SCHeaderButtonIstSaving}>
                    {t("header.savingBtn")}
                  </span>
                )}
                {currentAction === "deleting" && (
                  <span className={H.SCHeaderButtonIstSaving}>
                    {t("header.deletingBtn")}
                  </span>
                )}
              </div>
            )}
          </div>

          <div
            className={H.SCWrapperImg}
            style={{ ...logoWrapperVars, right: 0, marginTop: "-110px" }}
            onMouseEnter={onMouseEnterLogo}
            onMouseLeave={onMouseLeaveLogo}
          >
            <img
              className={H.SCImg}
              src="/assets/VectorFlow_black.svg"
              alt="logo"
            />
          </div>
        </>
      );
    }
    return (
      <>
        {!urlExcludeHeader.includes(location.pathname) && (
          <div
            className={H.SCHeaderBox}
            style={{ position: "sticky", top: 0, zIndex: 2, paddingTop: 15 }}
          >
            <p className={H.SCHeaderText}>{renderNamePage()}</p>
          </div>
        )}
        <div
          className={H.SCWrapperImg}
          style={{ ...logoWrapperVars, display: "flex", alignItems: "center" }}
          onMouseEnter={onMouseEnterLogo}
          onMouseLeave={onMouseLeaveLogo}
          >
          {CLIENT_LOGO_PATH ? (
              <img
              className={H.SCImg}
              src={CLIENT_LOGO_PATH}
              alt="logo"
              onError={(e: any) => {
                  e.currentTarget.src = "/assets/img/header/VectorFlowLogoBlackNew.svg";
              }}
              />
          ) : (
              <img
              className={H.SCImg}
              style={assignInlineVars({ [H.imgMarginLeftVar]: "20px" })}
              src="/assets/img/header/VectorFlowLogoBlackNew.svg"
              alt="logo"
              />
          )}

        {CLIENT_NAME && (
            <div
            className={H.ClientNameText}
            style={assignInlineVars({
                [H.imgMarginLeftVar]: !CLIENT_LOGO_PATH ? "15px" : "0px",
            })}
            >
            {CLIENT_NAME}
            </div>
        )}
        </div>
      </>
    );
  };

  return <>{renderHeader()}</>;
};

export default Header;
