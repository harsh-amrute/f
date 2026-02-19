import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Portal from "../../../components/VectorFLOW/layouts/Portal";
import DropdowComponent from "./DropdowComponent";
// import "./styles.css";

const CustomDropdownRenderer = (props: any) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedView,setSelectedView] = useState<null|string>(null)
  const [isSelectAll, setIsSelectAll] = useState(false)


  const clearAll = ()=>{
    setSelected([]);
    setIsSelectAll(false)
    setSelectedView(null)
  }


  const handleApply = () => {
    const maxLength = 20
    let selectedLength  = 0
    
    if(selected.length === 0){
      setSelectedView(null)
    }

    for(let i = 0; i < selected.length;i++){
      selectedLength += selected[i].length
      if(selectedLength > maxLength){
        const rolesNotViewed = selected.length - i
        const view = `${selected.slice(0, i).join(",")} + ${rolesNotViewed}`
        setSelectedView(view)
        break
      }
    }

    if(selectedLength <= maxLength){
      setSelectedView(selected.join(","))
    }

    setOpen(false)
  }
  

  const selectAll = (e:React.ChangeEvent<HTMLInputElement>) => {

    if(e.target.checked){
    const allIds:string[] = []

    props.rolesData?.forEach((item:any)=>{
      allIds.push(item.id)
      if(item.subchild?.length && item.subchild !== undefined){
        item.subchild.forEach((subItem:any)=>{
          allIds.push(subItem.id)
          if(subItem.subchild?.length && subItem.subchild !== undefined){
            subItem.subchild.forEach((subSubItem:any)=>{
              allIds.push(subSubItem.id)
            })
          }
        })
      }
    })
    setSelected(allIds)
    setIsSelectAll(true)
  }else{
    setSelected([]);
    setIsSelectAll(false)
  }
  }

  const toggleOption = (options: any) => {
    if(options.subchild?.length && options.subchild !== undefined){
    setSelected((prev)=>{
      const parentId = options.id
      const childIds = options.subchild.map((item: any) => item.id)
      const allIds = [...childIds, parentId]
      const updated = prev.includes(parentId)
        ? prev.filter((sel) => !allIds.includes(sel))
        : [...prev, ...allIds];
       return updated;
    })
    }else{
    setSelected((prev) => {
      const updated = prev.includes(options.id)
        ? prev.filter((sel) => sel !== options.id)
        : [...prev, options.id];
      return updated;
    });
  }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
      if(!selectedView){
        setSelected([])
        setIsSelectAll(false)
      }
    } else {
      console.log("no ref found");
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const onSelectClick = (e: React.MouseEvent<HTMLElement>) => {
    const { bottom, left } = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: bottom + window.scrollY,
      bottom: bottom,
      left: left + window.scrollX - 10,
    });
    setOpen(!open);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} >
      <button
        style={{ width: "100%", height: "100%" }}
        ref={buttonRef}
        onClick={(e) => onSelectClick(e)}
      >
        {selectedView ? selectedView : "Select Roles"}
      </button>
      {open && (
        <Portal wrapperId="checkbox-dropdown">
          <DropdowComponent
            rolesData={props?.rolesData}
            toggleOption={toggleOption}
            selected={selected}
            dropdownPosition={dropdownPosition}
            dropdownRef={dropdownRef}
            clearAll={clearAll}
            selectAll={selectAll}
            handleApply={handleApply}
            isSelectAll={isSelectAll}
          />
        </Portal>
      )}
    </div>
  );
};

export default React.memo(CustomDropdownRenderer);
