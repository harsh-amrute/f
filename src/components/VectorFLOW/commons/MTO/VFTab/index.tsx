import { ReactNode } from "react";
import {
  sctabArea,
  sctabHeader,
  sctabHeaderLeft,
  sctabBody,
  sctabContent,
  sctabTitleBase,
  sctabTitleDim,
  sctabTitleLight,
  sctabButtonBase,
  sctabButtonActiveText,
  sctabButtonCompleted,
  sctabButtonActiveRegalblaze,
  sctabButtonActiveDefaultTheme,
  sctabButtonWithMarLeft,
  zoom08,
} from "./styles.css";
import { type MDMMasterState } from "../../../../../VectorFlow/types/MDM";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import clsx from 'clsx';

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
  isAdd?: boolean;
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
  isAdd,
}: VFTabProps) => {
  const masters = useSelector((state: RootState) => state.mdm.masters);

  const getTabStatus = (currMaster: MDMMasterState) => {
    if (
      currMaster.progress === "submitted" ||
      currMaster.progress === "editOnlineSubmitted"
    )
      return "completed";
    return activeMaster.id === currMaster.id ? "active" : currMaster.progress;
  };

  const finMasters: any = isAdd ? [masters[0]] : masters;

  const isRegal = themeUi === 'REGALBLAZE';

  return (
    <div className={sctabArea}>
      <div className={clsx(sctabHeader, zoom08)}>
        <div className={sctabHeaderLeft}>
          {finMasters.map((master:any, index:any) => {
            const status = getTabStatus(master);
            const isActive = status === "active";
            const isCompleted = status === "completed";

            const buttonClasses = clsx(
              sctabButtonBase,
              index !== 0 && sctabButtonWithMarLeft,
              isActive && sctabButtonActiveText,
              isCompleted && sctabButtonCompleted,
              isActive &&
                (isRegal
                  ? sctabButtonActiveRegalblaze
                  : sctabButtonActiveDefaultTheme)
            );

            const titleClasses = clsx(
              sctabTitleBase,
              isActive || isCompleted ? sctabTitleLight : sctabTitleDim
            );

            return (
              <div
                key={master.id}
                className={buttonClasses}
                style={{ zIndex: (masters as any)?.length - index }}
                onClick={() => onTabChange(master)}
                data-testid="tab-button"
              >
                <div className={sctabContent}>
                  <p className={titleClasses}>{master.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={sctabBody}>{children}</div>
    </div>
  );
};

export default VFTab;
