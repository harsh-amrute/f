import { useSpring, animated, Any } from "react-spring";
import { MultiSelectCheckBoxComponent } from "../../../../../components/VectorFLOW/commons/VFMultiFilter/style";
import { useUserData } from "../../../../../context";
import Select from "react-select";
import { useState } from "react";
import { DropdownGroupWrapper, SelectDropdownComponent } from "./styles";
import { Filter } from "../../../../../VectorFlow/types/MTO";
import './style.css'

interface FilterMultiSelectCheckboxProps {
  filterOptions: Array<{ label: string; id: string }>;
  filterState: Filter;
  header?: string;
  onChange: any;
  filterId?: any;
}

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
  header,
  onChange,
  filterState,
}: FilterMultiSelectCheckboxProps) => {
  const colorMap: string[] = ["#9A0101", "#EBBF2B", "#418D18"];

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;
  return (
    <>
      {filterOptions.map(
        (option: { label: string; id: string }, index: number) => {
          const color = colorMap[index];
          return (
            <>
              <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                <input
                  type="checkbox"
                  name={option.label}
                  style={{
                    width: "15px",
                    height: "20px",
                    marginRight: "14px;",
                    borderRadius: "2px",
                  }}
                  onChange={(e: any) => onChange(e, "value")}
                  checked={filterState?.value.includes(option.label)}
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

const FilterSelectDropdown = ({
  placeholder,
  options,
  hideDropdownArrow,
  onChange,
  filterId,
  value,
}: any) => {
  const customStylesClose = {
    control: (baseStyles: any) => ({
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
      // marginTop:'5px',
      // marginBottom:'5px',
      // marginLeft:'5px',
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
      // menuIsOpen={true}
    />
  );
};

const FilterTextInput = ({
  placeholder,
  onChange,
  disabled = false,
  value,
  type = "text"
}: any) => {
  return (
    <input
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
        fontWeight: "300",
        fontSize: "12px",
        textAlign: "center",
        border: "none",
      }}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

const AvailabilityFilter = ({placeholder, header, onChange,filterId,filterState}:any)=>{

  const comparatorConfig: any = {
    equalto : {value:'equalto',label:'Equal to'},
    notequalto : {value:'notequalto',label:'Not Equal to'},
    doesnotcontain : {value:'doesnotcontain',label:'Does not contain'},
    startswith: {value:'startswith',label:'Starts with'},
    doesnotstartwith: {value:'doesnotstartwith',label:'Does not start with'},
    endswith: {value:'endswith',label:'Ends with'},
    doesnotendwith: {value:'doesnotendwith',label:'Does not end with'},
    hasvalue: {value:'hasvalue',label:'Has value'},
    greaterthan: {value:'greaterthan',label:'>'},
    greaterthanequalto: {value:'greaterthanequalto',label:'>='},
    smallerthan: {value:'smallerthan',label:'<'},
    smallerthanequalto: {value:'smallerthanequalto',label:'<='},
  }

  const textComparators = [
    {value:'equalto',label:'Equal to'},
    {value:'notequalto',label:'Not Equal to'},
    {value:'doesnotcontain',label:'Does not contain'},
    {value:'startswith',label:'Starts with'},
    {value:'doesnotstartwith',label:'Does not start with'},
    {value:'endswith',label:'Ends with'},
    {value:'doesnotendwith',label:'Does not end with'},
    {value:'hasvalue',label:'Has value'},
  ]

  const numberComparators = [
    {value:'greaterthanequalto',label:'>='},
    {value:'smallerthanequalto',label:'<='},
    {value:'greaterthan',label:'>'},
    {value:'smallerthan',label:'<'},
  ]
  
  const getOperatorValue = (type: string)=>{
      const operator = filterState.operator;
      if(type === "textCompare"){
        return comparatorConfig[operator] || textComparators[0]
      }
      return comparatorConfig[operator] || numberComparators[0]
  }

  const getValue = ()=>{
      return filterState ? filterState.value : ''
  }

  const getOptions = (type: string) => {
    return type === 'textCompare' ? textComparators : numberComparators
  }

  return(
    <>
      <DropdownGroupWrapper>
        <SelectDropdownComponent data-testid="BPR-filter-dropdown">
          <FilterTextInput disabled={true} placeholder={placeholder} />  
        </SelectDropdownComponent>
        <SelectDropdownComponent data-testid="BPR-filter-dropdown">
          <FilterSelectDropdown className="custom-scrollbar" placeholder={"<="} options={getOptions(filterState.type)} hideDropdownArrow onChange={(e:any)=>onChange(e,'operator')} filterId={filterId} value={getOperatorValue(filterState.type)}/>    
        </SelectDropdownComponent>
        <SelectDropdownComponent data-testid="BPR-filter-dropdown">
          <FilterTextInput type={filterState.type === "textCompare" ? "text" : 'number'} placeholder={'Value'} onChange={(e:any)=>onChange(e,'value')} header={header} value={getValue()}/>    
        </SelectDropdownComponent>  
      </DropdownGroupWrapper>  
    </>     
  )
}

export {
  FilterCheckboxAccordian,
  FilterMultiSelectCheckbox,
  FilterSelectDropdown,
  FilterTextInput,
  AvailabilityFilter
};
