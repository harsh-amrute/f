import VFButton from "../VFButton"
import VFModalCard from "../VFModalCard"
import { useUserData } from "../../../../context";
import { ButtonFilterWrapper, FilterCardWrapper, FilterBody, FilterHeader, ButtonContainer, FilterComponent, SelectDropdownComponent, DropdownGroupWrapper, MultiSelectCheckBoxComponent,TextFieldHeader, RangeSliderComponent,VFHorizonText } from "./style";
import VFButtonOutline from "../VFButtonOutline";
import React, { useState } from "react";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch";
import { useSpring, animated } from "react-spring";
import Select from "react-select";
import './styles.css';

import { useGetAllSKUs,  useGetAllLocations } from "../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";

import VFLoader from "../../../../components/VectorFLOW/commons/VFLoader";
import VFRangeSlider from "../VFRangeSlider";
import {  BPRFilter, BPRFilterState } from "../../../../VectorFlow/types/BPR";

interface VFMultiFilterProps{
    onApplyFilter:(params:any)=>void
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
    multiFilter:BPRFilterState
    setMultiFilter:any 
    supplyChainForLocationCheckBoxList:Array<any> 
    supplyChainForChildrenOfCheckBoxList:Array<any>  
}

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
        to: { opacity: "1", maxHeight: isOpen ? "200px" : "25px"},
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
        <>
        <animated.div className="filter-accordian" style={openAnimation}>
            <div className="accordian-header " onClick={()=>{setOpenStatus(openStatusReducer)}} style={{display: 'flex', gap:'1rem'}}>
                <p className='accordian-title' style={{fontWeight:isOpen ? '500':''}}>{filterType}</p>
                <animated.img style={iconAnimation} src="/assets/img/VectorFLOW/BPR/down-arrow.svg" data-testid='down-arrow'></animated.img>
            </div>
                <animated.div className='accordian-body  custom-scrollbar'  style={closeAnimation}>
                    {children}
                </animated.div>
        </animated.div>
        </>
    )
}

interface FilterMultiSelectCheckboxProps{
    filterOptions:Array<{label:string, id:string}>,
    filterState:Array<any>
    header?:string,
    onChange:any,
    filterId?:any
}

const FilterMultiSelectCheckbox = ({filterOptions, header,onChange,filterState}:FilterMultiSelectCheckboxProps)=>{
    const colorMap:string[] = ['#9A0101', '#EBBF2B', '#418D18']

    const {user} = useUserData()

    const themeUi = user.user.theme_ui
    // console.log(header)
    return(
        <>
           { filterOptions.map((option: {label:string, id:string}, index:number) =>{
                const color = colorMap[index];
                return(
                    <>
                    <MultiSelectCheckBoxComponent key={option.id} theme={themeUi}>
                        <input key={option.id} type="checkbox" name={option.label} style={{ width:'15px',height:'20px',marginRight:'14px',borderRadius: '2px'}} onChange={(e:any)=>onChange(e,'value')} checked={filterState.find((filter)=>option.label===filter.value && header===filter.attributeName)}/>
                        {header==='Coverage' ? 
                            <div style={{height:'12px', width:'12px', backgroundColor:color}} ></div>
                        :null}
                        <label style={{fontFamily: 'Roboto',fontWeight: '300',fontSize: '16px',color:'#313131'}}>{option.label}</label>
                    </MultiSelectCheckBoxComponent>
                    </>
                )
             })}
             </>
    )
}

