import React, { useRef, useState } from "react";
import "./styles.css";

const DropdownAccordion = ({ roles, selected, toggleOption }: any) => {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = () => {
    setOpen(detailsRef.current?.open ?? false);
  };

  const hasChildren = roles.subchild && roles.subchild.length > 0;
  const isChecked = selected.includes(roles.id);

  return (
    <details
      className={`custom-details ${open ? "open" : ""}`}
      ref={detailsRef}
      onToggle={handleToggle}
      style={{ backgroundColor: roles?.subchild?.length !== 0 ? "white" : "" }}
    >
      <summary
        className={`custom-summary ${open ? "open" : ""}`}
        style={{
          backgroundColor:
            roles?.subchild?.length !== 0 && !roles.title ? "white" : "",
            paddingRight: !roles.title && roles.subchild?.length !== 0 && open ? "2rem" : "",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: roles.title ? "1.2rem" : roles.subchild?.length === 0 || roles.subchild === undefined ? "0.9rem" : "1.1rem",
            fontWeight : roles.title ? 700 : roles.subchild?.length === 0 || roles.subchild === undefined ? 400 : 500,
          }}
          className={"truncate"}
        >
          {!("title" in roles) && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleOption(roles)}
              onClick={(e) => e.stopPropagation()} // prevent details toggle on checkbox click
            />
          )}

          {roles.title || roles.name}
        </label>
        {hasChildren && (
          <span className="arrow">
            <img
              src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
              style={{
                marginRight: "0.8rem",
                height: "5px",
                transform: open ? "rotate(180deg)" : "none",
              }}
            />
          </span>
        )}
      </summary>

        <div style={{ paddingLeft: "0.7rem"}}>
        {hasChildren &&
          roles.subchild.map((child: any) => (
            <DropdownAccordion
              key={child.id}
              roles={child}
              selected={selected}
              toggleOption={toggleOption}
            />
          ))}
        </div>
   
    </details>
  );
};

export default DropdownAccordion;
