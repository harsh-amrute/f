import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { CustomCellRendererProps } from "ag-grid-react";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../context";
import Portal from "../../../components/VectorFLOW/layouts/Portal";
import {
  dropdownWrapper,
  topVar,
  leftVar,
} from "../../../components/commons/CustomDropdown/style.css";
import Checkbox from "../../../components/VectorFLOW/commons/MTO/Checkbox";
import VFButtonOutline from "../../../components/VectorFLOW/commons/VFButtonOutline";
import {
  containerDrop,
  checkboxRow,
  optionsSection,
  categoryHeader,
  subItem,
  bottomButtons,
  container,
  ImageSpan,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const RoleDropdown = ({ allRoles, width, onApplyRole, currentRoles }: any) => {
  const user = useUserData();
  const themeUi = user.user.user.theme_ui;
  // const [selected, setSelected] = useState<Set<string>>(new Set(currentRoles));

  const [selectedRoles, setSelectedRoles] = useState<Set<any>>(
    currentRoles ? currentRoles : new Set()
  );
  const addRole = (item: any) => {
    setSelectedRoles((prev) => new Set(prev).add(item));
  };
  const removeRole = (item: any) => {
    setSelectedRoles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(item);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedRoles(new Set(allRoles));
  };

  const applicationGroups = Array.from(
    new Set(allRoles.map((role: any) => role.application_name))
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(applicationGroups.map((app) => [app, true]))
  );

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={containerDrop} style={{ width: width + "px" }}>
      <div
        className={checkboxRow}
        style={{ width: "100%", cursor: "pointer" }}
        onClick={handleSelectAll}
      >
        <Checkbox
          type="checkbox"
          style={{ zoom: 0.5 }}
          theme={themeUi}
          checked={
            allRoles.length > 0 &&
            selectedRoles?.size > 0 &&
            allRoles.every((id: any) => selectedRoles?.has(id))
          }
          onClick={(e) => e.stopPropagation()} // prevent double trigger
          onChange={handleSelectAll}
        />
        <label style={{ cursor: "pointer" }}>Select all</label>
      </div>

      <div className={optionsSection}>
        {applicationGroups.map((appName: any) => {
          const roles = allRoles.filter(
            (role: any) => role.application_name === appName
          );
          return (
            <div key={appName}>
              <div
                className={categoryHeader}
                onClick={() => toggleExpand(appName)}
              >
                <span>{appName}</span>
                <span>
                  {expanded[appName] ? (
                    <img src="\assets\img\nav\arrow_down.svg"></img>
                  ) : (
                    <img src="\assets\img\mto\dayWiseCoverage\arrow_right.svg"></img>
                  )}
                </span>
              </div>
              {expanded[appName] &&
                roles.map((role: any) => (
                  <div
                    className={subItem}
                    key={role.id}
                    style={{
                      userSelect: "none",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      selectedRoles?.size > 0 && selectedRoles?.has(role)
                        ? removeRole(role)
                        : addRole(role);
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        style={{ zoom: 0.5 }}
                        theme={themeUi}
                        type="checkbox"
                        checked={
                          selectedRoles?.size > 0 && selectedRoles?.has(role)
                        }
                        onClick={(e) => e.stopPropagation()} // prevent double trigger
                        onChange={(e) =>
                          e.target.checked ? addRole(role) : removeRole(role)
                        }
                      />
                    </div>
                    <label style={{ cursor: "pointer" }}>{role.name}</label>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      <div className={bottomButtons}>
        <VFButtonOutline
          style={{ fontSize: "10px", height: "22px", width: "60px" }}
          themeUi={themeUi}
          onClick={() => setSelectedRoles(new Set())}
        >
          Clear
        </VFButtonOutline>
        <VFButton
          style={{ fontSize: "10px", height: "22px", width: "60px" }}
          themeUi={themeUi}
          onClick={() => {
            onApplyRole(selectedRoles);
          }}
        >
          Apply
        </VFButton>
      </div>
    </div>
  );
};

interface MyCellRendererProps extends CustomCellRendererProps {
  allRoles?: any[];
}

const RoleViewCellRenderer = (params: MyCellRendererProps) => {
  const user = useUserData();

  const themeUi = user.user.themeUi;
  const activeApplications: string[] = [];
  if (user.user.config_data.MTO_ACTIVE === true) {
    activeApplications.push("Orders");
  }
  if (user.user.config_data.MTA_ACTIVE === true) {
    activeApplications.push("Distribution");
  }
  const roles = params?.data?.roles
    ? [...params.data.roles].map((role) => role.name)
    : [];
  const allRoles =
    params?.allRoles?.filter((ele) => {
      return activeApplications?.some((app) => app === ele?.application_name);
    }) || [];

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
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
  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

  const onSelectClick = (e: React.MouseEvent<HTMLElement>) => {
    const { bottom, left } = params.eGridCell.getBoundingClientRect();
    setDropdownPosition({
      top: bottom + window.scrollY,
      bottom: bottom,
      left: left + window.scrollX,
    });
    setOpen(!open);
  };

  const onApplyRole = (selectedRoles: Set<any>) => {
    // const applicationName = Array.from(selectedRoles).map(item => item.application_name);
    // const permissions = params.data?.permissions;
    // if (permissions) {
    //   Object.keys(permissions).forEach(key => {
    //     if (!applicationName.includes(key)) {
    //       delete permissions[key];
    //     }
    //   });
    // }

    params.data.roles = selectedRoles;
    const isValidRoles = selectedRoles.size > 0;
    params.data.errorRole = !isValidRoles;
     // params.data.permissions = permissions;
    params.api?.refreshCells({ rowNodes: [params.node] });
    setOpen(false);
  };

  function toCssUnit(v?: string | number) {
    if (v === undefined || v === null) return "auto";
    return typeof v === "number" ? `${v}px` : v;
  }

  if (!roles || roles.length === 0) {
    return (
      <div className={container}>
        {params.data.errorRole && (
          <span className={ImageSpan}>
            <img
              style={{ width: "20px", height: "20px" }}
              src="\assets\img\error_icon.svg"
              alt=""
            />
          </span>
        )}
        <VFButton
          disabled={false}
          style={{ width: "80%", height: "25px", fontSize: "1rem" }}
          themeUi={themeUi}
          onClick={onSelectClick}
        >
          {"Select Roles"}
        </VFButton>
        {open && (
          <Portal wrapperId="checkbox-dropdown">
            <div
              className={dropdownWrapper}
              ref={dropdownRef}
              style={assignInlineVars({
                [topVar]: toCssUnit(dropdownPosition.top + "px"),
                [leftVar]: toCssUnit(dropdownPosition.left + "px"),
              })}
            >
              <RoleDropdown
                currentRoles={params.data.roles}
                onApplyRole={onApplyRole}
                allRoles={allRoles}
                width={
                  params.eGridCell.getBoundingClientRect().right -
                  params.eGridCell.getBoundingClientRect().left
                }
              ></RoleDropdown>
            </div>
          </Portal>
        )}
      </div>
    );
  }

  return (
    <div className={container}>
      <span className={ImageSpan}>
        {params.data.errorRole ? (
          <span className={ImageSpan}>
            <img
              style={{ width: "20px", height: "20px" }}
              src="\assets\img\error_icon.svg"
              alt=""
            />
          </span>
        ) : (
          <span className={ImageSpan}>
            <img
              style={{ width: "20px", height: "20px" }}
              src="\assets\img\check_list_icon.svg"
              alt=""
            />
          </span>
        )}
      </span>

      <VFButton
        disabled={false}
        style={{ width: "80%", height: "25px", fontSize: "1rem" }}
        themeUi={themeUi}
        onClick={onSelectClick}
      >
        {"View / Edit Roles"}
      </VFButton>

      {open && (
        <Portal wrapperId="checkbox-dropdown">
          <div
            className={dropdownWrapper}
            ref={dropdownRef}
            style={assignInlineVars({
              [topVar]: toCssUnit(dropdownPosition.top + "px"),
              [leftVar]: toCssUnit(dropdownPosition.left + "px"),
            })}
          >
            <RoleDropdown
              allRoles={allRoles}
              currentRoles={params.data.roles}
              onApplyRole={onApplyRole}
              width={
                params.eGridCell.getBoundingClientRect().right -
                params.eGridCell.getBoundingClientRect().left
              }
            ></RoleDropdown>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default React.memo(RoleViewCellRenderer);
