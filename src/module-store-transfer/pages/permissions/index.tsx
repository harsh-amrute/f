import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import UserPermissionsView from "./UserPermissionsView";

const Permissions = ({ roles }: any) => {

  return (
    <UserPermissionsView />
  );
};

export default Permissions;
