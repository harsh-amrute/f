import { useTranslation } from "react-i18next";
import {
  SwapperText,
  TextInPage,
  TextAllPage,
  textAllColorVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from '../../../styles/global';

interface SelectAllPageProps {
  inPage: number;
  total: number;
  themeUi: string;
  handleAction: () => void;
  isCheckAllPage: boolean;
}

const SelectAllPage = ({
  inPage,
  total,
  themeUi,
  handleAction,
  isCheckAllPage,
}: SelectAllPageProps) => {
  const { t } = useTranslation();

  const linkColor =
    globalStyles.chooseThemeColor[
      themeUi as keyof typeof globalStyles.chooseThemeColor
    ]?.color5 ?? globalStyles.NOIRFUSION.color5;

  return (
    <div className={SwapperText}>
      <span className={TextInPage}>
        {isCheckAllPage
          ? t("pendingISTRequests.selectCheckAll.textAllPageSelected", {
              total,
            })
          : t("pendingISTRequests.selectCheckAll.textInPage", {
              in_page: inPage,
            })}
      </span>

      <span
        className={TextAllPage}
        style={assignInlineVars({ [textAllColorVar]: linkColor })}
        onClick={handleAction}
      >
        {isCheckAllPage
          ? t("pendingISTRequests.selectCheckAll.clearSelection")
          : t("pendingISTRequests.selectCheckAll.textAllPage", { total })}
      </span>
    </div>
  );
};

export default SelectAllPage;
