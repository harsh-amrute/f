import React from 'react'

const MTOErrorWarningCell = (data: any) => {
  if(data?.value?.error){
    return (
    <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center', fontFamily: 'roboto', fontWeight: 'bold'}}>
        <img src="/assets/img/VectorFLOW/NMS/error-red.svg" alt="" />
        <p style={{margin: '0 5px', color: 'red'}}>
            {data?.value?.error}
        </p>
    </div>)
  }
  if(data?.value?.warning){
    return (
    <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center', fontFamily: 'roboto', fontWeight: 'bold'}}>
        <img src="/assets/img/VectorFLOW/NMS/error-orange.svg" alt="" />
        <p style={{margin: '0 5px', color: 'orange'}}>
            {data?.value?.warning}
        </p>
    </div>)
  }
  return 
}

export default MTOErrorWarningCell