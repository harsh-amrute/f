import React, { useEffect, useRef, useState } from "react";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import styled, { CSSProperties } from "styled-components";
import Portal from "../../../components/VectorFLOW/layouts/Portal";
import { DropdownWrapper } from "../../../components/commons/CustomDropdown/style";
import { SCGoBackContainer, SCGoBackText } from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/styles";
import { GridRef } from "../../../VectorFlow/types/MDM";
type BulkUploadHeaderParams = {
  themeUi: any;
  setIsPermissionModalOpen: (e: boolean) => void;
  setIsRoleModalOpen: (e: boolean) => void;
  isBulkActionEnabled: boolean | undefined;
  resetState: ()=>void;
  gridRef?: GridRef | any;
};
const ActionButton = styled.div`
  width: 100px;
  height: 27px;
  padding-left: 10px;
  border: 1px solidrgba(206, 206, 206, 0.5);
  cursor: pointer;
  align-content: center;

  &:hover {
    background-color: #cecece;
  }
`;
const BulkUploadHeader = ({
  themeUi,
  setIsPermissionModalOpen,
  setIsRoleModalOpen,
  isBulkActionEnabled,
  resetState,
  gridRef
}: BulkUploadHeaderParams) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedView, setSelectedView] = useState<null | string>(null);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !buttonRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
      if (!selectedView) {
        setSelected([]);
        setIsSelectAll(false);
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
      left: left + window.scrollX,
    });
    setOpen(!open);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <div>
          <SCGoBackContainer style={{paddingLeft: '10px'}} onClick={resetState}>
                                    <img
                                        src="/assets/img/VectorFLOW/BPR/goback.svg"
                                        alt=""
                                        style={{height: '20px'}}
                                    />
                                    <SCGoBackText style={{fontSize: '1.5rem'}} ><b>Reupload</b></SCGoBackText>
                                </SCGoBackContainer>

      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

      <VFButton
        disabled={!isBulkActionEnabled}
        style={{ width: "100px", height: "35px", fontSize: "1rem" }}
        themeUi={themeUi}
        onClick={onSelectClick}
      >
        {"Bulk Action"}
      </VFButton>

      <VFButton
        disabled={false}
        style={{ width: "100px", height: "35px", fontSize: "1rem" }}
        themeUi={themeUi}
        onClick={() => {


          gridRef.current.api.exportDataAsExcel({
            fileName: "UserData.xlsx",
            sheetName: "User Data",
            columnKeys: ['id', 'username', 'email', 'pwd']
        });
        }}
        >
        {"Export"}
      </VFButton>
        </div>

      {open && (
        <Portal wrapperId="checkbox-dropdown">
          <DropdownWrapper
            ref={dropdownRef}
            topPos={dropdownPosition.top + "px"}
            leftPos={dropdownPosition.left + "px"}
          >
            <div
              style={{
                width: "100px",
                height: "54px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ActionButton
                onClick={() => {
                  setIsRoleModalOpen(true);
                  setOpen(false);
                }}
              >
                Roles
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setIsPermissionModalOpen(true);
                  setOpen(false);
                }}
              >
                Permissions
              </ActionButton>
            </div>
          </DropdownWrapper>
        </Portal>
      )}
    </div>
  );
};

export default BulkUploadHeader;
