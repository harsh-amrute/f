import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COLDEFS, UPDATE_ROW_DATA } from '../../../../../redux/actions/MDM';
import { SET_EDITABLE_MAJ_ROW, SET_POOGI_INITIAL_DATA } from '../../../../../redux/actions/MTO';

const PoogiEditDeleteCell = (params: any) => {

    const activeMaster = useSelector((state: any)=> state.mdm.activeMaster)
    const dispatch = useDispatch();
    const editableRowIndex = useSelector((state: any) => state.mto.editableMajRow);
    const intialData = useSelector((state: any)=> state.mto.poogiIntialData);

    const onSaveChange = ()=>{
        dispatch(SET_POOGI_INITIAL_DATA(activeMaster.rowData));
        dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false }))))
        dispatch(SET_EDITABLE_MAJ_ROW(null))
    }

    const onCancel = ()=>{
      dispatch(UPDATE_ROW_DATA(intialData));
      dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false }))))      
      dispatch(SET_EDITABLE_MAJ_ROW(null))
    }

    if( (editableRowIndex === params?.node?.rowIndex)){
       return (
        <div style={{ display: 'flex', flexDirection: 'row',gap:'12px', justifyContent:'center', marginTop: '4px' }}>

          <div
          //   onClick={() => dispatch(UPDATE_ROW_DATA(activeMaster.rowData.filter((item: any) => item.id !== params.data.id))) }
            onClick={onSaveChange }
            style={{ cursor: 'pointer' }}>
            <img
              src="/assets/img/MTOapprovalBuffer.svg"
              alt="ApproveMaster"
            />
          </div>

          <div
            onClick={onCancel}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/assets/img/MTOcancelBuffer.svg"
              alt="CancelMaster"
            />
          </div>

        </div>
      );
    }
    


  const onEditClick = ()=>{
    dispatch(SET_EDITABLE_MAJ_ROW(params?.node?.rowIndex))
    dispatch(UPDATE_COLDEFS(activeMaster?.colDefs?.map((colDef: any) => ({ ...colDef, editable: (para: any) => para.node.rowIndex === params?.node?.rowIndex}))));
  }


  return (
    <div style={{display: 'flex', margin:'4px auto', width: '80px', justifyContent:'center'}}>
        <button onClick={onEditClick} style={{background: 'transparent'}}>
            <img height={24} width={24} src="/assets/img/VectorFLOW/NMS/edit-draft.svg" />
        </button>
        <button style={{background: 'transparent'}}>
            <img height={24} width={24} src="/assets/img/VectorFLOW/NMS/delete-draft.svg" />
        </button>
    </div>
  )
}

export default PoogiEditDeleteCell