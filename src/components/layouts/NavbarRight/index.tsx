import { useEffect, useState } from "react";
import {
  listColorTheme,
  SCWrap,
  SCWrapTop,
  SCTopText,
  SCClose,
  SCWrapContent,
  SCWrapItem,
  SCInputRadio,
  SCItemText,
  SCListColor,
  SCColor,
  SCIconClose,
  SCButton,
  SCWrapItemLeft,
  SCWrapOpen,
  SCWrapItemActive,
  radioAccentVar,
  colorSwatchVar,
  buttonBgVar,
} from "./styles.css";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import LoadingSpinner from "../../../components/commons/LoadingSpinner";
import { useChangeThemeUser } from "../../../services/profile";
import OverlayPage from "../../../components/commons/OverlayPage";
import { useUserData } from "../../../context";
import { useTranslation } from "react-i18next";
import * as globalStyles from "../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const NavbarRight = ({
  isOpenNavbarRight,
  setIsOpenNavbarRight,
  setColorTheme,
  isLoadSpinner,
  setIsLoadSpinner,
}: any) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setIsOpenNavbarRight(false);
  };

  const { mutateAsync: mutateChangeTheme } = useChangeThemeUser();
  const { user, changeColorTheme } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const [listTheme, setListTheme] = useState<any>(listColorTheme);

  useEffect(() => {
    const newListColorTheme = listColorTheme.map((item: any) => {
      if (themeUi === item.textColor) {
        item.status = true;
      }
      return item;
    });
    setListTheme(newListColorTheme);
    setColorTheme(themeUi);
  }, []);

  const handleClick = (index: number) => {
    const newListColorTheme: any = [...listColorTheme];
    newListColorTheme.forEach((item: any) => {
      item.status = false;
    });
    newListColorTheme[index].status = true;

    setListTheme(newListColorTheme);
  };

  const handleChangeColor = () => {
    setIsLoadSpinner(true);
    const getTheme = listTheme.filter((item: any) => item.status);

    const formData = {
      theme_ui: getTheme[0].textColor,
    };
    setTimeout(() => {
      mutateChangeTheme(formData, {
        onSuccess: (res: any) => {
          if (res?.status === 400) {
            notifyError(res?.response?.msg);
          } else {
            notifySuccess(res?.data?.msg);
          }
          setIsLoadSpinner(false);
        },
        onError: (error: any) => {
          console.log("error", error);
          setIsLoadSpinner(false);
          notifyError(error.msg);
        },
      });
      changeColorTheme(getTheme[0].textColor);
      setColorTheme(getTheme[0].textColor);
    }, 500);
  };

  const accent = globalStyles.chooseThemeColor[themeUi]?.color5 ?? "#000";
  const btnBg = globalStyles?.chooseThemeColor[themeUi]?.colorButton ?? "#000";

  return (
    <div>
      <div className={`${SCWrap} ${isOpenNavbarRight ? SCWrapOpen : ""}`}>
        <div className={SCWrapTop}>
          <div className={SCTopText}>{t("theme.chooseThemeColor")}</div>
          <div className={SCClose} onClick={handleClose}>
            <img
              className={SCIconClose}
              src="/assets/img/navRight/icon_close.svg"
            />
          </div>
        </div>

        <div className={SCWrapContent}>
          {listTheme.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`${SCWrapItem} ${item.status ? SCWrapItemActive : ""}`}
            >
              <div className={SCWrapItemLeft}>
                <input
                  type="radio"
                  checked={item.status}
                  onClick={() => handleClick(index)}
                  className={SCInputRadio}
                  style={assignInlineVars({
                    [radioAccentVar]: accent,
                  })}
                />
                <span className={SCItemText}>{item.title}</span>
                <div style={{ margin: "0 10px" }} />
              </div>

              <div className={SCListColor}>
                {item.colorTheme.map((color: string) => (
                  <div
                    className={SCColor}
                    key={color}
                    style={assignInlineVars({
                      [colorSwatchVar]: color,
                    })}
                  />
                ))}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={SCButton}
              style={assignInlineVars({
                [buttonBgVar]: btnBg,
              })}
              onClick={handleChangeColor}
            >
              {t("theme.applyTheme")}
            </button>
          </div>
        </div>
      </div>

      {isOpenNavbarRight && <OverlayPage onClick={handleClose} />}
      {isLoadSpinner && <LoadingSpinner />}
    </div>
  );
};

export default NavbarRight;
