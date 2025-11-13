import { buttonFloat, Img, buttonBgVar } from "./style.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from '../../../styles/global'; // keep import

interface ButtonFloatProps {
  onClick: any
  text: string
  icon: string
  styles?: React.CSSProperties
  iconStyles?: React.CSSProperties
}

const ButtonFloat = ({
  onClick,
  text,
  icon,
  styles,
  iconStyles,
}: ButtonFloatProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const bg =
    themeUi === "REGALBLAZE"
      ? globalStyles.chooseThemeColor[themeUi]?.color5
      : "transparent linear-gradient(180deg, #bc3d81 0%, #820f4c 100%) 0% 0% no-repeat padding-box";

  return (
    <>
      <button
        onClick={onClick}
        className={buttonFloat}
        style={{
          ...assignInlineVars({ [buttonBgVar]: bg || "" }),
          ...styles,
        }}
      >
        {icon && <img src={icon} className={Img} style={iconStyles} alt="" />}
        {text && text.toString().replace(",", " | ")}
      </button>
    </>
  );
};

export default ButtonFloat;
