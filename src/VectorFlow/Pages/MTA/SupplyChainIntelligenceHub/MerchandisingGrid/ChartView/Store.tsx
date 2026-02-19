import React, { CSSProperties, useState } from "react";

import {
  CellIconLabel,
  CellIconWrapper,
  ContributionHiddenSection,
  ContributionIcon,
  ContributionSection,
  ContributionWrapper,
  FloatingIconPostfix,
  FloatingIconWrapper,
  InventoryToolTipContent,
  ToolTipWrapper,
  ViewGridCell,
  cellBgVar,
  cellBorderVar,
  themeAccentVar,
  hiddenWidthVar,
} from "./styles.css";

import { DefaultStoreDataType } from "../../../.././../types/MCGrid";
import {
  getMCGridStoreIconColor,
  getMCGridStoreImgSrc,
  storeCellColors,
} from "../../../../../../helpers/utils";
import { StoreHoveredIcon, StoreIcon } from "./Icon";
import { useUserData } from "../../../../../../context";
import Portal from "../../../../../../components/VectorFLOW/layouts/Portal";
import DetailToolTip from "./DetailToolTip";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../../styles/global";

interface StoreProps {
  type?: "floating" | "default" | "grouped";
  data: DefaultStoreDataType;
  status: string;
}

const Store = (props: StoreProps) => {
  const { type = "default", status, data } = props;

  const [toolTipPosition, setToolTipPosition] = useState<CSSProperties>();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [isContributionOpen, setIsContributionOpen] = useState<boolean>(false);

  const [isInventoryToolTipOpen, toggleInventoryToolTip] =
    useState<boolean>(false);

  const [isDetailToolTipOpen, toggleDetailToolTip] = useState<boolean>(false);

  const { user } = useUserData();

  const themeUI = user.user.theme_ui;

  const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setToolTipPosition({
      top: top - 40,
      left: left,
    });
    toggleInventoryToolTip(true);
  };
  const onDetailMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setToolTipPosition({
      top: top,
      left: left,
    });
    setIsHovered(true);
    toggleDetailToolTip(true);
  };
  const onMouseOut = () => toggleInventoryToolTip(false);

  const onDetailMouseOut = () => {
    setIsHovered(false);
    toggleDetailToolTip(false);
  };

  const inventoryStatus =
    status === "surplus"
      ? "Pull Out Surplus Inventory"
      : "Require Inventory (Pull In)";

  // ---- vanilla-extract dynamic vars ----
  const colors = storeCellColors[status]; // { backgroundColor, border }
  const themeColor5 = globalStyles.chooseThemeColor[themeUI].color5;

  const gridCellVars = assignInlineVars({
    [cellBgVar]: colors.backgroundColor,
    [cellBorderVar]: colors.border,
  });
  const contributionVars = assignInlineVars({
    [themeAccentVar]: themeColor5,
  });
  const contributionHiddenVars = assignInlineVars({
    [hiddenWidthVar]: isContributionOpen ? "auto" : "0",
  });

  if (type === "floating") {
    return (
      <div className={ViewGridCell} style={gridCellVars}>
        <div
          className={FloatingIconWrapper}
          style={{
            border: `solid 1px ${getMCGridStoreIconColor(status)}`,
            cursor: "pointer",
          }}
        >
          <div
            className={CellIconWrapper}
            onMouseEnter={onDetailMouseIn}
            onMouseLeave={onDetailMouseOut}
          >
            {isHovered ? (
              <>
                <StoreHoveredIcon
                  color={getMCGridStoreIconColor(status)}
                  value={data["grid-points"]}
                />
                <span className={CellIconLabel}>Store Grid Points</span>
              </>
            ) : (
              <>
                <StoreIcon
                  value={data.stores}
                  color={getMCGridStoreIconColor(status)}
                />
                <span className={CellIconLabel}>Stores</span>
              </>
            )}
          </div>

          <img
            className={FloatingIconPostfix}
            onMouseEnter={onMouseIn}
            onMouseLeave={onMouseOut}
            src={getMCGridStoreImgSrc(status)}
            alt=""
            aria-hidden="true"
          />
        </div>

        <div
          className={ContributionWrapper}
          style={contributionVars}
          onMouseEnter={() => setIsContributionOpen(true)}
          onMouseLeave={() => setIsContributionOpen(false)}
        >
          <p className={ContributionSection}>{data.contribution} %</p>
          <div
            className={ContributionHiddenSection}
            style={contributionHiddenVars}
          >
            <img
              className={ContributionIcon}
              src={
                themeUI === "REGALBLAZE"
                  ? "/assets/img/VectorFLOW/BPR/mc-grid-contribution-regal.svg"
                  : "/assets/img/VectorFLOW/BPR/mc-grid-contribution.svg"
              }
              alt=""
              aria-hidden="true"
            />
            <p>Contribution In Overall Gross Margin</p>
          </div>
        </div>
        {isInventoryToolTipOpen && (
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
        {isDetailToolTipOpen && data.details && (
          <Portal wrapperId="mc-grid">
            <div
              className={ToolTipWrapper}
              onMouseLeave={() => toggleDetailToolTip(false)}
              style={{ ...toolTipPosition, transform: "translate(-30%,-100%)" }}
            >
              <DetailToolTip data={data.details} />
            </div>
          </Portal>
        )}
      </div>
    );
  }
  return (
    <div className={ViewGridCell} style={gridCellVars}>
      <div
        className={CellIconWrapper}
        style={{ cursor: "pointer" }}
        onMouseEnter={onDetailMouseIn}
        onMouseLeave={onDetailMouseOut}
      >
        {isHovered ? (
          <React.Fragment>
            <StoreHoveredIcon value={data["grid-points"]} />
            <span className={CellIconLabel}>Store Grid Points</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StoreIcon value={data.stores} />
            <span className={CellIconLabel}>Stores</span>
          </React.Fragment>
        )}
      </div>
      <div
        className={ContributionWrapper}
        style={contributionVars}
        onMouseEnter={() => setIsContributionOpen(true)}
        onMouseLeave={() => setIsContributionOpen(false)}
      >
        <p className={ContributionSection}>{data.contribution} %</p>
        <div
          className={ContributionHiddenSection}
          style={contributionHiddenVars}
        >
          <img
            className={ContributionIcon}
            src={
              themeUI === "REGALBLAZE"
                ? "/assets/img/VectorFLOW/BPR/mc-grid-contribution-regal.svg"
                : "/assets/img/VectorFLOW/BPR/mc-grid-contribution.svg"
            }
          />
          <p> Contribution In Overall Gross Margin</p>
        </div>
      </div>
      {isDetailToolTipOpen && data.details && (
        <Portal wrapperId="mc-grid">
          <div
            className={ToolTipWrapper}
            onMouseLeave={() => toggleDetailToolTip(false)}
            style={{ ...toolTipPosition, transform: "translate(-30%,-100%)" }}
          >
            <DetailToolTip data={data.details} />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Store;
