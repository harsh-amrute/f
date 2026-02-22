import { useState } from "react";
import { Wrapper, Input, Text, sliderColorVar } from "./style.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as globalStyles from '../../../styles/global'; // keep import unchanged

const ButtonToggle3State = ({ onClick }: any) => {
  const { user } = useUserData();
  const theme = user?.user?.theme_ui as keyof typeof globalStyles.chooseThemeColor | undefined;

  const [stateToggle, setStateToggle] = useState<any>({
    status: 2,
    text: "Ignore MOQ",
    moq: "All",
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    let formData: any = {};
    if (value == 1) {
      formData = { status: 1, text: "MOQ not met", moq: "False" };
    } else if (value == 2) {
      formData = { status: 2, text: "Ignore MOQ", moq: "All" };
    } else if (value == 3) {
      formData = { status: 3, text: "MOQ met", moq: "True" };
    }

    setStateToggle(formData);
    onClick(formData.moq);
  };

  const themeColor =
  (theme && globalStyles.chooseThemeColor[theme]?.color5) || '#820F4C';

  return (
    <>
    <div className={Wrapper}>
      <input
        className={Input}
        style={assignInlineVars({ [sliderColorVar]: themeColor })}
        id="custom-toggle"
        type="range"
        name="points"
        onChange={handleChange}
        min={1}
        step={1}
        max={3}
        value={stateToggle.status}
      />
      <span className={Text}>{stateToggle.text}</span>
    </div>
    </>
  );
};

export default ButtonToggle3State;
