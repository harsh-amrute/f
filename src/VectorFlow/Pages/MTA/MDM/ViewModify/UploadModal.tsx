import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { UploadModalWrapper, UploadModalSection, UploadBorderContainer, UploadModalContent, TextContent, InputWrapper, UploadModalInput, UploadModalText, UploadFileText } from "./styles"
import { SCManualUploadBtn, SCManualUploadButton } from "../../../../../module-store-transfer/pages/manual-upload/styles"
import { useUserData } from "../../../../../context"


interface UploadModalProps{
   openModal:boolean
   onCloseModal:()=>void
   onDownload:()=>void
   onUpload:()=>void
}


const UploadModal = (props:UploadModalProps)=>{

   const{
      openModal,
      onCloseModal,
      onDownload,
      onUpload
   }   = props 

   const {user} = useUserData()
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
                     <img src="../assets/img/manual/excel.png"  height={29} width={29}/>
                     <p>Download selected data </p>
                  </TextContent>
                  <UploadFileText>
                     File Name
                  </UploadFileText>
                  <InputWrapper>
                     <UploadModalInput/>
                     <SCManualUploadBtn themeUi={user.user.theme_ui} 
                        onClick={onDownload}
                        style={{
                           height:'40px',
                           width:'93px',
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
               <img src="../assets/img/manual/excel.png"  style={{height:'29px', width:'29px'}}/>
                  <p>Drag & Drop your file here</p>
               </TextContent>     
               <InputWrapper>
               <SCManualUploadButton style={{height:'40px', width:'105px'}}>
                  <img src="../assets/img/manual/plus.png" width={19} height={19} />
               </SCManualUploadButton>
                  <UploadModalInput/>
                     <SCManualUploadBtn themeUi={user.user.theme_ui} 
                        onClick={onUpload}
                        disabled
                        style={{
                           opacity: 0.34,
                           height:'40px',
                           borderRadius:'0',
                           display:'flex',
                           alignItems:'center',
                           justifyContent:'center',
                           width:'83px',
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