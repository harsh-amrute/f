import { useState, useRef, useEffect } from 'react';
import VFInfoToolTip from "../VFInfoToolTip";
import { AgCharts } from 'ag-charts-react';
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from './styles';
import VFChartTable from '../VFChartsTable'
import { GridRef } from '../../../../VectorFlow/types/MDM';
import { generateGridSpecificChartFromChartProps } from '../../../../helpers/utils'


const defaultStyles = {
    headerZoom:1,
    headerContainerHeight:'60px',
    agChartHeight:'80%'
}

const VFCharts = (props:any) =>{
    const {
        chartParams,
        height,
        colDefs,
        rowData,
        chartProps,
        containerStyle
    } = props;

    const {palette, chartType, defaultColForChart, graphInfo, title, customizedStyles=defaultStyles, downloadName } = chartParams

    const [hideChart,setHideChart] = useState<boolean>(false)
    const gridRef = useRef<GridRef>()
    const chartRef = useRef<any>(null)
    const [isHovered, setIsHovered] = useState(false);
    const imgSrc = isHovered
    ? '/assets/img/downlod-icon-hover.svg'
    : '/assets/img/downlod-icon.svg';

    const [gridSpecificChartOptions,setGridSpecificChartOptions] = useState<any>(undefined)

    useEffect(()=>{
        if(chartProps!==undefined){
            setGridSpecificChartOptions(generateGridSpecificChartFromChartProps(chartProps,downloadName))
        }
    },[chartProps])

    return (
        <SCChartContainer height={height} style={containerStyle}>

            <VFChartsHeader hideChart={hideChart} styles={customizedStyles} graphInfo={graphInfo} setHideChart={setHideChart} title={title}  />

            <SCHorizontalDivider/>

            <div style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight:'20px' , overflow:"hidden"}}>
                <img 
                    src={imgSrc}  
                    height={13} 
                    width={13} 
                    onClick={() => {
                        chartRef.current.download({fileName:`${downloadName}.png`})
                    }}
                    style={{cursor:'pointer'}} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} >
                </img>                  
            </div>

            <AgCharts ref={chartRef} style={{minHeight:'80%',height:customizedStyles.agChartHeight}} options={chartProps} />

            <VFChartTable 
                chartType={chartType} 
                downloadName={downloadName} 
                palette={palette} 
                title={title} 
                defaultColForCustomGraph={defaultColForChart} 
                setHideChart={setHideChart} 
                hideChart={hideChart} 
                gridRef={gridRef} 
                colDefs={colDefs} 
                rowData={rowData} 
                chartProps={chartProps}
                gridSpecificChartOptions={gridSpecificChartOptions}
                />
    
    </SCChartContainer>
    )
}


export default VFCharts;


export const VFChartsHeader = (props:any) =>{
    const { hideChart, styles, graphInfo, setHideChart, title} = props;
    return (
        <SCChartHeaderContainer style={{height:styles.headerContainerHeight}}>
            <div style={{display:'flex',width:'100%',justifyContent:'center' , overflow:"hidden"}}><SCChartHeader style={{marginRight:10,zoom:styles.headerZoom}}>{title}</SCChartHeader></div>
            <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graphInfo}/></div>
                {!hideChart && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>setHideChart(true)}/>}
            </div>
        </SCChartHeaderContainer>
    )
}