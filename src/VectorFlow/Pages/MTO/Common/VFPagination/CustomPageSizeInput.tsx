import React, { useEffect, useState } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import { notifyError } from "../../../../../helpers/notify";

import {
  brandColorVar,
  customPageSizeDiv,
  pageSizeInputDiv,
  pageSizeInput,
  noArrows,
} from "./styles.css";

interface props {
  savePageSize?: any;
  userPageSize: any;
}

const CustomPageSizeInput = ({ savePageSize, userPageSize }: props) => {
  const { user } = useUserData();
  const themeUi =
    (user?.user?.theme_ui) ?? "DEFAULT";

  const [customPageSize, setCustomPageSize] = useState<number | undefined>();
  const minPageSize = 1;
  const maxPageSize = 5000;

  useEffect(() => {
    setCustomPageSize(userPageSize);
  }, [userPageSize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputValue = parseInt(e.target.value);
      setCustomPageSize(inputValue);
    } catch (e) {
      console.error(e);
    }
  };

  const validatePageSize = () => {
    if (customPageSize === undefined || isNaN(customPageSize)) {
      notifyError("Invalid page size");
    } else {
      if (customPageSize < minPageSize) {
        notifyError("Page size can not be less than " + minPageSize);
      } else if (customPageSize > maxPageSize) {
        notifyError("Page size can not exceed " + maxPageSize);
      } else {
        savePageSize && savePageSize(customPageSize);
      }
    }
  };

  return (
    <div className={customPageSizeDiv}>
      Page Size:
      <div className={pageSizeInputDiv}>
        <input
          className={`${pageSizeInput} ${noArrows}`}
          type="number"
          value={customPageSize ?? ""}
          onChange={handleChange}
          style={assignInlineVars({
            [brandColorVar]: themeUi == "REGALBLAZE" ? "#CB830E" : "#BC3D81",
          })}
          min={minPageSize}
          max={maxPageSize}
          aria-label="Custom page size"
        />
        <VFButton
          onClick={validatePageSize}
          themeUi={themeUi}
          disabled={false}
          style={{
            height: "100%",
            width: "30%",
            borderRadius: "0px 3px 3px 0px",
            boxShadow: "none",
          }}
          aria-label="Apply page size"
        >
          <img
            src="/assets/img/rightArrowHorizontal.svg"
            height={13}
            width={7}
            alt=""
          />
        </VFButton>
      </div>
    </div>
  );
};

export default CustomPageSizeInput;
