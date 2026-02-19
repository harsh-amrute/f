// index.tsx (vanilla-extract version)
import React, { CSSProperties, useState } from "react";

import {
  // classes
  CellIconLabel,
  CellIconWrapper,
  FloatingIconPostfix,
  FloatingIconWrapper,
  ViewGridCell,
  ContributionHiddenSection,
  ContributionIcon,
  ContributionWrapper,
  ContributionSection,
  ToolTipWrapper,
  InventoryToolTipContent,
  // vars
  cellBgVar,
  cellBorderVar,
  themeAccentVar,
  hiddenWidthVar,
} from "./styles.css";

import DetailToolTip from "./DetailToolTip";
import Portal from "../../../../../../components/VectorFLOW/layouts/Portal";

import { FloatingStoreDataType } from "../../../.././../types/MCGrid";
import {
  getMCGridStoreIconColor,
  getMCGridStoreImgSrc,
  storeCellColors
} from "../../../../../../helpers/utils";
import { StoreHoveredIcon, StoreIcon } from "./Icon";
import { useUserData } from "../../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";

type Props = { status: string; data: FloatingStoreDataType };

const StoreGroup: React.FC<Props> = ({ status, data }) => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const [isOpen, toggleToolTip] = useState(false);
  const [toolTipPosition, setToolTipPosition] = useState<CSSProperties>();

  const [isDetailToolTipOpen, toggleDetailToolTip] = useState(false);
  const [isContributionOpen, setIsContributionOpen] = useState(false);

  const { user } = useUserData();
  const themeUI = user.user.theme_ui;

  const borderAccent = getMCGridStoreIconColor(status);
  const inventoryStatus =
    status === "surplus"
      ? "Pull Out Surplus Inventory"
      : "Require Inventory (Pull In)";

  const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setToolTipPosition({ top: top - 40, left });
    toggleToolTip(true);
  };
  const onMouseOut = () => toggleToolTip(false);

  const onDetailMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setToolTipPosition({ top, left });
    setIsHovered2(true);
    toggleDetailToolTip(true);
  };
  const onDetailMouseOut = () => {
    setIsHovered2(false);
    toggleDetailToolTip(false);
  };

  return (
    <div
      className={ViewGridCell}
      style={assignInlineVars({
        [cellBgVar as any]: storeCellColors[status].backgroundColor,
        [cellBorderVar as any]: storeCellColors[status].border,
      })}
    >
      <div
        className={CellIconWrapper}
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        {isHovered1 ? (
          <>
            <StoreHoveredIcon value={data.initial["grid-points"]} />
            <div className={CellIconLabel}>Store Grid Points</div>
          </>
        ) : (
          <>
            <StoreIcon value={data.initial.stores} />
            <div className={CellIconLabel}>Stores</div>
          </>
        )}
      </div>

      <div
        className={FloatingIconWrapper}
        style={{ border: `solid 1px ${borderAccent}`, cursor: "pointer" }}
      >
        <div
          className={CellIconWrapper}
          onMouseEnter={onDetailMouseIn}
          onMouseLeave={onDetailMouseOut}
        >
          {isHovered2 ? (
            <>
              <StoreHoveredIcon
                color={borderAccent}
                value={data.available["grid-points"]}
              />
              <div className={CellIconLabel}>Store Grid Points</div>
            </>
          ) : (
            <>
              <StoreIcon value={data.available.stores} color={borderAccent} />
              <div className={CellIconLabel}>Stores</div>
            </>
          )}
        </div>

        <img
          className={FloatingIconPostfix}
          onMouseEnter={onMouseIn}
          onMouseLeave={onMouseOut}
          src={getMCGridStoreImgSrc(status)}
          alt=""
          draggable={false}
        />
      </div>

      <div
        className={ContributionWrapper}
        style={{
          [themeAccentVar as any]: borderAccent,
        }}
        onMouseEnter={() => setIsContributionOpen(true)}
        onMouseLeave={() => setIsContributionOpen(false)}
      >
        <div className={ContributionSection}>{data.contribution} %</div>

        <div
          className={ContributionHiddenSection}
          style={assignInlineVars({
            [hiddenWidthVar]: isContributionOpen ? "auto" : "0",
          })}
        >
          <img
            className={ContributionIcon}
            src={
              themeUI === "REGALBLAZE"
                ? "/assets/img/VectorFLOW/BPR/mc-grid-contribution-regal.svg"
                : "/assets/img/VectorFLOW/BPR/mc-grid-contribution.svg"
            }
            alt=""
            draggable={false}
          />
          <p style={{ margin: 0 }}> Contribution In Overall Gross Margin</p>
        </div>
      </div>

      {isOpen && (
        <Portal wrapperId="mc-grid">
          <div
            className={ToolTipWrapper}
            onMouseLeave={onMouseOut}
            style={{ ...toolTipPosition, transform: "translateX(-40%)" }}
          >
            <div className={InventoryToolTipContent}>{inventoryStatus}</div>
          </div>
        </Portal>
      )}

      {isDetailToolTipOpen && data.available.details && (
        <Portal wrapperId="mc-grid">
          <div
            className={ToolTipWrapper}
            onMouseLeave={() => toggleDetailToolTip(false)}
            style={{ ...toolTipPosition, transform: "translate(-30%, -100%)" }}
          >
            <DetailToolTip data={data.available.details} />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default StoreGroup;
