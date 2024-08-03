import { useSpring, animated, Any } from "react-spring";
import { MultiSelectCheckBoxComponent } from "../../../../../components/VectorFLOW/commons/VFMultiFilter/style";
import { useUserData } from "../../../../../context";
import Select from "react-select";
import { useState } from "react";
import { DropdownGroupWrapper, SelectDropdownComponent } from "./styles";
import { Filter } from "../../../../../VectorFlow/types/MTO";

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
}: any) => {
  return (
    <input
      type="text"
      disabled={disabled}
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


  const filterLocationOptions = [
      {value:'l1',label:'L1'},
      {value:'l2',label:'L2'},
      {value:'l3',label:'L3'},
      {value:'l4',label:'L4'},
      {value:'l5',label:'L5'}, 
  ]

  const filterProductOptions = [
      {value:'p1',label:'P1'},
      {value:'p2',label:'P2'},
      {value:'p3',label:'P3'},
      {value:'p4',label:'P4'},
      {value:'p5',label:'P5'},  
  ]

  const colorFilterOptions = [
      {value:'black',label:'Black'},
      {value:'black/red',label:'Black/Red'},
      {value:'red',label:'Red'},
      {value:'yellow',label:'Yellow'},
      {value:'green',label:'Green'},
      {value:'white',label:'White'},
  ]

  const colorTypeFilterOptions =[
      {value:'colorcount', label:'Color Count'},
      {value:'colorage', label:'Color Age'},
  ]

  const comparisionOptions = [
      {value:'equalto',label:'Equal to'},
      {value:'notequalto',label:'Not Equal to'},
      {value:'greaterthan',label:'>'},
      {value:'greaterthanequalto',label:'>='},
      {value:'smallerthan',label:'<'},
      {value:'smallerthanequalto',label:'<='},
      {value:'doesnotcontain',label:'Does not contain'},
      {value:'startswith',label:'Starts with'},
      {value:'doesnotstartwith',label:'Does not start with'},
      {value:'endswith',label:'Ends with'},
      {value:'doesnotendwith',label:'Does not end with'},
      {value:'hasvalue',label:'Has value'},
      // {value:'hasnovalue',label:'Has no value'},
  ]
  
  const getOperatorValue = ()=>{
      const doesFilterExist = filterState.find((filter:any)=>filter.name===filterId)
      if(doesFilterExist){
          return comparisionOptions.find((c:any)=>c.value===doesFilterExist.operator)
      }
      return comparisionOptions[5]
  }

  const getValue = ()=>{

      const doesFilterExist = filterState.find((o:any)=>o.attributeName===filterId)
      if(doesFilterExist){
          return doesFilterExist.value
      }
      return ''
  }
  

  const getDropDownValue = (options:any)=>{
      const doesFilterExist = filterState.find((m:any)=>m.name==filterId)
     if(doesFilterExist){
       if(options==='colorFilterOptions')return colorFilterOptions.find((n:any)=>n.value==doesFilterExist.attributeName)
          if(options==='filterLocationOptions') {
          return filterLocationOptions.find((n:any)=>n.value==doesFilterExist.attributeName)
          }
      if(options==='filterProductOptions'){
          return filterProductOptions.find((n:any)=>n.value==doesFilterExist.attributeName)
      }
      if(options==='colorTypeFilterOptions'){
          return colorTypeFilterOptions.find((n:any)=>n.value==doesFilterExist.type)
      } 
     
     }
         
  }

   
  return(
      <>
          <DropdownGroupWrapper>
                {
                  header==="Availabilty Filter" ?
                  <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                      <FilterTextInput disabled={true} placeholder={placeholder} />  
                  </SelectDropdownComponent> 
                  : 
                  <SelectDropdownComponent data-testid="BPR-filter-dropdown">
  
                      {(header!=="Location Filter" && header!=="Color Filter")&& <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={filterProductOptions} onChange={(e:any)=>onChange(e,'attributeName')} filterId={filterId} value={getDropDownValue('filterProductOptions')} />}
                      {header==="Location Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={filterLocationOptions} onChange={(e:any)=>onChange(e,'attributeName')} filterId={filterId} value={getDropDownValue('filterLocationOptions')} />}
                      {header ==="Color Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={colorTypeFilterOptions} onChange={(e:any)=>onChange(e,'type')} filterId={filterId} value={getDropDownValue('colorTypeFilterOptions')} />}
                  </SelectDropdownComponent>
                  }
              {header === "Color Filter" && (
                   <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                      <FilterSelectDropdown className="custom-scrollbar" placeholder={"Color"} options={colorFilterOptions} hideDropdownArrow onChange={(e:any)=>onChange(e,'attributeName')} filterId={filterId} value={getDropDownValue('colorFilterOptions')}/>    
                   </SelectDropdownComponent>
              )}
              
              <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                  <FilterSelectDropdown className="custom-scrollbar" placeholder={"<="} options={comparisionOptions} hideDropdownArrow onChange={(e:any)=>onChange(e,'operator')} filterId={filterId} value={getOperatorValue()}/>    
              </SelectDropdownComponent>
              <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                  <FilterTextInput placeholder={'Value'} onChange={(e:any)=>onChange(e,'value')} header={header} value={getValue()}/>    
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
