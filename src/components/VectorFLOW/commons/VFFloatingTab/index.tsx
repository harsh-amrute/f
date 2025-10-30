import { useLayoutEffect, useEffect, useState } from "react";
import { useUserData } from "../../../../context";
import {
  VFFloatingTabWrapper,
  VFFloatingTabButton,
  VFFloatingTabButtonActive,
  VFFloatingTabButtonInactive,
  VFFloatingTabButtonActiveShadow,
} from "./styles.css";
import * as globalStyles from "../../../../styles/global";

export interface VFFloatingTabItemProps {
  label: string;
  value: string;
  id: string;
}

export interface VFFloatingTabProps {
  tabs: Array<VFFloatingTabItemProps>;
  defaultTab?: number;
  handleClick?: (item: VFFloatingTabItemProps, index: number) => void;
}

interface ActiveShadowDataType {
  width: number;
  left: number;
}

const VFFloatingTab = ({ tabs, defaultTab = 0, handleClick }: VFFloatingTabProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui ?? "DEFAULT";

  const [activeIndex, setActiveIndex] = useState<number>(defaultTab);
  const [activeShadowData, setActiveShadowData] = useState<ActiveShadowDataType | null>(null);

  const measureActive = (idx: number) => {
    const targetId = tabs[idx]?.id;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    setActiveShadowData({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  useLayoutEffect(() => {
    setActiveIndex(defaultTab);
    measureActive(defaultTab);
  }, [tabs, defaultTab]);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => measureActive(activeIndex));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, tabs]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setActiveIndex(index);
    setActiveShadowData({
      left: (e.currentTarget as HTMLButtonElement).offsetLeft,
      width: (e.currentTarget as HTMLButtonElement).offsetWidth,
    });
    if (handleClick) handleClick(tabs[index], index);
  };

  // Theme color (fallbacks)
  const activeBg =
    globalStyles?.chooseThemeColor?.[themeUi]?.colorButton ??
    (themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D81");

  return (
    <div className={VFFloatingTabWrapper}>
      {activeShadowData && (
        <div
          className={VFFloatingTabButtonActiveShadow}
          style={{
            left: activeShadowData.left,
            width: activeShadowData.width,
            background: activeBg,
          }}
          aria-hidden
        />
      )}

      {tabs.map((t, index) => (
        <button
          id={t.id}
          key={t.id}
          type="button"
          onClick={(e) => onClick(e, index)}
          className={
            `${VFFloatingTabButton} ` +
            (index === activeIndex ? VFFloatingTabButtonActive : VFFloatingTabButtonInactive)
          }
          data-testid="floatingTabButton"
          aria-pressed={index === activeIndex}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default VFFloatingTab;
