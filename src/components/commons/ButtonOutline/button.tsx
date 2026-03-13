import { CSSProperties } from "react";
import * as styles from "./styles.css";

interface ButtonOutlineStatusProps {
  onChange: () => void;
  text: string;
  icon: string;
  status: boolean;
  style?: CSSProperties;
}

const ButtonOutlineStatus = ({
  onChange,
  text,
  icon,
  status,
  style,
}: ButtonOutlineStatusProps) => {
  return (
    <button
      className={
        status
          ? styles.buttonOutlineNoIcon.active
          : styles.buttonOutlineNoIcon.inactive
      }
      onClick={onChange}
      style={style}
      data-testid="button-outline-status"
    >
      {icon ? (
        <img
          className={styles.imgOutline}
          src={`/assets/img/forced/${icon}.svg`}
        />
      ) : (
        ""
      )}
      {text}
    </button>
  );
};

export default ButtonOutlineStatus;
