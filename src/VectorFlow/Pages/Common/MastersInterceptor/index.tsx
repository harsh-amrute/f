import React from 'react'
import ApplicationSelectModal from '../../MTA/MDM/ControlPanel/ApplicationSelectModal'

const MastersInterceptor = ({url}: any) => {
    console.log(url);
  return (
    <ApplicationSelectModal url={url}/>
  )
}

export default MastersInterceptor