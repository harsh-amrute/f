import VFModalCard from "../../commons/VFModalCard/index";
import { 
  SCChartContainer, 
  SCSeasonalityContainer, 
  SCSeasonalityStatusDetails,
  SCSeasonalityDetailsTitle,
  SCSeasonalityDetailsBody,
  SCText,
  SCCheckBoxRow,
  SCCheckBoxContainer,
  SCHorizontalDivider,
  SCDataRow,
  SCDataNode,
  SCVerticalDivider
 } from "./styles";
 import Checkbox from "../../../commons/Checkbox";
 import {type NormChangeHistory, DailyDataChart } from '../../../../VectorFlow/types/BPR';
//  import {enIN} from 'date-fns/locale';
 import { useRef, useState, useEffect } from "react";
 import SelectOptionLevel from '../../../commons/SelectOptionLevel'

import VFRangeSlider from '../VFRangeSlider'
import Select from 'react-select'
import { AgCharts } from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-grid-enterprise/dist/lib/chart/agChartOptions";




interface DailyDataGraphModalProps{
  rowData:any,
  chartData:any[]
  normChangeData:any,
  masterData:any,
  isModalOpen:boolean,
  closeModal:()=>void,
  toggleNormChangeHistoryTable:any

}

interface NormData{
  norm:number,
  date:string
}





