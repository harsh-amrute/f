import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { TaskBarContainer, SCContainer, SCFilterContainer, SCFilterControls, SCLegend, SCFilterAddControls, SCFilterAddButton, SCFilterAddButtonWrapper, SCFilterSeperator, SCFilterButtonGroup } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { generateOptions } from "../../../../../helpers/utils";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";
import useViewModify from "./useViewModify"; 




  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
   
    // const disabled=true;

    const {
        selectedMasters,
        isSelectMasterOpen,
        setIsSelectMasterOpen,
        options,
        selectedOptions,
        tabs,
        activeMaster,
        filters,
        operators,
        filterButtonStatus,
        setFilterButtonStatus,
        handleSelectMasterSubmit,
        handleTabClose,
        handleOnAddFilter,
        handleOnDeleteFilter,
        allMasters,
        isLoading

    } = useViewModify();
    
      
    
    return (
      <>
        <SCContainer>
          {isSelectMasterOpen && 
            <SelectMaster 
                data={allMasters} 
                options={options} 
                selectedOptions={selectedOptions} 
                selectedMasters={selectedMasters}
                filterButtonStatus={filterButtonStatus}
                setFilterButtonStatus={setFilterButtonStatus}
                themeUi={themeUi}
                isLoading={isLoading}
                handleSubmit={()=>{handleSelectMasterSubmit()}}
            />
          }
          {!isSelectMasterOpen && 
            <VFTab 
              allMasters={allMasters}
              activeMaster={activeMaster}
              tabs={tabs}
              themeUi={themeUi}
              onClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={()=>{setIsSelectMasterOpen(true)}}
              >
                <SCFilterContainer>
                  <SCFilterControls>
                    <SCLegend>Filter</SCLegend>
                    {filters.map((f)=>{
                      if(f.masterId==activeMaster?.id){
                        return(
                          <VFFilter 
                            onDelete={()=>handleOnDeleteFilter(f.id,f.masterId)}
                            operators={operators}
                            filters={filters}
                            fields={activeMaster ? generateOptions([activeMaster]) : []}
                            currFilter={f}
                            key={f.id}
                          />
                        )
                      }
                    })}
                    
                  </SCFilterControls>
                  <SCFilterAddControls>
                    {filters.map((f)=>{
                        if(f.masterId===activeMaster?.id){
                          return (
                            <SCFilterAddButtonWrapper>
                              <SCFilterAddButton
                                onClick={handleOnAddFilter}
                                src="/assets/img/VectorFLOw/NMS/add-filter.svg"
                                key={f.id}
                                data-testid="add-filter"
                              />
                            </SCFilterAddButtonWrapper>
                            
                          )
                        }
                      })}
                  </SCFilterAddControls>
                  <SCFilterSeperator/>
                  <SCFilterButtonGroup>
                    <VFButton
                    themeUi={themeUi}
                    onClick={()=>alert('Applied')}
                    >
                      Apply Filter
                    </VFButton>
                    <VFButtonOutline
                      onClick={()=>console.log('')}
                      themeUi={themeUi}
                      
                    >
                      Show All
                    </VFButtonOutline>
                  </SCFilterButtonGroup>
                </SCFilterContainer>
            </VFTab>
          }
        </SCContainer>
        {
          !isSelectMasterOpen && 
            <TaskBarContainer>
                <VFButtonOutline onClick={()=>setIsSelectMasterOpen(true)} themeUi={themeUi} width={50}>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={"/assets/img/VectorFLOW/NMS/back-btn.svg"} data-testid="back-btn"/>
                  </div>
                </VFButtonOutline>
              {/* <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} disabled={disabled} width={164}>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={disabled ? "/assets/img/VectorFLOW/NMS/edit-online-disabled.svg" : "/assets/img/VectorFLOW/NMS/edit-online.svg"} style={{marginRight:'11px'}}/>
                    <p>Edit Online</p>
                  </div>
              </VFButtonOutline> */}
              <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} width={130}>
                  Reset
              </VFButtonOutline>
              {/* <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={164}>
                  Modify Selected Data
              </VFButton> */}
              <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={160}>
                  Submit
              </VFButton>
              
            </TaskBarContainer>
        }
      </>
    )
  }
  
  export default ViewModify
  