import { VFFilterDustbinIcon, VFFilterInputField, VFFilterSeperator, VFFilterWrapper } from "./styles";
import Select from 'react-select'
import {type Option, type Filter} from '../../../../VectorFlow/types/MDM';


export interface VFFilterProps{
    onDelete:()=>void
    fields:Option[]
    operators:Option[]
    currFilter:Filter
    setFilters:any
    filters:Filter[]
}

export interface CustomSelectProps{
    width:string
    placeholder:string
    onChange:(...params:any)=>void
    options:any[]
}

export interface CustomInputProps{
    value:string
    onChange:(e:any)=>void
    disabled?:boolean
}

const VFFilter = (props:VFFilterProps)=>{

    const{
        fields,
        operators,
        onDelete,
        currFilter,
        filters,
        setFilters,
    } = props


    const handleOnChange = (value:string,property:string)=>{
       setFilters(filters.map((element:Filter)=>{
        if(element.id==currFilter.id){
            return {...element,[property]:value}
        }
        return element
       }))
    }

    return(
        <VFFilterWrapper data-testid="vffilter-wrapper">
            <CustomSelect 
                width="588px" 
                placeholder="Select" 
                onChange={(e:any)=>handleOnChange(e.value,'field')} 
                options={fields}
            />
            <VFFilterSeperator/>
            <CustomSelect 
                width="298px" 
                placeholder="Select" 
                onChange={(e:any)=>handleOnChange(e.value,'operator')} 
                options={operators}
            />
            <VFFilterSeperator/>
            <CustomInput 
                value={currFilter.text} 
                onChange={(e:any)=>handleOnChange(e.target.value,'text')}
            />
            <VFFilterSeperator/>
            <VFFilterDustbinIcon 
                src="/assets/img/VectorFLOW/NMS/dustbin.svg" 
                onClick={onDelete}
                data-testid='delete-icon'
            />
        </VFFilterWrapper>
    )
}



const CustomSelect = (props:CustomSelectProps)=>{

    const {
        width,
        placeholder,
        onChange,
        options
    } = props

    return (
        <Select
            styles={{
                container:(styles)=>({
                    ...styles,
                    width:'100%',
                    maxWidth:width
                }),
                control:(styles)=>({
                    ...styles,
                    height:'37px',
                    width:'100%',
                    background:' #FFFFFF ',
                    fontSize:'13px',
                    border:'none',
                    borderRadius:'6px',
                    paddingLeft:'8px'
                })
            }}
            placeholder={placeholder}
            components={{
                IndicatorSeparator:null
            }}
            onChange={onChange}
            options={options}
        />
    )
}

const CustomInput = (props:CustomInputProps)=>{

    const {
        value,
        onChange,
        disabled = false
    } = props

    return(
        <VFFilterInputField
            type='text'
            placeholder="Value"
            value={value}
            onChange={onChange}
            disabled={disabled}
            data-testid='text-input'
        />
    )
}

export default VFFilter;