const DailyDataGraphModal = ({rowData,chartData,normChangeData,masterData,isModalOpen,closeModal,toggleNormChangeHistoryTable}:DailyDataGraphModalProps) => {
    // console.log(rowData);
    const suspensionOptions = [
        {label:'Upward Stock Based',value:'upwardstockbased'},
        {label:'Downward Stock Based',value:'downwardstockbased'},
        {label:'Upward Consumption Based',value:'upwardconsumptionbased'},
        {label:'Downward Consumption Based',value:'downwardconsumptionbased'}

    ]
    const [horizon,setHorizon] = useState<number>(30);

    const generateChartOptions = () => {
        const adjustedChartData = chartData.slice(chartData.length-horizon,chartData.length);
        const sortedNormChangeData = normChangeData.sort((a:NormChangeHistory,b:NormChangeHistory) => new Date(a.date).getTime() - new Date(b.date).getTime());

        let tempNorm = 0;
        let normData = chartData.map((dailyData:DailyDataChart) => {

            //Find Closest Norm Change History to current Date
            let closestNormChangeIndex = -1;

            sortedNormChangeData.forEach((o:NormChangeHistory,index:number) => {
              if(new Date(dailyData.dt).getTime() >= new Date(o.date).getTime()){
                closestNormChangeIndex = index;
              }
            });

            // if(closestNormChangeIndex === -1){
            //   const normChangeOldest = sortedNormChangeData[0];
            //   const normChangeLatest = sortedNormChangeData[sortedNormChangeData.length-1]
            //   if(new Date(dailyData.dt).getTime() > new Date(normChangeOldest.date).getTime()){
            //     tempNorm = normChangeOldest['oldNorm'];
            //   }
            //   if(new Date(dailyData.dt).getTime() < new Date(normChangeLatest.date).getTime()){
            //     tempNorm = normChangeLatest['newNorm'];
            //   }
            // }
            // else{
              tempNorm = sortedNormChangeData[closestNormChangeIndex]['newNorm'];
            // }  

            return {date:dailyData.dt,norm:tempNorm};
        }).slice(chartData.length-horizon,chartData.length);
        normData = normData.map((data:NormData)=>{
          const normBand = parseFloat((data.norm/3).toFixed(2))
          return {...data,normRed:normBand,normGreen:normBand,normYellow:normBand}
        })
       

        const options:any = {
            title: {  
              text: '',
            }, 
            legend: {
              item: {
                  showSeriesStroke: true,
              },
            },    
            series: [
              {
            
                xKey: 'date',
                xName:'Date',
                yKey: 'normGreen',
                yName:'',
                data:normData,
                type:'area',
                // strokeWidth: 3,
                stacked:true,
                fill:'#418D18',
                showInLegend:false
               
              },
              {
            
                xKey: 'date',
                xName:'Date',
                yKey: 'normYellow',
                yName:'',
                data:normData,
                type:'area',
                // strokeWidth: 3,
                stacked:true,
                fill:'#F5EE4E',
                showInLegend:false    
              },
              {
            
                xKey: 'date',
                xName:'Date',
                yKey: 'normRed',
                yName:'',
                data:normData,
                type:'area',
                // strokeWidth: 3,
                fill:'#ED4A4A',
                stacked:true,
                showInLegend:false   
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'stock',
                yName:'Stock',
                data:adjustedChartData,
                type:'line',
                stroke:'#5D148B',
                marker: {
                  fill: "#5D148B",
                  size: 5,
                  stroke: "#5D148B",
                  strokeWidth: 3,
                  shape: "circle",
                },
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'git',
                yName:'GIT',
                data:adjustedChartData,
                type:'bar',
                fill:'#8137BC'  
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'rp',
                yName:'Receipts',
                data:adjustedChartData,
                type:'bar',
                fill:'#67B6E8'    
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'cs',
                yName:'Consumption',
                data:adjustedChartData,
                type:'bar',
                fill:'#EDB04D'
              },
              
             
            ],
            axes: [{
                type: "category",
                position: "bottom",
            } as const,
            {         
                type: "number",
                position: "left"
            } as const,
           ],
        }

        return options;

    }

    

    const onChangeHorizon = (horizon:number) => {
        setHorizon(horizon)
    } 


    return(
        <VFModalCard openModal={isModalOpen} closeModal={closeModal} headerIcon='' headerText="Daily Data Graph" headerBgColor="#000000" headerTextColor="#FFFFFF" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-white.svg"}>
            <SCSeasonalityContainer>
                <SCChartContainer>
                    <AgChartsReact options={generateChartOptions()}/>
                </SCChartContainer>
                <SCSeasonalityStatusDetails>
                  <SCSeasonalityDetailsTitle>
                    Daily Data Graph Details
                  </SCSeasonalityDetailsTitle>
                  <SCSeasonalityDetailsBody>
                    <SCText fontSize={14} fontWeight={400} style={{textAlign:'center'}}>Select Horizon</SCText>
                    <div style={{marginTop:'0px'}}><VFRangeSlider min={0} max={90} milestones={[-1,0,90]} strictMode={false} width={324} defaultValue={horizon} handleChange={onChangeHorizon} showTriangle={false} /></div>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                        <SCText fontSize={16} fontWeight={300}>Norm Change History :</SCText>
                        <div style={{display:'flex',gap:'5px'}} onClick={() => toggleNormChangeHistoryTable(true)}>
                            <img src="/assets/img/VectorFLOW/BPR/eye-filled-purple.svg"/>
                            <SCText fontSize={16} fontWeight={700} style={{color:'#BC3D81'}}>Click To View</SCText>
                        </div>
                    </SCDataRow>
                    <SCHorizontalDivider/>
                    <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
                        <SCText fontSize={16} fontWeight={300}>Select Suspension Type:</SCText>
                        <Select options={suspensionOptions} placeholder={"Select-"}/>
                    </div>
                    <SCHorizontalDivider/>
                    <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
                        <SCText fontSize={18} fontWeight={300}>SKU:</SCText>
                        <SCText fontSize={18} fontWeight={500} hideDefaultMargin>{rowData['SKUCode'] + rowData['SKUName']}</SCText>
                    </div>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Location :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{10}</SCText>
                      </SCDataNode>
                      <SCVerticalDivider/>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>RLT :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{masterData['rlt']}</SCText>
                      </SCDataNode>
                    </SCDataRow>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Current Norm :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{masterData['nm']}</SCText>
                      </SCDataNode>
                      <SCVerticalDivider/>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Min Norm :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{masterData['mn']}</SCText>
                      </SCDataNode>
                    </SCDataRow>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>RCP :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{masterData['rcp']}</SCText>
                      </SCDataNode>
                      <SCVerticalDivider/>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>GCP :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{masterData['gcp']}</SCText>
                      </SCDataNode>
                    </SCDataRow>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Total Consumption :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{'5'}</SCText>
                      </SCDataNode>
                      <SCVerticalDivider/>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Total Receipt :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{3}</SCText>
                      </SCDataNode>
                    </SCDataRow>
                  </SCSeasonalityDetailsBody>           
                </SCSeasonalityStatusDetails>
            </SCSeasonalityContainer>
        </VFModalCard>
    )


}

export default DailyDataGraphModal;