import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  ButtonCardContainer,
  CardButton,
  CardButtonTheme,
  bgImageVar,
} from "./styles.css";

interface ButtonCardProps {
  text: string;
  onClick: () => void;
  opacity?: string;
  themeUi: string;
}

const ButtonCard = (props: ButtonCardProps) => {
  const { onClick, text, opacity, themeUi } = props;
  const themeKey = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";

  return (
    <div
      className={ButtonCardContainer}
      style={{
        ...assignInlineVars({
          [bgImageVar]: "url(/assets/img/VectorFLOW/NMS/card-bg.svg)",
        }),
        opacity,
        visibility: opacity === "1" ? "visible" : "hidden",
      }}
    >
      <button
        className={`${CardButton} ${CardButtonTheme[themeKey]}`}
        onClick={onClick}
        data-testid="button-card"
        type="button"
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonCard;
