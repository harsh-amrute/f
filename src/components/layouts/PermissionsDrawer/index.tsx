// File: ../../PermissionsDrawer.tsx
import Drawer from "../../commons/Drawer";
import {
  content,
  drawerHeader,
  focusOutlineVar,
} from "../UserURLsDrawer/styles.css";
import { useUserData } from "../../../context";
import { useState } from "react";
import NavigationTab from "../NavigationTab";
import ViewPermissions from "./View";
import AddProductPermission from "./AddProductPermission";
import Select from "react-select";
import AddLocationPermission from "./AddLocationPermission";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";
import { useCombobox } from "downshift";

interface PermissionsDrawerProps {
  onClose: () => void;
}

const PermissionsDrawer = (props: PermissionsDrawerProps) => {
  const { onClose } = props;
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const [currTab, setCurrTab] = useState<number>(0);
  const [activeTab, setActiveTab] = useState(0);

  const [permissionType, setPermissionType] = useState("Product_Permissions");

  const resetTab = () => {
    setCurrTab(0);
    setActiveTab(0);
  };

  return (
    <Drawer
      isOpen
      header={
        <Header
          themeUi={themeUi}
          handleAction={setCurrTab}
          handleClose={onClose}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          // Pass the state setter to the Header component
          setPermissionType={setPermissionType}
        />
      }
      onClose={onClose}
    >
      {currTab === 1 && (
        <div className={content}>
          {permissionType === "Product_Permissions" ? (
            <AddProductPermission cb={resetTab} />
          ) : (
            <AddLocationPermission cb={resetTab} />
          )}
        </div>
      )}

      {currTab === 0 && (
        <div className={content}>
          <ViewPermissions permissionType={permissionType} />
        </div>
      )}
    </Drawer>
  );
};

const Header = (props: {
  themeUi: string;
  handleAction: (item: number) => void;
  handleClose: () => void;
  activeTab: any;
  setActiveTab: any;
  setPermissionType: (type: string) => void;
}) => {
  const {
    themeUi,
    handleAction,
    handleClose,
    activeTab,
    setActiveTab,
    setPermissionType,
  } = props;

  const permissionOptions = [
    { label: "Product Permissions", value: "Product_Permissions" },
    { label: "Location Permissions", value: "Location_Permissions" },
  ];

  const [selectedPermission, setSelectedPermission] = useState(
    permissionOptions[0]
  );

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: permissionOptions,
    selectedItem: selectedPermission,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedPermission(selectedItem);
        setPermissionType(selectedItem.value);
      }
    },
  });

  const getThemeColor = () =>
    themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80";
  const getHoverColor = () =>
    themeUi === "REGALBLAZE"
      ? "rgba(252, 163, 17, 0.3)"
      : "rgba(188, 61, 129, 0.3)";

  return (
    <div
      className={drawerHeader}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 15px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Downshift Dropdown */}
      <div style={{ position: "relative", width: "180px" }}>
        <button
          type="button"
          {...getToggleButtonProps()}
          style={{
            width: "100%",
            backgroundColor: "rgb(247, 247, 247)",
            border: "2px solid transparent",
            padding: "6px 8px",
            fontSize: "12px",
            textAlign: "left",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {selectedPermission.label}
        </button>
        <ul
          {...getMenuProps()}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            listStyle: "none",
            margin: 0,
            padding: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            zIndex: 5,
            borderRadius: "4px",
            border: "1px solid #eee",
            display: isOpen ? "block" : "none",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {isOpen &&
            permissionOptions.map((item, index) => (
              <li
                key={item.value}
                {...getItemProps({ item, index })}
                style={{
                  padding: "6px 10px",
                  fontSize: "11px",
                  backgroundColor:
                    highlightedIndex === index
                      ? getHoverColor()
                      : item.value === selectedPermission.value
                      ? getThemeColor()
                      : "white",
                  color:
                    highlightedIndex === index ||
                    item.value === selectedPermission.value
                      ? "black"
                      : "#333",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>

      <div style={{ flex: 4, marginLeft: "15px" }}>
        <NavigationTab
          listTabs={["View", "Add"]}
          onClick={(item: number) => handleAction(item)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <img
        style={{ cursor: "pointer", marginRight: "5px" }}
        onClick={handleClose}
        src="/assets/img/VectorFLOW/NMS/close-dark.svg"
        height={13}
        width={13}
      />
    </div>
  );
};

export default PermissionsDrawer;
