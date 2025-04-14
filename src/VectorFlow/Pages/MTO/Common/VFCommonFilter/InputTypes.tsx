import { useSpring, animated } from "react-spring";
import { MultiSelectCheckBoxComponent } from "../../../../../components/VectorFLOW/commons/VFMultiFilter/style";
import { useUserData } from "../../../../../context";
import Select from "react-select";
import { useEffect, useImperativeHandle, useState } from "react";
import { DropdownGroupWrapper, SelectDropdownComponent, OptionsWrapper } from "./styles";
import { Filter } from "../../../../../VectorFlow/types/MTO";
import './style.css'
import { InputTypes } from "../Enum";
import { checkValue } from "../../../../../helpers/utils";
import { filterAttributes, staticHeaderConfig } from '../../../../../VectorFlow/Pages/MTO/Common/VFCommonFilter/Constants';
import { findUniqueKeysAndValues, getDynamicAttributes, getKeyName, getType } from '../../../../../helpers/utils';
import { SCFilterAddButton } from "../../MDM/ViewModify/styles";
import { filter } from "lodash";




interface FilterMultiSelectCheckboxProps {
  filterOptions: Array<{ label: string; id: string }>;
  filterState: Filter;
  header?: string;
  onChange: any;
  filterId?: any;
}

// const { user } = useUserData();
// const themeUi = user.user.theme_ui;

const FilterCheckboxAccordian = ({
  filterType,
  filterKey,
  isOpen,
  setOpenStatus,
  children,
}: any) => {
  
  const openStatusReducer = (prevStatus: any) => {
    Object.keys(prevStatus).forEach((filterType) => {
      if (filterKey !== filterType) {
        prevStatus[filterType] = false;
      }
    });
    return { ...prevStatus, [filterKey]: !prevStatus[filterKey] };
  };

  const openAnimation = useSpring<any>({
    from: { opacity: "0", maxHeight: "25px" },
    to: { opacity: "1", maxHeight: isOpen ? "200px" : "25px" },
    config: { duration: "300" },
  });

  const closeAnimation = useSpring<any>({
    from: { opacity: "0", maxHeight: "0px" },
    to: { opacity: "1", maxHeight: isOpen ? "144px" : "0px" },
    config: { duration: "300" },
  });

  const iconAnimation = useSpring<any>({
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    },
    config: { duration: "120" },
  });

  const {user} = useUserData()
  const themeUi = user?.user?.theme_ui;

  return (
    <>
      <animated.div className="filter-accordian" style={openAnimation}>
        <div
          className="accordian-header "
          onClick={() => {
            setOpenStatus(openStatusReducer);
          }}
          style={{ display: "flex", gap: "1rem" }}
        >
          <p
            className="accordian-title"
            style={{ fontWeight: isOpen ? "500" : "" }}
          >
            {filterType}
          </p>
          <animated.img
            style={iconAnimation}
            src="/assets/img/VectorFLOW/BPR/down-arrow.svg"
            data-testid="down-arrow"
          ></animated.img>
        </div>
        <animated.div
          className="accordian-body  custom-scrollbar"
          style={closeAnimation}
        >
          {children}
        </animated.div>
      </animated.div>
    </>
  );
};

const FilterMultiSelectCheckbox = ({
  filterOptions,
  // header,
  onChange,
  filterState,
}: FilterMultiSelectCheckboxProps) => {
  // const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  return (
    <>
      {filterOptions?.map(
        (option: { label: string; id: string }) => {
          // const color = colorMap[index];
          return (
            <>
              <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                <input
                  key={option.id}
                  type="checkbox"
                  name={option.id}
                  style={{
                    width: "15px",
                    height: "20px",
                    marginRight: "14px;",
                    borderRadius: "2px",
                  }}
                  onChange={(e: any) => onChange(e, "value", option)}
                  checked={checkValue(filterState?.value, option.id)}
                />
                <label
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "300",
                    fontSize: "16px",
                    color: "#313131",
                  }}
                >
                  {option.label}
                </label>
              </MultiSelectCheckBoxComponent>
            </>
          );
        }
      )}
    </>
  );
};

