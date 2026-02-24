import * as Tab from "./style.css";
import { useState, useEffect } from "react";
import { Modal } from "../../index";
import { UsePutItemCodeChangeTye } from "../../../services/ist";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import TableItem from "./tableItem";
import { t } from "i18next";
import { SCValuePvPA, type PvKey } from "./style.css";

interface TableProps {
  data: any;
  listCheckAll: any;
  setListCheckAll: any;
  getData: () => void;
  listIdTable: any;
  isMoq: string;
  checkAllPage: boolean;
}

const Table = ({
  data,
  listCheckAll,
  setListCheckAll,
  getData,
  listIdTable,
  isMoq,
  checkAllPage,
}: TableProps) => {
  const [accept, setAccept] = useState("");
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenPause, setIsOpenPause] = useState(false);

  const [listIdTableSingle, setListIdTableSingle] = useState([] as any);
  const [listIdTablePause, setListIdTablePause] = useState([] as any);

  useEffect(() => {
    if (checkAllPage) {
      const temp = data?.map(() => true);
      setListCheckAll(temp);
    } else {
      const temp = data?.map(() => false);
      setListCheckAll(temp);
    }
  }, [data]);

  const { mutateAsync: putItemCodeChangeType } = UsePutItemCodeChangeTye();
  const onSave = () => {
    if (listIdTablePause.length > 0 && accept === "ACCEPTED") {
      const formDataPause = {
        ids: listIdTablePause,
        moq: isMoq,
        _type: "PAUSED",
      };

      putItemCodeChangeType(formDataPause, {
        onSuccess: (data: any) => {
          setListCheckAll([]);
          getData();
          setIsOpenAccept(false);
          setIsOpenReject(false);
          setIsOpenPause(false);
          if (data?.status === 400) {
            notifyError(data?.response?.msg);
          } else {
            notifySuccess(data?.data?.msg);
          }
        },
        onError: (error: any) => {
          notifyError(error.response.msg || error.message);
        },
      });
    }
    const formData = {
      ids: listIdTableSingle,
      moq: isMoq,
      _type: accept,
    };
    putItemCodeChangeType(formData, {
      onSuccess: (data: any) => {
        setListCheckAll([]);
        getData();
        setIsOpenAccept(false);
        setIsOpenReject(false);
        setIsOpenPause(false);
        if (data?.status === 400) {
          notifyError(data?.response?.msg);
        } else {
          notifySuccess(data?.data?.msg);
        }
      },
      onError: (error: any) => {
        notifyError(error.response.msg || error.message);
      },
    });
  };

  const saveOne = (type: string, listId: any) => {
    const formData = {
      ids: listId,
      moq: isMoq,
      _type: type,
    };
    putItemCodeChangeType(formData, {
      onSuccess: (data: any) => {
        setListCheckAll([]);
        getData();
        if (data?.status === 400) {
          notifyError(data?.response?.msg);
        } else {
          notifySuccess(data.data.msg);
        }
      },
      onError: (data: any) => {
        notifyError(data.error);
      },
    });
  };

  const setCheckAllTable = (status: any, i: number) => {
    const temp = [...listCheckAll];
    temp[i] = status;
    setListCheckAll(temp);
  };

  const onCloseModal = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    setIsOpenPause(false);
  };

  const onModalAccept = (
    data: string,
    listItem: any,
    listCountData: any,
    listAllAccept: boolean
  ) => {
    if (
      (listCountData.length > 0 && !listAllAccept) ||
      (listItem.length > 1 && !listAllAccept)
    ) {
      setListIdTablePause(listCountData);
      setListIdTableSingle(listItem);
      setAccept(data);
      setIsOpenAccept(true);
    } else {
      saveOne(data, listItem);
    }
  };

  const onModalReject = (
    data: string,
    listItem: any,
    listCountData: any,
    listAllPause: boolean
  ) => {
    if (
      (listCountData.length > 0 && !listAllPause) ||
      (listItem.length > 1 && !listAllPause)
    ) {
      setListIdTableSingle(listItem);
      setAccept(data);
      setIsOpenReject(true);
    } else {
      saveOne(data, listItem);
    }
  };

  const onModalPause = (
    data: string,
    listItem: any,
    listCountData: any,
    listAllReject: boolean
  ) => {
    if (
      (listCountData.length > 0 && !listAllReject) ||
      (listItem.length > 1 && !listAllReject)
    ) {
      setListIdTableSingle(listItem);
      setAccept(data);
      setIsOpenPause(true);
    } else {
      saveOne(data, listItem);
    }
  };

  const toPvKey = (v: unknown): PvKey => {
    return v === "R" || v === "G" || v === "W" ? v : "default";
  };

  const dataTable =
    data &&
    data.map((item: any, idx: number) => {
      const beforeKey: PvKey = toPvKey(item?.product?.before_col);
      const afterKey: PvKey = toPvKey(item?.product?.after_col);

      return (
        <div key={idx} className={Tab.SCTableBox} style={{ marginBottom: 30 }}>
          <div className={Tab.SCTableInformation}>
            <img
              className={Tab.SCTableImages}
              src="/assets/img/defaulimg.jpg"
              alt="logo"
              width={100}
            />
            <div className={Tab.SCTableStyle}>
              <p className={Tab.SCTableStyleText}>
                {t("pendingISTRequests.table.style")} -{" "}
                {item?.product?.generic_code}
                <span className={Tab.SCTableStyleTextSpan}>
                  {item?.product?.product_hierarchy_1} |{" "}
                  {item?.product?.product_hierarchy_2} |{" "}
                  {item?.product?.product_hierarchy_3}
                </span>
                <span className={Tab.SCTableStyleTextSpan}>
                  {item?.product?.product_hierarchy_4} |{" "}
                  <span className={Tab.SCRupeeContainer}>
                    <img
                      className={Tab.SCRupeeSign}
                      src="/assets/img/ist/rupee-icon.svg"
                    />
                    {item?.product?.price}
                  </span>
                </span>
              </p>
            </div>

            <ul className={Tab.SCTableList}>
              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.receiverROSN")}
                </p>
                <p className={Tab.SCTableItemValue}>
                  {parseFloat(item?.product?.receiver_rosn)
                    .toFixed(2)
                    .toString()}
                </p>
              </li>

              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.PvPA")}
                </p>
                <p
                  className={Tab.SCTableItemValue}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span className={SCValuePvPA[beforeKey]}>
                    {item?.product?.before_col}
                  </span>
                  <img
                    className={Tab.SCLargerSign}
                    src="/assets/img/ist/PvPA.svg"
                    alt="PvPA"
                  />
                  <span className={SCValuePvPA[afterKey]}>
                    {item?.product?.after_col}
                  </span>
                </p>
              </li>

              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.receiverLocation")}
                </p>
                <p className={Tab.SCTableItemValue}>
                  {item?.product?.receiver_wh_name}
                </p>
              </li>

              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.city")}
                </p>
                <p className={Tab.SCTableItemValue}>
                  {item?.product?.receiver_wh_city}
                </p>
              </li>

              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.locationCode")}
                </p>
                <p className={Tab.SCTableItemValue}>
                  {item?.product?.receiver_wh_code}
                </p>
              </li>

              <li className={Tab.SCTableItem}>
                <p className={Tab.SCTableItemName}>
                  {t("pendingISTRequests.table.locationType")}
                </p>
                <p className={Tab.SCTableItemValue}>
                  {item?.product?.receiver_wh_type}
                </p>
              </li>
            </ul>
          </div>

          <TableItem
            item={item}
            setListCheckAll={setCheckAllTable}
            listCheckAll={listCheckAll[idx]}
            index={idx}
            onModalAccept={onModalAccept}
            onModalReject={onModalReject}
            onModalPause={onModalPause}
            listIdTable={listIdTable}
          />
        </div>
      );
    });

  return (
    <>
      {dataTable}
      <Modal
        fileJson=""
        modalTitle={t("pendingISTRequests.modal.title")}
        modalContent={t("pendingISTRequests.modal.pause.content")}
        openModal={isOpenPause}
        closeModal={onCloseModal}
        onClickModal={() => {
          onSave();
        }}
        text={t("pendingISTRequests.modal.pause.button")}
      />
      <Modal
        fileJson=""
        modalTitle={t("pendingISTRequests.modal.title")}
        modalContent={t("pendingISTRequests.modal.reject.content")}
        openModal={isOpenReject}
        closeModal={onCloseModal}
        onClickModal={() => {
          onSave();
        }}
        text={t("pendingISTRequests.modal.reject.button")}
      />
      <Modal
        fileJson=""
        modalTitle={t("pendingISTRequests.modal.title")}
        modalContent={t("pendingISTRequests.modal.accept.content")}
        openModal={isOpenAccept}
        closeModal={onCloseModal}
        onClickModal={() => {
          onSave();
        }}
        text={t("pendingISTRequests.modal.accept.button")}
      />
    </>
  );
};
export default Table;
