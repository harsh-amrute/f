import React from "react"

import { useGetAllDrafts } from "../../../../../VectorFlow/Services/MTA/MDM"
import useSavedDrafts from "./useSavedDrafts"
import { mapDraftDataToTableRowData, mapDraftToColumnDefs } from "../../../../../helpers/utils"
import { useUserData } from "../../../../../context"

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"



const SavedDrafts = ()=>{


  const {user} = useUserData()
  
  const {
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    onDeleteDraft,
    onEditDraft,
    allDrafts,
    isLoading
  } = useSavedDrafts()

  

  console.log(allDrafts,isLoading);

  if(isLoading){
    return <VFLoader/>
  }


  return(
    <React.Fragment>
      <VFTable
          columnDefs={mapDraftToColumnDefs([
            {
                
              displayName: "Sr No.",
              key: "sr_no",
              visible: true,
            },
            {
              displayName: "Last Modification Date",
              key: "LastModifiedDateTime",
              visible: true,
            },
            {
              displayName: "Instance Name",
              key: "Masters",
              visible: true,
            },
            {
              displayName: "Search Key",
              key: "SearchKeys",
              visible: true,
            },
            {
                displayName:"Action",
                key:"action",
                visible:true
            }
          ],{
            cellRendererParams:{
              onEdit:onEditDraft,
              onDelete:openDeleteModal
            }
          })}
          rowData={mapDraftDataToTableRowData(allDrafts)}
          gridOptions={{
            getRowStyle: (params: any) => {
              if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
              }
              return { background: "#F7F7F7" };
            },
          }}
        />

        <VFModalCard headerText={"Warning"} openModal={isDeleteModalOpen} closeModal={closeDeleteModal} headerIcon={'/assets/img/VectorFLOW/NMS/warning.svg'} >
        <p style={{textAlign:"center", color: "#313131", paddingTop:"36px", fontStyle:"normal", fontVariant:"normal",fontWeight:300,fontSize:"16px",fontFamily:"Roboto"}}>
          Are you sure you want to delete the draft ?
        </p> 
        <div style={{display:"flex",gap:"28px", alignItems:"center", justifyContent:"center", paddingTop:"38px", paddingBottom:"36px"}}>
          <VFButtonOutline color={"gray"} themeUi={user.user.theme_ui} onClick={closeDeleteModal}>No</VFButtonOutline>
          <VFButton themeUi={user.user.theme_ui} onClick={onDeleteDraft}>Yes</VFButton>
        </div>
       </VFModalCard>
    </React.Fragment>
  )
}

export default SavedDrafts