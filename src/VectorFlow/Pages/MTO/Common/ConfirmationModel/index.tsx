import React, { useState } from "react";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFSelect from "../../../../../../src/VectorFlow/Pages/MTO/Common/VFSelect"; 

type DownloadOptionValue = "completely_close" | "shortage" | "all";

type OptionType = {
  label: string;
  value: DownloadOptionValue;
};

type ConfirmationModelProps = {
  open: boolean;
  onClose: () => void;
  // UPDATED: Now passes option AND checked state
  onConfirm: (option: DownloadOptionValue, includeDetails: boolean) => void;
  themeUi: any;
  messageText: string;
  headerText: string;
};

const downloadOptions: OptionType[] = [
  { label: "All", value: "all" },
  { label: "Shortage", value: "shortage" },
  { label: "Completely Close", value: "completely_close" },
];

const ConfirmationModel: React.FC<ConfirmationModelProps> = ({
  open,
  onClose,
  onConfirm,
  themeUi,
  messageText,
  headerText,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  // New state for checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleConfirm = () => {
    if (selectedOption) {
      // Pass both the selected Value and the Checkbox State
      onConfirm(selectedOption.value, isChecked);
    }
  };

  return (
    <VFModalCard
      openModal={open}
      closeModal={onClose}
      headerText={headerText}
      headerIcon=""
      headerBgColor="white"
      headerTextColor="black"
      closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
      paddingLeftAndRight={27}
    >
      <div
        style={{
          fontSize: "16px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          minHeight: "125px",
        }}
      >
        {/* Dropdown Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            gap: "1rem"
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 500 }}>
            Select the excel which you want to download:
          </span>
          
          <div style={{ width: "200px" }}> 
            <VFSelect
              themeUi={themeUi}
              options={downloadOptions}
              value={selectedOption}
              onChange={(option: OptionType) => setSelectedOption(option)}
              placeholder="Select Option"
              isClearable={false}
            />
          </div>
        </div>

        {/* Checkbox + Message Row */}
        <div 
            style={{ 
                display: "flex", 
                alignItems: "center", 
                width: "100%",         
                justifyContent: "flex-start",
                gap: "10px" 
            }}
        >
            <span style={{ fontSize: "14px", fontWeight: 500 }}>
            {messageText}
          </span>
            <input 
                type="checkbox" 
                id="order-details-check"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer"
                }}
            />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "13px",
          padding: "15px 1.5rem 15px 1.5rem",
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.06)",
        }}
      >
        <VFButtonOutline
          themeUi={themeUi}
          onClick={handleConfirm}
          disabled={!selectedOption} 
          style={{
            opacity: !selectedOption ? 0.5 : 1,
            cursor: !selectedOption ? "not-allowed" : "pointer",
          }}
        >
          Yes
        </VFButtonOutline>
      </div>
    </VFModalCard>
  );
};

export default ConfirmationModel;