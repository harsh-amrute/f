import _ from 'lodash';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COLDEFS, UPDATE_ROW_DATA } from '../../../../../redux/actions/MDM';
import { SET_EDITABLE_MAJ_ROW, SET_EDITABLE_MIN_ROW } from '../../../../../redux/actions/MTO';

const PoogiEditDeleteCell = (params: any) => {

    const activeMaster = useSelector((state: any)=> state.mdm.activeMaster)
    const dispatch = useDispatch();
    const editableMajRowIndex = useSelector((state: any) => state.mto.editableMajRow);
    
    const editableMinRowIndex = useSelector((state: any) => state.mto.editableMinRow);
    const intialPoogiData = useSelector((state: any)=> state.mto.poogiIntialData);

    const onSaveChange = ()=>{
   
        dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false }))))
        if(params.data.minId){
          dispatch(SET_EDITABLE_MIN_ROW(null))
        }
        else{
          const newRowData = _.cloneDeep(activeMaster.rowData);
          newRowData[params.node.rowIndex].iu = true;
          dispatch(UPDATE_ROW_DATA(newRowData));
          dispatch(SET_EDITABLE_MAJ_ROW(null))
        }
    }

    const onCancel = ()=>{
      dispatch(UPDATE_ROW_DATA(intialPoogiData));
      dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false })))) 
      if(params.data.minId){
        dispatch(SET_EDITABLE_MIN_ROW(null))
      }    
      else{
        dispatch(SET_EDITABLE_MAJ_ROW(null))
      }
    }


    if( (params.data.minId && (editableMinRowIndex === params?.node?.rowIndex)) || ((!params.data.minId) && (editableMajRowIndex === params?.node?.rowIndex)) ){
       return (
        <div style={{ display: 'flex', flexDirection: 'row',gap:'12px', justifyContent:'center', marginTop: '4px' }}>

          <div
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
    
  const onDeleteClick = ()=>{
      const newData = _.cloneDeep(activeMaster.rowData);
      newData[params.node.rowIndex].id = true;
      dispatch(UPDATE_ROW_DATA(newData));
  }
  const onDeleteUndoClick = ()=>{
      const newData = _.cloneDeep(activeMaster.rowData);
      newData[params.node.rowIndex].id = false;
      dispatch(UPDATE_ROW_DATA(newData));
  }


  const onEditClick = ()=>{
    if(params.data.minId){
      dispatch(SET_EDITABLE_MIN_ROW(params.node.rowIndex))

    }
    else{
      dispatch(SET_EDITABLE_MAJ_ROW(params.node.rowIndex))
    }
    dispatch(UPDATE_COLDEFS(activeMaster?.colDefs?.map((colDef: any) => ({ ...colDef, editable: (para: any) => para.node.rowIndex === params?.node?.rowIndex}))));
  }


  return (
    

      <div style={{display: 'flex', margin:'4px auto', width: '80px', justifyContent:'center'}}>
        {(!activeMaster.colDefs.some((colDef: any) => colDef.field === 'actions')) &&
        <>

          <button disabled={params.data.id} onClick={onEditClick} style={{background: 'transparent', opacity: `${params.data.id?0.2:1}`}}>
            <img height={18} width={18} src="/assets/img/VectorFLOW/NMS/edit-draft.svg" />
        </button>
        {(params.data.id) ?
          <button onClick={onDeleteUndoClick} style={{background: 'transparent'}}>
          <img  height={18} width={18} src="/assets/img/delete-undo.svg" alt="undo" />
          </button>
          :
          <button onClick={onDeleteClick} style={{background: 'transparent'}}>
          <img height={18} width={18} src="/assets/img/VectorFLOW/NMS/delete-draft.svg" />
        </button>

}
</>
          }
        </div>
      
  )
}

export default PoogiEditDeleteCell