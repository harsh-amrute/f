import { Filter, FilterState } from "../../../../../VectorFlow/types/MTO";
import { useUserData } from "../../../../../context";
import {
  ButtonContainer,
  ButtonFilterWrapper,
  FilterBody,
  FilterCardWrapper,
  FilterComponent,
  FilterHeader,
  SelectDropdownComponent,
  TextFieldHeader,
} from "./styles";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import React, { useEffect, useState } from "react";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { AvailabilityFilter, FilterCheckboxAccordian, FilterMultiSelectCheckbox, FilterSelectDropdown } from "./InputTypes";
import VFMasterFieldSearch from "../../../../../components/VectorFLOW/commons/VFMasterFieldSearch";

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
  const { user } = useUserData();
  const [openStatus, setOpenStatus] = useState<any>({});
  
  const { onGoBack, multiFilter, setMultiFilter, onApplyFilter, isFilterOpen } = props;

  const onFilterChange = (type: string, filterId: string, e: any, parent: string, property: string, header?: string) => {
    // const filterObj: Filter = {
    //   attributeName: "",
    //   value: "",
    //   operator: "",
    //   name: filterId,
    //   options: [],
    // };

    // console.log(type, filterId, e, parent, property, header);

    console.log(e,'EVENT')
    const updatedFilters = multiFilter[parent as keyof FilterState]?.filters || [];

    const getTrimmedValue = (finalValue: any) => {
      return finalValue.split(" ")[0];
    };

    // if (type === "textCompare") {
    //   for (let i = 0; i < updatedFilters.length; i++) {
    //     const { attributeName } = updatedFilters[i];
    //     if (attributeName === filterId) {
    //       updatedFilters[i].value = e.target.value;
    //     }
    //   }
    // }

    // if (type === "multiSelect") {
    //   for (let i = 0; i < updatedFilters.length; i++) {
    //     const { attributeName } = updatedFilters[i];

    //     if (attributeName === filterId) {
    //       if (updatedFilters[i].value?.includes(e.target.name)) {
    //         updatedFilters[i].value = updatedFilters[i]?.value?.filter((val: string) => val != e.target.name);
    //       } else {
    //         updatedFilters[i].value = [...updatedFilters[i].value, e.target.name];
    //       }
    //     }
    //   }
    // }

    for (let i = 0; i < updatedFilters.length; i++) {
      const { attributeName } = updatedFilters[i];
      
      if (attributeName === filterId) {
        if( type === "textCompare"){
          updatedFilters[i][property as keyof Filter]=property === "value" ?  e?.target?.value : e.value;
        }

        if( type === "multiSelect"){
          if (updatedFilters[i].value?.includes(e.target.name)) {
            updatedFilters[i].value = updatedFilters[i]?.value?.filter((val: string) => val != e.target.name);
          } else {
            updatedFilters[i].value = [...updatedFilters[i].value, e.target.name];
          }
        }

        if( type === "search"){
          console.log(e , 'EVENT')

          if(Array.isArray(e)){
            const options = e.map((option) => option.label);
            updatedFilters[i].value = [...options];
          }
        }

        if( type === "select" ){
          updatedFilters[i].value = [e.target.name];
        }
      }
    }

    // console.log(updatedFilters, 'UPDATED');
    setMultiFilter({
      ...multiFilter,
      [parent]: {
        ...multiFilter[parent as keyof FilterState],
        filters: [...updatedFilters],
      },
    });
  };

  const getAPIValue = (values: any) => {
    return values?.map((val:string) => ({ label: val, value: val }));
  };

  useEffect(() => {
    const openFilters: any = {};

    const categories = Object.keys(multiFilter);

    for (let c = 0; c < categories.length; c++) {
      const filters = multiFilter[categories[c] as keyof FilterState]?.filters || [];
      for (let f = 0; f < filters.length; f++) {
        const { type, attributeName } = filters[f];
        if (type === "multiSelect" || type === "select") {
          openFilters[attributeName] = false;
        }
      }
    }

    setOpenStatus(openFilters);
  }, []);

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
        {/* (isLoading || isLocationDataLoading)
                ?
                <VFLoader/>
                : */}
        <React.Fragment>
          <FilterBody>
            {Object.keys(multiFilter).map((category) => {
              return (
                <FilterCardWrapper data-testid="availabilityFilter">
                  <FilterHeader>
                    <p>{multiFilter[category as keyof FilterState]?.label}</p>
                  </FilterHeader>
                  {multiFilter[category as keyof FilterState]?.filters.map((filter: Filter) => {
                    if (filter.type === "textCompare" || filter.type === "numberCompare") {
                      return (
                        <FilterComponent style={{ borderTop: "0.5px solid #B7B7B7" }}>
                          <AvailabilityFilter
                            placeholder={filter.name}
                            onChange={(e: any, key: string) =>
                              onFilterChange("textCompare", filter.attributeName, e, category, key)
                            }
                            header={filter?.name}
                            filterState={multiFilter[category as keyof FilterState]?.filters}
                            filterId={filter?.attributeName}
                          ></AvailabilityFilter>
                        </FilterComponent>
                      );
                    }
                    if (filter.type === "search") {
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
                              onFilterChange("search", filter.attributeName, e, category, "value")
                            }
                            options={filter.options?.map((f: any) => ({
                              label: f,
                              value: f,
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

                    if (filter.type === "select") {
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
                              filterOptions={filter.options?.map((f: any) => ({ label: f, id: f }))}
                              filterState={filter}
                              onChange={(e: any, key: string) =>
                                onFilterChange("select", filter.attributeName, e, category, key)
                              }
                              filterId={filter.attributeName}
                            />
                          </FilterCheckboxAccordian>
                        </FilterComponent>
                      );
                    }
                    if (filter.type === "multiSelect") {
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
                              filterOptions={filter.options?.map((f: any) => ({ label: f, id: f }))}
                              filterState={filter}
                              onChange={(e: any, key: string) =>
                                onFilterChange("multiSelect", filter.attributeName, e, category, key)
                              }
                              filterId={filter.attributeName}
                            />
                          </FilterCheckboxAccordian>
                        </FilterComponent>
                      );
                    }
                  })}
                </FilterCardWrapper>
              );
            })}
          </FilterBody>
          <ButtonFilterWrapper>
            <ButtonContainer>
              <VFButtonOutline themeUi={user.user.theme_ui} onClick={onGoBack}>
                Go Back!
              </VFButtonOutline>
              <VFButton themeUi={user.user.theme_ui} onClick={() => onApplyFilter(multiFilter)}>
                Apply Filter
              </VFButton>
            </ButtonContainer>
          </ButtonFilterWrapper>
        </React.Fragment>
      </VFModalCard>
    </>
  );
};

export default VFCommonFilter;
