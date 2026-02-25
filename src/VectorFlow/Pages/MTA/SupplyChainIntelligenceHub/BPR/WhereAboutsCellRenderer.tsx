import { useState, CSSProperties } from "react";
import Portal from "../../../../../components/VectorFLOW/layouts/Portal";

import {
  BPRViewTableRowCell,
  WhereAboutsCell,
  WhereAboutsCellSection,
  WhereAboutsCellSectionHeader,
  WhereAboutsCellSectionValue,
  BPRViewTableToolTip,
  WhereAboutsMoreInfo,
} from "./styles.css";

import useViewPort from "../../../../../hooks/useViewPort";
import { useUserData } from "../../../../../context";

const WhereAboutsCellRenderer = ({ value }: { value: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [toolTipPosition, setoolTipPosition] = useState<CSSProperties>({});

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const { getScreenZoomValue } = useViewPort();

  const screenSize = getScreenZoomValue();

  const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const calTop = (value.remarks.length / 40) * 16;
    const { top, left } = e.currentTarget.getBoundingClientRect();
    console.log(left * screenSize);
    setoolTipPosition({
      top: top * 0.75 - calTop,
      left: left * 0.75,
    });
    setIsOpen(true);
  };

  const onMouseOut = () => setIsOpen(false);

  return (
    <div className={BPRViewTableRowCell} style={{ minWidth: 200 }}>
      <div className={WhereAboutsCell}>
        <div className={WhereAboutsCellSection}>
          <div className={WhereAboutsCellSectionHeader}>ETA -</div>
          <div className={WhereAboutsCellSectionValue}>{value.eta}</div>
        </div>
        <div className={WhereAboutsCellSection}>
          <div className={WhereAboutsCellSectionHeader}>CurrentLoc -</div>
          <div className={WhereAboutsCellSectionValue}>{value.cl}</div>
          {/* {(value.remarks && value.remarks.length>0)  && (
                        <WhereAboutsMoreInfo onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
                        {isOpen?"Hide Info":"More Info"}
                        </WhereAboutsMoreInfo>
                    )} */}
          <div
            className={WhereAboutsMoreInfo}
            style={{ color: themeUi === "REGALBLAZE" ? "#FCA311" : "#bc3d81" }}
            onMouseEnter={onMouseIn}
            onMouseLeave={onMouseOut}
          >
            {isOpen ? "Hide Info" : "More Info"}
          </div>
        </div>
      </div>
      {isOpen && value.remarks && value.remarks.length > 0 && (
        <Portal wrapperId="viewtable">
          <div
            className={BPRViewTableToolTip}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{ ...toolTipPosition }}
          >
            {value.remarks}
            {/* Stuck at the location. Will require 2 more days to reach the destination. Will keep check on it */}
          </div>
        </Portal>
      )}
    </div>
  );
};
//value.remarks && value.remarks.length>0
export default WhereAboutsCellRenderer;
