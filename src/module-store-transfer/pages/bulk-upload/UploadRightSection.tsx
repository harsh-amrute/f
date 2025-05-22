
import { HeaderText, RightSectionWrapper } from './style'
import ProgressBox from './ProgressBox'
import RightSectionFilePanel from './RightSectionFilePanel';

interface UploadRightSectionProps {
    message: string;
}

function UploadRightSection({message}:UploadRightSectionProps) {
  return (
    <RightSectionWrapper>
        <ProgressBox label={'Uploaded Succesfully'}/>
        <HeaderText >{message}</HeaderText>
        <RightSectionFilePanel/>
    </RightSectionWrapper>
  )
}

export default UploadRightSection