import { useRef, useState } from "react";
import { UseGetIstTotal } from "../../../module-main/services";
import * as NavStyle from "./styles.css";
// import { Tooltip } from 'react-tooltip'
// import 'react-tooltip/dist/react-tooltip.css'
import { useTranslation } from "react-i18next";
import { format_number } from "../../../helpers/utils";
import * as globalStyles from '../../../styles/global';

const Particulars = ({ themeUi }: any) => {
  const { t } = useTranslation();
  const { data: ISTTotal } = UseGetIstTotal();
  const totalPaticulars = ISTTotal?.data?.data;

  const yieldValue = totalPaticulars?.yield_value
    ? (totalPaticulars?.yield_value / 100000).toFixed(1).toString()
    : "0";
  const yieldValueTotalToday = totalPaticulars?.yield_value_total_today
    ? (totalPaticulars?.yield_value_total_today / 100000).toFixed(1).toString()
    : "0";
  const valueYieldToday = `₹${yieldValue} / ${yieldValueTotalToday} L`;
  const listCounters = [
    {
      name: t("navbar.particulars.totalISTLineItems"),
      count: `${totalPaticulars?.total_ist_line_items || 0}`,
    },
    {
      name: t("navbar.particulars.totalISTLineItemsSatisfyingMOQ"),
      count: `${totalPaticulars?.total_moq || 0}`,
    },
    {
      name: t("navbar.particulars.ISTSuggesionsIgnoredRejected"),
      count: `${totalPaticulars?.ist_suggestions_ignored_rejected || 0}`,
    },
    {
      name: t("navbar.particulars.ISTSuggestionsAccepted"),
      count: `${totalPaticulars?.ist_suggestions_accepted || 0}`,
    },
    {
      name: t("navbar.particulars.sizeSetCompletion"),
      count: `${
        totalPaticulars?.size_set_completion.toString().slice(0, 4) || 0
      }`,
    },
    {
      name: t("navbar.particulars.ISTYieldToday"),
      count: valueYieldToday,
    },
  ];

  const listColumn = [
    { name: t("navbar.particulars.tableHeader.title") },
    { name: t("navbar.particulars.tableHeader.counts") },
    { name: t("navbar.particulars.tableHeader.quantity") },
    { name: t("navbar.particulars.tableHeader.value") },
  ];

  const listPaticulars = [
    {
      paticulars: t("navbar.particulars.tableContent.totalISTLineItems"),
      counts: `${totalPaticulars?.total_ist_line_items || 0}`,
      quantity: `${totalPaticulars?.qty_ist_line_items || 0}`,
      value: `${totalPaticulars?.value_ist_line_items || 0}`,
    },
    {
      paticulars: t(
        "navbar.particulars.tableContent.totalISTLineItemsSatisfyingMOQ"
      ),
      counts: `${totalPaticulars?.total_moq || 0}`,
      quantity: `${totalPaticulars?.qty_moq || 0}`,
      value: `${totalPaticulars?.value_moq || 0}`,
    },
    {
      paticulars: t(
        "navbar.particulars.tableContent.ISTSuggesionsIgnoredRejected"
      ),
      counts: `${totalPaticulars?.ist_suggestions_ignored_rejected || 0}`,
      quantity: `${totalPaticulars?.qty_ignore || 0}`,
      value: `${totalPaticulars?.value_ignore || 0}`,
    },
    {
      paticulars: t("navbar.particulars.tableContent.ISTSuggestionsAccepted"),
      counts: `${totalPaticulars?.ist_suggestions_accepted || 0}`,
      quantity: `${totalPaticulars?.qty_accepted || 0}`,
      value: `${totalPaticulars?.value_accepted || 0}`,
    },
    {
      paticulars: t("navbar.particulars.tableContent.sizeSetCompletion"),
      counts: `${
        totalPaticulars?.size_set_completion.toString().slice(0, 4) || 0
      }`,
      quantity: `${
        totalPaticulars?.total_qty_size_set_completion.toString().slice(0, 4) ||
        0
      }`,
      value: `${
        totalPaticulars?.value_qty_size_set_completion.toString().slice(0, 4) ||
        0
      }`,
    },
  ];

  const divRef: any = useRef(null);
  const [bottomPosition, setBottomPosition] = useState<number>(0);
  const [leftPosition, setLeftPosition] = useState<number>(0);

  const formatNumber = (value: any) => {
    const dataFormat = format_number(Number(value));
    return dataFormat.digits + dataFormat.letter;
  };

  const renderToolTip = () => {
    return (
      <div>
        <table className={NavStyle.SCTableTooltip}>
          <tr style={{ borderBottom: "1px dashed #000000" }}>
            {listColumn.map((item) => (
              <th className={NavStyle.SCTableTooltipTitle}>{item.name}</th>
            ))}
          </tr>

          {listPaticulars.map((i) => (
            <tr>
              <td className={NavStyle.tdLight}>{i.paticulars}</td>
              <td className={`${NavStyle.tdCell} ${NavStyle.tdW15}`}>
                {i.counts}
              </td>
              <td className={`${NavStyle.tdCell} ${NavStyle.tdW15}`}>
                {i.quantity}
              </td>
              <td className={`${NavStyle.tdCell} ${NavStyle.tdW25}`}>
                ₹{formatNumber(i.value)}
              </td>
            </tr>
          ))}
        </table>

        <div className={NavStyle.rowFooter}>
          <p className={NavStyle.SCBenefits}>
            {t("navbar.particulars.tableContent.ISTYieldToday")}
          </p>
          <div className={NavStyle.w25Center}>
            <span>{valueYieldToday}</span>
          </div>
        </div>

        <div className={NavStyle.rowFooter}>
          <p className={NavStyle.SCBenefits}>
            {t("navbar.particulars.tableContent.ISTYYieldCumulative")}
          </p>
          <div className={NavStyle.w25Center}>
            <span>₹{yieldValueTotalToday} L</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={NavStyle.SCCount}>
      <div
        className={NavStyle.SCNavCount}
        style={
          {
            "--particularBg":
              globalStyles.chooseThemeColor[themeUi].backGroundParticular,
          } as React.CSSProperties
        }
      >
        <div
          className={NavStyle.SCNavCountHeader}
          style={
            {
              "--text":
                themeUi === "CHARCOALCHIC"
                  ? "#ffffff"
                  : globalStyles.chooseThemeColor[themeUi]?.colorText,
            } as React.CSSProperties
          }
        >
          <span>{t("navbar.particulars.title")}</span>
          <span>{t("navbar.particulars.count")}</span>
        </div>

        <ul className={NavStyle.SCNavCountList}>
          {listCounters.map((item, idx) => (
            <li
              key={idx}
              className={NavStyle.SCNavCountItem}
              style={
                {
                  "--text":
                    themeUi === "CHARCOALCHIC"
                      ? "#ffffff"
                      : globalStyles.chooseThemeColor[themeUi]?.colorText,
                } as React.CSSProperties
              }
            >
              <span>{item.name}</span>
              <span>{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={NavStyle.SCNavCountFooter}
        style={
          {
            "--particularFooterBg":
              globalStyles.chooseThemeColor[themeUi].footerParticular,
            "--footerText": themeUi === "CHARCOALCHIC" ? "#000000" : "#ffffff",
            "--tooltip-left": `${leftPosition}px`,
            "--tooltip-bottom": `${bottomPosition}px`,
          } as React.CSSProperties
        }
      >
        <p className={NavStyle.SCBenefits}>
          {t("navbar.particulars.ISTYieldCumulative")}
        </p>
        <div className={NavStyle.SCIconTooltip}>
          <img
            data-tooltip-id="yield_particulars"
            ref={divRef}
            src={`/assets/img/nav/btnTooltip${
              themeUi === "CHARCOALCHIC" ? "_black" : ""
            }.svg`}
            alt="tooltip"
            className={NavStyle.tooltipIcon}
            onMouseOver={(e) => {
              const currentPosition = e.currentTarget.getBoundingClientRect();
              const windowsHeight = window.innerHeight;
              const bottonPosition =
                windowsHeight - currentPosition.bottom + 25;
              setBottomPosition(bottonPosition);
              setLeftPosition(currentPosition.left - 25);
            }}
          />
          <span>₹{yieldValueTotalToday} L</span>
        </div>
      </div>
    </div>
  );
};

export default Particulars;
