import React from 'react'
import { UploadSectionWrapper } from './style'
import UploadRightSection from './UploadRightSection'
import UploadLeftSection from './UploadLeftSection'

function UploadWrapperSection() {
  return (
    <UploadSectionWrapper>
      <UploadLeftSection/>
      <UploadRightSection message='No Error Found'/>
    </UploadSectionWrapper>
  )
}

export default UploadWrapperSection