import React, { PropsWithChildren } from "react";
import { VFOverlayWrapper } from "./styles.css";

const VFOverlay = ({ children }: PropsWithChildren) => {
  return <div className={VFOverlayWrapper}>{children}</div>;
};

export default VFOverlay;
