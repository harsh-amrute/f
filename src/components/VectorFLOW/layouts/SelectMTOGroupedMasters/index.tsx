// SelectGroupedMasters.tsx
import VFButtonOutline from "../../../VectorFLOW/commons/VFButtonOutline";
import {
  // replaced styled-components with vanilla-extract classes
} from "./styles.css";
import * as s from "./styles.css"; // alias "s" for classes

import { useUserData } from "../../../../context";
import VFButton from "../../../VectorFLOW/commons/VFButton";
import { useState, ReactNode } from "react";
import { MDMMasterState, Option } from "../../../../VectorFlow/types/MDM";
import {
  ImageMapper,
  ImageMapperHover,
  masterGroupMapper,
} from "../../../../helpers/MtoMDMConstants";
import * as globalStyles from "../../../../styles/global";

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
    if (master.id == 7 || master.id == 8 || master.id == 9)
      return "Phase In Phase Out";
    return master.name;
  };

  const doesMasterExist = () => {
    if (master.id == 7) {
      return selectedMasters.find((m) => m.id == 7 || m.id == 8 || m.id == 9);
    }
    if (master.id == 11) {
      return selectedMasters.find((m) => m.id == 11 || m.id == 12);
    }
    return selectedMasters.find((m) => m.id == master.id);
  };

  const selectedOrHover = Boolean(doesMasterExist()) || isHovered;
  const themeKey = user.user.theme_ui as keyof typeof globalStyles.chooseThemeColor;
  const themeColor5 = globalStyles.chooseThemeColor[themeKey]?.color5;

  return (
    <div
      className={s.masterGroupCardContent}
      data-testid="vf-master-group-card"
      id={master.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleOnClickMaster(master)}
      // runtime dynamic background to match original
      style={{
        backgroundColor: selectedOrHover
          ? user.user.theme_ui === "REGALBLAZE"
            ? "rgb(252, 163, 17, 0.3)"
            : "#FCE7F2"
          : "white",
      }}
    >
      <div
        className={s.masterGroupCardImage}
        data-testid="vf-master-card-image"
        style={{
          backgroundColor: selectedOrHover ? themeColor5 : "#F4F4F4",
          border: selectedOrHover ? "white 1px solid" : "none",
        }}
      >
        <img
          src={selectedOrHover ? ImageMapperHover[master.id] : ImageMapper[master.id]}
          alt={master.name}
          height={37}
          width={37}
        />
      </div>

      <div
        className={s.masterGroupCardText}
        style={{ color: selectedOrHover ? "white" : "black" }}
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
  } = props;

  const { user } = useUserData();

  return (
    <div className={s.contentWrapper} style={{ zoom: 0.75 as any }}>
      <div className={s.textFilterWrapper}>
        <div className={s.textContainer}>
          <p>What kind of record do you want to {text}?</p>
        </div>
        {/* search control omitted (same as original) */}
      </div>

      <div className={s.masterGroupCardContainer}>
        {masterGroupMapper.map((masterGroup) => {
          if (masterGroup.masters.length < 1) return null;
          if (shouldShowMasterGroup(masterGroup)) {
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
                          handleOnClickMaster={handleOnClickMaster}
                          selectedMasters={selectedMasters}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          }
          return null;
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
