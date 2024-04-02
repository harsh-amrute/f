import { AgChartsReact } from "ag-charts-react"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"

import {AgChartOptions} from 'ag-charts-community'
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
            headerBgColor="black" 
            headerText="Technical Trend | Horizon - 7 Days" 
            headerTextColor="white" 
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
                                width:250
                            }))
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
                            }))
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
                                label:'Tech',
                                value:'Tech'
                            },
                            {
                                label:'Eco',
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
                                fill:'red'
                            },
                            stroke:'red'                       
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Green",
                            yName: "Green",
                            marker:{
                                fill:'green'
                            },
                            stroke:'green'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Yellow",
                            yName: "Yellow",
                            marker:{
                                fill:'yellow'
                            },
                            stroke:'yellow'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Black",
                            yName: "Black",
                            marker:{
                                fill:'black'
                            },
                            stroke:'black'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "Blue",
                            yName: "Blue",
                            marker:{
                                fill:'blue'
                            },
                            stroke:'blue'
                        },
                        {
                            type: "line",
                            xKey: "date",
                            yKey: "White",
                            yName: "White",
                            marker:{
                                fill:'gray'
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