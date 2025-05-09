import React, { useRef, useEffect, useState } from 'react';
import './styles.css'

const DropdownAccordion = ({roles,selected,toggleOption}:any) => {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = () => {
    setOpen(detailsRef.current?.open ?? false);
  };

  return (
    <details
      className={`custom-details ${open ? 'open' : ''}`}
      ref={detailsRef}
      onToggle={handleToggle}
    >
      <summary className="custom-summary">
        {roles.title}
        <span className="arrow">
          {open ?
            <img
              src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
              style={{height: "5px", transform: "rotate(180deg)" }}
            />
            : <img
              src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
              style={{ height: "5px" }}
            />
          }
        </span>
      </summary>
       
      <div>
        {roles.child?.map((child: any) => (
          <label key={child.application_id} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selected.includes(child.id)}
              onChange={() => toggleOption(child.id)}
            />
            {child.description}
          </label>
        ))}
      </div>
    </details>
  );
};

export default DropdownAccordion;
