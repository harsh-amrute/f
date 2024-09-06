import VFModalCard from "../../commons/VFModalCard/index";
import { 
  SCChartContainer, 
  SCSeasonalityContainer, 
  SCSeasonalityStatusDetails,
  SCSeasonalityDetailsTitle,
  SCSeasonalityDetailsBody,
  SCText,
  SCHorizontalDivider,
  SCDataRow,
  SCDataNode,
  SCVerticalDivider
 } from "./styles";

 import {type NormChangeHistory, DailyDataChart } from '../../../../VectorFlow/types/BPR';
//  import {enIN} from 'date-fns/locale';
 import { useState } from "react";

import VFRangeSlider from '../VFRangeSlider'
import Select from 'react-select'
import { AgCharts} from "ag-charts-react";
import { getDatesBetween, getFormattedDate } from "../../../../helpers/utils";
import {suspensionMessages} from '../../../../helpers/BPRConstants';
import { useDispatch } from 'react-redux';
import { TOGGLE_GRAPH_MODAL, TOGGLE_NORM_CHANGE_HISTORY_TABLE } from "../../../../redux/actions/MTA";
import {subDays} from 'date-fns';
import { useUserData } from "../../../../context";
interface DailyDataGraphModalProps{
  rowData:any,
  chartData:any[]
  normChangeData:any,
  suggestionData:any,
  masterData:any,
  monitoringData:any,
  isModalOpen:boolean,
  skuKey:string,
  whKey:string
}

interface NormData{
  norm:number,
  date:string
}






