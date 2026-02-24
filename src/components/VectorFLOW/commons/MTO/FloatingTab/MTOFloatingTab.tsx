import { useMemo } from "react";
import {
  floatingTabWrapper,
  floatingTabButton,
  floatingTabButtonActive,
  floatingTabButtonActiveShadow,
} from "./styles.css";

const MTOFloatingTab = () => {
  const isActive = true;

  // If you need to position the shadow under the active button, compute left/width here
  const shadowStyle = useMemo<React.CSSProperties>(() => {
    // Example static placement; replace with measured values if you have multiple tabs
    return { left: 10, width: 60 };
  }, []);

  return (
    <div className={floatingTabWrapper}>
      <button
        className={`${floatingTabButton} ${
          isActive ? floatingTabButtonActive : ""
        }`}
      >
        Press
      </button>

      <button
        className={floatingTabButtonActiveShadow}
        style={shadowStyle}
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
};

export default MTOFloatingTab;
