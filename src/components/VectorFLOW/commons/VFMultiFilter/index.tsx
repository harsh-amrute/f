import VFButton from "../VFButton"
import VFModalCard from "../VFModalCard"
import { useUserData } from "../../../../context";
import { ButtonFilterWrapper, FilterCardWrapper, FilterBody, FilterHeader, ButtonContainer, FilterComponent, SelectDropdownComponent, DropdownGroupWrapper, MultiSelectCheckBoxComponent,TextFieldHeader } from "./style";
import VFButtonOutline from "../VFButtonOutline";
import { useState } from "react";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import { useSpring, animated, AnimatedProps } from "react-spring";
import Select, { components } from "react-select";
import './styles.css';
import { useLocation } from "react-router-dom";


interface VFMultiFilterProps{
    onApplyFilter:()=>void
    onGoBack:()=>void
    selectedOption?:()=>void
    options:any[]
    toggleAdd?:()=>void
    placeholder?:string
    filters:any
    setFilters:any
    
}

//Filterbox ka animation Location vala checkbox ka
const FilterCheckboxAccordian = ({filterType,filterKey,isOpen,setOpenStatus,children}:any) => {

    const openStatusReducer = (prevStatus:any)=> {
        Object.keys(prevStatus).forEach((filterType)=>{
            if(filterKey !== filterType){
                prevStatus[filterType] = false;
            }
        })
        return {...prevStatus,[filterKey]:!prevStatus[filterKey]}
    }

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
            config: { duration: "120" }
            
      });

    return(
        <animated.div className="filter-accordian" style={openAnimation}>
            <div className="accordian-header " onClick={()=>{setOpenStatus(openStatusReducer)}} style={{display: 'flex', gap:'1rem'}}>
                <p className='accordian-title' style={{fontWeight:isOpen ? '500':''}}>{filterType}</p>
                <animated.img style={iconAnimation} src="/assets/img/VectorFLOW/BPR/down-arrow.svg"></animated.img>
            </div>
                <animated.div className='accordian-body  custom-scrollbar'  style={closeAnimation}>
                    {children}
                </animated.div>
        </animated.div>
    )
}

const FilterMultiSelectCheckbox = ({filterOptions, header,}:any)=>{
    const colorMap:string[] = ['#9A0101', '#EBBF2B', '#418D18']

    return(
            filterOptions.map((option: any, index:number) =>{
                const color = colorMap[index];
                return(
                    <MultiSelectCheckBoxComponent key={option}>
                        <input type="checkbox" style={{ width:'15px',height:'20px',marginRight:'14px;',borderRadius: '2px'}}/>
                        {header==='Coverage Filter' ? 
                            <div style={{height:'12px', width:'12px', backgroundColor:color}} ></div>
                        :null}
                        <label style={{fontFamily: 'Roboto',fontWeight: '300',fontSize: '16px',color:'#313131'}}>{option}</label>
                    </MultiSelectCheckBoxComponent>
                )
             })
    )
}


//jismai 3 div hai sku and value sab ka i.e availbailty filter ka
const FilterSelectDropdown = ({placeholder,options,hideDropdownArrow,giveValue}:any) => {
    

    const customStylesClose = {
        control: (baseStyles:any,state:any)=>(
            {
                ...baseStyles,
                height:'39px',
                borderRadius:' 20px 20px 20px 20px',
                background: '#F2F2F2 0% 0% no-repeat padding-box',
                border:'none',
                cursor:'pointer',
                display:'flex',
                justifyContent:'center',
               
                
            }
        ),
        option: (baseStyles:any,state:any)=>(
            {
                ...baseStyles,
                color:'#313131',
                fontFamily:'Roboto',
                fontWeight:'300',
                fontSize:'12px',
                // marginTop:'5px',
                // marginBottom:'5px',
                // marginLeft:'5px',
                paddingTop:'3px',
                paddingBottom:'3px',
                cursor:'pointer',
                borderTop:'1px solid #B7B7B7',
            }
        ),
        menuList:(baseStyles:any,state:any)=>(
            {
                ...baseStyles,
                borderRadius:'0px 0px 20px 20px',
                background:'#F2F2F2 0% 0% no-repeat padding-box',
                paddingLeft:'5px',
                marginTop:'0px',
                overflowY:'overlay',
                overflowX:'hidden',  

                '&::-webkit-scrollbar': {
                    width: '7px',
                  },
                  '&::-webkit-scrollbar-track': {
                    borderRadius: '30px',
                    opacity: 1,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    width: '7px',
                    background: '#D1D1D1 0% 0% no-repeat padding-box',
                    boxShadow: '0px 6px 9px #F8F8F8',
                    borderRadius: '30px',
                    opacity: 1,
                  },
            }
        ),
        placeholder:(baseStyles:any,state:any)=>(
            {
                ...baseStyles,
                // marginLeft:hideDropdownArrow ? '' : '23px',
                color:'#313131',
                fontFamily:'Roboto',
                fontWeight:'300',
                fontSize:'12px',
                textAlign:hideDropdownArrow ? 'center' : '',
                padding: '0 5px',
                boxSizing: "border-box"  
            }
        ),
       singleValue:(baseStyles:any,state:any)=>(
        {
            ...baseStyles,
            // marginLeft:'23px',
            // marginRight:hideDropdownArrow ? '23px' : '23px',
            color:'#313131',
            fontFamily:'Roboto',
            fontWeight:'300',
            fontSize:'12px',
            textAlign:hideDropdownArrow ? 'center' : '',
            padding: '0 5px',
            boxSizing: "border-box"       
        }
    ),
    }

    const customStylesOpen = {
        ...customStylesClose,
        control:(baseStyles:any,state:any)=>({
            ...baseStyles,
            height:'39px',
            borderRadius:' 20px 20px 0px 0px',
            background: '#F2F2F2 0% 0% no-repeat padding-box',
        })
    }

    const [customStyles,setCustomStyles] = useState(customStylesClose);

    const handleMenuOpen = ()=>{
        setCustomStyles(customStylesOpen);
    }

    const handleMenuClose = () => {
        setCustomStyles(customStylesClose);
    }

    return(
        <Select
            options={options}
            isClearable={false}
            unstyled={true}
            styles={customStyles}
            placeholder={placeholder}
            isSearchable={false}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            // menuIsOpen={true}
        />
    )
}
const FilterTextInput = ({placeholder}:any) => {
    return(
        <input type="text" style={{width:'100%', height:'38px',background:'#F2F2F2 0% 0% no-repeat padding-box', borderRadius:'20px',outline:'none',color:'#313131',fontFamily:'Roboto',fontWeight:'300',fontSize:'12px', textAlign:'center', border:'none'}}placeholder={placeholder}/>
    )
}


