import { Filter, FilterState } from "../../../../../VectorFlow/types/MTO";
import { useUserData } from "../../../../../context";
import {
  ButtonContainer,
  ButtonFilterWrapper,
  FilterBody,
  FilterCardWrapper,
  FilterComponent,
  FilterHeader,
  FilterWrapper,
  NoFilterWrapper,
} from "./styles";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import React, { useEffect, useState } from "react";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { AvailabilityFilter, FilterCheckboxAccordian, FilterMultiSelectCheckbox, Checkbox } from "./InputTypes";
import VFMasterFieldSearch from "../../../../../components/VectorFLOW/commons/VFMasterFieldSearch";
import { formatFilterJSON } from "../../../../../helpers/utils";
import { InputTypes } from "../Enum";

interface VFCommonFilterProps {
  onApplyFilter: (params: any) => void;
  onGoBack: () => void;
  selectedOption?: () => void;
  toggleAdd?: () => void;
  placeholder?: string;
  multiFilter: FilterState;
  setMultiFilter: any;
  isFilterOpen: boolean;
}

const VFCommonFilter = (props: VFCommonFilterProps) => {
  const { onGoBack, multiFilter, setMultiFilter, onApplyFilter, isFilterOpen } = props;
  const [filterState, setFilterState] = useState<any>({});
  const [openStatus, setOpenStatus] = useState<any>({});
  const { user } = useUserData();
  

  const onFilterChange = (type: string, filterId: string, e: any, parent: string, property: string, header?: string, targetValue?: any) => {

    const updatedFilters = filterState[parent as keyof FilterState]?.filters || [];
    for (let i = 0; i < updatedFilters.length; i++) {
      const { attributeName } = updatedFilters[i];
      
      if (attributeName === filterId) {
        if( type === InputTypes.TextCompare || type === InputTypes.NumberCompare){

          let val = e?.value;
          if(property === 'value'){
            val = type === InputTypes.NumberCompare ? Number(e?.target?.value) : e?.target?.value;
          } 
          updatedFilters[i][property as keyof Filter]= val;
        }

        if( type === InputTypes.MultiSelect ){
          if (updatedFilters[i].value?.includes(targetValue)) {
            updatedFilters[i].value = updatedFilters[i]?.value?.filter((v: any) => v !== targetValue);
          } else {
            updatedFilters[i].value = [...updatedFilters[i].value, targetValue];
          }
        }

        if( type === InputTypes.Checkbox){
          if (updatedFilters[i].value?.includes(targetValue)) {
            updatedFilters[i].value = updatedFilters[i]?.value?.filter((v: any) => v !== targetValue);
          } else {
            updatedFilters[i].value = [...updatedFilters[i].value, targetValue];
          }
        }

        if( type === InputTypes.Search){
          if(Array.isArray(e)){
            const options = e.map((option) => option.value);
            updatedFilters[i].value = [...options];
          }
        }

        if( type === InputTypes.Select){
          updatedFilters[i].value = e.target.name === updatedFilters[i].value[0] ? [] : [e.target.name];
        }
      }
    }

    setFilterState({
      ...filterState,
      [parent]: {
        ...filterState[parent as keyof FilterState],
        filters: [...updatedFilters],
      },
    });
  };

  const getAPIValue = (values: any) => {
    if(values){
      return values?.map((val:string) => ({ label: val, value: val }));
    }
    return [];
  };

  useEffect(() => {
    const openFilters: any = {};

    const categories = Object.keys(filterState);

    for (let c = 0; c < categories.length; c++) {
      const filters = filterState[categories[c] as keyof FilterState]?.filters || [];
      for (let f = 0; f < filters.length; f++) {
        const { type, attributeName } = filters[f];
        if ( type === InputTypes.MultiSelect || type === InputTypes.Select ) {
          openFilters[attributeName] = false;
        }
      }
    }

    setOpenStatus(openFilters);
  }, []);

  useEffect(() => {
    if(Object.keys(multiFilter).length){
      setFilterState(JSON.parse(JSON.stringify(multiFilter)));
    }
  },[multiFilter]);

  const filterKeys = Object.keys(filterState) || [];
  return (
    <>
      <VFModalCard
        zoom={"0.73"}
        openModal={isFilterOpen}
        closeModal={onGoBack}
        headerIcon={"/assets/img/VectorFLOW/BPR/select-filter.svg"}
        headerText={"Select Filter"}
        closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
        paddingLeftAndRight={0}
        backgroundColor={"#f4f4f4"}
        data-testid="vfmultifilter-img"
      >
        {filterKeys.length === 0 ? 
          <div data-testid="filter-loader" className="loading" style={{ height: '300px' }}>
            <VFLoader/> 
          </div>
          : 
          <React.Fragment>
            <FilterBody>
              {filterKeys?.map((category) => {
                return (
                  <FilterCardWrapper data-testid="availabilityFilter">
                    <FilterHeader>
                      <p>{filterState[category as keyof FilterState]?.label}</p>
                    </FilterHeader>
                    <FilterWrapper className="drop-down-options">
                      {filterState[category as keyof FilterState]?.filters.map((filter: Filter) => {
                        
                        if (filter?.type === InputTypes.TextCompare || filter?.type === InputTypes.NumberCompare) {
                          return (
                            <FilterComponent data-testid="" style={{ borderTop: "0.5px solid #B7B7B7" }}>
                              <AvailabilityFilter

                                placeholder={filter?.name}
                                onChange={(e: any, key: string) =>
                                  onFilterChange(filter.type, filter.attributeName, e, category, key)
                                }
                                header={filter?.name}
                                filterState={filter}
                                filterId={filter?.attributeName}
                              ></AvailabilityFilter>
                            </FilterComponent>
                          );
                        }

                        if (filter.type === InputTypes.Search) {
                          return (
                            <FilterComponent
                              style={{
                                borderTop: "0.5px solid #B7B7B7",
                                marginBottom: "5px",
                              }}
                            >
                              <VFMasterFieldSearch
                                value={getAPIValue(filter.value)}
                                setValue={(e: any) =>
                                  onFilterChange(InputTypes.Search, filter.attributeName, e, category, "value")
                                }
                                options={filter.options?.map((f: any) => ({
                                  label: f.label,
                                  value: f.id,
                                }))}
                                placeholder={`${filter.name}`}
                                handleListChild={() => console.log("")}
                                maxToShow={3}
                                backgroundColor={"#F2F2F2"}
                                borderRadius={40}
                                disabled={false}
                                boxShadow={"0"}
                              />
                            </FilterComponent>
                          );
                        }

                        if (filter.type === InputTypes.Select) {
                          return (
                            <FilterComponent
                              style={{
                                borderTop: "0.5px solid #B7B7B7",
                                height: openStatus[filter.attributeName] ? "unset" : "50px",
                              }}
                            >
                              <FilterCheckboxAccordian
                                filterType={filter.name}
                                filterKey={filter.attributeName}
                                isOpen={openStatus[filter.attributeName]}
                                setOpenStatus={setOpenStatus}
                              >
                                <FilterMultiSelectCheckbox
                                  header={filter.name}
                                  filterOptions={filter.options?.map((f: any) => ({ label: f.label, id: f.id }))}
                                  filterState={filter}
                                  onChange={(e: any, key: string) =>
                                    onFilterChange(InputTypes.Select, filter.attributeName, e, category, key)
                                  }
                                  filterId={filter.attributeName}
                                />
                              </FilterCheckboxAccordian>
                            </FilterComponent>
                          );
                        }
                      
                        if (filter.type === InputTypes.Checkbox) {
                          return (
                            <FilterComponent
                              style={{
                                borderTop: "0.5px solid #B7B7B7",
                                height: "90px",
                              }}
                            >
                                <Checkbox
                                  header={filter.name}
                                  filterOptions={filter.options?.map((f: any) => ({ label: f.label, id: f.id }))}
                                  filterState={filter}
                                  onChange={(e: any, key: string, targetVal: any) =>
                                    onFilterChange(InputTypes.Checkbox, filter.attributeName, e, category, key, '', targetVal)
                                  }
                                  filterId={filter.attributeName}
                                />
                            </FilterComponent>
                          );
                        }
                        
                        if (filter.type === InputTypes.MultiSelect) {
                          return (
                            <FilterComponent
                              style={{
                                borderTop: "0.5px solid #B7B7B7",
                                height: openStatus[filter.attributeName] ? "unset" : "50px",
                              }}
                            >
                              <FilterCheckboxAccordian
                                filterType={filter.name}
                                filterKey={filter.attributeName}
                                isOpen={openStatus[filter.attributeName]}
                                setOpenStatus={setOpenStatus}
                              >
                                <FilterMultiSelectCheckbox
                                  header={filter.name}
                                  filterOptions={filter.options?.map((f: any) => ({ label: f.label, id: f.id }))}
                                  filterState={filter}
                                  onChange={(e: any, key: string, targetVal: any) =>
                                    onFilterChange(InputTypes.MultiSelect, filter.attributeName, e, category, key,"", targetVal)
                                  }
                                  filterId={filter.attributeName}
                                />
                              </FilterCheckboxAccordian>
                            </FilterComponent>
                          );
                        }

                      })}
                    </FilterWrapper>
                  </FilterCardWrapper>
                );
              })}
            </FilterBody>
            <ButtonFilterWrapper>
              <ButtonContainer>
                <VFButtonOutline data-testid="goBack" themeUi={user.user.theme_ui} onClick={ () => {
                  setFilterState(multiFilter);
                  onGoBack()
                }
                }>
                  Go Back!
                </VFButtonOutline>
                <VFButton data-testid="applyFilter" themeUi={user.user.theme_ui} onClick={() =>{
                  const formatedFilters = formatFilterJSON(filterState);
                  setMultiFilter(filterState);
                  onApplyFilter(formatedFilters);
                }}>
                  Apply Filter
                </VFButton>
              </ButtonContainer>
            </ButtonFilterWrapper>
          </React.Fragment>
        }
      </VFModalCard>
    </>
  );
};

export default VFCommonFilter;
