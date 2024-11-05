import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COLDEFS, UPDATE_ROW_DATA } from '../../../../../redux/actions/MDM';
import { SET_EDITABLE_ROW } from '../../../../../redux/actions/MTO';

const PoogiEditDeleteCell = (params: any) => {

    // const onEditClick=()=>{

    // }
    // const onDeleteClick=()=>{

    // }

    const activeMaster = useSelector((state: any)=> state.mdm.activeMaster)
    const dispatch = useDispatch();
    const editableRowIndex = useSelector((state: any) => state.mto.editableRow);

    const intialData = useSelector((state: any)=> state.mto.poogiIntialData);
    const onSaveChange = ()=>{
        dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false }))))
        dispatch(SET_EDITABLE_ROW(null))
    }

    const onCancel = ()=>{
      console.log("ini data...", intialData);
        dispatch(UPDATE_COLDEFS(activeMaster.colDefs.map((colDef: any) => ({ ...colDef, editable: false }))))
        console.log("params....",activeMaster.rowData[params.node.rowIndex]);
        
        dispatch(SET_EDITABLE_ROW(null))
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
    dispatch(SET_EDITABLE_ROW(params?.node?.rowIndex))
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