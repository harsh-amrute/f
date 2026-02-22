import * as styles from "./style.css";

interface ButtonNormalProps {
  onChange: () => void;
  text: string;
  isHide: boolean;
}

const ButtonNormal = ({ onChange, text, isHide }: ButtonNormalProps) => {
  return (
    <button
      className={`${styles.buttonNormal} ${isHide ? styles.hidden : ""}`}
      onClick={onChange} // 👈 fixed this (was onChange={() => onChange})
    >
      {text.toString().replace(/,/g, " | ")}
    </button>
  );
};

export default ButtonNormal;
