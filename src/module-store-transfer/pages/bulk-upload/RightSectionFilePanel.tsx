import { ButtonFloat } from "../../../components"
import { FileName, FilePanel, HeaderText } from "./style"

function RightSectionFilePanel() {
  return (
    <FilePanel>
        <FileName>
            <img src="/images/file.png" alt="file" />
            <HeaderText fontSize='1.4rem' fontWeight='500'>File Name</HeaderText>
        </FileName>
        <ButtonFloat icon="image" text="" onClick={()=>{console.log("click")}}/>
    </FilePanel>
  )
}

export default RightSectionFilePanel