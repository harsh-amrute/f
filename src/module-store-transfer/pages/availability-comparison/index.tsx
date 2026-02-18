import * as s from "./styles.css";

import { useRef, useState } from "react";
import {
  ButtonOutlineAvailability,
  AvailabilityActiveTab,
  ModalAvailabilityComparison,
} from "../../../components";

import { AvailabilityComparisonService } from "../../../module-store-transfer/services/AvailabilityComparison/api";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useTranslation } from "react-i18next";
import LcnFilter from "./location-filter";
import PrdFilter from "./product-filter";
import { useUserData } from "../../../context";

const Availability = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [filterStyle, setFilterStyle] = useState<boolean>(true);

  const [executeFilter, setExecuteFilter] = useState<number>(
    new Date().getTime()
  );
  const [dataTable, setDataTable] = useState<any>([]);
  const [openModalExport, setOpenModalExport] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string>("store");

  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [exportInprogress, setExportInprogress] = useState<boolean>(false);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    setExecuteFilter(new Date().getTime());
  };

  const locationFilterRef = useRef<any>();
  const productFilterRef = useRef<any>();

  const resetFilter = () => {
    productFilterRef.current?.resetFilter();

    locationFilterRef.current?.resetFilter();

    setExecuteFilter(new Date().getTime());
  };

  const handleExport = async (data: any) => {
    const { ISTLocGrp, region, cluster, locPerfGrp } =
      // eslint-disable-next-line no-unsafe-optional-chaining
      locationFilterRef.current?.getLocationFilterValue();
    const { brand, subBrand, category } =
      // eslint-disable-next-line no-unsafe-optional-chaining
      productFilterRef.current?.getProductFilterValue();
    await new Promise<void>((resolve) => {
      AvailabilityComparisonService.exportViewData(
        { brand, subBrand, category },
        { ISTLocGrp, region, cluster, locPerfGrp },
        activeTab,
        filterStyle,
        data
      )
        .then((resp: any) => {
          const blob = new Blob([resp.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const tab =
            activeTab === "store"
              ? "StoreLevel"
              : activeTab === "sub-brand"
              ? "SubBrandLevel"
              : "CategoryLevel";
          link.setAttribute("download", `${tab}_${new Date().getTime()}.xlsx`);
          document.body.appendChild(link);
          link.click();
          // remove the element
          link.parentNode?.removeChild(link);
          // revoke the object URL to avoid memory leaks
          URL.revokeObjectURL(url);
          notifySuccess(t("availabilityComparison.notify.exportSuccess"));
        })
        .catch((error) => {
          console.log(error);
          notifyError(t("availabilityComparison.notify.exportError"));
        })
        .finally(() => {
          resolve();
        });
    });
  };

  const startExport = async (data: any) => {
    if (data.length === 0) {
      return notifyError(t("availabilityComparison.notify.noRecordsSelected"));
    }
    data = data.map((item: any) => item.split("X"));
    setExportInprogress(true);
    await handleExport(data);
    setOpenModalExport(false);
    setSelectedItem([]);
    setExportInprogress(false);
  };

  return (
    <>
      <div className={s.boxFilterSticky}>
        <div className={s.boxFilter}>
          <PrdFilter ref={productFilterRef} />
          <LcnFilter ref={locationFilterRef} />

          <div className={s.buttonFilter}>
            <button
              className={[
                s.filterBtn,
                themeUi === "REGALBLAZE"
                  ? s.filterBtnRegal
                  : s.filterBtnDefault,
              ].join(" ")}
              onClick={() => setExecuteFilter(new Date().getTime())}
            >
              {t("availabilityComparison.button.filter")}
            </button>

            <button
              className={[
                s.resetFilterBtn,
                themeUi === "REGALBLAZE"
                  ? s.resetFilterBtnRegal
                  : s.resetFilterBtnDefault,
              ].join(" ")}
              onClick={resetFilter}
            >
              {t("availabilityComparison.button.resetFilter")}
            </button>
          </div>
        </div>

        <div className={s.tabArea}>
          <div className={s.tabHeader}>
            <div className={s.tabHeaderLeft}>
              <div
                className={[
                  s.tabButton,
                  s.tabButtonZ3,
                  activeTab === "store" && s.tabButtonActive,
                  activeTab === "store" &&
                    (themeUi === "REGALBLAZE"
                      ? s.tabButtonActiveRegal
                      : s.tabButtonActiveDefault),
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => changeTab("store")}
              >
                {t("availabilityComparison.tab.storeLevel")}
              </div>

              <div
                className={[
                  s.tabButton,
                  s.tabButtonOverlap,
                  s.tabButtonZ2,
                  activeTab === "sub-brand" && s.tabButtonActive,
                  activeTab === "sub-brand" &&
                    (themeUi === "REGALBLAZE"
                      ? s.tabButtonActiveRegal
                      : s.tabButtonActiveDefault),
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => changeTab("sub-brand")}
              >
                {t("availabilityComparison.tab.subBrandLevel")}
              </div>

              <div
                className={[
                  s.tabButton,
                  s.tabButtonOverlap,
                  s.tabButtonZ1,
                  activeTab === "category" && s.tabButtonActive,
                  activeTab === "category" &&
                    (themeUi === "REGALBLAZE"
                      ? s.tabButtonActiveRegal
                      : s.tabButtonActiveDefault),
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => changeTab("category")}
              >
                {t("availabilityComparison.tab.categoryLevel")}
              </div>
            </div>

            <div className={s.tabHeaderRight}>
              <ButtonOutlineAvailability
                labelOn={t("availabilityComparison.button.pcs")}
                labelOff={t("availabilityComparison.button.style")}
                toggled={filterStyle}
                onClick={() => {
                  setFilterStyle(!filterStyle);
                  setExecuteFilter(new Date().getTime());
                }}
              />
              <button
                className={s.exportAllBoxButton}
                onClick={() => setOpenModalExport(true)}
              >
                <img
                  className={s.exportAllBoxImg}
                  src="/assets/img/forced/excel.png"
                  alt=""
                />
                <span className={s.exportAllBoxSpan}>
                  {t("availabilityComparison.button.exportSelected")}
                </span>
                <img
                  className={s.exportAllBoxImg}
                  src="/assets/img/forced/export.svg"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className={s.tabBody}>
            <AvailabilityActiveTab
              handleExport={handleExport}
              setDataTable={setDataTable}
              productFilter={productFilterRef}
              locationFilter={locationFilterRef}
              activeTab={activeTab}
              filterStyle={filterStyle}
              executeFilter={executeFilter}
            />
          </div>

          <div className={s.currentAvailability}>
            <span className={s.currentAvailabilityText}>
              {t("availabilityComparison.currentAvailability")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
