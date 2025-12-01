import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  PercentBorderContainer,
  Percentborder,
  Percent,
  BtnGroup,
  Btns,
  ViewOrder,
  TextOnBox,
  ColorOnLeft,
  Separator,
  ButtonImg,
  TextOnColor,
  ImgDiv,
  ColoronLeftWrapper,
  viewOrderTextColorVar,
  viewOrderBgColorVar,
  colorOnLeftBgVar,
  colorOnLeftHeightVar,
  separatorColorVar,
} from "./styles.css";
import { MaterialCoverageString } from "../../../../../VectorFlow/Pages/MTO/Common/String";
import Tooltip from "../../../../../VectorFlow/Pages/MTO/Common/Tooltip";
import {
  getToolTipContent,
  formatNumber,
} from "../../../../../VectorFlow/Pages/MTO/Procurement/MaterialCoverage/CommonFunc";
import { useUserData } from "../../../../../context";

interface MaterialSOProps {
  kit: string;
  colors: any;
  height: string;
  text: string;
  orderCount: number;
  cutCount: number;
  orderValue: number;
  percent: number;
  ToolTipdata?: any;
}

const MTOMaterialSO = ({
  kit,
  colors,
  height,
  text,
  orderCount,
  cutCount,
  orderValue,
  percent,
  ToolTipdata,
}: MaterialSOProps) => {
  const formatPercent = (percent: number): string => {
    // Check if percent is NaN or 0, and return "NA" if true

    if (isNaN(percent) || percent === 0) {
      return "NA";
    }

    // Perform the rounding operation if percent is not NaN or 0
    return `${Math.round(percent * 100).toString()}%`;
  };

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const viewOrderVars =
    themeUi === "REGALBLAZE"
      ? {
          [viewOrderTextColorVar]: "#CB830E",
          [viewOrderBgColorVar]: "#fcf4f0",
        }
      : {
          [viewOrderTextColorVar]: "#BC3D81",
          [viewOrderBgColorVar]: "#fcf0f7",
        };

  return (
    <>
      {/* Left color bars / stripe with tooltip */}
      {colors.c1 === "#000" ||
      colors.c2 === "#E53F40" ||
      colors.c3 === "#EBBF2B" ? (
        <Tooltip
          disableStyleInjection="core"
          tooltipZoom={1}
          zoom="1"
          content={getToolTipContent("Red", ToolTipdata)}
        >
          <div className={ColoronLeftWrapper}>
            <div
              className={ColorOnLeft}
              style={assignInlineVars({
                [colorOnLeftBgVar]: colors.c1,
                [colorOnLeftHeightVar]: height,
              })}
            />
            <div
              className={ColorOnLeft}
              style={assignInlineVars({
                [colorOnLeftBgVar]: colors.c2,
                [colorOnLeftHeightVar]: height,
              })}
            />
            <div
              className={ColorOnLeft}
              style={assignInlineVars({
                [colorOnLeftBgVar]: colors.c3,
                [colorOnLeftHeightVar]: height,
              })}
            />
          </div>
        </Tooltip>
      ) : colors.c1 === "#418D18" ? (
        <Tooltip
          disableStyleInjection="core"
          tooltipZoom={1}
          content={getToolTipContent("Green", ToolTipdata)}
        >
          <div className={ColoronLeftWrapper}>
            <div
              className={ColorOnLeft}
              style={assignInlineVars({
                [colorOnLeftBgVar]: colors.c1,
                [colorOnLeftHeightVar]: height,
              })}
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          disableStyleInjection="core"
          tooltipZoom="1"
          content={getToolTipContent("Blue", ToolTipdata)}
        >
          <div
            className={ColorOnLeft}
            style={assignInlineVars({
              [colorOnLeftBgVar]: colors.c1,
              [colorOnLeftHeightVar]: height,
            })}
          >
            <h3
              className={TextOnColor}
              style={{
                position: "absolute",
                left: "50%",
                fontSize: 8,
                top: "50%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                width: "100%",
              }}
            >
              {text}
            </h3>
          </div>
        </Tooltip>
      )}

      {/* Kit label box */}
      <div className={TextOnBox}>
        <div className={ImgDiv}>
          {kit === "No Kit" ? (
            <img
              src="/assets/img/NoKit2x.png"
              height="13px"
              width="15px"
              alt="Logo"
            />
          ) : kit === "Partial Kit" ? (
            <img
              src="/assets/img/PartialKit.png"
              height="7px"
              width="26px"
              alt="Logo"
            />
          ) : (
            <img
              src="/assets/img/FullKit2x.png"
              height="17px"
              width="17px"
              alt="Logo"
            />
          )}
        </div>
        <div className={ImgDiv}>
          {kit === "No Kit"
            ? "No Kit"
            : kit === "Partial Kit"
            ? "Partial Kit"
            : "Full Kit"}
        </div>
      </div>

      {/* Percent circle */}
      <div className={PercentBorderContainer}>
        <div className={Percentborder}>
          <h3 className={Percent}>{formatPercent(percent)}</h3>
        </div>
      </div>

      {/* Themed action */}
      <button
        className={ViewOrder}
        style={assignInlineVars(viewOrderVars as any)}
      >
        {MaterialCoverageString.viewAllRecords}
      </button>

      {/* Stats row */}
      <div className={BtnGroup}>
        <button className={Btns}>
          <Tooltip
            disableStyleInjection="core"
            tooltipZoom="1"
            content={
              <div style={{ fontSize: "10px", padding: "10px 5px 10px 5px" }}>
                Order Count
              </div>
            }
          >
            <img
              className={ButtonImg}
              src="/assets/img/order-tracking.png"
              height="15px"
              width="15px"
            />
          </Tooltip>
          <p style={{ paddingLeft: "4px" }}>{orderCount}</p>
        </button>

        <div
          className={Separator}
          style={assignInlineVars({ [separatorColorVar]: "grey" })}
        />

        <button className={Btns}>
          <Tooltip
            disableStyleInjection="core"
            tooltipZoom="1"
            content={
              <div style={{ fontSize: "10px", padding: "10px 5px 10px 5px" }}>
                No of Customer
              </div>
            }
          >
            <img
              className={ButtonImg}
              src="/assets/img/people.png"
              height="15px"
              width="15px"
            />
          </Tooltip>
          <p style={{ paddingLeft: "4px" }}>{cutCount}</p>
        </button>

        <div
          className={Separator}
          style={assignInlineVars({ [separatorColorVar]: "grey" })}
        />

        <button className={Btns}>
          <Tooltip
            disableStyleInjection="core"
            tooltipZoom="1"
            content={
              <div style={{ fontSize: "10px", padding: "10px 5px 10px 5px" }}>
                Order Value
              </div>
            }
          >
            <img
              className={ButtonImg}
              src="/assets/img/rupee.png"
              height="15px"
              width="15px"
            />
          </Tooltip>
          <p style={{ paddingLeft: "4px" }}>{formatNumber(orderValue)}</p>
        </button>
      </div>
    </>
  );
};

export default MTOMaterialSO;