const AvailabilityFilter = ({placeholder, header}:any) => {

    const [openStatus,setOpenStatus] = useState({
        eco_color:false,
        phasein:false,
        tech_color:false,
    })

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
        {value:'hasnovalue',label:'Has no value'},
    ]
    
    return(
            <DropdownGroupWrapper>
                  
                  {header==="Availabilty Filter" ?
                    <SelectDropdownComponent>
                    <FilterTextInput placeholder={placeholder} />    
                </SelectDropdownComponent> 
                  : 
                    <SelectDropdownComponent >
                <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={header==="Location Filter" ? filterLocationOptions : filterProductOptions}/>
                    </SelectDropdownComponent>
                    }

                {header === "Color Filter" &&(
                     <SelectDropdownComponent>
                     <FilterSelectDropdown className="custom-scrollbar" placeholder={"Color"} options={comparisionOptions} hideDropdownArrow/>    
                 </SelectDropdownComponent>
                )}
                
                <SelectDropdownComponent >
                    <FilterSelectDropdown className="custom-scrollbar" placeholder={"<="} options={comparisionOptions} hideDropdownArrow/>    
                </SelectDropdownComponent>
                <SelectDropdownComponent>
                    <FilterTextInput placeholder={'Value'} />    
                </SelectDropdownComponent>  
            </DropdownGroupWrapper>       
    )
}

