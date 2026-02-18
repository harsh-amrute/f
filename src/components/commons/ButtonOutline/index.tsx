import * as styles from "./styles.css";
interface ButtonOutlineProps {
  onChange: () => void;
  text: string;
  icon: string;
}

const ButtonOutline = ({ onChange, text, icon }: ButtonOutlineProps) => {
  const variant = icon ? "withIcon" : "noIcon";

  return (
    <button className={styles.buttonOutline[variant]} onClick={onChange}>
      {icon ? <img className={styles.imgOutline} src={`/assets/img/forced/${icon}.svg`} /> : ""}
      {text}
    </button>
  );
};

export default ButtonOutline;
