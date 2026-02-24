import { VFOverlayWrapper } from "./styles.css";

const VFOverlay = ({ children }: any) => {
  return <div className={VFOverlayWrapper}>{children}</div>;
};

export default VFOverlay;
