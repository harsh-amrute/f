import { useTranslation } from "react-i18next";
import { notifySuccess } from "../../../helpers/notify";
import { ISTStatusService } from "../../services/IstStatus/api";
import {
  SCIstStatusAddButton,
  SCIstStatusAddNew,
  SCIstStatusAddText,
  SCIstStatusFIlterBox,
  SCIstStatusInput,
  SCIstStatusLabel,
} from "./styles.css";
import { useUserData } from "../../../context";
import * as globalStyles from '../../../styles/global';

function Views(props: any) {
  const { t } = useTranslation();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const {
    currentView,
    listView,
    getViewByID,
    originalDataComponent,
    getListView,
    currentAction,
  } = props;

  const addView = async () => {
    await ISTStatusService.createView(
      `${t("ISTStatus.viewTitle")} ${listView.length + 1}`
    );
    notifySuccess(t("ISTStatus.notify.createViewSuccess"));
    await getListView();
  };

  return (
    <div className={SCIstStatusFIlterBox}>
      <div className={SCIstStatusAddNew}>
        <p className={SCIstStatusAddText}>{t("ISTStatus.viewTitle")}</p>

        {listView.length < 5 && currentAction === "edit" && (
          <button
            className={SCIstStatusAddButton}
            onClick={async () => await addView()}
          >
            +{t("ISTStatus.addViews")}
          </button>
        )}
      </div>

      <div style={{ display: "flex" }}>
        {listView.map((item: any, index: number) => (
          <div key={`${index}_${item.id}`} style={{ marginRight: "10px" }}>
            <input
              className={SCIstStatusInput}
              defaultChecked={index === 0}
              name="settingPanel"
              type="radio"
              value={item.view_name}
            />
            <label
              className={SCIstStatusLabel({
                active: currentView.id === item.id,
              })}
              // keep theme dynamic via CSS var (no change to your style.css)
              style={
                {
                  "--accent": globalStyles.chooseThemeColor[themeUi]?.color5,
                } as React.CSSProperties
              }
              onClick={() => {
                if (currentView.id !== item.id) {
                  getViewByID(item.id, originalDataComponent, item.view_name);
                }
              }}
            >
              <span>{item.view_name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Views;
