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


interface VFMultiFilterProps{
    onApplyFilter:()=>void
    onGoBack:()=>void
    selectedOption?:()=>void
    options:any[]
    toggleAdd?:()=>void
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
        config: { duration: "300" }
    });

      const closeAnimation = useSpring<any>({
            from: { opacity: "0", maxHeight: "0px" },
            to: { opacity: "1", maxHeight: isOpen ? "144px" : "0px" },
            config: { duration: "300" }
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
            <div className="accordian-header" onClick={()=>{setOpenStatus(openStatusReducer)}} style={{display: 'flex', gap:'1rem'}}>
                <p className='accordian-title' style={{fontWeight:isOpen ? '500':''}}>{filterType}</p>
                <animated.img style={iconAnimation} src="/assets/img/VectorFLOW/BPR/down-arrow.svg"></animated.img>
            </div>
                <animated.div className='accordian-body custom-scrollbar'  style={closeAnimation}>
                    {children}
                </animated.div>
        </animated.div>
    )
}

const FilterMultiSelectCheckbox = ({filterOptions}:any)=>{

    return(
            filterOptions.map((option:any)=>{
                return(
                    <MultiSelectCheckBoxComponent key={option}>
                        <input type="checkbox" style={{ width:'15px',height:'20px',marginRight:'14px;',borderRadius: '2px'}}/>
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
                coolor:'red',
                cursor:'pointer'
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
                overflowX:'hidden'
            }
        ),
        placeholder:(baseStyles:any,state:any)=>(
            {
                ...baseStyles,
                marginLeft:hideDropdownArrow ? '' : '23px',
                color:'#313131',
                fontFamily:'Roboto',
                fontWeight:'300',
                fontSize:'12px',
                textAlign:hideDropdownArrow ? 'center' : ''
            }
        ),
       singleValue:(baseStyles:any,state:any)=>(
        {
            ...baseStyles,
            marginLeft:'23px',
            marginRight:hideDropdownArrow ? '23px' : '23px',
            color:'#313131',
            fontFamily:'Roboto',
            fontWeight:'300',
            fontSize:'12px',
            textAlign:hideDropdownArrow ? 'center' : ''
        }
    ),
    }

    const customStylesOpen = {
        ...customStylesClose,
        control:(baseStyles:any,state:any)=>({
            ...baseStyles,
            height:'39px',
            borderRadius:' 20px 20px 0px 0px',
            background: '#F2F2F2 0% 0% no-repeat padding-box'
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
        <input type="text" style={{width:'85px',height:'38px',background:'#F2F2F2 0% 0% no-repeat padding-box', borderRadius:'20px',outline:'none',color:'#313131',fontFamily:'Roboto',fontWeight:'300',fontSize:'12px', textAlign:'center', border:'none'}}placeholder={placeholder}/>
    )
}





const AvailabilityFilter = () => {

    const [openStatus,setOpenStatus] = useState({
        eco_color:false,
        phasein:false,
        tech_color:false,
    })

    const filterOptions = [
        {value:'skucode',label:'SKUCode'},
        {value:'description',label:'Description'},
        {value:'whcode',label:'WHCode'},
        {value:'location',label:'Location'},
        {value:'norm',label:'Norm'},
        {value:'stock',label:'Stock'},
        {value:'techpenetration',label:'Tech. Penetration'},
        {value:'git',label:'GIT/Pending'},
        {value:'ecopenetration',label:'Eco. Penetration'}
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
                <SelectDropdownComponent>
                    <FilterSelectDropdown placeholder={"Select"} options={filterOptions}/>
                </SelectDropdownComponent>
                <SelectDropdownComponent>
                    <FilterSelectDropdown placeholder={"<="} options={comparisionOptions} hideDropdownArrow/>    
                </SelectDropdownComponent>
                <SelectDropdownComponent>
                    <FilterTextInput placeholder={'Value'} />    
                </SelectDropdownComponent>
            </DropdownGroupWrapper>       
    )
}






const VFMultiFilter=(props:VFMultiFilterProps)=>{

    const {user} = useUserData()

    const{
        onApplyFilter,
        onGoBack,
        selectedOption,
        options,
        toggleAdd
    } = props

    const [openStatus,setOpenStatus] = useState({
        category:false,
        material_group:false,
        material_type:false,
        model:false
    })

    return(
        <>
        <VFModalCard openModal={true} closeModal={()=>(console.log(""))} headerIcon={'/assets/img/VectorFLOW/BPR/select-filter.svg'} headerText={'Select Filter'} closeIcon={'/assets/img/VectorFLOW/NMS/close-dark.svg'} paddingLeftAndRight={0} backgroundColor={'#f4f4f4'}>
            <FilterBody>
                <FilterCardWrapper>
                    <FilterHeader>
                        <p>Supply Chain Node Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.material_group?'unset' : '50px'}}>
                    <FilterCheckboxAccordian filterType="For Locations" filterKey="material_group" isOpen={openStatus.material_group} setOpenStatus={setOpenStatus}>
                        <FilterCheckboxAccordian filterType="Location Type" filterKey="material_group" isOpen={openStatus.material_group} setOpenStatus={setOpenStatus} style={{paddingLeft:'50px'}}/>
                        <FilterMultiSelectCheckbox filterOptions={['Plant','Supplier', 'CWH']}/>
                     </FilterCheckboxAccordian>
                    </FilterComponent>
                    {openStatus.material_group ?
                    <>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>  
                        <TextFieldHeader>
                            <p>Specific Locations</p>
                            </TextFieldHeader>         
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Location Code'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                       
                        />
                        </FilterComponent>
                        <FilterComponent style={{ marginBottom:'5px'}}>           
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Location Code'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                        />
                        </FilterComponent>
                    </>
                    : null 
                } 


<FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.material_type?'unset' : '50px'}}>
                    <FilterCheckboxAccordian filterType="For Children Of" filterKey="material_type" isOpen={openStatus.material_type} setOpenStatus={setOpenStatus}>
                        <FilterCheckboxAccordian filterType="Location Type" filterKey="material_type" isOpen={openStatus.material_type} setOpenStatus={setOpenStatus} style={{paddingLeft:'50px'}}/>
                        <FilterMultiSelectCheckbox filterOptions={['Child','Kit', 'ok']}/>
                     </FilterCheckboxAccordian>
                    </FilterComponent>
                    {openStatus.material_type ?
                    <>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>  
                        <TextFieldHeader>
                            <p>Specific Locations</p>
                            </TextFieldHeader>         
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Location Code'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                       
                        />
                        </FilterComponent>
                        <FilterComponent style={{ marginBottom:'5px'}}>           
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Location Code'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
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
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>           
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'For Location'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                       
                        />
                        </FilterComponent>
                       
                </FilterCardWrapper>


                <FilterCardWrapper>
                    <FilterHeader>
                        <p>Availabilty Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                </FilterCardWrapper>

                <FilterCardWrapper>
                    <FilterHeader>
                        <p>Product Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>           
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Enter SKU Code'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                        margin-bottom={'10px'}
                       
                        />
                        </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>           
                    <VFMasterFieldSearch
                        value={selectedOption} 
                        setValue={()=>console.log("")} 
                        options={options} 
                        placeholder={'Enter Description'} 
                        handleListChild={()=>console.log("")} 
                        maxToShow={3} 
                        backgroundColor={'#F2F2F2'}
                        disabled={false}
                        margin-bottom={'10px'}
                       
                        />
                        </FilterComponent>
                </FilterCardWrapper>
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