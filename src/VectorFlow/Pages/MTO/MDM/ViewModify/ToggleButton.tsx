import React, { useState } from "react";
import { ToggleCircle, ToggleContainer, ToggleText } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import {  UPDATE_COLDEFS, UPDATE_ROW_DATA} from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import _, { truncate } from "lodash";
import { SET_BUFFER_MODIFY_DATA } from "../../../../../redux/actions/MTO";



const ToggleButton: React.FC = (props: any) => {
    
    const dispatch = useDispatch();
    const activeMaster = useSelector((state: RootState) => state.mdm.activeMaster);
  const [isActive, setIsActive] = useState(props.data.iv===undefined?true: props.data.iv);
  const bufferModifyData = useSelector((state: any)=> state.mto.bufferModifyData);


  const toggleHandler = () => {
    
        const newData = _.cloneDeep(activeMaster.rowData);
        newData.forEach((row: any) => {

            if(row.bid!==undefined && row.bid === props.data.bid){
                row.iv = !isActive;
            }
            else if(row.bcd=== props.data.bcd){
                row.iv = !isActive;
            }
        })

        if(props.data.bid && !isActive){
          const newBufferModifyData = bufferModifyData? _.cloneDeep(bufferModifyData).filter((row:any) => row.bid !== props.data.bid): [];
          dispatch(SET_BUFFER_MODIFY_DATA(newBufferModifyData));

        }
        else if(props.data.bid && isActive){
          const newBufferModifyData = bufferModifyData?_.cloneDeep(bufferModifyData).filter((row:any) => row.bid !== props.data.bid): [];
          newBufferModifyData.push({...props.data, iv: !isActive});
          dispatch(SET_BUFFER_MODIFY_DATA(newBufferModifyData));

        }
        else if(!props.data.bid){
          const exists = bufferModifyData? bufferModifyData.some((buffer:any) => buffer.bcd === props.data.bcd): false;
          if(exists){
            const newBufferModifyData = _.cloneDeep(bufferModifyData).filter((row:any) => row.bcd !== props.data.bcd);
            newBufferModifyData.push({...props.data, iv: !isActive});
            dispatch(SET_BUFFER_MODIFY_DATA(newBufferModifyData));
          }
        }

        dispatch(UPDATE_ROW_DATA(newData));
    setIsActive(!isActive);
  };

  return (
    <ToggleContainer style={{zoom: 0.6}} isActive={isActive} onClick={toggleHandler}>
      <ToggleCircle isActive={isActive} />
      <ToggleText isActive={isActive}>{isActive ? "Active" : "Inactive"}</ToggleText>
    </ToggleContainer>
  );
};

export default ToggleButton;
