import { useMemo, useRef, useState } from "react";
import { useSelect } from "downshift";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import {
  FilterWrapper,
  SelectSearchWrapper,
  ButtonWrapper,
  VerticalDivider,
  SelectWrapper,
  TextWrapper,
  DropDownWrapper,
  DualDropDownWrapper,
  ArroWrapper,
} from "./styles.css";
import { useUserData } from "../../../../../context";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import useDataModificationHistory from "./useDataModificationHistory";

interface Option {
  label: string;
  value: any;
}

type DownshiftSelectProps = {
  options: Option[];
  selected: Option | null;
  onChange: (selected: Option | null) => void;
  placeholder: string;
  disabled?: boolean;
  width?: string | number;
  optionsWidth?: string | number;
};

const DownshiftSelect = ({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
  width,
}: DownshiftSelectProps) => {
  const containerRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Filter options by inputValue (no exclude selected in this version to keep simplicity)
  const filteredItems = useMemo(() => {
    if (!isSearching || inputValue.trim() === "") {
      return options;
    }
    return options.filter((item) =>
      item?.label?.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options, isSearching]);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    openMenu,
    closeMenu,
  } = useSelect({
    items: filteredItems,
    selectedItem: null,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) setInputValue(selectedItem.label);
      onChange(selectedItem);
      closeMenu();
      setIsSearching(false);
    },
  });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: width || "auto" }}
    >
      <div
        {...getToggleButtonProps({ disabled })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          border: isFocused ? "1px solid black" : "1px solid hsl(0, 0%, 80%)",
          boxShadow: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 12,
          backgroundColor: disabled ? "lightgrey" : "white",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          minHeight: 38,
          boxSizing: "border-box", // Important for padding within width
          overflow: "hidden", // avoid overflow outside boundaries
        }}
        role="combobox"
        aria-haspopup="listbox"
      >
        <input
          name="downshift-input"
          id="downshift-input"
          type="text"
          value={inputValue}
          placeholder={placeholder || "Select or search..."}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsSearching(true); // user started searching
          }}
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            minWidth: 0, // allow shrinking below default
            fontSize: 12,
            cursor: disabled ? "not-allowed" : "text",
            backgroundColor: "transparent",
            paddingRight: 12,
            overflow: "hidden", // prevent input text overflow
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          aria-autocomplete="list"
          aria-controls="downshift-menu"
          aria-expanded={isOpen}
          autoComplete="off"
          disabled={disabled}
        />
        <div
          style={{
            borderLeft: "1.6px solid hsl(0, 0%, 80%)",
            height: "25px",
            marginRight: 8,
            pointerEvents: "none",
            flexShrink: 0, // prevent shrinking
          }}
        />
        <svg
          style={{
            width: 20,
            height: 20,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            pointerEvents: "none",
            color: "darkgrey",
            flexShrink: 0, // prevent shrinking
          }}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 8 10 12 14 8" />
        </svg>
      </div>

      <ul
        {...getMenuProps({ id: "downshift-menu" })}
        style={{
          listStyle: "none",
          margin: 0,
          marginTop: 4,
          padding: 0,
          maxHeight: 150,
          overflowY: "auto",
          width: "100%",
          borderLeft: isOpen ? "1px solid hsl(0, 0%, 80%)" : "none",
          borderRight: isOpen ? "1px solid hsl(0, 0%, 80%)" : "none",
          borderBottom: isOpen ? "1px solid hsl(0, 0%, 80%)" : "none",
          borderRadius: "0 0 6px 6px",
          boxShadow: isOpen ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
          position: "absolute",
          backgroundColor: "white",
          zIndex: 9999,
          display: isOpen ? "block" : "none",
          scrollbarWidth: "thin",
        }}
      >
        {isOpen && filteredItems.length === 0 && (
          <li
            style={{
              color: "#bbb",
              textAlign: "center",
              fontSize: 10,
              padding: "16px 0",
              cursor: "not-allowed",
            }}
          >
            No options
          </li>
        )}

        {isOpen &&
          filteredItems.map((item, index) => {
            const isSelected = selected?.value === item.value;
            return (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  backgroundColor: isSelected
                    ? "#BC3D80"
                    : highlightedIndex === index
                    ? "#bc3d814d"
                    : "white",
                  padding: 8,
                  cursor: disabled ? "not-allowed" : "pointer",
                  color: isSelected ? "white" : "black",
                  borderBottom:
                    index < filteredItems.length - 1
                      ? "1px solid #eee"
                      : "none",
                  userSelect: "none",
                }}
                aria-selected={highlightedIndex === index}
              >
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const DataModificationHistory = () => {
  const {
    colDefs,
    rowData,
    options,
    skuOptions,
    locOptions,
    handleChange,
    handleReset,
    // setSelectedOption,
    setSelectedSkuOption,
    setSelectedLocOption,
    selectedOption,
    selectedSkuOption,
    selectedLocOption,
    isSkuDisabled,
    isLocDisabled,
    onMasterChange,
    setRowData,
  } = useDataModificationHistory();

  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const safeOptions = Array.isArray(options) ? options : [];
  const safeSkuOptions = Array.isArray(skuOptions) ? skuOptions : [];
  const safeLocOptions = Array.isArray(locOptions) ? locOptions : [];

  return (
    <>
      <div className={FilterWrapper}>
        <div className={SelectSearchWrapper}>
          <div className={SelectWrapper}>
            <div className={TextWrapper}>
              {/* theme-based icon */}
              <img
                src={
                  theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/NMS/01-RegalBlaze.svg"
                    : "/assets/img/VectorFLOW/NMS/01.svg"
                }
                alt=""
              />
              <p>Select Master</p>
            </div>

            <div className={DropDownWrapper}>
              <DownshiftSelect
                options={safeOptions}
                selected={selectedOption ?? null}
                placeholder="Select Master"
                onChange={onMasterChange}
              />
            </div>
          </div>

          <div className={ArroWrapper}>
            <img src="/assets/img/VectorFLOW/NMS/arrow.svg" alt="" />
          </div>

          <div className={SelectWrapper}>
            <div className={TextWrapper}>
              <img
                src={
                  theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/NMS/02-RegalBlaze.svg"
                    : "/assets/img/VectorFLOW/NMS/02.svg"
                }
                alt=""
                style={{ marginLeft: "-20px" }}
              />
              <p>Search Key</p>
            </div>

            <div className={DualDropDownWrapper}>
              <DownshiftSelect
                options={safeSkuOptions}
                selected={selectedSkuOption ?? null}
                placeholder="Select SKU Code"

                onChange={(v: any) => {
                  setSelectedSkuOption(v);
                  setRowData([]);
                }}
                disabled={isSkuDisabled()}
                width="170px"
                optionsWidth="170px"
              />
              <DownshiftSelect
                options={safeLocOptions}
                selected={selectedLocOption ?? null}
                placeholder="Select Location"

                onChange={(v: any) => {
                  setSelectedLocOption(v);
                  setRowData([]);
                }}
                disabled={isLocDisabled()}
                width="170px"
                optionsWidth="170px"
              />
            </div>
          </div>
        </div>

        <div className={VerticalDivider} />

        <div className={ButtonWrapper}>
          <VFButton
            onClick={handleChange}
            themeUi={theme_ui}
            style={{ fontSize: "12px", height: "40px" }}
          >
            Submit
          </VFButton>
          <VFButtonOutline
            onClick={handleReset}
            themeUi={theme_ui}
            style={{ fontSize: "12px", height: "40px" }}
          >
            Reset
          </VFButtonOutline>
        </div>
      </div>

      <VFTable
        columnDefs={colDefs}
        rowData={rowData}
        enableRangeSelection={true}
        pagination={true}
        rowSelection="multiple"
        statusBar={{
          statusPanels: [
            {
              statusPanel: "agTotalAndFilteredRowCountComponent",
              align: "left",
            },
            { statusPanel: "agTotalRowCountComponent", align: "left" },
            { statusPanel: "agFilteredRowCountComponent", align: "left" },
            { statusPanel: "agSelectedRowCountComponent", align: "left" },
            { statusPanel: "agAggregationComponent", align: "left" },
          ],
        }}
        height={"70%"}
      />
    </>
  );
};

export default DataModificationHistory;
