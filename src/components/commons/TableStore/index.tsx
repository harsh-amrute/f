import {
  tableBox,
  tableTab,
  tableTrHeader,
  tableTh,
  tableTitle,
  tableTd,
  tableTdCenter,
  tableTrValue,
} from "./style.css";
import { ButtonOutlineStoreStatus } from "./../../index";
import {
  UsePutStoreStatus,
  useGetTotalParticulars,
} from "../../../services/store-status";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import Spinner from "../../../components/commons/Spinner";
import { useTranslation } from "react-i18next";

interface TableSore {
  listTable: any;
  refetch: any;
}
const TableStore = ({ listTable, refetch }: TableSore) => {
  const { t } = useTranslation();

  const { mutateAsync: usePutStoreStatus } = UsePutStoreStatus();
  const { refetch: refetchTablePar } = useGetTotalParticulars();

  const logState = (id: number, status: boolean) => {
    const formData = {
      id,
      movement_status: !status,
    };

    setTimeout(() => {
      usePutStoreStatus(formData, {
        onSuccess: (data) => {
          refetch();
          notifySuccess(data?.data?.msg);
          refetchTablePar();
        },
        onError: (data: any) => {
          notifyError(data.response.msg || data.message);
        },
      });
    }, 200);
  };

  return (
    <>
      {listTable ? (
        <div className={tableBox} style={{ marginBottom: 30 }}>
          <table className={tableTab}>
            <tr className={tableTrHeader}>
              <th className={tableTh}>
                <div className={tableTitle}>{t("storeStatus.table.brand")}</div>
              </th>
              <th className={tableTh}>
                <div className={tableTitle}>
                  {t("storeStatus.table.locationName")}
                </div>
              </th>
              <th className={tableTh}>
                <div className={tableTitle}>
                  {t("storeStatus.table.locationCode")}
                </div>
              </th>
              <th className={tableTh}>
                <div className={tableTitle}>{t("storeStatus.table.city")}</div>
              </th>
              <th className={tableTh}>
                <div className={tableTitle}>
                  {t("storeStatus.table.cluster")}
                </div>
              </th>
              <th className={tableTh} style={{ textAlign: "center" }}>
                {t("storeStatus.table.status")}
              </th>
            </tr>

            {listTable &&
              listTable.map((item: any) => (
                <tr className={tableTrValue} key={item?.id}>
                  <td className={tableTd}>{item?.specific_sales}</td>
                  <td className={tableTd}>{item?.wh_name}</td>
                  <td className={tableTd}>{item?.wh_code}</td>
                  <td className={tableTd}>{item?.wh_city}</td>
                  <td className={tableTd}>{item?.wh_location_group}</td>
                  <td className={tableTdCenter}>
                    <ButtonOutlineStoreStatus
                      labelOn={t("storeStatus.button.active")}
                      labelOff={t("storeStatus.button.inactive")}
                      toggled={item?.movement_status}
                      onClick={() => {
                        logState(item?.id, item?.movement_status);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default TableStore;