const Checkbox = ({
  filterOptions,
  header,
  onChange,
  filterState,
}: FilterMultiSelectCheckboxProps) => {
  // const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;
  return (
    <>
      <div
          style={{ display: "flex", gap: "1rem", padding: "10px 0px 10px 20px" }}
        >
          <p>
            {header}
          </p>
        </div>
      <OptionsWrapper >
        {filterOptions?.map(
          (option: { label: string; id: string }) => {
            return (
              <>
                <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                  <input
                    key={option.id}
                    type="checkbox"
                    name={option.id}
                    style={{
                      width: "15px",
                      height: "20px",
                      marginRight: "14px;",
                      borderRadius: "2px",
                    }}
                    onChange={(e: any) => onChange(e, "value", option)}
                    checked={checkValue(filterState?.value, option.id)}
                  />
                  <label
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "300",
                      fontSize: "16px",
                      color: "#313131",
                    }}
                  >
                    {option.label}
                  </label>
                </MultiSelectCheckBoxComponent>
              </>
            );
          }
        )}
      </OptionsWrapper>
    </>
  );
};

const FilterSelectDropdown = ({
  placeholder,
  options,
  hideDropdownArrow,
  onChange,
  filterId,
  value,
  resetKey,
  disabled=false,
}: any) => {
  const customStylesClose = {
    control: (baseStyles: any,) => ({
      ...baseStyles,
      height: "39px",
      borderRadius: " 20px 20px 20px 20px",
      background: "#F2F2F2 0% 0% no-repeat padding-box",
      border: "none",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
    }),
    indicatorsContainer: () => ({
      paddingRight: "10px",
    }),
    option: (baseStyles: any) => ({
      ...baseStyles,
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: "12px",
      paddingTop: "3px",
      paddingBottom: "3px",
      cursor: "pointer",
      borderTop: "1px solid #B7B7B7",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      borderRadius: "0px 0px 20px 20px",
      background: "#F2F2F2 0% 0% no-repeat padding-box",
      paddingLeft: "5px",
      marginTop: "0px",
      overflowY: "overlay",
      overflowX: "hidden",

      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "30px",
        opacity: 1,
      },
      "&::-webkit-scrollbar-thumb": {
        width: "7px",
        background: "#D1D1D1 0% 0% no-repeat padding-box",
        boxShadow: "0px 6px 9px #F8F8F8",
        borderRadius: "30px",
        opacity: 1,
      },
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      // marginLeft:hideDropdownArrow ? '' : '23px',
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: "12px",
      textAlign: hideDropdownArrow ? "center" : "",
      padding: "0 5px",
      boxSizing: "border-box",
    }),
    singleValue: (baseStyles: any) => ({
      ...baseStyles,
      // marginLeft:'23px',
      // marginRight:hideDropdownArrow ? '23px' : '23px',
      color: "#313131",
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: "12px",
      textAlign: hideDropdownArrow ? "center" : "",
      padding: "0 5px",
      boxSizing: "border-box",
    }),
  };

  const customStylesOpen = {
    ...customStylesClose,
    control: (baseStyles: any) => ({
      ...baseStyles,
      height: "39px",
      borderRadius: " 20px 20px 0px 0px",
      background: "#F2F2F2 0% 0% no-repeat padding-box",
    }),
  };

  const [customStyles, setCustomStyles] = useState(customStylesClose);

  const handleMenuOpen = () => {
    setCustomStyles(customStylesOpen);
  };

  const handleMenuClose = () => {
    setCustomStyles(customStylesClose);
  };

  return (
    <Select
      options={options}
      isClearable={false}
      unstyled={true}
      styles={customStyles}
      placeholder={placeholder}
      isSearchable={false}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      onChange={onChange}
      aria-label={filterId}
      value={value}
      isDisabled={disabled}
      key={resetKey}
      

      // menuIsOpen={true}
    />
  );
};

const FilterTextInput = ({
  placeholder,
  onChange,
  disabled = false,
  value,
  type = "text",
  name,
  resetKey,
}: any) => {


  return (
    <input
      name={name}
      type={type}
      disabled={disabled}
      className="no-arrows"
      style={{
        width: "100%",
        height: "38px",
        background: "#F2F2F2 0% 0% no-repeat padding-box",
        borderRadius: "20px",
        outline: "none",
        color: "#313131",
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: "14px",
        textAlign: "center",
        border: "none",
        cursor: 'text',
      }}
      placeholder={placeholder}
      onChange={onChange}
       value={value}
       key={resetKey}
    />
  );
};

