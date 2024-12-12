import _ from 'lodash';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ROW_DATA } from '../../../../../redux/actions/MDM';
import { RootState } from '../../../../../redux/store/store';

const MajReasonDescCell = (props:any) => {
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);

    const initialPoogiData = useSelector((state: any)=> state.mto.poogiIntialData);

    const dispatch = useDispatch();

    const undo = ()=>{
        if(!props.data.id){

            const newData = _.cloneDeep(activeMaster.rowData);
            newData[props.node.rowIndex].majdsc = initialPoogiData[props.node.rowIndex].majdsc;
            newData[props.node.rowIndex].iu = false;
            dispatch(UPDATE_ROW_DATA(newData));
        }
    }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', opacity: `${props.data.id?0.3:1}`}}>
        <span>{props.data.majdsc}</span>
        {(props.data.iu && !props.data.in) &&<span style={{paddingTop: '2px', cursor: 'pointer'}}>
            <img  onClick={undo} height={18} width={18} src="/assets/img/undo.svg" alt="undo" />
        </span>}
    </div>
  )
}

export default MajReasonDescCell