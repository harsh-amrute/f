import { AgChartsReact } from "ag-charts-react"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"

import { ExpandedChartFilterWrapper,ExpandedChartSelectWrapper,ExpandedChartSelectLabel,ExpandedChartCapsuleWrapper} from "./styles"

import Select from 'react-select'
import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule"
import { ReseachInsightsGraphState } from "../../../../../VectorFlow/types/BPR"

interface ExpandedGraphProps{
    id:number
    data:any
    graphs:Array<ReseachInsightsGraphState>
    isOpen:boolean
    onClose:()=>void
    options:any
    onTogglePen:(data:any)=>void
    onUpdateGraphs:any
}

const ExpandedGraph = (props:ExpandedGraphProps)=>{

    const {
        data,
        graphs,
        id,
        options,
        onClose,
        isOpen,
        onTogglePen,
        onUpdateGraphs
    } = props

    const activeCapsuleIndex = graphs[id-1].pen

    const onChange =(e:any,key:string)=>{
        const doesFilterExist = graphs[id-1].filters.find((filter)=>filter.key===key)
        if(doesFilterExist){
            return onUpdateGraphs(id,'filters',graphs[id-1].filters.map((filter)=>filter.key===key?{key:key,value:e.value}:filter))
        }
        const tempFilters = [...graphs[id-1].filters,{key:key,value:e.value}]
        onUpdateGraphs(id,'filters',tempFilters)
    }

    const handleClose = ()=>{
        onClose()
        onUpdateGraphs(id,'filters',[])
    }

    return(
        <VFModalCard 
            openModal={isOpen} 
            headerIcon="" 
            headerBgColor="white" 
            headerText="Technical Trend | Horizon - 7 Days" 
            headerTextColor="black" 
            closeIcon='/assets/img/VectorFLOW/BPR/collapse-graph.svg'
            closeModal={handleClose}
            
        >
            <ExpandedChartFilterWrapper>
                <ExpandedChartSelectWrapper>
                    <ExpandedChartSelectLabel>Search By Location</ExpandedChartSelectLabel>
                    <Select
                        styles={{
                            
                            container:((baseStyles:any)=>({
                                ...baseStyles,
                                width:250,
                                // border:'1px solid red',

                                
                            })),
                            option: (baseStyles, { isSelected }) => ({
                                ...baseStyles,
                                backgroundColor: isSelected ? "#BC3D80" : "white",
                               
                               
                                "&:hover": {
                                    backgroundColor: '#bc3d814d',
                                    color:"black",
                                }
                            }),
                            control: (baseStyles, {isFocused }) => (
                                {
                                    ...baseStyles, 
                                    borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",
                                    // border: "none",
                                    // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
                                    boxShadow: 'none',
                                    "&:hover":{
                                        borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",

                                    }
                                }),
                        }}
                        options={options.whcodes}
                        onChange={(e)=>onChange(e,'Whcode')}
                        
                    />
                </ExpandedChartSelectWrapper>
                <ExpandedChartSelectWrapper>
                    <ExpandedChartSelectLabel>Search By Product</ExpandedChartSelectLabel>
                    <Select
                        styles={{
                            container:((baseStyles:any)=>({
                                ...baseStyles,
                                width:250
                            })),
                            option: (baseStyles, { isSelected }) => ({
                                ...baseStyles,
                                backgroundColor: isSelected ? "#BC3D80" : "white",
                               
                               
                                "&:hover": {
                                    backgroundColor: '#bc3d814d',
                                    color:"black",
                                }
                            }),
                            control: (baseStyles, {  isFocused }) => (
                                {
                                    ...baseStyles, 
                                    borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",
                                    // border: "none",
                                    // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
                                    boxShadow: 'none',
                                    "&:hover":{
                                        borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",

                                    }
                                    
                                }),
                        }}
                        options={options.skus}
                        onChange={(e)=>onChange(e,'SKUCode')}
                    />
                </ExpandedChartSelectWrapper>
                <ExpandedChartCapsuleWrapper>
                    <VFCapsule
                        activeBtn={activeCapsuleIndex}
                        capsules={[
                            {
                                label:'On-Hand Inventory',
                                value:'Tech'
                            },
                            {
                                label:'Pipeline Inventory',
                                value:'Eco'
                            }
                        ]}
                        handleClick={onTogglePen}
                    />
                </ExpandedChartCapsuleWrapper>
            </ExpandedChartFilterWrapper>
            <AgChartsReact
                options={{
                    height:400,
                    width:1000,
                    data:data,
                   series: [
                       {
                           type: "line",
                            xKey: "date",
                            yKey: "Red",
                            yName: "Red",
                            
                            marker:{
                                fill:'red',
                                size:2,
                                stroke:"red"
                            },
                            stroke:'red'                       
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Green",
                            yName: "Green",
                            marker:{
                                fill:'green',
                                size:2,
                                stroke:"green"
                            },
                            stroke:'green'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Yellow",
                            yName: "Yellow",
                            marker:{
                                fill:'#FFBF00',
                                size:2,
                                stroke:"#FFBF00"
                            },
                            stroke:'#FFBF00'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Black",
                            yName: "Black",
                            marker:{
                                fill:'black',
                                size:2,
                                stroke:"black"
                            },
                            stroke:'black'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Blue",
                            yName: "Blue",
                            marker:{
                                fill:'blue',
                                size:2,
                                stroke:"blue"
                            },
                            stroke:'blue'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "White",
                            yName: "White",
                            marker:{
                                fill:'gray',
                                size:2,
                                stroke:"gray"
                            },
                            stroke:'gray',
                        }
                   ]
                }}
            />
        </VFModalCard>
    )
}

export default ExpandedGraph