const DailyDataGraphModal = ({rowData,chartData,normChangeData,suggestionData,masterData,isModalOpen,monitoringData,skuKey,whKey}:DailyDataGraphModalProps) => {

  const {user} = useUserData()

  const themeUi = user.user.theme_ui

    const fillNotAvailableDates = (data:any)=>{
      const lastNinetyDates = getDatesBetween(subDays(new Date(),89),new Date());
      const lastNinetyDaysData:DailyDataChart[] = [];
      lastNinetyDates.forEach((date:Date)=>{
        const dailyData = data.find((data:DailyDataChart)=>{
          return ((new Date(data.dt).getDate() === date.getDate()) && (new Date(data.dt).getMonth() === date.getMonth()) && (new Date(data.dt).getFullYear() && date.getFullYear()))
        })
        if(dailyData) {
          lastNinetyDaysData.push(dailyData);
        }
        else{
          lastNinetyDaysData.push({
            cs:null,
            dt:getFormattedDate(date),
            git:null,
            rp:null,
            stk:null,
            rrs:null,
            grs:null,
            rrc:null,
            grc:null
          })
        }
      })
    }
    fillNotAvailableDates(chartData);
    const dispatch = useDispatch();
    const suspensionOptions = [
        {label:'Select Suspension Type',value:''},
        {label:'Upward Stock Based',value:'upwardStockBased'},
        {label:'Downward Stock Based',value:'downwardStockBased'},
        {label:'Upward Consumption Based',value:'upwardConsumptionBased'},
        {label:'Downward Consumption Based',value:'downwardConsumptionBased'}

    ]
    const [horizon,setHorizon] = useState<number>(30);
    const [suspensionType,setSuspensionType] = useState('')

    const generateChartOptions = () => {
        const adjustedChartData = chartData.slice(chartData.length-horizon,chartData.length);
        const sortedNormChangeData = [...normChangeData].sort((a:NormChangeHistory,b:NormChangeHistory) => new Date(a.nCD).getTime() - new Date(b.nCD).getTime());

        let tempNorm = 0;

        let normData = chartData.map((dailyData:DailyDataChart) => {

            //Find Closest Norm Change History to current Date
            let closestNormChangeIndex = -1;

            sortedNormChangeData.forEach((o:NormChangeHistory,index:number) => {
              if(new Date(dailyData.dt).getTime() >= new Date(o.nCD).getTime()){
                closestNormChangeIndex = index;
              }
            });
            
            if(normChangeData.length > 0 && closestNormChangeIndex !== -1){
              tempNorm = sortedNormChangeData[closestNormChangeIndex]['nN'];
            }
            else{
              tempNorm = masterData['nm'];
            }
              
            return {date:dailyData.dt,norm:tempNorm};
        }).slice(chartData.length-horizon,chartData.length);

      
        normData = normData.map((data:NormData,index:number)=>{
          const normBand = parseFloat((data.norm/3).toFixed(2))

          const normObj = {
            ...data,normRed:normBand,
            normGreen:normBand,
            normYellow:normBand,
            normBlue:data.norm + parseInt(adjustedChartData[index]['bz'],10),
            upwardStockBasedNorm:adjustedChartData[index]['rrs'] > 0 ? data.norm : 0,
            downwardStockBasedNorm:adjustedChartData[index]['grs'] > 0 ? data.norm : 0,
            upwardConsumptionBasedNorm:adjustedChartData[index]['rrc'] > 0 ? data.norm : 0,
            downwardConsumptionBasedNorm:adjustedChartData[index]['grc'] > 0 ? data.norm : 0
          }

          return normObj
        })

        function generateSuspensionReasons(rrs:number,grs:number,rrc:number,grc:number){
          const suspensionReasons:Array<string> = [];
          suspensionMessages.forEach((obj:{Key:number,Value:string})=>{
            if(((obj.Key & rrs) > 0) || ((obj.Key & grs) > 0) || ((obj.Key & rrc) > 0) || ((obj.Key & grc) > 0)){
              if(!suspensionReasons.includes(obj.Value)) suspensionReasons.push(obj.Value)
            }
          })

          let suspensionReasonsHTML = ``;

          suspensionReasons.forEach((reason:string)=>{
            suspensionReasonsHTML += `<li>${reason}</li>`
          })
          return suspensionReasonsHTML;
        }

        const generateRevisionSuggestedBlock = (oldNorm:number,newNorm:number,reason:string) => `
            <div style="padding:5px;">
              <span style="font-family:Roboto;font-weight:700;">Revision Suggested :</span>
              <span>Old Norm - ${oldNorm} </span>
              <span>New Norm - ${newNorm} </span>
              <br>
              <span style="font-family:Roboto;font-weight:700;">Reason : </span>
              <span>${reason}</span>
              <div style="width:100%;height:1px;background-color:#777777;margin-top:2px;"></div>
            </div>
          `

        const generateSuspensionReasonsBlock = (reasons:string) => `
          <div style="padding:5px;">
            <p style="font-family:Roboto;font-weight:700;">Suspension Reasons :</p>
            <ol>
              ${reasons}
            </ol>
            <div style="width:100%;height:1px;background-color:#777777;margin-top:2px;"></div>
          </div>
        `

        const generateDailyDataBlock = (stock:number,receipt:number,git:number,consumption:number,redNorm:number,yellowNorm:number,greenNorm:number) => `
          <div style="padding:5px;">
            <div style="display:flex;justify-content:flex-start;flex-wrap:wrap;gap:5px;margin-bottom:5px;">
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#5D148B;"></div>
                <span style="font-family:Roboto;font-weight:700;">Stock :</span>
                <span>${stock}</span>
              </div>
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#8137BC;"></div>
                <span style="font-family:Roboto;font-weight:700;">GIT :</span>
                <span>${git}</span>
              </div>
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#67B6E8;"></div>
                <span style="font-family:Roboto;font-weight:700;">Receipt :</span>
                <span>${receipt}</span>
              </div>
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#EDB04D;"></div>
                <span style="font-family:Roboto;font-weight:700;">Consumption :</span>
                <span>${consumption}</span>
              </div>
              
            </div>
            <div style="display:flex;gap:5px;">
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#ED4A4A;"></div>
                <span>${redNorm}</span>
              </div>
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#F5EE4E;"></div>
                <span>${yellowNorm}</span>
              </div>
              <div style="display:flex;align-items:center;gap:5px;">
                <div style="width:10px;height:10px;background-color:#418D18;"></div>
                <span>${greenNorm}</span>
              </div>
            </div>
          <div>
        `

        function renderer(params: any) {
          const suggestionObject = suggestionData.find((data:any)=>new Date(data['sdate']).getTime() === new Date(params.datum['date']).getTime())
          const dailyDataObject = chartData.find((data:any)=>new Date(data['dt']).getTime() === new Date(params.datum['date']).getTime())
          const suspensionReasons = generateSuspensionReasons(params.datum.upwardStockBasedNorm,params.datum.downwardStockBasedNorm,params.datum.upwardConsumptionBasedNorm,params.datum.downwardConsumptionBasedNorm)
       
          let tooltip = `
            <div style="text-align:center;font-family:Roboto;font-weight:700;padding:5px;border-bottom:1px dashed #777777;">
              ${getFormattedDate(new Date(params.datum.date))}
            </div>
          `

          if(suggestionObject) tooltip += generateRevisionSuggestedBlock(suggestionObject?.oln,suggestionObject?.nn,suggestionObject?.rsn);
          if(suspensionReasons.length > 0 && suspensionType!=='') tooltip += generateSuspensionReasonsBlock(suspensionReasons);

          tooltip += generateDailyDataBlock(dailyDataObject.stk,dailyDataObject.rp,dailyDataObject.git,dailyDataObject.cs,params.datum.normRed,params.datum.normGreen*2,Math.ceil(params.datum.normYellow*3))

          const finalTooltipHTML = `
            <div style="background-color:white;border:1px solid #777777;border-radius:5px;max-width:400px;">
              ${tooltip}
            </div>
          `

          return finalTooltipHTML;
        }

        function formatter(params:any) {
          const suggestionObject = suggestionData.find((data:any)=>new Date(data['sdate']).getTime() === new Date(params.datum['dt']).getTime());
          if(suggestionObject) return {size:7,fill:'#5D148B',stroke:'white',strokeWidth:1}
          return {size:0};
        }
    

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
                yKey: 'normRed',
                yName:'',
                data:normData,
                type:'area',
                // strokeWidth: 3,
                fill:'#ED4A4A',
                stacked:true,
                showInLegend:false,
                tooltip:{
                  renderer:renderer
                },
                position:{
                  type:'pointer'
                }
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
                showInLegend:false,
                tooltip:{
                  renderer:renderer
                },
                position:{
                  type:'pointer'
                }
               
              },
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
                showInLegend:false,
                tooltip:{
                  renderer:renderer
                },
                position:{
                  type:'pointer'
                }
               
              },
              {
            
                xKey: 'date',
                xName:'Date',
                yKey: 'normBlue',
                yName:'',
                data:normData,
                type:'area',
                // strokeWidth: 3,
                fill:'#355FD3',
                stacked:true,
                showInLegend:false,
                tooltip:{
                  renderer:renderer,
                  position:{
                    type:'pointer'
                  }
                }  
              }, 
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'git',
                yName:'GIT',
                data:adjustedChartData,
                type:'bar',
                fill:'#8137BC',
                tooltip:{
                  enabled: false
                }
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'rp',
                yName:'Receipts',
                data:adjustedChartData,
                type:'bar',
                fill:'#67B6E8',
                tooltip:{
                  enabled: false
                }   
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'cs',
                yName:'Consumption',
                data:adjustedChartData,
                type:'bar',
                fill:'#EDB04D',
                tooltip:{
                  enabled: false
                }
              },
              {
            
                xKey: 'dt',
                xName:'Date',
                yKey: 'stk',
                yName:'Stock',
                data:adjustedChartData,
                type:'line',
                stroke:'#5D148B',
                tooltip:{
                  enabled: false
                },
                marker: {
                  formatter
                }
              },
            ],
            axes: [{
                type: "category",
                position: "bottom",
                label:{
                  autoRotate:false,
                  avoidCollisions:true
                }
            } as const,
            {         
                type: "number",
                position: "left"
            } as const,
           ],
        }
        const upwardStockBasedOptions = {
            
          xKey: 'date',
          xName:'Date',
          yKey: 'upwardStockBasedNorm',
          yName:'',
          data:normData,
          type:'area',
          // strokeWidth: 3,
          fill:'#808080',
          fillOpacity:0.8,
          showInLegend:false,
          tooltip:{
            enabled: false
          },   
        }
        const downwardStockBasedOptions = {
            
          xKey: 'date',
          xName:'Date',
          yKey: 'downwardStockBasedNorm',
          yName:'',
          data:normData,
          type:'area',
          // strokeWidth: 3,
          fill:'#808080',
          fillOpacity:0.8,
          showInLegend:false,
          tooltip:{
            enabled: false
          },   
        }

        const upwardConsumptionBasedOptions = {
            
          xKey: 'date',
          xName:'Date',
          yKey: 'upwardConsumptionBasedNorm',
          yName:'',
          data:normData,
          type:'area',
          // strokeWidth: 3,
          fill:'#808080',
          fillOpacity:0.8,
          showInLegend:false,
          tooltip:{
            enabled: false
          },   
        }

        const downwardConsumptionBasedOptions = {
            
          xKey: 'date',
          xName:'Date',
          yKey: 'downwardConsumptionBasedNorm',
          yName:'',
          data:normData,
          type:'area',
          // strokeWidth: 3,
          fill:'#808080',
          fillOpacity:0.8,
          showInLegend:false,
          tooltip:{
            enabled: false
          },   
        }

        if(suspensionType === 'upwardStockBased') options['series'].push(upwardStockBasedOptions);
        if(suspensionType === 'downwardStockBased') options['series'].push(downwardStockBasedOptions);
        if(suspensionType === 'upwardConsumptionBased') options['series'].push(upwardConsumptionBasedOptions);
        if(suspensionType === 'downwardConsumptionBased') options['series'].push(downwardConsumptionBasedOptions);


        return options;

    }

    const getMonitoringDate = () => {
        if(suspensionType === 'upwardStockBased') return monitoringData[0]['srrd'];
        if(suspensionType === 'downwardStockBased') return monitoringData[0]['sgrd'];
        if(suspensionType === 'upwardConsumptionBased') return monitoringData[0]['crrd'];
        if(suspensionType === 'downwardConsumptionBased') return monitoringData[0]['cgrd'];
    }

    

    const onChangeHorizon = (horizon:number) => {
        setHorizon(horizon)
    } 

    
   
    return(
        <VFModalCard openModal={isModalOpen} closeModal={()=>dispatch(TOGGLE_GRAPH_MODAL(false))} headerIcon='' headerText="Daily Data Graph" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <SCSeasonalityContainer>
                <SCChartContainer>
                    <AgCharts options={generateChartOptions()}/>
                </SCChartContainer>
                <SCSeasonalityStatusDetails>
                  <SCSeasonalityDetailsTitle themeUi={themeUi}>
                    Daily Data Graph Details
                  </SCSeasonalityDetailsTitle>
                  <SCSeasonalityDetailsBody>
                    <SCText fontSize={14} fontWeight={400} style={{textAlign:'center'}}>Select Horizon</SCText>
                    <div style={{marginTop:'0px'}}><VFRangeSlider min={0} max={90} milestones={[-1,0,90]} strictMode={false} width={324} defaultValue={horizon} handleChange={onChangeHorizon} showTriangle={false} /></div>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                        <SCText fontSize={16} fontWeight={300}>Norm Change History :</SCText>
                        <div style={{display:'flex',gap:'5px'}} onClick={() => dispatch(TOGGLE_NORM_CHANGE_HISTORY_TABLE(true))}>
                            <img src={themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/eye-filled-regal.svg":"/assets/img/VectorFLOW/BPR/eye-filled-purple.svg"}/>
                            <SCText fontSize={16} fontWeight={700} style={{color:themeUi==="REGALBLAZE"?"#FCA311": "#BC3D80"}}>Click To View</SCText>
                        </div>
                    </SCDataRow>
                    <SCHorizontalDivider/>
                    <div style={{display:'flex',flexDirection:'column',marginBottom:'20px', fontSize:'16px'}}>
                        <SCText fontSize={18} fontWeight={300}>Select Suspension Type:</SCText>
                        <Select options={suspensionOptions} placeholder={"Select Suspension Type"} defaultValue={suspensionOptions[0]} onChange={(data:any)=>setSuspensionType(data.value)}
                        styles={{
                            
                          option: (baseStyles, { isSelected }) => ({
                              ...baseStyles,
                              backgroundColor: isSelected ?themeUi==="REGALBLAZE"?"#FCA311": "#BC3D80" : "white",
                             
                             
                              "&:hover": {
                                  backgroundColor:themeUi==="REGALBLAZE"?"rgb(252, 163, 17,0.3) ": '#bc3d814d',
                                  color:"black",
                              }
                          }),
                          control: (baseStyles, { isFocused }) => (
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
                        
                        />
                    </div>

                    <SCHorizontalDivider/>
                    <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
                        <SCText fontSize={18} fontWeight={300}>SKU:</SCText>
                        <SCText fontSize={18} fontWeight={500} hideDefaultMargin>{rowData[skuKey]}</SCText>
                    </div>
                    <SCHorizontalDivider/>
                    <SCDataRow>
                      <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Location :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{rowData[whKey]}</SCText>
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
                    <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      <SCText fontWeight={300} fontSize={16}>Monitoring Date :</SCText>
                      <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{getMonitoringDate()}</SCText>
                      {/* <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Monitoring Date :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{'5'}</SCText>
                      </SCDataNode> */}
                      {/* <SCVerticalDivider/> */}
                      {/* <SCDataNode>
                        <SCText fontWeight={300} fontSize={16}>Total Receipt :</SCText>
                        <SCText fontWeight={500} fontSize={18} hideDefaultMargin>{3}</SCText>
                      </SCDataNode> */}
                    </div>
                  </SCSeasonalityDetailsBody>           
                </SCSeasonalityStatusDetails>
            </SCSeasonalityContainer>
        </VFModalCard>
    )


}

export default DailyDataGraphModal;