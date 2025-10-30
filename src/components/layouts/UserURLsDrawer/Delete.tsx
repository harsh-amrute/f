import {
  primaryButton,
  secondaryButton,
} from "../../commons/styled/index.css";
import {
  urlsForm,
  buttonsWrapper,
  buttonsRight,
  confirmTitle,
  focusOutlineVar
} from "./styles.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

const DeleteUrl = (props: { onSuccess: () => void; onFailure: () => void }) => {
  const { onFailure, onSuccess } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;
  const focusColor =
    globalStyles.chooseThemeColor[themeUi]?.color4 ?? "transparent";

  return (
    <form className={urlsForm}>
      <h2 className={confirmTitle}>Are you sure you want to Delete ?</h2>
      <div className={`${buttonsWrapper} ${buttonsRight}`}>
        <button className={secondaryButton} type="button" style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
 onClick={onFailure}>
          Cancel
        </button>
        <button className={primaryButton} type="button" style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
 onClick={onSuccess}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default DeleteUrl;
