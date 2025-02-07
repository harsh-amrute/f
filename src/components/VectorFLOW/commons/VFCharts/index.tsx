import { useState, useRef } from 'react';
import VFInfoToolTip from "../VFInfoToolTip";
import { AgCharts } from 'ag-charts-react';
import {SCChartHeaderContainer, SCChartHeader, SCChartContainer, SCHorizontalDivider} from './styles';
import VFChartTable from '../VFChartsTable'
import { GridRef } from '../../../../VectorFlow/types/MDM';
import { AgChartInstance } from 'ag-grid-enterprise';


const VFCharts = (props:any) =>{
    const {
        height,
        title,
        graphInfo,
        defaultColForCustomGraph,
        colDefs,
        rowData,
        chartProps,
        palette,
        chartType,
        containerStyle
    } = props;

    const [hideChart,setHideChart] = useState<boolean>(false)
    const gridRef = useRef<GridRef>()
    const chartRef = useRef<AgChartInstance>(null)
    const [isHovered, setIsHovered] = useState(false);
    const imgSrc = isHovered
    ? '/assets/img/downlod-icon-hover.svg'
    : '/assets/img/downlod-icon.svg';


    console.log(rowData)


    return (
        <SCChartContainer height={height} style={containerStyle}>

        <SCChartHeaderContainer>
            <div style={{display:'flex',width:'100%',justifyContent:'center' , overflow:"hidden"}}><SCChartHeader style={{marginRight:10}}>{title}</SCChartHeader></div>
            <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graphInfo}/></div>
                {!hideChart && <img src="/assets/img/VectorFLOW/BPR/expand-graph.svg" width={15} height={15} alt="" onClick={()=>setHideChart(true)}/>}
            </div>
        </SCChartHeaderContainer>

        <SCHorizontalDivider/>

        <div style={{display:'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight:'20px' , overflow:"hidden"}}>
            <img 
                src={imgSrc}  
                height={13} 
                width={13} 
                // onClick={() => {
                //     downloadBase64Image(chartRef.current?.api.getChartImageDataURL({chartId: chartId1, fileFormat: 'image/jpg'}), "Top 10 Parent Location");
                // }}
                style={{cursor:'pointer'}} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} >
            </img>                  
        </div>

        <AgCharts ref={chartRef} className="custom-chart" options={chartProps} />

        <VFChartTable chartType={chartType} palette={palette} title={title} defaultColForCustomGraph={defaultColForCustomGraph} setHideChart={setHideChart} hideChart={hideChart} gridRef={gridRef} colDefs={colDefs} rowData={rowData} chartProps={chartProps} />
    
    </SCChartContainer>
    )
}


export default VFCharts;