import VFButtonOutline from "../../../VectorFLOW/commons/VFButtonOutline";
import * as s from "./styles.css";
import { useUserData } from "../../../../context";
import VFButton from "../../../VectorFLOW/commons/VFButton";
import { useState, ReactNode } from "react";
import { MDMMasterState, Option } from "../../../../VectorFlow/types/MDM";
import { ImageMapper, ImageMapperHover, masterGroupMapper } from "../../../../helpers/MDMConstants";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import * as globalStyles from "../../../../styles/global";
import { useDispatch } from "react-redux";
import { FILL_SELECTED_OPTIONS } from "../../../../redux/actions/MDM";

export interface SelectGroupedMastersProps {
  onSubmit: () => void;
  onCancel: () => void;
  onHover?: ReactNode;
  handleOnClickMaster: (master: MDMMasterState) => void;
  allMasters: MDMMasterState[];
  selectedMasters: MDMMasterState[];
  text: string;
  shouldShowMasterGroup: any;
  shouldShowMaster: any;
  options: Array<Option>;
  selectedOptions: Array<Option>;
  isAdd?: boolean;
}

interface CardProps {
  master: MDMMasterState;
  handleOnClickMaster: (master: MDMMasterState) => void;
  selectedMasters: MDMMasterState[];
}

const Card = (props: CardProps) => {
  const { user } = useUserData();
  const [isHovered, setIsHovered] = useState(false);
  const { master, handleOnClickMaster, selectedMasters } = props;

  const getMasterName = (): string => {
    if (master.id == 11 || master.id == 12) return "Seasonality";
    if (master.id == 7 || master.id == 8 || master.id == 9) return "Phase In Phase Out";
    return master.name;
  };

  const doesMasterExist = () => {
    if (master.id == 7) return selectedMasters.find((m) => m.id == 7 || m.id == 8 || m.id == 9);
    if (master.id == 11) return selectedMasters.find((m) => m.id == 11 || m.id == 12);
    return selectedMasters.find((m) => m.id == master.id);
  };

  const active = Boolean(doesMasterExist()) || isHovered;
  const themeKey = user.user.theme_ui as keyof typeof globalStyles.chooseThemeColor;
  const themeColor5 = globalStyles.chooseThemeColor[themeKey]?.color5;

  return (
    <div
      data-testid="vf-master-group-card"
      className={s.masterGroupCardContent}
      id={master.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleOnClickMaster(master)}
      // dynamic background (matches original runtime logic)
      style={{
        backgroundColor: active
          ? user.user.theme_ui === "REGALBLAZE"
            ? "rgb(252, 163, 17,0.3)"
            : "#FCE7F2"
          : "white",
      }}
    >
      <div
        data-testid="vf-master-card-image"
        className={s.masterGroupCardImage}
        style={{
          backgroundColor: active ? themeColor5 : "#F4F4F4",
          border: active ? "white 1px solid" : "none",
        }}
      >
        <img
          src={active ? ImageMapperHover[master.id] : ImageMapper[master.id]}
          alt={master.name}
          height={37}
          width={37}
        />
      </div>

      <div
        className={s.masterGroupCardText}
        style={{ color: active ? "white" : "black" }}
      >
        <div key={master.name}>
          <p style={{ color: "black" }}>{getMasterName()}</p>
        </div>
      </div>
    </div>
  );
};

