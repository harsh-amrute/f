import VFButton from "../VFButton"
import VFModalCard from "../VFModalCard"
import { useUserData } from "../../../../context";
import { ButtonFilterWrapper, FilterCardWrapper, FilterBody, FilterHeader, ButtonContainer, FilterComponent, SelectDropdownComponent, DropdownGroupWrapper, MultiSelectCheckBoxComponent,TextFieldHeader, RangeSliderComponent,VFHorizonText } from "./style";
import VFButtonOutline from "../VFButtonOutline";
import React, { useState } from "react";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import { useSpring, animated, AnimatedProps } from "react-spring";
import Select, { components } from "react-select";
import './styles.css';
import { useLocation } from "react-router-dom";
import { useGetAllSKUs } from "../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import VFLoader from "../../../../components/VectorFLOW/commons/VFLoader";
import VFRangeSlider from "../VFRangeSlider";
import { values } from "lodash";
import { BPRFilter } from "../../../../VectorFlow/types/BPR";


interface VFMultiFilterProps{
    onApplyFilter:()=>void
    onGoBack:()=>void
    selectedOption?:()=>void
    toggleAdd?:()=>void
    placeholder?:string
    supplyChainNodeFilterActive?:boolean
    locationFilterActive?:boolean
    productFilterActive?:boolean
    availabilityFilterActive?:boolean
    colorFilterActive?:boolean
    coverageFilterActive?:boolean
    horizonActive?:boolean
    multiFilter:any
    setMultiFilter:any

    
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

const FilterMultiSelectCheckbox = ({filterOptions, header,onChange}:any)=>{
    const colorMap:string[] = ['#9A0101', '#EBBF2B', '#418D18']

    return(
            filterOptions.map((option: any, index:number) =>{
                const color = colorMap[index];
                return(
                    <MultiSelectCheckBoxComponent key={option}>
                        <input type="checkbox" name={option} style={{ width:'15px',height:'20px',marginRight:'14px;',borderRadius: '2px'}} onChange={onChange}/>
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
const FilterSelectDropdown = ({placeholder,options,hideDropdownArrow,giveValue, onChange}:any) => {
    

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
        indicatorsContainer:()=>({
            paddingRight:'10px',
        }),
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
            onChange={onChange}
            // menuIsOpen={true}
        />
    )
}
const FilterTextInput = ({placeholder, onChange}:any) => {
    return(
        <input type="text" style={{width:'100%', height:'38px',background:'#F2F2F2 0% 0% no-repeat padding-box', borderRadius:'20px',outline:'none',color:'#313131',fontFamily:'Roboto',fontWeight:'300',fontSize:'12px', textAlign:'center', border:'none'}}placeholder={placeholder} onChange={onChange}/>
    )
}


const AvailabilityFilter = ({placeholder, header, onChange}:any) => {

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
        {value:'hasnovalue',label:'Has no value'},
    ]
    
    return(
            <DropdownGroupWrapper>
                  
                  {header==="Availabilty Filter" ?
                    <SelectDropdownComponent>
                    <FilterTextInput placeholder={placeholder} onChange={onChange}/>    
                </SelectDropdownComponent> 
                  : 
                    <SelectDropdownComponent >
                {(header!=="Location Filter" && header!=="Color Filter")&& <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={filterProductOptions} onChange={onChange}/>}
                {header==="Location Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={filterLocationOptions} onChange={onChange}/>}
                {header ==="Color Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={colorTypeFilterOptions} onChange={onChange}/>}
                    </SelectDropdownComponent>
                    }

                {header === "Color Filter" &&(
                     <SelectDropdownComponent>
                     <FilterSelectDropdown className="custom-scrollbar" placeholder={"Color"} options={colorFilterOptions} hideDropdownArrow onChange={onChange}/>    
                 </SelectDropdownComponent>
                )}
                
                <SelectDropdownComponent >
                    <FilterSelectDropdown className="custom-scrollbar" placeholder={"<="} options={comparisionOptions} hideDropdownArrow onChange={onChange}/>    
                </SelectDropdownComponent>
                <SelectDropdownComponent>
                    <FilterTextInput placeholder={'Value'} onChange={onChange} />    
                </SelectDropdownComponent>  
            </DropdownGroupWrapper>       
    )
}

const VFMultiFilter=(props:VFMultiFilterProps)=>{

    const {user} = useUserData()

    const onFilterChange=(name:string,e:any)=>{
      console.log(e)
        const filterObj:BPRFilter = {
                attributeName:"",
                value:"",
                operator:"",
                name:""
         }

        let finalValue;
        if(e.hasOwnProperty('value')){
            finalValue=e.value
            if(!name.includes(finalValue)){
               


            }
        }
        else if(e.hasOwnProperty('target') && e.target.type==="checkbox"){
            finalValue=e.target.name
            console.log(e.target.name)
        }
        else if(e.hasOwnProperty('target')){
            finalValue=e.target.value
        }
       else if(Array.isArray(e)){
        finalValue=e[0].label
       }
        else{
            finalValue = e
        }
        
console.log(finalValue)
        
    


    }


    const onClick=()=>{

    }
    
    const{
        onApplyFilter,
        onGoBack,
        selectedOption,
        multiFilter,
        setMultiFilter,
        supplyChainNodeFilterActive = true,
        productFilterActive = true,
        locationFilterActive = true,
        availabilityFilterActive = false,
        colorFilterActive = false,
        coverageFilterActive = false,
        horizonActive = false,
        
        
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

    const {data,isLoading} = useGetAllSKUs()
    const options = data?.data?.data.map((ele: any)=> { 
        return {label: ele.SKUCode, value: ele.SKUName}
    })
    
    return(
        <>
        <VFModalCard  openModal={true} closeModal={()=>(console.log(""))} headerIcon={'/assets/img/VectorFLOW/BPR/select-filter.svg'} headerText={'Select Filter'} closeIcon={'/assets/img/VectorFLOW/NMS/close-dark.svg'} paddingLeftAndRight={0} backgroundColor={'#f4f4f4'}>
           {
            isLoading
            ?
            <VFLoader/>
            :
            <React.Fragment>
            {horizonActive ? 
            <>    
            <RangeSliderComponent>
                <VFHorizonText>
                    <p>Horizon</p>
                </VFHorizonText>
                <VFRangeSlider min={0} max={90} milestones={[0,30,60,90]} strictMode={true} width={500} defaultValue={0} handleChange={()=>console.log('')}></VFRangeSlider>  
            </RangeSliderComponent>
                <hr style={{ marginLeft:'30px', marginRight:'30px'}}></hr> 
            </>
            : null } 


            <FilterBody>
                {supplyChainNodeFilterActive && (
                      <FilterCardWrapper>
                      <FilterHeader >
                          <p>Supply Chain Node Filter</p>
                      </FilterHeader>
                      <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.location?'unset' : '50px'}}>
                          <FilterCheckboxAccordian filterType="For Locations" filterKey="location" isOpen={openStatus.location} setOpenStatus={setOpenStatus}>
                          <FilterCheckboxAccordian filterType="Location Type" filterKey="location_type" isOpen={child.location_type} setOpenStatus={setChild}  style={{paddingLeft:'50px', maxHeight:'unset'}}>
                              <FilterMultiSelectCheckbox filterOptions={['Plant','Supplier', 'CWH']} onChange={(e:any)=>onFilterChange('SCF1',e)}/>
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
                              setValue={(e:any)=>onFilterChange('SCF2',e)} 
                              options={options} 
                              placeholder={'Location Code'} 
                              handleListChild={()=>console.log("")} 
                              maxToShow={3} 
                              backgroundColor={'#F2F2F2'}
                              borderRadius={40}
                              disabled={false}
                              boxShadow={'0'}
                              
                          />
                      </FilterComponent>
                      <FilterComponent style={{ marginBottom:'5px'}}>           
                          <VFMasterFieldSearch
                              value={selectedOption} 
                              setValue={(e:any)=>onFilterChange('SCF3',e)} 
                              options={options} 
                              placeholder={'Location Description'} 
                              handleListChild={()=>console.log("")} 
                              maxToShow={3} 
                              backgroundColor={'#F2F2F2'}
                              borderRadius={40}
                              disabled={false}
                              boxShadow={'0'}
                          />
                      </FilterComponent>
                      </>
                      : null 
                      } 
                      <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.loc_children?'unset' : '50px'}}>
                          <FilterCheckboxAccordian filterType="For Children Of" filterKey="loc_children" isOpen={openStatus.loc_children} setOpenStatus={setOpenStatus}>
                          <FilterCheckboxAccordian filterType="Location Type" filterKey="loc_children_type" isOpen={child.loc_children_type} setOpenStatus={setChild} style={{paddingLeft:'50px'}}>
                          <FilterMultiSelectCheckbox filterOptions={['Child','Kit', 'ok']} onChange={(e:any)=>onFilterChange('SCF4',e)}/>
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
                              setValue={(e:any)=>onFilterChange('SCF5',e)} 
                              options={options} 
                              placeholder={'Location Code'} 
                              handleListChild={()=>console.log("")} 
                              maxToShow={3} 
                              backgroundColor={'#F2F2F2'}
                              borderRadius={40}
                              disabled={false}
                              boxShadow={'0'}
                          />
                      </FilterComponent>
                      <FilterComponent style={{ marginBottom:'5px'}}>           
                          <VFMasterFieldSearch
                              value={selectedOption} 
                              setValue={(e:any)=>onFilterChange('SCF6',e)} 
                              options={options} 
                              placeholder={'Location Code'} 
                              handleListChild={()=>console.log("")} 
                              maxToShow={3} 
                              backgroundColor={'#F2F2F2'}
                              borderRadius={40}
                              disabled={false}
                              boxShadow={'0'}
                          />
                      </FilterComponent>
                      </>
                      : null 
                      } 
                  </FilterCardWrapper> 
                )}
              
                 {locationFilterActive && (
                        <FilterCardWrapper>
                        <FilterHeader>
                            <p>Location Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                           <AvailabilityFilter placeholder={"L1"} onChange={(e:any)=>onFilterChange('LF1',e)} header="Location Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L2"}  onChange={(e:any)=>onFilterChange('LF2',e)} header="Location Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L3"}  onChange={(e:any)=>onFilterChange('LF3',e)} header="Location Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L4"}  onChange={(e:any)=>onFilterChange('LF4',e)} header="Location Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L5"}  onChange={(e:any)=>onFilterChange('LF5',e)} header="Location Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                            <VFMasterFieldSearch 
                                value={selectedOption} 
                                setValue={(e:any)=>onFilterChange('LF6',e)} 
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
                )}

                {productFilterActive && (
                    <FilterCardWrapper>
                    <FilterHeader>
                        <p>Product Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any)=>onFilterChange('PF1',e)} ></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P2"} onChange={(e:any)=>onFilterChange('PF2',e)} ></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P3"} onChange={(e:any)=>onFilterChange('PF3',e)}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P4"} onChange={(e:any)=>onFilterChange('PF4',e)}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P5"} onChange={(e:any)=>onFilterChange('PF5',e)}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={(e:any)=>onFilterChange('PF6',e)}
                            options={options} 
                            placeholder={'Enter SKU Code'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            margin-bottom={'10px'}
                            boxShadow={'0'}
                            
                        />
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={selectedOption} 
                            setValue={(e:any)=>onFilterChange('PF7',e)}
                            options={options} 
                            placeholder={'Enter Description'} 
                            handleListChild={()=>console.log("")} 
                            maxToShow={3} 
                            backgroundColor={'#F2F2F2'}
                            borderRadius={40}
                            disabled={false}
                            margin-bottom={'10px'}
                            boxShadow={'0'}
                           
                        />
                        </FilterComponent>
                </FilterCardWrapper>
                )}
                
                {availabilityFilterActive && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Availabilty Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Norm"} onChange={(e:any)=>onFilterChange('AF1',e)} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Stock"} onChange={(e:any)=>onFilterChange('AF2',e)} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Git"} onChange={(e:any)=>onFilterChange('AF3',e)} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Availabilty"} onChange={(e:any)=>onFilterChange('AF4',e)} header="Availabilty Filter"></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tech_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Execution Tech. color" filterKey="availabilty_tech_color" isOpen={openStatus.availabilty_tech_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onChange={(e:any)=>onFilterChange('AF5',e)}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_eco_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Execution Eco. color" filterKey="availabilty_eco_color" isOpen={openStatus.availabilty_eco_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onChange={(e:any)=>onFilterChange('AF6',e)}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tags?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Tags(PIPO, Seasonality)" filterKey="availabilty_tags" isOpen={openStatus.availabilty_tags} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox filterOptions={['Red','Yellow', 'Green', 'Black']} onChange={(e:any)=>onFilterChange('AF7',e)}/>
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                </FilterCardWrapper>
                  )}

                {colorFilterActive && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Color Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any)=>onFilterChange('CF1',e)}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any)=>onFilterChange('CF2',e)}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any)=>onFilterChange('CF3',e)}></AvailabilityFilter>
                        </FilterComponent>
                    </FilterCardWrapper>
                   )}

                {coverageFilterActive && (
                    <FilterCardWrapper>
                        <FilterHeader>
                            <p>Coverage Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', paddingTop:'12px'}}>
                            <FilterCheckboxAccordian filterType="Coverage" filterKey="coverage_filter" isOpen={openStatus.coverage_filter} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header="Coverage Filter" filterOptions={['Gap > 67%', '33%<=Gap<=67%', 'Gap < 33%']} onChange={(e:any)=>onFilterChange('CGF3',e)} >
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
            </React.Fragment>
           }
        </VFModalCard>
        </>
    )
}

export default VFMultiFilter