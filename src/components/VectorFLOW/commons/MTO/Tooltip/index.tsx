import React, { useState, useRef, CSSProperties } from "react";
import Portal from "../../../../../components/VectorFLOW/layouts/Portal";
import {
  TooltipContainer,
  TooltipTarget,
  arrowLeftVar,
  zoomVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
interface IToolTipProps extends CSSProperties {
  arrowLeft: string | number;
}

const Tooltip = ({
  children,
  content,
  zoom = 1,
  style = {},
  tooltipZoom = 1,
}: any) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipPosition, setoolTipPosition] = useState<IToolTipProps | null>();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onMouseIn = (e: any) => {
    e.stopPropagation();
    setShowTooltip(true);
    //add delay so that tooltip component is rendered
    setTimeout(() => {
      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const { top, left, width } = e.target.getBoundingClientRect();
        let tooltipLeft = left + width / 2 - tooltipRect.width / 2;
        let arrowLeft: any = "50%";

        // Adjust if tooltip goes outside the viewport
        let viewportWidth = window.innerWidth;

        viewportWidth = viewportWidth * (1 / zoom) - 20;

        if (tooltipLeft < 0) {
          arrowLeft = ((left + width / 2) / tooltipRect.width) * 100 + "%"; // Adjust the arrow when tooltip is at the left edge
          tooltipLeft = 0 + 10;
        } else if (tooltipLeft + tooltipRect.width >= viewportWidth) {
          arrowLeft =
            ((left + width / 2 - (viewportWidth - tooltipRect.width)) /
              tooltipRect.width) *
              100 +
            "%"; // Adjust the arrow when tooltip is at the right edge
          tooltipLeft = viewportWidth - tooltipRect.width;
        }
        setoolTipPosition({
          top: top - tooltipRect.height - 15,
          left: tooltipLeft,
          arrowLeft: arrowLeft,
        });
      }
    }, 0);
  };
  const onMouseOut = () => setShowTooltip(false);
  const arrowLeftValue =
    typeof toolTipPosition?.arrowLeft === "number"
      ? `${toolTipPosition?.arrowLeft}px`
      : toolTipPosition?.arrowLeft ?? "50%";

  return (
    <div
      className={TooltipTarget}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      style={style}
    >
      {children}

      {showTooltip && (
        <Portal key={1} wrapperId="tooltip1">
          <div
            className={TooltipContainer}
            data-testid="tooltip"
            ref={tooltipRef}
            style={{
              top: toolTipPosition?.top,
              left: toolTipPosition?.left,
              ...assignInlineVars({
                [arrowLeftVar]: arrowLeftValue,
                [zoomVar]: String(tooltipZoom),
              }),
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Tooltip;
