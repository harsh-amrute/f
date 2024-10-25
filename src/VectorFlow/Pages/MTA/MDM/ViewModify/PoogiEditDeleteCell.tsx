import React from 'react'

const PoogiEditDeleteCell = (params: any) => {

    // const onEditClick=()=>{

    // }
    // const onDeleteClick=()=>{

    // }
  return (
    <div style={{display: 'flex', margin:'0 auto', width: '80px', gap:'2px'}}>
        <button style={{background: 'transparent'}}>
            <img height={24} width={24} src="/assets/img/VectorFLOW/NMS/edit-draft.svg" />
        </button>
        <button style={{background: 'transparent'}}>
            <img height={24} width={24} src="/assets/img/VectorFLOW/NMS/delete-draft.svg" />
            
        </button>
    </div>
  )
}

export default PoogiEditDeleteCell