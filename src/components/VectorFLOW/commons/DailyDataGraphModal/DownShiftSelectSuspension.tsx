import React, { useState } from "react";
import Downshift from "downshift";

interface Option {
  value: string;
  label: string;
}

interface DownshiftSelectSuspensionProps {
  suspensionOptions: Option[];
  setSuspensionType: (value: string) => void;
  themeUi: "REGALBLAZE" | "SOMETHING_ELSE";
  SCText: string;
  assignInlineVars: any;
  textFontWeightVar: string;
  textFontSizeVar: string;
}

const DownshiftSelectSuspension: React.FC<DownshiftSelectSuspensionProps> = ({
  suspensionOptions,
  setSuspensionType,
  themeUi,
  SCText,
  assignInlineVars,
  textFontWeightVar,
  textFontSizeVar,
}) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(
    suspensionOptions[0] ?? null
  );

  const getThemeColor = (type: "selected" | "hover") => {
    if (themeUi === "REGALBLAZE") {
      return type === "selected" ? "#FCA311" : "rgba(252, 163, 17, 0.3)";
    } else {
      return type === "selected" ? "#BC3D80" : "#bc3d814d";
    }
  };

  return (
    <div className="flex flex-col mb-5 text-[16px]">
      <p
        className={SCText}
        style={assignInlineVars({
          [textFontWeightVar]: "300",
          [textFontSizeVar]: "18px",
        })}
      >
        Select Suspension Type:
      </p>

      <Downshift
        selectedItem={selectedItem}
        onChange={(selection) => {
          if (selection) {
            setSelectedItem(selection);
            setSuspensionType(selection.value);
          }
        }}
        itemToString={(item) => (item ? item.label : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          selectedItem,
        }) => (
          <div className="relative">
            <button
              type="button"
              {...getToggleButtonProps()}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none"
            >
              {selectedItem ? selectedItem.label : "Select Suspension Type"}
            </button>

            <ul
              {...getMenuProps()}
              className={`absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto shadow-md ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {isOpen &&
                suspensionOptions.map((item, index) => {
                  const isSelected = selectedItem?.value === item.value;
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <li
                      key={item.value}
                      {...getItemProps({ item, index })}
                      className={`px-3 py-2 cursor-pointer ${
                        isSelected ? "text-black" : "text-gray-800"
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? getThemeColor("selected")
                          : isHighlighted
                          ? getThemeColor("hover")
                          : "white",
                      }}
                    >
                      {item.label}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default DownshiftSelectSuspension;
