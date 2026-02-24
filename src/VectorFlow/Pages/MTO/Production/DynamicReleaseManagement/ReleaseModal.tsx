import { useUpdateDynamicReleaseData } from "../../../../../VectorFlow/Services/MTO/Production/DynamicReleaseManagement";
import {
  SCButton,
  buttonBgVar,
} from "../../../../../components/layouts/NavbarRight/styles.css";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import { ContentWrapper, Text } from "./DynamicReleaseManagement.styled.css";
import OverlayLoader from "../../Common/Loader";
import React, { useEffect } from "react";
import { notifyError, notifySuccess } from "../../../../../helpers/notify";
import * as globalStyles from "../../../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const EditRouteModal = ({
  onDataUpdateCallback,
  setResetReleaseCheckbox,
  rowRelase,
  order_key,
  message,
  themeUi,
  showModal,
  selectedOrders,
  setShowModal,
}: any) => {
  const {
    mutateAsync: updateDynamicReleaseData,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateDynamicReleaseData();

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Order released successfully!");
    }
    if (isError) {
      notifyError("Failed to release order!");
    }
  }, [isSuccess, isError]);

  const releaseData = async () => {
    const body: any = [];
    if (rowRelase) {
      body.push(order_key);
    } else {
      selectedOrders.forEach((e: any) => {
        body.push(e.ok);
      });
    }
    try {
      const response = await updateDynamicReleaseData(body);
      if (response.status === 200) {
        onDataUpdateCallback();
        setResetReleaseCheckbox(true);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const btnBg = globalStyles?.chooseThemeColor[themeUi]?.colorButton ?? "#000";

  return (
    <VFModalCard
      key={"key2"}
      openModal={showModal}
      closeModal={() => {
        setShowModal(false);
      }}
      headerText={"Release Orders"}
      headerIcon={""}
      closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
      paddingLeftAndRight={0}
      headerTextColor={"black"}
      backgroundColor={"f4f4f4"}
      data-testid="vfmultifilter-img"
    >
      {isLoading && <OverlayLoader message="Releasing order ..." />}
      <div className={ContentWrapper}>
        <div
          className={Text}
          style={{
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px 20px 80px",
            fontSize: "16px",
          }}
        >
          <p>Are you sure? Do you want to</p>
          <p style={{ fontWeight: "bold" }}>{message}</p>
        </div>

        <div
          style={{
            zoom: "0.7",
            display: "flex",
            justifyContent: "right",
            gap: "8px",
            borderTop: "2px dashed #A0A0A0",
            padding: "20px 20px 20px 0",
          }}
        >
          <div>
            <button
              className={SCButton}
              onClick={() => {
                setShowModal(false);
              }}
              style={{
                ...assignInlineVars({
                  [buttonBgVar]: btnBg, // sets the CSS var used by the class
                }),
                // extra inline overrides (these win if they target the same property)
                background: "white",
                color: "grey",
                border: "1px solid grey",
              }}
            >
              No, Go Back
            </button>
          </div>
          <div>
            <button
              className={SCButton}
              style={assignInlineVars({
                [buttonBgVar]: btnBg, // sets the CSS var used by the class
              })}
              onClick={releaseData}
            >
              Yes, Release
            </button>
          </div>
        </div>
      </div>
    </VFModalCard>
  );
};

export default React.memo(EditRouteModal);
