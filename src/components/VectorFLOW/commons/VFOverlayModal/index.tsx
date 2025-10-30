import React, { useEffect, useRef, useState } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  Overlay,
  ModalCard,
  Content,
  overlayLeftVar,
  overlayWidthVar,
} from "./style.css";

type VFModalCardProps = {
  openModal: boolean;
  children: React.ReactNode;
  parentSelector?: string; // CSS selector for your parent container
};

const VFOverlayModal: React.FC<VFModalCardProps> = ({
  openModal,
  children,
  parentSelector = "#main-content", // default selector for parent
}) => {
  const [dimensions, setDimensions] = useState({
    left: 0,
    width: window.innerWidth,
  });

  useEffect(() => {
    const parentEl = document.querySelector(parentSelector);
    if (!parentEl) return;

    const updatePosition = () => {
      const rect = parentEl.getBoundingClientRect();
      setDimensions({ left: rect.left, width: rect.width });
    };

    // Initial position
    updatePosition();

    // Listen to resize changes in parent
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(parentEl);

    // Also listen for window resize
    window.addEventListener("resize", updatePosition);

    // return () => {
    //   resizeObserver.disconnect();
    //   window.removeEventListener("resize", updatePosition);
    // };
  }, [parentSelector]);

  if (!openModal) return null;

  return (
    <div
      className={Overlay}
      style={assignInlineVars({
        [overlayLeftVar]: `${dimensions.left}px`,
        [overlayWidthVar]: `${dimensions.width + 40}px`,
      })}
    >
      <div className={ModalCard} onClick={(e) => e.stopPropagation()}>
        <div className={Content}>{children}</div>
      </div>
    </div>
  );
};

export default VFOverlayModal;