const AvailabilityFilter = ({placeholder, header, onChange,filterId,filterState, setFilterState, masterFilterState, resetKey}:any)=>{

  const textComparatorConfig: any = {
    et : {value:'et',label:'Equal to'},
    net : {value:'net',label:'Not Equal to'},
    cn: {value:'cn',label:'Contains'},
    dnc : {value:'dnc',label:'Does not contain'},
    sw: {value:'sw',label:'Starts with'},
    dsw: {value:'dsw',label:'Does not start with'},
    ew: {value:'ew',label:'Ends with'},
    dnew: {value:'dnew',label:'Does not end with'},
    hv: {value:'hv',label:'Has value'},
  }
  
  const numberComparatorConfig: any = {
    et: {value:'et', label: '='},
    net:  {value:'net', label: '!='},
    gt: {value:'gt',label:'>'},
    gte: {value:'gte',label:'>='},
    lt: {value:'lt',label:'<'},
    lte: {value:'lte',label:'<='},
  }

  const textComparators = [
    {value:'et',label:'Equal to'},
    {value:'net',label:'Not Equal to'},
    {value: "cn", label: "Contains"},
    {value:'dnc',label:'Does not contain'},
    {value:'sw',label:'Starts with'},
    {value:'dsw',label:'Does not start with'},
    {value:'ew',label:'Ends with'},
    {value:'dnew',label:'Does not end with'},
    {value:'hv',label:'Has value'},
  ]
 
  const numberComparators = [
    {value:'et', label: '='},
    {value:'net', label: '!='},
    {value:'gte',label:'>='},
    {value:'lte',label:'<='},
    {value:'gt',label:'>'},
    {value:'lt',label:'<'},
  ]

  const getNameOptions = (type: string) => {
    if(type==='numberCompare'){
      return numberComparators
    }
    else{
      return textComparators
    }
  }

  const [selectedHeader, setSelectedHeader] = useState<any>(masterFilterState.filters.map((e:any)=> {return e.header}))
  const [selectedOperator, setSelectedOperator] = useState<any>(masterFilterState.filters.map((e:any)=> {return e.operator}))
  const [selectedValue, setSelectedValue] = useState<any[]>(masterFilterState.filters.map((e:any)=> {return e.value}));

  const handleHeaderChange = (selectedOption: any, type: any, index:any) => {
    if(type==="header"){
      const updatedHeaders:any = [...selectedHeader];
      updatedHeaders[index] = selectedOption;
      setSelectedHeader(updatedHeaders);
    }
    else if (type === "operator") {
      const updatedOperator = [...selectedOperator];
      updatedOperator[index] = selectedOption;
      setSelectedOperator(updatedOperator);
    }
    else if(type==='value'){
    const updatedValues = [...selectedValue]; 
    updatedValues[index] = selectedOption.target.value;
    setSelectedValue(updatedValues);
    onChange('numberCompare',selectedHeader?.[index]?.attributeName, selectedOperator, "orders", selectedOperator?.[index]?.value, selectedHeader?.[index]?.value, [{value: updatedValues?.[index]}])
    }
       // type: string, filterId: string, e: any, parent: string, property: string, header?: string, targetValue?: any
    if(type==='operator'){
      onChange('numberCompare',selectedHeader?.[index]?.attributeName, selectedOperator, "orders", selectedOperator?.[index]?.value, selectedHeader?.[index]?.value, [{value: selectedValue?.[index]}])
    }
  };


  useEffect(() => {
    //console.log('')
  }, [filterState]);
  
  const addFilter = () => {
    setFilterState({
      ...masterFilterState,
      filters: 
      [
      ...masterFilterState.filters, 
      { id: Date.now() }
    ]});    
  };


  useEffect(() => {
    const allHaveValues = selectedHeader.length > 0 && selectedOperator.length > 0 && selectedValue.length > 0 
    if (allHaveValues) {
      const updatedFilterState = masterFilterState?.filters?.map((filter: any, index: any) => ({
        id: filter.id,
        header: selectedHeader[index] || null,
        operator: selectedOperator[index] || null,
        value: selectedValue[index] || '',
      }));
  
      setFilterState((prev: any) => ({
        ...prev,
        filters: updatedFilterState,
      }));
    } else {
      // console.log("Skipped setting filterState — arrays are not ready");
    }

  }, [selectedHeader, selectedOperator, selectedValue]);


  useEffect(()=>{
    // console.log("masterfilter state", masterFilterState)
  },[masterFilterState])
  



  useEffect(() => {
    if(resetKey>0){ 
      setSelectedHeader([]);
      setSelectedOperator([]);
      setSelectedValue([]);
      
      const val = {
        ...masterFilterState,
        filters: 
        [
        { id: Date.now() }
      ]}
      setFilterState(val)
    }
  }, [resetKey]);
  

 
  


  const isDisabled = (index: number) => {
    if(selectedHeader[index]===null ||selectedHeader[index]===undefined || selectedHeader[index]==='' ){
     return true;
    }
    else{
      return false;
    }
  };

    const { user } = useUserData();
    const themeUi = user.user.theme_ui;

  const getFilteredHeaderOptions = (index: number) => {

    const selectedKeys = selectedHeader.map((header: any, i: number) => {
    const isDifferentRow = i !== index; 
    const value = header?.value;
    return isDifferentRow ? value : null;
  })
  .filter(Boolean);  
  
    const filteredOptions = header?.filter(
      (e: any) => !selectedKeys.includes(e.name)
    )?.map((e: any) => ({
      key: e.name,
      value: e.name,
      label: e.name,
      type: e.type,
      attributeName: e.attributeName
    })) || [];
  
    return filteredOptions;
  };
  

      return (
      <>
       {masterFilterState?.filters?.map((filter:any, index:any) => (
      <div key={filter.id} style={{ display: "flex",  width: index === 0 ? "100%" : "90%"}}>
    
      <div style={{ display: "flex", justifyContent: "space-between", width: index === 0 ? 'calc(100% - 40px)' : '100%' }}>
      <DropdownGroupWrapper>
        <SelectDropdownComponent style={{ width:'87%' }}>
          <FilterSelectDropdown
            className="custom-scrollbar"
            placeholder={"Select"}
            options={getFilteredHeaderOptions(index)}
            onChange={(option: any) => handleHeaderChange(option, 'header', index)}
            filterId={filterId}
            value={selectedHeader?.[index]}
            resetKey={resetKey}
          />
        </SelectDropdownComponent>

        <SelectDropdownComponent style={{ width: "100%", cursor: isDisabled(index) ? 'default' : 'pointer' }}>
          <FilterSelectDropdown
            style={{ background: isDisabled(index) ? "pink" : "#F2F2F2" }}
            className="custom-scrollbar"
            placeholder={'Operator'}
            type={filterState.type === InputTypes.TextCompare ? "text" : "number"}
            options={getNameOptions(selectedHeader?.[index]?.type)}
            hideDropdownArrow
            key={new Date()} 
            onChange={(e: any) => handleHeaderChange(e, 'operator', index)}
            filterId={filterId}
            value={selectedOperator?.[index] || null}
            disabled={isDisabled(index)}
            resetKey={resetKey}
          />
        </SelectDropdownComponent>

        <SelectDropdownComponent style={{ width: "100%" }}>
          <FilterTextInput
            name={header}
            type={selectedHeader[index]?.type === InputTypes.TextCompare ? "text" : "number"}
            placeholder={"Value"}
            onChange={(e: any) => handleHeaderChange(e, 'value', index)}
            header={header}
            value={selectedValue?.[index] || ''}
            disabled={isDisabled(index)}
            resetKey={resetKey}
          />
        </SelectDropdownComponent>
      </DropdownGroupWrapper>
    </div>

    {index === 0 && (
      <div style={{
        width: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <SCFilterAddButton
          onClick={addFilter}
          src={themeUi==="REGALBLAZE" ? "/assets/img/VectorFLOW/NMS/add-filter-regal.svg"
            :"/assets/img/VectorFLOW/NMS/add-filter.svg"}
          data-testid="add-filter"
        />
      </div>
    )}
  </div>

  
))}

      </>
    );
  };


export {
  FilterCheckboxAccordian,
  FilterMultiSelectCheckbox,
  FilterSelectDropdown,
  FilterTextInput,
  AvailabilityFilter,
  Checkbox
};
