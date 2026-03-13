import Drawer from "../../../components/commons/Drawer";
import {
  content as contentCls,
  drawerHeader,
  drawerHeaderText,
} from "./styles.css";
import { useUserData } from "../../../context";
import { useState } from "react";
import AddURL from "./Add";
import NavigationTab from "../NavigationTab";
import ViewURLs from "./View";
import DeleteUrl from "./Delete";

import { notifyError, notifySuccess } from "../../../helpers/notify";

interface UserURLsDrawerProps {
  onClose: () => void;
}

const UserURLsDrawer = (props: UserURLsDrawerProps) => {
  const { onClose } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [currTab, setCurrTab] = useState<number>(0);

  const [currURL, setCurrUrl] = useState<any>(null);

  const [activeTab, setActiveTab] = useState(0);

  const onCellClicked = (row: any) => {
    setCurrTab(2);
    setCurrUrl(row);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_HOST}api/user/delete-function/${currURL.id}/`,
        {
          method: "DELETE",
        }
      );
      notifySuccess("Deleted URL Successfully");
      setCurrTab(0);
    } catch (error) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
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
        />
      }
      onClose={onClose}
    >
      {currTab === 1 && (
        <div className={contentCls}>
          <AddURL
            cb={() => {
              setCurrTab(0);
              setActiveTab(0);
            }}
          />
        </div>
      )}

      {currTab === 0 && (
        <div className={contentCls}>
          <ViewURLs onDelete={onCellClicked} />
        </div>
      )}

      {currTab === 2 && (
        <div className={contentCls}>
          <DeleteUrl
            onSuccess={handleDelete}
            onFailure={() => {
              setCurrTab(0);
              setCurrUrl(null);
            }}
          />
        </div>
      )}
    </Drawer>
  );
};

interface HeaderProps {
  themeUi: string;
  handleAction: (item: number) => void;
  handleClose: () => void;
  activeTab: any;
  setActiveTab: any;
}

const Header = (props: HeaderProps) => {
  const { themeUi, handleAction, handleClose, activeTab, setActiveTab } = props;

  return (
    <div className={drawerHeader}>
      <div className={drawerHeaderText}>URLs</div>

      <div style={{ flex: 4 }}>
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
        alt="close"
      />
    </div>
  );
};

export default UserURLsDrawer;
