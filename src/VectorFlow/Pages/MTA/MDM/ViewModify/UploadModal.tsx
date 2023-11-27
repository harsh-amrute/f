import { Dispatch, SetStateAction,useRef } from 'react'
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { UploadModalWrapper, UploadModalSection, UploadBorderContainer, UploadModalContent, TextContent, InputWrapper, UploadModalInput, UploadModalText, UploadFileText } from "./styles"
import { SCManualUploadBtn, SCManualUploadButton } from "../../../../../module-store-transfer/pages/manual-upload/styles"
import { useUserData } from "../../../../../context"
import * as ManualStyle from "../../../../../module-store-transfer/pages/manual-upload/styles"; 
import {notifyError} from '../../../../../helpers/notify';
interface UploadModalProps{
   openModal:boolean
   onCloseModal:()=>void
   onDownload:()=>void
   onUpload:()=>void
   inputText:string,
   setInputText:Dispatch<SetStateAction<string>>,
   file:File | undefined,
   setFile:Dispatch<SetStateAction<File | undefined>>

}


const UploadModal = (props:UploadModalProps)=>{

   const{
      openModal,
      onCloseModal,
      onDownload,
      onUpload,
      inputText,
      setInputText,
      file,
      setFile
   }   = props 

   const {user} = useUserData()
   const inputRef = useRef<HTMLInputElement>(null);

   const handleClick = (): void => {
      if (inputRef.current != null) {
        inputRef.current.click();
      }
    };
  
    const handleFileChange = (e: any) => {
      if (e.target.files.length < 1) {
        return;
      }
  
      const file = e.target.files[0];
      console.log(file.type);
      switch (file.type) {
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          console.log(file);
          setFile(file);
          break;
        default:
          notifyError("Only xlsx files are accepted");
      }
    };

   return(
   <VFModalCard headerText={"Modification"} headerIcon={"/assets/img/VectorFLOW/NMS/settings.svg"} openModal={openModal} closeModal={onCloseModal} >
      <UploadModalWrapper>
         <UploadModalSection>
            <UploadModalText>
               <p style={{ color: "#292C2E", marginBottom: '11px'}}><b>Step 1</b></p>
            </UploadModalText>
            <UploadBorderContainer>
               <UploadModalContent>
                  <TextContent>
                     <img src="../assets/img/manual/excel.png"  height={29} width={29} style={{marginBottom:'10px'}}/>
                     <p>Download selected data </p>
                  </TextContent>
                  <UploadFileText>
                     File Name
                  </UploadFileText>
                  <InputWrapper>
                     <UploadModalInput value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
                     <SCManualUploadBtn themeUi={user.user.theme_ui} 
                        onClick={onDownload}
                        style={{
                           height:'30px',
                           width:'91px',
                           borderRadius:'0',
                           display:'flex',
                           alignItems:'center',
                           justifyContent:'center',
                           borderBottomRightRadius:'6px',
                           fontStyle:'normal',
                           fontVariant:'normal',
                           fontWeight: '400',
                           fontSize: '12px',
                           lineHeight: '14px',
                           fontFamily:'Roboto'
                        }}>
                           
                        <img src="/assets/img/VectorFLOW/NMS/download.svg" style={{margin:'5px'}}></img> 
                        Download
                     </SCManualUploadBtn>
                  </InputWrapper>
               </UploadModalContent>
            </UploadBorderContainer>
         </UploadModalSection>
         <UploadModalSection style={{margin:0}}>
            <UploadModalText>
               <p style={{ color: "#292C2E", marginBottom: '11px'}}><b>Step 2</b></p>
            </UploadModalText>
            <UploadBorderContainer>
            <UploadModalContent>
               <TextContent>
               <img src="../assets/img/manual/excel.png"  style={{height:'29px', width:'29px',marginBottom:'10px'}}/>
                  <p>Drag & Drop your file here</p>
               </TextContent>     
               <InputWrapper>
               <SCManualUploadButton style={{height:'30px', width:'105px'}} onClick={handleClick}>
                  <img src="../assets/img/manual/plus.png" width={19} height={19} />
                  <ManualStyle.SCManualUploadInput
                     type="file"
                     accept=".xlsx"
                     onChange={handleFileChange}
                     ref={inputRef}
                     value=""
                     style={{ display: "none" }}
                  />
               </SCManualUploadButton>
                  <UploadModalInput placeholder="Click here to upload new file" value={file?.name}/>
                     <SCManualUploadBtn themeUi={user.user.theme_ui} 
                        onClick={onUpload}
                        style={{
                           height:'30px',
                           borderRadius:'0',
                           display:'flex',
                           alignItems:'center',
                           justifyContent:'center',
                           width:'82px',
                           borderBottomRightRadius:'6px',
                           fontStyle:'normal',
                           fontVariant:'normal',
                           fontWeight: '400',
                           fontSize: '12px',
                           lineHeight: '14px',
                           fontFamily:'Roboto'
                        }}>
                        <img src="/assets/img/VectorFLOW/NMS/upload.svg" style={{margin:'6px'}}></img> 
                        Upload
                        </SCManualUploadBtn>
                  </InputWrapper>
               </UploadModalContent>
            </UploadBorderContainer>
         </UploadModalSection>
      </UploadModalWrapper>
   </VFModalCard>
   )
}

export default UploadModal