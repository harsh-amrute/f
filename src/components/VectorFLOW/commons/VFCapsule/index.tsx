import { useUserData } from "../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../styles/global";
import {
  VFCapsuleButton as capsuleBtnCls,
  VFCapsuleWrapper as capsuleWrapperCls,
  wrapperBorderVar,
  btnBgVar,
  btnColorVar,
} from "./styles.css";

interface Capsule {
  label: string;
  value: string;
}

interface VFCapsuleProps {
  activeBtn: Capsule;
  capsules: Capsule[];
  handleClick: any;
}

const VFCapsule = (props: VFCapsuleProps) => {
  const { activeBtn, capsules, handleClick } = props;

  const { user } = useUserData();

  const onClick = (capsule: Capsule) => {
    handleClick(capsule);
  };

  const activeCapsule = activeBtn;

  return (
    <div
      className={capsuleWrapperCls}
      data-testid="vf-capsule"
      style={assignInlineVars({
        [wrapperBorderVar]:
          globalStyles.chooseThemeColor[user.user.theme_ui]?.color4 ?? "#ccc",
      })}
    >
      {capsules.map((c: Capsule) => {
        const isActive = c.value === activeCapsule.value;
        const theme = globalStyles.chooseThemeColor[user.user.theme_ui] || {};
        const bg = isActive ? theme.color4 ?? "#000" : "#FFFFFF";
        const fg = isActive ? "#FFFFFF" : "#8E8E8E";

        return (
          <button
            key={c.value}
            className={capsuleBtnCls}
            onClick={() => onClick(c)}
            style={assignInlineVars({
              [btnBgVar]: bg,
              [btnColorVar]: fg,
            })}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
};

export default VFCapsule;
