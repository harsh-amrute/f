import React, { Dispatch, SetStateAction, useRef } from "react";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  UploadModalWrapper,
  UploadModalSection,
  UploadBorderContainer,
  UploadModalContent,
  TextContent,
  InputWrapper,
  UploadModalInput,
  UploadModalText,
  UploadFileText,
  UploadModalRadioWrapper,
} from "./styles.css";
import {
  SCManualUploadBtn,
  SCManualUploadButton,
  SCManualUploadInput,
  scManualUploadBtnBgVar,
} from "../../../../../module-store-transfer/pages/manual-upload/styles.css";
import { useUserData } from "../../../../../context";
import * as ManualStyle from "../../../../../module-store-transfer/pages/manual-upload/styles.css";
import { notifyError } from "../../../../../helpers/notify";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface UploadModalProps {
  openModal: boolean;
  header?: string;
  onCloseModal: () => void;
  onDownload: () => void;
  onUpload: () => void;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  uploadButtonStatus: boolean;
  radioButtons?: Array<{ label: string; value: any }>;
  handleRadioButton?: (params: number) => void;
  downloadFileText?: string;
}

const UploadModal = (props: UploadModalProps) => {
  const {
    openModal,
    header,
    onCloseModal,
    onDownload,
    onUpload,
    inputText,
    setInputText,
    file,
    setFile,
    radioButtons,
    uploadButtonStatus,
    handleRadioButton,
    downloadFileText,
  } = props;

  const { user } = useUserData();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files.length < 1) {
      return;
    }

    const file = e.target.files[0];
    switch (file.type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        setFile(file);
        break;
      default:
        notifyError("Only xlsx files are accepted");
    }
  };

  return (
    <VFModalCard
      headerText={header}
      headerIcon={"/assets/img/VectorFLOW/NMS/settings.svg"}
      openModal={openModal}
      closeModal={onCloseModal}
      closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
    >
      <div className={UploadModalWrapper}>
        <div className={UploadModalSection}>
          <div className={UploadModalText}>
            <p style={{ color: "#292C2E", marginBottom: "11px" }}>
              <b>Step 1</b>
            </p>
          </div>
          <div className={UploadBorderContainer}>
            <div className={UploadModalContent}>
              <div className={TextContent}>
                <img
                  src="/assets/img/manual/excel.png"
                  height={29}
                  width={29}
                  style={{ marginBottom: "10px" }}
                />
                <p>
                  {downloadFileText
                    ? downloadFileText
                    : "Download selected data"}{" "}
                </p>
              </div>
              {radioButtons && radioButtons.length > 0 && handleRadioButton ? (
                <div className={UploadModalRadioWrapper}>
                  {radioButtons.map((r, index) => {
                    return (
                      <React.Fragment>
                        <input
                          type={"radio"}
                          placeholder={r.label}
                          key={index}
                          name="file name"
                          onClick={() => handleRadioButton(r.value)}
                          style={{ marginLeft: 15 }}
                          defaultChecked={index == 0}
                        />
                        <label htmlFor={r.label}>{r.label}</label>
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className={UploadFileText}>File Name</div>
              )}

              <div className={InputWrapper}>
                <input
                  className={UploadModalInput}
                  value={inputText}
                  onChange={(e: any) => setInputText(e.target.value)}
                  data-testid="view-modify-text"
                />
                <button
                  className={SCManualUploadBtn}
                  onClick={onDownload}
                  style={{
                    height: "30px",
                    width: "91px",
                    borderRadius: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomRightRadius: "6px",
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Roboto",
                    ...assignInlineVars({
                      [scManualUploadBtnBgVar]:
                        user.user.theme_ui === "REGALBLAZE"
                          ? "linear-gradient(180deg, #FCA311 0%, #CB830E 100%)"
                          : "linear-gradient(180deg, #BC3D81 0%, #820F4C 100%)",
                    }),
                  }}
                >
                  <img
                    src="/assets/img/VectorFLOW/NMS/download.svg"
                    style={{ margin: 5 }}
                  />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={UploadModalSection} style={{ margin: 0 }}>
          <div className={UploadModalText}>
            <p style={{ color: "#292C2E", marginBottom: "11px" }}>
              <b>Step 2</b>
            </p>
          </div>
          <div className={UploadBorderContainer}>
            <div className={UploadModalContent}>
              <div className={TextContent}>
                <img
                  src="/assets/img/manual/excel.png"
                  style={{
                    height: "29px",
                    width: "29px",
                    marginBottom: "10px",
                  }}
                />
                <p>Select your file here</p>
              </div>
              <div className={InputWrapper}>
                <button
                  className={SCManualUploadButton}
                  style={{ height: "30px", width: "105px" }}
                  onClick={handleClick}
                  data-testid="view-modify-manual-upload-btn"
                >
                  <img
                    src="/assets/img/manual/plus.png"
                    width={19}
                    height={19}
                  />
                  <input
                    className={SCManualUploadInput}
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    ref={inputRef}
                    value=""
                    data-testid="view-modify-file-upload"
                  />
                </button>
                <input
                  className={UploadModalInput}
                  placeholder="Click here to upload new file"
                  value={file?.name}
                  readOnly
                />
                <button
                  className={SCManualUploadBtn}
                  onClick={onUpload}
                  disabled={uploadButtonStatus}
                  style={{
                    height: "30px",
                    borderRadius: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "82px",
                    borderBottomRightRadius: "6px",
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Roboto",
                    ...assignInlineVars({
                      [scManualUploadBtnBgVar]:
                        user.user.theme_ui === "REGALBLAZE"
                          ? "linear-gradient(180deg, #FCA311 0%, #CB830E 100%)"
                          : "linear-gradient(180deg, #BC3D81 0%, #820F4C 100%)",
                    }),
                  }}
                >
                  <img
                    src="/assets/img/VectorFLOW/NMS/upload.svg"
                    style={{ margin: 6 }}
                  />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VFModalCard>
  );
};

export default UploadModal;