const SelectGroupedMasters = (props: SelectGroupedMastersProps) => {
  const {
    onSubmit,
    onCancel,
    handleOnClickMaster,
    allMasters,
    selectedMasters,
    text,
    shouldShowMasterGroup,
    shouldShowMaster,
    selectedOptions,
    options,
  } = props;

  const { user } = useUserData();
  const dispatch = useDispatch();

  const handleClick = (data: any) => {
    dispatch(FILL_SELECTED_OPTIONS(data));
  };

  function removeFromSelectedMaster(valueToRemove: any) {
    let currentUrl = window.location.href;
    const paramName = "selectedMaster";

    const regex = new RegExp(`[?&]${paramName}=([^&]*)`);
    const match = currentUrl.match(regex);

    if (match) {
      let currentValues = match[1].split(",");
      currentValues = currentValues.filter((value) => value !== valueToRemove);

      const newParamString = currentValues.length
        ? `${paramName}=${currentValues.join(",")}`
        : "";
      if (newParamString) {
        currentUrl = currentUrl.replace(regex, `${match[0][0]}${newParamString}`);
      } else {
        currentUrl = currentUrl.replace(regex, "");
        currentUrl = currentUrl.replace(/([?&])$/, "");
      }
      window.history.replaceState(null, "", currentUrl);
    }
  }

  function addToSelectedMaster(masterId: any) {
    const currentUrl = window.location.href;
    const paramName = "selectedMaster";

    const baseUrl = currentUrl.split("?")[0];
    let newUrl = currentUrl;

    const regex = new RegExp(`[?&]${paramName}=([^&]*)`);
    const match = currentUrl.match(regex);

    if (match) {
      let queryParams = match[1];
      const queryParamsArray = queryParams.split(",");
      if (!queryParamsArray.includes(masterId)) {
        queryParamsArray.push(masterId);
      }
      queryParams = queryParamsArray.join(",");
      newUrl = baseUrl + "?" + paramName + "=" + queryParams;
    } else {
      if (!currentUrl.includes("?")) {
        newUrl = baseUrl + "?" + paramName + "=" + masterId;
      } else {
        newUrl = baseUrl + window.location.search + "&" + paramName + "=" + masterId;
      }
    }

    window.history.replaceState(null, "", newUrl);
  }

  const handleClickWrapper = (m: MDMMasterState) => {
    const exists = selectedMasters.some((master) => master.id === m.id);
    exists ? removeFromSelectedMaster(m.id) : addToSelectedMaster(m.id);
    handleOnClickMaster(m);
  };

  return (
    <div className={s.contentWrapper} style={{ zoom: 'var(--default-zoom)' as any }}>
      <div className={s.textFilterWrapper}>
        <div className={s.textContainer}>
          <p>What kind of records do you want to {text}?</p>
        </div>
        <VFMasterFieldSearch
          value={selectedOptions}
          setValue={handleClick}
          options={options}
          placeholder={"Select"}
          handleListChild={() => {
            return;
          }}
          maxToShow={3}
          backgroundColor={"#FFFFFF"}
          disabled={false}
        />
      </div>

      <div className={s.masterGroupCardContainer}>
        {masterGroupMapper.map((masterGroup) => {
          if (masterGroup.masters.length < 1) return null;
          if (!shouldShowMasterGroup(masterGroup)) return null;

          return (
            <div className={s.masterGroupCard} key={masterGroup.name}>
              <div className={s.masterGroupCardHeader}>
                <div className={s.masterGroupCardHeaderText}>
                  <p>{masterGroup.name}</p>
                </div>
              </div>

              <div className={s.customScrollbar}>
                {allMasters.map((currentMaster) => {
                  if (
                    shouldShowMaster(currentMaster) &&
                    masterGroup.masters.includes(currentMaster.id.toString())
                  ) {
                    return (
                      <Card
                        key={currentMaster.id}
                        master={currentMaster}
                        handleOnClickMaster={handleClickWrapper}
                        selectedMasters={selectedMasters}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.buttonWrapper}>
        <VFButtonOutline
          onClick={onCancel}
          themeUi={user.user.theme_ui}
          style={{ marginRight: "25px" }}
        >
          Cancel
        </VFButtonOutline>
        <VFButton
          onClick={onSubmit}
          themeUi={user.user.theme_ui}
          disabled={selectedMasters.length === 0}
        >
          Submit
        </VFButton>
      </div>
    </div>
  );
};

export default SelectGroupedMasters;
