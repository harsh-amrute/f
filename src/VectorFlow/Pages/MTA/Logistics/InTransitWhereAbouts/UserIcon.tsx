import { useState } from "react";

import {
  RemarkModalTableCell,
  RemarkModalUserIcon,
  UserToolTip,
  UserToolTipContent,
} from "./styles.css";

const UserIcon = ({ data }: { data: string }) => {
  const [isToolTipOpen, toggleToolTip] = useState<boolean>(false);

  return (
    <div className={RemarkModalTableCell}>
      <div
        className={RemarkModalUserIcon}
        onMouseEnter={() => toggleToolTip(true)}
        onMouseLeave={() => toggleToolTip(false)}
      >
        {data.slice(0, 1)}
      </div>
      {isToolTipOpen && (
        <div className={UserToolTip}>
          <p className={UserToolTipContent}>{data}</p>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
