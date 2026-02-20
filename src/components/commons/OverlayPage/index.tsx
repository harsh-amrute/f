import { SCOverlayPage } from "./style.css";

const OverlayPage = ({ onClick }: any) => {
  const handleClick = () => {
    onClick();
  };
  return <div className={SCOverlayPage} onClick={onClick} />;
};

export default OverlayPage;
