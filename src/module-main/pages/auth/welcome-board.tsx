import { useTranslation } from "react-i18next";
import { LogoIcon, WelcomeText, LogoVector } from "./styles.css";

function WelcomeBoard() {
  const { t } = useTranslation();

  return (
    <div className={LogoVector}>
      <img
        className={LogoIcon}
        src="/assets/img/auth/VectorFlowLogoWhite.svg"
      />
      <h2 className={WelcomeText}>{t("loginPage.welcome")}</h2>
    </div>
  );
}

export default WelcomeBoard;
