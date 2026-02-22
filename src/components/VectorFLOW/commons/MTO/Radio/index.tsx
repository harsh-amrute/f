import React, { InputHTMLAttributes } from "react";
import * as globalStyles from "../../../../../styles/global";
import { MTORadio, accentVar } from "./Radio.styled.css";
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: string;
}

const Radio = ({ theme, ...rest }: IRadioProps) => {
  const accent = globalStyles.chooseThemeColor[theme]?.color4 ?? "#BC3D81"; // sensible fallback

  return (
    <input
      type="radio"
      className={MTORadio}
      style={assignInlineVars({ [accentVar]: accent })}
      {...rest}
    />
  );
};

export default Radio;
