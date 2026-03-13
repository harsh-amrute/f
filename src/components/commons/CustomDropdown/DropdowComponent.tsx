import { topVar, leftVar, dropdownWrapper } from "./style.css";
import DropdownTopSection from "./DropdownTopSection";
import DropdownAccordion from "./DropdownAccordian";
import DropdowBottomSection from "./DropdowBottomSection";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { CSSProperties } from "react";

interface DropdowComponentProps {
  dropdownPosition:
    | {
        top: string | number | undefined;
        left: string | number | undefined;
        bottom: string | number | undefined;
      }
    | CSSProperties;
  dropdownRef: React.RefObject<HTMLDivElement>;
  selected: string[];
  toggleOption: (option: any) => void;
  rolesData: any[];
  clearAll: () => void;
  selectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleApply: () => void;
  isSelectAll: boolean;
}

function toCssUnit(v?: string | number) {
  if (v === undefined || v === null) return "auto";
  return typeof v === "number" ? `${v}px` : v;
}

function DropdowComponent({
  dropdownPosition,
  dropdownRef,
  selected,
  toggleOption,
  rolesData,
  clearAll,
  selectAll,
  handleApply,
  isSelectAll,
}: DropdowComponentProps) {
  return (
    <div
      ref={dropdownRef}
      className={dropdownWrapper}
      style={assignInlineVars({
        [topVar]: toCssUnit(dropdownPosition?.top),
        [leftVar]: toCssUnit(dropdownPosition?.left),
      })}
      role="listbox"
      aria-multiselectable="true"
    >
      <DropdownTopSection selectAll={selectAll} isSelectAll={isSelectAll} />

      {rolesData.map((roles: any) => (
        <DropdownAccordion
          key={roles.id}
          roles={roles}
          selected={selected}
          toggleOption={toggleOption}
        />
      ))}

      <div style={{ padding: "0 8px 8px" }}>
        {/* kept your bottom section as-is */}
        {/* If it renders buttons/links you can keep it */}
        {/* @ ts-expect-error – your component props */}
        <DropdowBottomSection clearAll={clearAll} handleApply={handleApply} />
      </div>
    </div>
  );
}

export default DropdowComponent;
