import { ReactNode, useState } from "react";
import {
  SCTabArea,
  SCTabHeader,
  SCTabHeaderLeft,
  SCTabButtonBase,
  SCTabButtonMarLeft,
  SCTabButtonActiveText,
  SCTabBody,
  SCTabContent,
  SCTabTitleBase,
  SCTabTitleLight,
  TabBeforeActiveRegal,
  TabBeforeActiveDefault,
  TabBeforeCompleted,
  zoom08,
} from "./styles.css";
import { type MDMMasterState } from "../../../../VectorFlow/types/MDM";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import clsx from "clsx";
const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

interface VFTabProps {
  activeMaster: MDMMasterState;
  themeUi: string;
  onTabChange: (master: MDMMasterState) => void;
  onTabClose: (
    e: React.MouseEvent<HTMLElement>,
    master: MDMMasterState
  ) => void;
  newTabTitle?: string | undefined;
  newTabIcon?: string;
  newTabHandler?: () => void;
  children?: ReactNode;
}

const VFTab = ({
  activeMaster,
  themeUi,
  onTabChange,
  onTabClose,
  newTabTitle,
  newTabIcon,
  newTabHandler,
  children,
}: VFTabProps) => {
  const masters = useSelector((state: RootState) => state.mdm.masters);

  const getTabStatus = (currMaster: MDMMasterState) => {
    if (
      currMaster.progress === "submitted" ||
      currMaster.progress === "editOnlineSubmitted" ||
      currMaster.progress === "deleteOnlineSubmitted"
    )
      return "completed";
    return activeMaster.id === currMaster.id ? "active" : currMaster.progress;
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (master: any) => {
    if (getTabStatus(master) === "active") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getImageSrc = (master: MDMMasterState) => {
    if (isHovered && getTabStatus(master) === "active") {
      return "/assets/img/VectorFLOW/NMS/close-icon-hover.svg";
    }
    if (getTabStatus(master) === "active") {
      return "/assets/img/VectorFLOW/NMS/close-icon.svg";
    }
    if (
      master.progress === "submitted" ||
      master.progress === "editOnlineSubmitted" ||
      master.progress === "deleteOnlineSubmitted"
    ) {
      return "/assets/img/VectorFLOW/NMS/tick.svg";
    } else {
      return "/assets/img/VectorFLOW/NMS/close.svg";
    }
  };
  const isRegal = themeUi === "REGALBLAZE";

  return (
    <div className={SCTabArea}>
      <div className={clsx(SCTabHeader, zoom08)}>
        <div className={SCTabHeaderLeft}>
          {masters.map((master, index) => {
            const status = getTabStatus(master);
            const isActive = status === "active";
            const isCompleted = status === "completed";

            const buttonClass = cx(
              SCTabButtonBase,
              index !== 0 && SCTabButtonMarLeft,
              isActive && SCTabButtonActiveText,
              isActive &&
                (isRegal ? TabBeforeActiveRegal : TabBeforeActiveDefault),
              isCompleted && TabBeforeCompleted
            );

            const titleClass = cx(
              SCTabTitleBase,
              (isActive || isCompleted) && SCTabTitleLight
            );

            return (
              <div
                key={master.id}
                className={buttonClass}
                style={{ zIndex: masters.length - index }}
                onClick={() => onTabChange(master)}
                data-testid="tab-button"
              >
                <div className={SCTabContent}>
                  <p className={titleClass}>
                    {master.id == 11
                      ? "AbsoluteValueSeasonality"
                      : master.id == 12
                      ? "DeltaPercentageSeasonality"
                      : master.name}
                  </p>

                  <img
                    data-testid="tab-close"
                    onClick={(e) => {
                      onTabClose(e, master);
                    }}
                    onMouseEnter={() => handleMouseEnter(master)}
                    onMouseLeave={handleMouseLeave}
                    src={getImageSrc(master)}
                    alt="Tab Icon"
                  />
                </div>
              </div>
            );
          })}

          {/* New tab button */}
          <div
            className={cx(
              SCTabButtonBase,
              SCTabButtonMarLeft
              // default state (white ::before)
            )}
            style={{ zIndex: 0 }}
            onClick={() => {
              if (newTabHandler) newTabHandler();
            }}
            data-testid="new-tab"
          >
            <div className={SCTabContent}>
              <img style={{ marginRight: "18px" }} src={newTabIcon} />
              <p className={SCTabTitleBase}>{newTabTitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={SCTabBody}>{children}</div>
    </div>
  );
};

export default VFTab;
