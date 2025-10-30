import { SCPageForbidden, PermissionForbiddenIcon } from "./styles.css";

const PageForbidden = () => {
  const params = new URLSearchParams(window.location.search);
  const URLPermission = params.get("URLPermission");
  return (
    <div className={SCPageForbidden}>
      <img
        className={PermissionForbiddenIcon}
        src={
          URLPermission
            ? "/assets/img/error-403.svg"
            : "/assets/img/error-403-page.svg"
        }
        alt="Forbidden"
      />
    </div>
  );
};

export default PageForbidden;
