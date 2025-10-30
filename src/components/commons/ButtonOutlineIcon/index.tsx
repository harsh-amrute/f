import { buttonOutlineIcon, imgStyle, bgVar, accent } from "./style.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

interface ButtonOutlineIconProps {
  onClick?: () => void;
  text: string;
  icon: string;
  disabled: boolean;
}

const ButtonOutlineIcon = ({
  onClick,
  text,
  icon,
  disabled,
}: ButtonOutlineIconProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui || "default"; // fallback if undefined

  return (
    <button
      onClick={onClick}
      // className={buttonOutlineIcon(themeUi, disabled)}
      disabled={disabled}
      style={assignInlineVars({
        [bgVar]: globalStyles.white,
        [accent]: globalStyles.chooseThemeColor[themeUi]?.color5 ?? "#333",
      })}
    >
      {icon ? <img src={icon} className={imgStyle} /> : ""}
      {text.toString().replace(",", " | ")}
    </button>
  );
};

export default ButtonOutlineIcon;
