import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  IconCardContainer,
  CardText,
  CardTextTheme,
  CardIconWrapper,
  bgImageVar,
} from "./styles.css";

interface IconCardProps {
  text: string;
  iconOnMouseIn: string;
  iconOnMouseOut: string;
  onClick: () => void;
  themeUi: string;
}

const IconCard = (props: IconCardProps) => {
  const { iconOnMouseOut, text, onClick, themeUi } = props;

  const themeKey = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";

  return (
    <div
      className={IconCardContainer}
      onClick={onClick}
      data-testid="icon-card"
      style={assignInlineVars({
        [bgImageVar]: "url(/assets/img/VectorFLOW/NMS/card-bg.svg)",
      })}
    >
      <p
        className={`${CardText} ${CardTextTheme[themeKey]}`}
        data-testid="icon-card"
      >
        {text}
      </p>

      <span className={CardIconWrapper}>
        <img data-testid="icon" src={iconOnMouseOut} alt="" />
      </span>
    </div>
  );
};

export default IconCard;
