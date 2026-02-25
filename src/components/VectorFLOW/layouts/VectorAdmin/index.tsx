import { ReactNode } from "react";

import { AdminLayoutContent, AdminLayoutWrapper } from "./styles.css";

interface VectorAdminLayoutProps {
  children: ReactNode;
}

const VectorAdminLayout = (props: VectorAdminLayoutProps) => {
  const { children } = props;

  return (
    <div className={AdminLayoutWrapper}>
      <div className={AdminLayoutContent}>{children}</div>
    </div>
  );
};

export default VectorAdminLayout;