const VFMultiFilter=(props:VFMultiFilterProps)=>{

    const {user} = useUserData()

    const onClick=(name:string,newValue:any)=>{
        const filterObj = {
                attribute:"",
                value:"",
                operator:"",
        }
        setFilters({ ...filters, name,newValue });
    }
    
    const{
        onApplyFilter,
        onGoBack,
        selectedOption,
        options,
        filters,
        setFilters
        
    } = props

    const [openStatus,setOpenStatus] = useState({
        category:false,
        location:false,
        loc_children:false,
        availabilty_tech_color:false,
        availabilty_eco_color:false,
        availabilty_tags:false,
        coverage_filter:false,
        model:false
    })

    const [child, setChild] = useState({
        location_type:true,
        loc_children_type:true,
    })

    const { pathname } = useLocation();

    return(
        <>
        <VFModalCard openModal={true} closeModal={()=>(console.log(""))} headerIcon={'/assets/img/VectorFLOW/BPR/select-filter.svg'} headerText={'Select Filter'} closeIcon={'/assets/img/VectorFLOW/NMS/close-dark.svg'} paddingLeftAndRight={0} backgroundColor={'#f4f4f4'}>
            <FilterBody>
                <FilterCardWrapper>
                    <FilterHeader >
                        <p>Supply Chain Node Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.location?'unset' : '50px'}}>
                        <FilterCheckboxAccordian filterType="For Locations" filterKey="location" isOpen={openStatus.location} setOpenStatus={setOpenStatus}>
                        <FilterCheckboxAccordian filterType="Location Type" filterKey="location_type" isOpen={child.location_type} setOpenStatus={setChild}  style={{paddingLeft:'50px', maxHeight:'unset'}}>
                            <FilterMultiSelectCheckbox filterOptions={['Plant','Supplier', 'CWH']} onClick={(e:any) => onClick("SupplyChain", e.target.value)}/>
                        </FilterCheckboxAccordian>
                        </FilterCheckboxAccordian>
                    </FilterComponent>
                    {openStatus.location ?
                    <>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>  
                        <TextFieldHeader>
                            <p>Specific Locations</p>
                        </TextFieldHeader>         
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Location Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            
                        />
                    </FilterComponent>
                    <FilterComponent style={{ marginBottom:'5px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Location Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                        />
                    </FilterComponent>
                    </>
                    : null 
                    } 
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.loc_children?'unset' : '50px'}}>
                        <FilterCheckboxAccordian filterType="For Children Of" filterKey="loc_children" isOpen={openStatus.loc_children} setOpenStatus={setOpenStatus}>
                        <FilterCheckboxAccordian filterType="Location Type" filterKey="loc_children_type" isOpen={child.loc_children_type} setOpenStatus={setChild} style={{paddingLeft:'50px'}}>
                        <FilterMultiSelectCheckbox filterOptions={['Child','Kit', 'ok']} onClick={onClick}/>
                        </FilterCheckboxAccordian>
                        </FilterCheckboxAccordian>
                    </FilterComponent>
                    {openStatus.loc_children ?
                    <>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>  
                        <TextFieldHeader>
                            <p>Specific Locations</p>
                        </TextFieldHeader>         
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Location Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                        />
                    </FilterComponent>
                    <FilterComponent style={{ marginBottom:'5px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Location Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                        />
                    </FilterComponent>
                    </>
                    : null 
                    } 
                </FilterCardWrapper>

                <FilterCardWrapper>
                    <FilterHeader>
                        <p>Location Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter placeholder={"L1"} onClick={onClick} header="Location Filter"></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"L2"}  onClick={onClick} header="Location Filter"></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"L3"}  onClick={onClick} header="Location Filter"></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"L4"}  onClick={onClick} header="Location Filter"></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"L5"}  onClick={onClick} header="Location Filter"></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'For Location'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            boxShadow={'0'}
                            
                        />
                    </FilterComponent>     
                </FilterCardWrapper>

                <FilterCardWrapper>
                    <FilterHeader>
                        <p>Product Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter placeholder={"P1"} onClick={onClick} ></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P2"} onClick={onClick}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P3"} onClick={onClick}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P4"} onClick={onClick}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P5"} onClick={onClick}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Enter SKU Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            margin-bottom={'10px'}
                        />
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={()=>console.log('')} 
                            options={options} 
                            placeholder={'Enter Description'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            margin-bottom={'10px'}
                        />
                        </FilterComponent>
                </FilterCardWrapper>

                {(pathname==='/supply-chain-intelligence-hub/BPR/monitor-goods'|| 
                    pathname==='/supply-chain-intelligence-hub/BPR/expedite' || 
                    pathname==='/supply-chain-intelligence-hub/RRR/excess-inventory' ||
                    pathname==='/supply-chain-intelligence-hub/BOR' ||
                    pathname==='/supply-chain-intelligence-hub/BTR' ||
                    pathname==='/supply-chain-intelligence-hub/Research-insights' ) && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Availabilty Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Norm"} onClick={onClick} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Stock"} onClick={onClick} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Git"} onClick={onClick} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Availabilty"} onClick={onClick} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tech_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Execution Tech. color" filterKey="availabilty_tech_color" isOpen={openStatus.availabilty_tech_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onClick={onClick}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_eco_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Execution Eco. color" filterKey="availabilty_eco_color" isOpen={openStatus.availabilty_eco_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onClick={onClick}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tags?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Tags(PIPO, Seasonality)" filterKey="availabilty_tags" isOpen={openStatus.availabilty_tags} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onClick={onClick}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                </FilterCardWrapper>
                  )}

                {pathname==='/supply-chain-intelligence-hub/BTR' && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Color Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onClick={onClick}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onClick={onClick}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onClick={onClick}></AvailabilityFilter>
                        </FilterComponent>
                    </FilterCardWrapper>
                   )}

                {pathname==='/supply-chain-intelligence-hub/BPR/order-fulfillment' && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Coverage Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', paddingTop:'12px'}}>
                            <FilterCheckboxAccordian filterType="Coverage" filterKey="coverage_filter" isOpen={openStatus.coverage_filter} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header="Coverage Filter" filterOptions={['Gap > 67%', '33%<=Gap<=67%', 'Gap < 33%']} onClick={onClick} >
                            </FilterMultiSelectCheckbox>   
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                    </FilterCardWrapper>
                )}
            </FilterBody>
            
            <ButtonFilterWrapper>
                <ButtonContainer>
                    <VFButtonOutline themeUi={user.user.theme_ui} onClick={onGoBack}>Go Back!</VFButtonOutline>
                    <VFButton themeUi={user.user.theme_ui} onClick={onApplyFilter}>Apply Filter</VFButton>
                </ButtonContainer>
            </ButtonFilterWrapper>
        </VFModalCard>
        </>
    )
}

export default VFMultiFilter