import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import Portal from '../../../components/VectorFLOW/layouts/Portal';
import { DropdownWrapper } from './style';
import './styles.css'
import DropdownAccordion from './DropdownAccordian';

const CustomDropdownRenderer = (props: any) => {
  console.log(props,"props")
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({
         
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: string) => {
    setSelected(prev => {
      const updated = prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option];
      props.setValue(updated.join(', '));
      return updated;
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
      setOpen(false);
    } else {
      console.log("no ref found")
    }
  };

  useEffect(() => {
    console.log(open,"open")
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const onSelectClick = (e: React.MouseEvent<HTMLElement>) => {
    const { bottom, left } = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: bottom + window.scrollY,
      bottom: bottom,
      left: left + window.scrollX,
    });
    setOpen(!open);
  }

  return (
    <div style={{ position: 'relative', width:'100%', height:'100%' }}>
      <button style={{ width:'100%', height:'100%' }} ref={buttonRef} onClick={(e) => onSelectClick(e)}>
        {selected.length? selected: "Select Roles"}
      </button>
      {open && (
        <Portal wrapperId='checkbox-dropdown'>
          <DropdownWrapper
            ref={dropdownRef}
            topPos={dropdownPosition.top + "px"}
            leftPos={dropdownPosition.left + "px"}
          >
            {props.rolesData?.map((roles: any) => {
              return (
                <DropdownAccordion
                  roles={roles}
                  selected={selected}
                  toggleOption={toggleOption}
                />)
            })}
          </DropdownWrapper>
        </Portal>
      )}
    </div>
  );
};

export default React.memo(CustomDropdownRenderer);
