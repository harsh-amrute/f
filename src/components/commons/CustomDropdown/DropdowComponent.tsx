
import { DropdownWrapper } from "./style";
import DropdownTopSection from "./DropdownTopSection";
import DropdownAccordion from "./DropdownAccordian";
import DropdowBottomSection from "./DropdowBottomSection";
import { CSSProperties } from "styled-components";

interface DropdowComponentProps {
    dropdownPosition: { top: string|number|undefined; left: string|number|undefined,bottom: string|number|undefined; } | CSSProperties;
    dropdownRef: React.RefObject<HTMLDivElement>;
    selected: string[];
    toggleOption: (option: any) => void;
    rolesData: any[];
    clearAll: () => void;
    selectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleApply: () => void;
    isSelectAll : boolean;
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
    <DropdownWrapper
      ref={dropdownRef}
      topPos={dropdownPosition.top + "px"}
      leftPos={dropdownPosition.left + "px"}
    >
      <DropdownTopSection selectAll={selectAll} isSelectAll={isSelectAll} />
      {rolesData.map((roles: any) => {
        return (
          <DropdownAccordion
            key={roles.id}
            roles={roles}
            selected={selected}
            toggleOption={toggleOption}
          />
        );
      })}
      <DropdowBottomSection clearAll={clearAll} handleApply={handleApply} />
    </DropdownWrapper>
  );
}

export default DropdowComponent;
