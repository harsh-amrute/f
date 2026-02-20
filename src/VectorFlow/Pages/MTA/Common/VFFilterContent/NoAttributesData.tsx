import React from "react";
import { useUserData } from "../../../../../context";
import { 
  noFiltersContainer,
  noFiltersIcon,
  noFiltersSubText
} from "./style.css";

interface NoAttributesFiltersProps {
  reportName: string;
}

const NoAttributesFilters: React.FC<NoAttributesFiltersProps> = ({ 
  reportName 
}) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui || "";
  
  const svgSrc = themeUi === "REGALBLAZE" 
    ? "/assets/img/MTAVFMultiFilter/no data-yellow.svg" 
    : "/assets/img/MTAVFMultiFilter/no data.svg";

  return (
    <div className={noFiltersContainer}>
      <div className={noFiltersIcon}>
        <img 
          src={svgSrc}
          alt="No Attribute Filters Available"
          width="280" 
          height="250"
        />
      </div>
      <div className={noFiltersSubText} data-theme={themeUi}>
        No SKU/Location attributes found for{" "}
        <span style={{ fontWeight: '600' }}>{reportName}</span>
      </div>
    </div>
  );
};

export default NoAttributesFilters;