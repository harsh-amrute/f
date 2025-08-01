import { CustomCellRendererProps } from 'ag-grid-react';
import React from 'react'
import VFButton from '../../../components/VectorFLOW/commons/VFButton';
import { useUserData } from '../../../context';

interface MyCellRendererProps extends CustomCellRendererProps {
  allPermissions?: any[];
}

const PermissionViewCellRenderer = (params: MyCellRendererProps) => {
    const PermissionCount = params.allPermissions? 10: 0;
    const user = useUserData();
      const themeUi = user.user.user.theme_ui;

  return (
    <>
    {
        (PermissionCount>0)?
        <VFButton
            disabled={false}
            style={{ width: "140px", height: "25px", fontSize: "1rem" }}
            themeUi={themeUi}
            onClick={()=>{
                console.log("view permissions");
            }}
        >
            {"Edit Permissions"}    
            </VFButton>
        :
        <VFButton
        disabled={false}
        style={{ width: "140px", height: "25px", fontSize: "1rem" }}
        themeUi={themeUi}
        onClick={()=>{
            console.log("permission");
        }}
      >
        {"Select Permissions"}
      </VFButton>

}
</>
  )
}

export default PermissionViewCellRenderer