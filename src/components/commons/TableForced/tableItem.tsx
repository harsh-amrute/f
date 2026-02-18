import { useState } from "react";
import CheckboxPendingRequest from "../Checkbox/CheckboxPendingRequest";
import Checkbox from "../Checkbox";
import ButtonOutlineCheck from "../ButtonOutlineCheck";
import {
  SCTableBox,
  SCTableInformation,
  SCTableList,
  SCTableItem,
  SCTableItemName,
  SCTableItemValue,
  SCButtonContact,
  SCImgContact,
  SCTableTab,
  SCTableTr,
  SCTableThItem,
  SCTableCheckbox,
  SCTextStyle,
  SCTableTh,
  SCTableTdDay,
  SCTableTd,
  SCButtonChecBox,
  buttonAccentVar,
} from "./style.css";
import { useTranslation } from "react-i18next";
import * as globalStyles from "../../../styles/global";

const TableItem = (props: any) => {
  const { t } = useTranslation();
  const cell = [
    t("ISTForcedClosure.table.skuCode"),
    t("ISTForcedClosure.table.size"),
    t("ISTForcedClosure.table.quantity"),
    t("ISTForcedClosure.table.status"),
    t("ISTForcedClosure.table.type"),
    t("ISTForcedClosure.table.receiverLocation"),
    t("ISTForcedClosure.table.city"),
    t("ISTForcedClosure.table.channel"),
    t("ISTForcedClosure.table.vfISTID"),
  ];
  const [checkButton, setCheckButton] = useState(false);

  const {
    item,
    index,
    listCheckAll,
    setListCheckAll,
    onClickModalTerminal,
    checkColorAge,
    contactDetail,
    listRequest,
    setListRequest,
    information,
    themeUi,
  } = props;

  const checkAllTable = () => {
    setCheckButton(!checkButton);
    setListCheckAll(!listCheckAll, index);

    if (listCheckAll) {
      const temp = item.list_items.map((i: any) => i.id);
      const newData = listRequest.filter((item: any) => !temp.includes(item));
      setListRequest(newData);
    } else {
      const newListNotGit = item.list_items.filter(
        (item: any) => item.status !== "GIT"
      );
      const temp = newListNotGit.map((i: any) => i.id);
      if (temp.length > 0) {
        const data = filterDuplicateValues([...listRequest, ...temp]);
        setListRequest([...data]);
      }
    }
  };

  const filterDuplicateValues = (listData: any) => {
    const newListData = listData.filter((item: string, index: number) => {
      return listData.indexOf(item) == index;
    });
    return newListData;
  };

  const checkValueStatus = (it: any) => {
    if (listRequest.includes(it.id)) return "1";
    return "0";
  };

  const checkTable = (id: number) => {
    const i = listRequest.findIndex((v: any) => v === id);

    const temp: any = [...listRequest];
    if (i === -1) {
      setCheckButton(!checkButton);
      temp.push(id);
    } else {
      setCheckButton(!checkButton);
      setListCheckAll(false, index);
      temp.splice(i, 1);
    }
    setListRequest(temp);

    const isCheckAll = item.list_items
      .map((i: any) => i.id)
      .every((v: any) => temp.includes(v));
    setListCheckAll(isCheckAll, index);
  };

  const checkGit = item.list_items.find((it: any) => {
    if (it.status === "APPROVED" || it.status === "ACCEPT") return true;
  });

  const CheckBoxDisabled = () => (
    <input
      className="CheckboxPendingRequest_input"
      type="text"
      disabled={true}
    />
  );

  const showStatus = (status: string) => {
    let color: any = "#000000";
    if (status === "APPROVED") color = "#7D899B";
    else if (status === "ACCEPT") color = "#000000";
    else if (status === "GIT") color = "#464E5B";

    return (
      <td className={SCTableTd}>
        <span style={{ color }}>{status}</span>
      </td>
    );
  };

  const accent =
    globalStyles.chooseThemeColor?.[themeUi]?.color5 ?? globalStyles.black; // fallback if theme missing

  return (
    <>
      <div className={SCTableBox} style={{ marginBottom: 30 }}>
        <div className={SCTableInformation}>
          <ul className={SCTableList}>
            {information(item.product).map((info: any, idx: number) => (
              <li className={SCTableItem} key={`table_${idx}`}>
                <p className={SCTableItemName}>{info.name}</p>
                <p className={SCTableItemValue}>{info.value}</p>
              </li>
            ))}
          </ul>

          <button
            className={SCButtonContact}
            // set the CSS var for border/text color
            style={{ [buttonAccentVar]: accent } as any}
            onClick={() => contactDetail(item.product.donor_wh_code)}
          >
            <img
              className={SCImgContact}
              src={`/assets/img/forced/${
                themeUi === "REGALBLAZE" ? "contact_yellow" : "contact"
              }.svg`}
              alt=""
            />
            {t("ISTForcedClosure.contactDetails")}
          </button>
        </div>

        <table className={SCTableTab}>
          <tr className={SCTableTr}>
            <th className={SCTableThItem}>
              <span className={SCTableCheckbox}>
                {checkGit ? (
                  <Checkbox
                    value={item.id}
                    defaultChecked={listCheckAll}
                    name="id"
                    onChange={() => {
                      checkAllTable();
                    }}
                  />
                ) : (
                  <CheckBoxDisabled />
                )}
              </span>
              <span className={SCTextStyle}>{t("ISTForcedClosure.age")}</span>
            </th>
            {cell.map((i: string, k: number) => (
              <th key={`head_${k}`} className={SCTableTh}>
                {i}
              </th>
            ))}
          </tr>

          {item.list_items.map((i: any, rIdx: number) => (
            <tr key={`row_${rIdx}`} className={SCTableTr}>
              <td
                className={SCTableTdDay}
                style={{ color: `${checkColorAge(i?.ageing)}` }}
              >
                {i?.status !== "GIT" ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckboxPendingRequest
                      onChange={() => {
                        checkTable(i.id);
                      }}
                      valueStatus={checkValueStatus(i)}
                      name={i.id.toString()}
                    />
                    <p>{i?.ageing + " " + t("ISTForcedClosure.days")}</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckBoxDisabled />
                    <p>{i?.ageing + " " + t("ISTForcedClosure.days")}</p>
                  </div>
                )}
              </td>

              <td className={SCTableTd}>{i?.sku_code}</td>
              <td className={SCTableTd}>{i?.variant}</td>
              <td className={SCTableTd}>{i?.quantity_to_be_moved}</td>
              {showStatus(i?.status)}
              <td className={SCTableTd}>
                {i?.product_hierarchy_1 +
                  " | " +
                  i?.product_hierarchy_2 +
                  " | " +
                  i?.product_hierarchy_3}
              </td>
              <td className={SCTableTd}>{i?.receiver_wh_name}</td>
              <td className={SCTableTd}>{i?.receiver_wh_city}</td>
              <td className={SCTableTd}>{i?.receiver_wh_subtype}</td>
              <td className={SCTableTd}>{i?.vf_ist_id}</td>
            </tr>
          ))}
        </table>

        <div className={SCButtonChecBox}>
          <ButtonOutlineCheck
            // styles={true}
            icon="deline"
            text={t("ISTForcedClosure.terminate")}
            onChange={() => onClickModalTerminal(index)}
          />
        </div>
      </div>
    </>
  );
};

export default TableItem;
