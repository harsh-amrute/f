import React, { useRef } from "react";
import * as ManualStyle from "../../../module-store-transfer/pages/manual-upload/styles.css";
import {
  headerSection,
  headerTextFontSizeVar,
  headerTextFontWeightVar,
  headerTextStyle,
  leftCommonComUploadWrapper,
  leftCommonComWrapper,
  leftStep,
  subTextFontSizeVar,
  subTextFontWeightVar,
  subTextStyle,
} from "./style.css";
import { ButtonFloat } from "../../../components";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const FileUploadTile = ({ handleFileChange, handleUploadClick, file}: any) => {


  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  };


  return (
    
    <div className={leftCommonComWrapper}>
      <div className={leftStep}>Step 2</div>
      <div className={leftCommonComUploadWrapper}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <img
            src={"/assets/img/download.svg"}
            alt=""
            style={{ width: "4.5rem" }}
          />
          <div className={headerSection} style={{ cursor: "pointer" }}>
            <div
              className={headerTextStyle}
              style={assignInlineVars({
                [headerTextFontSizeVar]: "1.35rem",
                [headerTextFontWeightVar]: "600",
              })}
            >
              {"Upload File"}
              <p style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                {" (upto 100 users only)"}
              </p>
            </div>
            {file?.name && (
              <div
                className={subTextStyle}
                style={assignInlineVars({
                  [subTextFontSizeVar]: "1.15rem",
                  [subTextFontWeightVar]: "300",
                })}
              >{`Selected file :  ${file.name}`}</div>
            )}
            <div
              className={subTextStyle}
              style={assignInlineVars({
                [subTextFontSizeVar]: "1.15rem",
                [subTextFontWeightVar]: "bold",
              })}
            >
              {!file?.name
                ? "Click here to choose a file to upload"
                : "Click here to change file"}
            </div>
          </div>
        </div>
        {/* <SCManualUploadButton
            style={{ height: "30px", width: "105px" }}
            onClick={handleClick}
            data-testid="view-modify-manual-upload-btn"
          > */}
        <div
          style={{
            opacity: file ? "1" : "0.5",
            cursor: file ? "pointer" : "default",
          }}
        >
          <ButtonFloat
            onClick={(e: any) => {
              if (!file) return;
              handleUploadClick(e);
            }}
            text={"Upload"}
            icon={"/assets/img/VectorFLOW/NMS/upload.svg"}
            iconStyles={{height: "1.5rem"}}
            styles={{
              width: "12rem",
              height: "3rem",
              fontSize: "1rem",
              boxShadow: "0px 6px 10px rgba(33, 33, 33, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              display:"flex"
            }}
          ></ButtonFloat>
        </div>
        <input
          className={ManualStyle.SCManualUploadInput}
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          ref={inputRef}
          value=""
          style={{ display: "none" }}
          data-testid="view-modify-file-upload"
        />
        {/* </SCManualUploadButton> */}
      </div>
    </div>

  );
};

export default FileUploadTile;