const FilterSelectDropdown = ({placeholder,options,hideDropdownArrow,onChange,filterId,value}:any) => {
    

    const customStylesClose = {
        control: (baseStyles:any)=>(
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
        option: (baseStyles:any)=>(
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
        menuList:(baseStyles:any)=>(
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
        placeholder:(baseStyles:any)=>(
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
       singleValue:(baseStyles:any)=>(
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
        control:(baseStyles:any)=>({
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
            aria-label={filterId}
            value={value}
            // menuIsOpen={true}
        />
    )
}
const FilterTextInput = ({placeholder, onChange,disabled=false, value}:any) => {
   return (
        <input type="text" disabled={disabled} style={{width:'100%', height:'38px',background:'#F2F2F2 0% 0% no-repeat padding-box', borderRadius:'20px',outline:'none',color:'#313131',fontFamily:'Roboto',fontWeight:'300',fontSize:'12px', textAlign:'center', border:'none'}}placeholder={placeholder} onChange={onChange} value={value}/>
   ) 
}


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
        const doesFilterExist = filterState.find((o:any)=>o.name==filterId)
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

const VFMultiFilter=(props:VFMultiFilterProps)=>{ 

    const {user} = useUserData();
    // const selectValues = useRef<object[]>([]);
     //const selectValues = useRef<any>([]);
    //  let selectValues={
    //     current:[]
    //  }

    const{
       
        onGoBack,
        multiFilter,
        setMultiFilter,
        supplyChainNodeFilterActive = false,
        productFilterActive = false,
        locationFilterActive = false,
        availabilityFilterActive = false,
        colorFilterActive = false,
        coverageFilterActive = false,
        horizonActive = false,
        onApplyFilter,
        supplyChainForLocationCheckBoxList,
        supplyChainForChildrenOfCheckBoxList

        
    } = props

    const onFilterChange=(filterId:string,e:any,parentId:string,property:string, header?:string)=>{

        
        const filterObj:BPRFilter = {
            attributeName:"",
            value:"",
            operator:"",
            name:filterId
        }
        // if(filterId==='SCF2'){
        //     filterObj.attributeName='ForLocationLocationCode';
        //     filterObj.operator='=' 
        // }
        if(filterId==='SCF3'){
            filterObj.attributeName='ForChildrenLocationCode'; 
            filterObj.operator='='
        }
        if(filterId==='PF6'){
            filterObj.attributeName='SKU'; //enter sku
            filterObj.operator='='
        }
        if(filterId==='PF7'){
            filterObj.attributeName='EnterDescription';  //omit
            filterObj.operator='='
        }
        if(filterId==='LF6'){
            filterObj.attributeName='Location'; //location
            filterObj.operator='='
        }
        // if(filterId ==='SCF2'){ //locatipon code tha og
        //     filterObj.attributeName='Location';
        //     filterObj.operator='='
        // }
        // if(filterId ==='SCF3' || filterId==='SCF6'){   //omit
        //     filterObj.attributeName='LocationDescription';
        //     filterObj.operator='='
        // }
        if(filterId==='SCF1'){
            filterObj.attributeName='ForLocation';
            filterObj.operator='='
        }
        if(filterId==='SCF2'){
            filterObj.attributeName='ForChildren';
            filterObj.operator='='
        }
        if(filterId==='AF5'){
            filterObj.attributeName='OHIC';
            filterObj.operator='='
        }
        if(filterId==='AF6'){
            filterObj.attributeName='PIC';
            filterObj.operator='='
        }
        if(filterId==='AF7'){
            filterObj.attributeName='PIPO,Seasonality';
            filterObj.operator='='
        }
        if(filterId==='CGF3'){
            filterObj.attributeName='Coverage';
            filterObj.operator='='
        }
        if(filterId==='AF1'){
            filterObj.attributeName='Norm'
        }
        if(filterId==='AF3'){
            filterObj.attributeName='Git'
        }
        if(filterId==='AF2'){
            filterObj.attributeName='Stock'
        }
        if(filterId==='AF4'){
            filterObj.attributeName='Availability'
        }

    
        const currGroupKey:any  = Object.keys(multiFilter).find((key:string)=>multiFilter[key as keyof BPRFilterState].id===parentId)
        // let currentKey:any=""
        let finalValue:any | [];
        let selectedValues:any = [];

        const getTrimmedValue = (finalValue:any) => {
            return finalValue.split(' ')[0];
        }
       
   
        if(e.value){
            finalValue=e.value           
        }
        else if(e.target && e.target.type==="checkbox"){
            finalValue=e.target.name
           
                filterObj.value = finalValue;
                filterObj.name = filterId;

                const newFilterObj = { ...filterObj, value: finalValue };
                const  currGroupKey:any | undefined = Object.keys(multiFilter).find((key:string)=>{
                    if(multiFilter[key as keyof BPRFilterState].id ===parentId){
                        // currentKey = key   
                        return multiFilter[key as keyof BPRFilterState].id ===parentId
                    }
                 })
                 if(currGroupKey){
                     selectedValues = [...multiFilter[currGroupKey as keyof BPRFilterState].filters];
                 }
       

         
                if (!selectedValues.some((obj:any) => (obj.value === finalValue) && (obj.name === filterId) )) {
                 selectedValues.push(newFilterObj);

                 }
                                 
                 else{
                    selectedValues = selectedValues.filter((obj: any) => !((obj.value === finalValue) && (obj.name === filterId))); 
                    //(obj.value !== finalValue) &&
                 }
             
                setMultiFilter({
                    ...multiFilter,
                    [currGroupKey]:{
                        ...multiFilter[currGroupKey as keyof BPRFilterState],
                        filters:[...selectedValues]
                        
                    }
                })
                return
                     
        }
        else if(e.target){
            finalValue=e.target.value
        }

       else if(Array.isArray(e)){
        finalValue = e.map((ele: any) =>{
            const newfilterObj = {...filterObj}
            // newfilterObj.value = ele.label;
            newfilterObj.value = getTrimmedValue(ele.label);
          

            return newfilterObj
        })
       }


        
        const currGroup:string | undefined = Object.keys(multiFilter).find((key:string)=>{
            return multiFilter[key as keyof BPRFilterState].id ===parentId
        })
       
        if(currGroup){

            const currFilter:BPRFilter | undefined =multiFilter[currGroup as keyof BPRFilterState].filters.find((filter:BPRFilter)=>{
                return filter.name===filterId
            })
           
            if(currFilter){
                //if((e.target && e.target.type ==="checkbox") || Array.isArray(e) ){
                if( Array.isArray(e)){ 
                    let tempFilteredArray = multiFilter[currGroupKey as keyof BPRFilterState].filters.filter((f:BPRFilter)=>f.name!==filterId)
                    tempFilteredArray = [...tempFilteredArray,...finalValue]
                    setMultiFilter({
                        ...multiFilter,
                        [currGroupKey]:{
                            ...multiFilter[currGroupKey as keyof BPRFilterState],
                            filters:tempFilteredArray
                        }  
                    })   
                }
                else{
                  
                    setMultiFilter({
                        ...multiFilter,
                        [currGroupKey]:{
                            ...multiFilter[currGroupKey as keyof BPRFilterState],
                            filters:multiFilter[currGroupKey as keyof BPRFilterState].filters.map((filter:BPRFilter)=>{
                                if(filter.name===filterId){
                                    return{
                                        ...filter,
                                        [property]:finalValue
                                    }
                                    
                                }
                                return filter
                            })    
                        }  
                    })   
                }
            }
            else if(header==="Color Filter"){
                
                const filterObj:BPRFilter = {
                    type:"",
                    attributeName:"",
                    value:"",
                    operator:"",
                    name:filterId
                }
                filterObj[property as keyof BPRFilter] = finalValue
                setMultiFilter({
                    ...multiFilter,
                    [currGroupKey]:{
                        ...multiFilter[currGroupKey as keyof BPRFilterState],
                        filters:[...multiFilter[currGroupKey as keyof BPRFilterState].filters,{...filterObj}],
                        
                    }
                })
            }
          
    
            else {
                if(Array.isArray(e) && e.length===1){
                    filterObj[property as keyof BPRFilter] = finalValue[0].value
                    setMultiFilter({
                        ...multiFilter,
                        [currGroupKey]:{
                            ...multiFilter[currGroupKey as keyof BPRFilterState],
                            filters:[...multiFilter[currGroupKey as keyof BPRFilterState].filters,{...filterObj}]
                        }
                    }) 
                     return 
                }
                filterObj[property as keyof BPRFilter] = finalValue
                setMultiFilter({
                    ...multiFilter,
                    [currGroupKey]:{
                        ...multiFilter[currGroupKey as keyof BPRFilterState],
                        filters:[...multiFilter[currGroupKey as keyof BPRFilterState].filters,{...filterObj}]  
                    }
                }) 
            } 
        }   
    }

    
   
    
    

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

    // const {data,isLoading} = useGetAllSKUs()

    // const options = data?.data?.data.map((ele: any)=> { 
    //     // return {label: ele.sc, value: ele.sd}
    //     return {label: `${ele.sc} (${ele.sd})`, value: ele.sc}

    // })


    const { data, isLoading } = useGetAllSKUs();
    const {data:locationData,isLoading:isLocationDataLoading} = useGetAllLocations()

    const getOptions = (data:Array<any>,isSku?:boolean)=>{
            
        if(isSku){
            return data.map((sku: any) => {
                return { label:  `${sku.sc} (${sku.sd})`, value: sku.sc };
            }) 
        }
        
        return data.map((location: any) => {
            return { label:  `${location.wc} (${location.wd})`, value: location.wc };
        }) 
        
    }
    





    const getAPIValue = (filterId:any, filterState:any) => {
       
        return filterState.map((f:BPRFilter)=>{
           if(f.name===filterId){
                return{
                    label:f.value,
                    value:f.value
                }
            }
        })
    }

  
    return(
        <>
        <VFModalCard zoom={'0.73'} openModal={true} closeModal={onGoBack} headerIcon={'/assets/img/VectorFLOW/BPR/select-filter.svg'} headerText={'Select Filter'}  closeIcon={'/assets/img/VectorFLOW/NMS/close-dark.svg'} paddingLeftAndRight={0} backgroundColor={'#f4f4f4'} data-testid="vfmultifilter-img">
           {
            (isLoading || isLocationDataLoading)
            ?
            <VFLoader/>
            :
            <React.Fragment>
            {horizonActive ? 
            <>    
            <RangeSliderComponent data-testid="horizonActive">
                <VFHorizonText>
                    <p>Horizon</p>
                </VFHorizonText>
                <VFRangeSlider min={0} max={90} milestones={[-1,0,30,60,90]} strictMode={false} width={500} defaultValue={0} handleChange={()=>console.log('')} showTriangle></VFRangeSlider>  
            </RangeSliderComponent>
                <hr style={{ marginLeft:'30px', marginRight:'30px'}}></hr> 
            </>
            : null } 


            <FilterBody>
                {supplyChainNodeFilterActive && (
                      <FilterCardWrapper data-testid="supplyChainNodeFilter">
                      <FilterHeader >
                          <p>Supply Chain Node Filter</p>
                      </FilterHeader>
                      <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.location?'unset' : '50px'}}>
                          <FilterCheckboxAccordian filterType="For Locations" filterKey="location" isOpen={openStatus.location} setOpenStatus={setOpenStatus}>
                          <FilterCheckboxAccordian filterType="Location Type" filterKey="location_type" isOpen={child.location_type} setOpenStatus={setChild}  style={{paddingLeft:'50px', maxHeight:'unset'}}>
                              <FilterMultiSelectCheckbox header={'ForLocation'} filterOptions={supplyChainForLocationCheckBoxList}
                              filterState={multiFilter.supplyChainFilter.filters}
                              onChange={(e:any, key:string)=>onFilterChange('SCF1',e,'1', key)}/>
                          </FilterCheckboxAccordian>
                          </FilterCheckboxAccordian>
                      </FilterComponent>
                      {/* {openStatus.location ?
                      <>
                      <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'5px'}}>  
                          <TextFieldHeader>
                              <p>Specific Locations</p>
                          </TextFieldHeader>         
                          <VFMasterFieldSearch
                               value={getAPIValue('SCF2', multiFilter.supplyChainFilter.filters)} 
                              setValue={(e:any)=>onFilterChange('SCF2',e,'1','value')} 
                              options={getOptions(locationData?.data.data)} 
                              placeholder={'Enter Location'} 
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
                      }   */}
                      <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.loc_children?'unset' : '50px'}}>
                          <FilterCheckboxAccordian filterType="For Children Of" filterKey="loc_children" isOpen={openStatus.loc_children} setOpenStatus={setOpenStatus}>
                          <FilterCheckboxAccordian filterType="Location Type" filterKey="loc_children_type" isOpen={child.loc_children_type} setOpenStatus={setChild} style={{paddingLeft:'50px'}}>
                            <FilterMultiSelectCheckbox header={'ForChildren'} filterOptions={supplyChainForChildrenOfCheckBoxList}
                            filterState={multiFilter.supplyChainFilter.filters}
                           onChange={(e:any, key:string)=>onFilterChange('SCF2',e,'1',key)}/>
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
                               value={getAPIValue('SCF3', multiFilter.supplyChainFilter.filters)}  
                              setValue={(e:any)=>onFilterChange('SCF3',e,'1','value')} 
                              options={getOptions(locationData?.data.data)} 
                              placeholder={'Enter Location'} 
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
                        <FilterCardWrapper data-testid="locationFilter">
                        <FilterHeader>
                            <p>Location Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                           <AvailabilityFilter placeholder={"L1"} onChange={(e:any,key:string)=>onFilterChange('LF1',e,'2',key)} header="Location Filter" filterId={'LF1'}  filterState={multiFilter.locationFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L1"}  onChange={(e:any,key:string)=>onFilterChange('LF2',e,'2',key)} header="Location Filter" filterId={'LF2'} filterState={multiFilter.locationFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L1"}  onChange={(e:any,key:string)=>onFilterChange('LF3',e,'2',key)} header="Location Filter" filterId={'LF3'} filterState={multiFilter.locationFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L1"}  onChange={(e:any,key:string)=>onFilterChange('LF4',e,'2',key)} header="Location Filter" filterId={'LF4'} filterState={multiFilter.locationFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                           <AvailabilityFilter placeholder={"L1"}  onChange={(e:any,key:string)=>onFilterChange('LF5',e,'2',key)} header="Location Filter" filterId={'LF5'} filterState={multiFilter.locationFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                            <VFMasterFieldSearch 
                                 value={getAPIValue('LF6', multiFilter.locationFilter.filters)}  
                                setValue={(e:any)=>onFilterChange('LF6',e,'2','value')} 
                                options={getOptions(locationData?.data.data)}  
                                placeholder={'Enter Location'} 
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
                    <FilterCardWrapper data-testid="productFilter">
                    <FilterHeader>
                        <p>Product Filter</p>
                    </FilterHeader>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any, key:string)=>onFilterChange('PF1',e,'3',key)}  filterState={multiFilter.productFilter.filters} filterId={'PF1'} ></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any,key:string)=>onFilterChange('PF2',e,'3',key)}  filterState={multiFilter.productFilter.filters} filterId={'PF2'} ></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any,key:string)=>onFilterChange('PF3',e,'3',key)}  filterState={multiFilter.productFilter.filters} filterId={'PF3'}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any,key:string)=>onFilterChange('PF4',e,'3',key)}  filterState={multiFilter.productFilter.filters} filterId={'PF4'}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                       <AvailabilityFilter placeholder={"P1"} onChange={(e:any,key:string)=>onFilterChange('PF5',e,'3',key)}  filterState={multiFilter.productFilter.filters} filterId={'PF5'}></AvailabilityFilter>
                    </FilterComponent>
                    <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', marginBottom:'7px'}}>           
                        <VFMasterFieldSearch
                            value={getAPIValue('PF6', multiFilter.productFilter.filters)} 
                            setValue={(e:any)=>onFilterChange('PF6',e,'3','value')}
                            options={getOptions(data?.data.data,true)}  
                            placeholder={'Enter SKU'} 
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
                    <FilterCardWrapper data-testid="availabilityFilter">
                        <FilterHeader>
                            <p>Availabilty Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Norm"} onChange={(e:any,key:string)=>onFilterChange('AF1',e,'4',key)} header="Availabilty Filter" filterState={multiFilter.availabilityFilter.filters} filterId={'AF1'}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Stock"} onChange={(e:any,key:string)=>onFilterChange('AF2',e,'4',key)} header="Availabilty Filter" filterState={multiFilter.availabilityFilter.filters} filterId={'AF2'}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Git"} onChange={(e:any,key:string)=>onFilterChange('AF3',e,'4',key)} header="Availabilty Filter" filterState={multiFilter.availabilityFilter.filters} filterId={'AF3'}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Availabilty"} onChange={(e:any,key:string)=>onFilterChange('AF4',e,'4',key)} header="Availabilty Filter" filterState={multiFilter.availabilityFilter.filters} filterId={'AF4'}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tech_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="On Hand Inventory Color" filterKey="availabilty_tech_color" isOpen={openStatus.availabilty_tech_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header={'OHIC'} filterOptions={[
                                 { label: 'Red', id: '1' },
                                 { label: 'Yellow', id: '2' },
                                 { label: 'Green', id: '3' },
                                 { label: 'Black', id: '4' },
                                 { label: 'White', id: '5' },
                                 { label: 'Blue', id: '6' },

                                
                            ]} 
                           
                            filterState={multiFilter.availabilityFilter.filters.filter((f)=>f.name==='AF5')}
                            onChange={(e:any,key:string)=>onFilterChange('AF5',e,'4',key)} filterId={'AF5'}/> 
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_eco_color?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Pipeline Inventory Color" filterKey="availabilty_eco_color" isOpen={openStatus.availabilty_eco_color} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header={'PIC'}filterOptions={[
                                  { label: 'Red', id: '1' },
                                  { label: 'Yellow', id: '2' },
                                  { label: 'Green', id: '3' },
                                  { label: 'Black', id: '4' },
                                  { label: 'White', id: '5' },
                                  { label: 'Blue', id: '6' },
                            ]} 
                          
                            filterState={multiFilter.availabilityFilter.filters.filter((f)=>f.name==='AF6')}
                            onChange={(e:any,key:string)=>onFilterChange('AF6',e,'4',key)} filterId={'AF6'}/> 
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7',height: openStatus.availabilty_tags?'unset' : '50px'}}>
                            <FilterCheckboxAccordian filterType="Tags(PIPO, Seasonality)" filterKey="availabilty_tags" isOpen={openStatus.availabilty_tags} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header={'PIPO,Seasonality'} filterOptions={[ 
                                { label: 'PIPO', id: '1' },
                                { label: 'Seasonality', id: '2' },
                                ]} 
                                
                                filterState={multiFilter.availabilityFilter.filters.filter((f)=>f.name==='AF7')}
                                onChange={(e:any,key:string)=>onFilterChange('AF7',e,'4',key)} filterId={'AF7'}/> 
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                </FilterCardWrapper>
                  )}

                {colorFilterActive && (
                    <FilterCardWrapper data-testid="colorFilter">
                        <FilterHeader>
                            <p>Color Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}} >
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any,key:string)=>onFilterChange('CF1',e,'6',key,'Color Filter')} filterId={"CF1"} filterState={multiFilter.colorFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any,key:string)=>onFilterChange('CF2',e,'6',key,'Color Filter')} filterId={"CF2"} filterState={multiFilter.colorFilter.filters}></AvailabilityFilter>
                        </FilterComponent>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7'}}>
                            <AvailabilityFilter placeholder={"Type"} header="Color Filter" onChange={(e:any,key:string)=>onFilterChange('CF3',e,'6',key,'Color Filter')} filterId={"CF3"} filterState={multiFilter.colorFilter.filters}> </AvailabilityFilter>
                        </FilterComponent>
                    </FilterCardWrapper>
                   )} 

                  {coverageFilterActive && (
                    <FilterCardWrapper data-testid="coverageFilter">
                        <FilterHeader>
                            <p>Coverage Filter</p>
                        </FilterHeader>
                        <FilterComponent style={{borderTop:'0.5px solid #B7B7B7', paddingTop:'12px'}}>
                            <FilterCheckboxAccordian filterType="Coverage" filterKey="coverage_filter" isOpen={openStatus.coverage_filter} setOpenStatus={setOpenStatus}>
                            <FilterMultiSelectCheckbox header="Coverage" filterOptions={[
                                {label:'Gap > 67%',id:'1'},
                                {label:'33%<=Gap<=67%',id:'2'},
                                {label:'Gap < 33%,',id:'3'},
                                ]} 
                                filterState={multiFilter.coverageFilter.filters}
                                onChange={(e:any,key:string)=>onFilterChange('CGF3',e,'5',key)} /> 
                            </FilterCheckboxAccordian>
                        </FilterComponent>
                    </FilterCardWrapper>
                )} 
            </FilterBody>
            
            <ButtonFilterWrapper>
                <ButtonContainer>
                    <VFButtonOutline themeUi={user.user.theme_ui} onClick={onGoBack}>Go Back!</VFButtonOutline>
                    <VFButton themeUi={user.user.theme_ui} onClick={()=>onApplyFilter(multiFilter)}>Apply Filter</VFButton>
                </ButtonContainer>
            </ButtonFilterWrapper>
            </React.Fragment>
           }
        </VFModalCard>
        </>
    )
}
//value={getDisabledValue()}
export default VFMultiFilter