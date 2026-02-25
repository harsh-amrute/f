// import * as NavStyle from "./styles.css";
import { useTranslation } from "react-i18next";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";
import {
  SCCount,
  SCCountAvailExtra,
  SCNavCount,
  SCNavCountHeader,
  SCNavCountList,
  SCNavCountItem,
  SCNavCountFooter,
  SCTotalValueBase,
  SCTotalWidthIST,
  SCTotalWidthAvail,
  SCTotalCenter,
  SCTotalEnd,
  BtnLeftBase,
  BtnLeftRotatedClickable,
  BtnRightBase,
  BtnRightRotated,
  BtnRightClickable,
  bgParticularVar,
  headerTextColorVar,
  itemTextColorVar,
  footerBgVar,
  footerTextColorVar,
} from "./styles.css";

interface TableParticularsProps {
  listTitle: any;
  themeUi: string;
  listData: any;
  totalData: any;
  pathname: string;
  pcs: boolean;
  setPcs: any;
}
const TableParticulars = ({
  themeUi,
  listTitle,
  listData,
  totalData,
  pathname,
  pcs,
  setPcs,
}: TableParticularsProps) => {
  const { t } = useTranslation();
  const theme =
    globalStyles.chooseThemeColor[
      themeUi as keyof typeof globalStyles.chooseThemeColor
    ];

  const handleClickLeft = () => {
    setPcs(true);
  };

  const handleClickRight = () => {
    setPcs(false);
  };

  const getIcon = () => {
    let iconLeft: string;
    let iconRight: string;
    if (themeUi === "PUREELEGANCE") {
      iconLeft = pcs
        ? "disabled-PureElegance-icon"
        : "enabled-PureElegance-icon";

      iconRight = !pcs
        ? "disabled-PureElegance-icon"
        : "enabled-PureElegance-icon";
    } else {
      iconLeft = pcs ? "disabled-icon" : "enabled-icon";

      iconRight = !pcs ? "disabled-icon" : "enabled-icon";
    }

    return (
      <>
        <img
          src={`/assets/img/nav/tableParticulars/${iconLeft}.svg`}
          alt=""
          onClick={handleClickLeft}
          className={pcs ? BtnLeftBase : BtnLeftRotatedClickable}
        />
        <img
          src={`/assets/img/nav/tableParticulars/${iconRight}.svg`}
          alt=""
          onClick={handleClickRight}
          className={`${BtnRightBase} ${
            pcs ? BtnRightClickable : BtnRightRotated
          }`}
        />
      </>
    );
  };

  const countPaddingClass =
    pathname === "/availability-comparison" ? SCCountAvailExtra : SCCount;

  const headerColor =
    themeUi === "CHARCOALCHIC" ? globalStyles.white : theme?.colorText;
  const itemColor =
    themeUi === "CHARCOALCHIC" ? globalStyles.white : theme?.colorText;

  const totalFooterText =
    themeUi === "CHARCOALCHIC" ? globalStyles.black : globalStyles.white;

  return (
    <div className={countPaddingClass}>
      <div
        className={SCNavCount}
        style={assignInlineVars({
          [bgParticularVar]: theme?.backGroundParticular ?? "#fff",
        })}
      >
        {pathname === "/availability-comparison" && (
          <div
            className={SCNavCountHeader}
            style={assignInlineVars({
              [headerTextColorVar]: headerColor ?? "#000",
            })}
          >
            <span>
              {pcs
                ? t("availabilityComparison.tableParticulars.inPcs")
                : t("availabilityComparison.tableParticulars.inStyle")}
            </span>
            <span>{getIcon()}</span>
          </div>
        )}

        <div
          className={SCNavCountHeader}
          style={assignInlineVars({
            [headerTextColorVar]: headerColor ?? "#000",
          })}
        >
          {listTitle?.map((item: any, idx: number) => (
            <span key={idx}>{item}</span>
          ))}
        </div>

        <ul className={SCNavCountList}>
          {listData?.map((item: any, idx: number) => (
            <li
              key={idx}
              className={SCNavCountItem}
              style={assignInlineVars({
                [itemTextColorVar]: itemColor ?? "#000",
              })}
            >
              {Object.entries(item)?.map((data: any, index: number) => {
                const segClasses = [SCTotalValueBase];

                if (pathname === "/ist-forced-closure")
                  segClasses.push(SCTotalWidthIST);
                if (pathname === "/availability-comparison")
                  segClasses.push(SCTotalWidthAvail);

                if (listTitle.length === 3 && index === 1)
                  segClasses.push(SCTotalCenter);
                if (listTitle.length === 3 && index === 2)
                  segClasses.push(SCTotalEnd);

                return (
                  <div key={index} className={segClasses.join(" ")}>
                    {data[1]}
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={SCNavCountFooter}
        style={assignInlineVars({
          [footerBgVar]: theme?.footerParticular ?? "#000",
          [footerTextColorVar]: totalFooterText,
        })}
      >
        {Object.entries(totalData)?.map((data: any, index: number) => {
          const segClasses = [SCTotalValueBase];

          if (pathname === "/ist-forced-closure")
            segClasses.push(SCTotalWidthIST);
          if (pathname === "/availability-comparison")
            segClasses.push(SCTotalWidthAvail);

          if (listTitle.length === 3 && index === 1)
            segClasses.push(SCTotalCenter);
          if (listTitle.length === 3 && index === 2)
            segClasses.push(SCTotalEnd);

          return (
            <div key={index} className={segClasses.join(" ")}>
              {data[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableParticulars;
