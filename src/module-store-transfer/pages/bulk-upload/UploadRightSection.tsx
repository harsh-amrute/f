
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
        <div style={{display:"flex", flexDirection:"column", gap:"3rem"}}>
          <RightSectionFilePanel text={"Error File"} img="/assets/img/excel.svg" iconStyles={{width:"2rem", padding:"0px"}} imgStyles={{width:"3.5rem"}} btnIcon="/assets/img/VectorFLOW/NMS/download.svg"/>
          <RightSectionFilePanel text={"Assign Roles & Permission"} img="/assets/img/excel.svg" iconStyles={{width:"1.7rem", padding:"0px"}} imgStyles={{width:"3.5rem"}} btnIcon="/assets/img/Open new link icon.svg"/>
        </div>
    </RightSectionWrapper>
  )
}

export default UploadRightSection