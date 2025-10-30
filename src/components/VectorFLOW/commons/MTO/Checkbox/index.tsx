import React, { InputHTMLAttributes } from "react";
import { MTOCheckBox, accentVar, checkedBgVar } from "./Checkbox.styled.css";
import * as globalStyles from "../../../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: string;
}

const Checkbox = ({ theme, ...rest }: ICheckboxProps) => {
  const accent = globalStyles.chooseThemeColor[theme]?.color4 ?? "#509EE3";

  return (
    <input
      type="checkbox"
      className={MTOCheckBox}
      style={assignInlineVars({
        [accentVar]: accent,
        [checkedBgVar]: `url(${process.env.PUBLIC_URL}/assets/img/mto/dueDateQuotation/checked.svg)`,
      })}
      {...rest}
    />
  );
};

export default Checkbox;
