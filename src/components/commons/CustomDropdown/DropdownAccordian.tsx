import React, { useRef, useState } from "react";
import * as s from "./style.css";

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
      ref={detailsRef}
      onToggle={handleToggle}
      className={`${s.customDetails} ${
        open ? s.customDetailsState.open : s.customDetailsState.closed
      }`}
      style={{
        backgroundColor: roles?.subchild?.length !== 0 ? "white" : undefined,
      }}
    >
      <summary
        className={`${open ? s.customSummary.open : s.customSummary.closed}`}
        style={{
          backgroundColor:
            roles?.subchild?.length !== 0 && !roles.title ? "white" : undefined,
          paddingRight:
            !roles.title && roles.subchild?.length !== 0 && open
              ? "2rem"
              : undefined,
        }}
      >
        <label
          className={s.truncate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: roles.title
              ? "1.2rem"
              : roles.subchild?.length === 0 || roles.subchild === undefined
              ? "0.9rem"
              : "1.1rem",
            fontWeight: roles.title
              ? 700
              : roles.subchild?.length === 0 || roles.subchild === undefined
              ? 400
              : 500,
          }}
        >
          {!("title" in roles) && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleOption(roles)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {roles.title || roles.name}
        </label>

        {hasChildren && (
          <span className={s.arrow}>
            <img
              src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
              style={{
                marginRight: "0.8rem",
                height: 5,
                transform: open ? "rotate(180deg)" : "none",
              }}
              alt=""
            />
          </span>
        )}
      </summary>

      <div className={s.customDropdown} style={{ paddingLeft: "0.7rem" }}>
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
