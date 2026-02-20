import * as Tab from "./style.css";
import CheckboxPendingRequest from "../Checkbox/CheckboxPendingRequest";
import Checkbox from "../Checkbox";
import ButtonOutlineCheck from "../ButtonOutlineCheck";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";
import { SCValuePvPA, type PvKey } from "./style.css";

const TableItem = (props: any) => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [checkButton, setCheckButton] = useState(false);
  const { item, index, listCheckAll, setListCheckAll } = props;
  const [listRequest, setListRequest] = useState([] as number[]);
  const checkAllTable = () => {
    setCheckButton(!checkButton);
    setListCheckAll(!listCheckAll, index);
  };
  const checkTable = (id: number) => {
    const i = listRequest.findIndex((i) => i === id);
    const temp: any = [...listRequest];
    if (i === -1) {
      setCheckButton(!checkButton);
      temp.push(id);
    } else {
      setCheckButton(!checkButton);
      temp.splice(i, 1);
    }
    setListRequest(temp);
  };

  useEffect(() => {
    const checkAll =
      listRequest.length ===
      item.list_items.filter((item: any) => item._type === null).length;

    setListCheckAll(checkAll, index);
  }, [listRequest]);

  useEffect(() => {
    if (!listCheckAll) {
      if (
        listRequest.length ===
        item.list_items.filter((item: any) => item._type === null).length
      ) {
        setListRequest([]);
      }
    } else {
      const temp = item.list_items
        .filter((item: any) => item._type === null)
        .map((i: any) => i.id);
      if (temp.length > 0) {
        setListRequest(temp);
      }
    }
  }, [listCheckAll]);

  const onAcceptTable = () => {
    const listAllAccept = item.list_items.length === listRequest.length;
    const tempNull = item.list_items
      .filter((item: any) => item._type === null)
      .map((i: any) => i.id);
    const resDataPause = tempNull.filter(
      (item: any) => !listRequest.includes(item)
    );
    props.onModalAccept("ACCEPTED", listRequest, resDataPause, listAllAccept);
  };
  const onPauseTable = () => {
    const listAllPause = item.list_items.length === listRequest.length;
    const tempNull = item.list_items
      .filter((item: any) => item._type === null)
      .map((i: any) => i.id);
    const listCountData = tempNull.filter(
      (item: any) => !listRequest.includes(item)
    );
    props.onModalPause("PAUSED", listRequest, listCountData, listAllPause);
  };

  const onRejectTable = () => {
    const listAllReject = item.list_items.length === listRequest.length;
    const tempNull = item.list_items
      .filter((item: any) => item._type === null)
      .map((i: any) => i.id);
    const listCountData = tempNull.filter(
      (item: any) => !listRequest.includes(item)
    );
    props.onModalReject("REJECTED", listRequest, listCountData, listAllReject);
  };

  const checkValueStatus = (item: any) => {
    switch (item._type) {
      case "ACCEPTED":
        return "3";
      case "PAUSED":
        return "2";
      case "REJECTED":
        return "-1";
      default:
        if (listRequest.includes(item.id)) {
          return "1";
        }
        return "0";
    }
  };
  const checkDisplayButtonCheck = useMemo(() => {
    const checkArray = item.list_items.filter(
      (item: any) => item._type === null
    );
    return checkArray.length > 0;
  }, [item.list_items]);

  const toPvKey = (v: unknown): PvKey => {
    return v === "R" || v === "G" || v === "W" ? v : "default";
  };

  return (
    <>
      <table className={Tab.SCTableTab} width="100%">
        <tbody>
          <tr className={Tab.SCTableTr}>
            <th
              className={Tab.SCTableTh}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className={Tab.SCTableCheckbox}>
                {checkDisplayButtonCheck ? (
                  <Checkbox
                    defaultChecked={listCheckAll}
                    name="id"
                    value={item.id}
                    onChange={() => {
                      checkAllTable();
                    }}
                  />
                ) : (
                  ""
                )}
              </span>
              {t("pendingISTRequests.table.itemCode")}
            </th>

            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.quantity")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.donorROSN")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.PvPA")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.donorLocation")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.city")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.locationCode")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.locationType")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.channel")}
            </th>
            <th className={Tab.SCTableTh}>
              {t("pendingISTRequests.table.vfISTID")}
            </th>
          </tr>

          {item.list_items.map((i: any) => (
            <tr key={i.id} className={Tab.SCTableTr}>
              <td
                className={Tab.SCTableTdItem}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className={Tab.SCTableCheckbox}>
                  <CheckboxPendingRequest
                    onChange={() => {
                      checkTable(i.id);
                    }}
                    valueStatus={checkValueStatus(i)}
                    name={i.id.toString()}
                  />
                </span>
                <span>{i?.sku_label}</span>
              </td>

              <td className={Tab.SCTableTd}>
                {String(i?.quantity_to_be_moved).padStart(2, "0")}
              </td>

              <td className={Tab.SCTableTd}>
                {String(i?.donor_rosn).slice(0, 4)}
              </td>

              <td className={Tab.SCTableTd}>
                <span className={Tab.SCWrapPvPA}>
                  <span className={SCValuePvPA[toPvKey(i?.before_col)]}>
                    {i?.before_col}
                  </span>
                  <img
                    className={Tab.SCLargerSign}
                    src="/assets/img/ist/PvPA.svg"
                    alt="PvPA"
                  />
                  <span className={SCValuePvPA[toPvKey(i?.after_col)]}>
                    {i?.after_col}
                  </span>
                </span>
              </td>

              <td className={Tab.SCTableTd}>{i?.donor_wh_name}</td>
              <td className={Tab.SCTableTd}>{i?.donor_wh_city}</td>
              <td className={Tab.SCTableTd}>{i?.donor_wh_code}</td>
              <td className={Tab.SCTableTd}>{i?.donor_wh_type}</td>
              <td className={Tab.SCTableTd}>{i?.donor_wh_subtype}</td>
              <td className={Tab.SCTableTd}>{i?.vf_ist_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {item.list_items.length > 0 && checkDisplayButtonCheck ? (
        <div className={Tab.SCButtonChecBox}>
          <ButtonOutlineCheck
            styles={
              listRequest.length > 0 && checkDisplayButtonCheck
                ? {
                    background:
                      themeUi === "REGALBLAZE" ? "#C7810E" : "#820F4C",
                  }
                : { background: "#D8D8D8", pointerEvents: "none" }
            }
            icon="accept"
            text={t("pendingISTRequests.button.accept")}
            onChange={onAcceptTable}
          />
          <ButtonOutlineCheck
            styles={
              listRequest.length > 0 && checkDisplayButtonCheck
                ? {}
                : { pointerEvents: "none" }
            }
            icon="pause"
            text={t("pendingISTRequests.button.pause")}
            onChange={onPauseTable}
          />
          <ButtonOutlineCheck
            styles={
              listRequest.length > 0 && checkDisplayButtonCheck
                ? {}
                : { pointerEvents: "none" }
            }
            icon="deline"
            text={t("pendingISTRequests.button.reject")}
            onChange={onRejectTable}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default TableItem;
