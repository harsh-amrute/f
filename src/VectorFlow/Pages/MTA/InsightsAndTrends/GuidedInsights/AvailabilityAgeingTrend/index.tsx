import { AgChartsReact } from "ag-charts-react";
import {  useGetAvailabilityAgeing} from "../../../../../Services/MTA/InsightsAndTrends";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider"
import { useUserData } from "../../../../../../context";
import { useState,useEffect } from "react";
import VFButtonOutline from "../../../../../../components/VectorFLOW/commons/VFButtonOutline";

const AvailabilityAgeingTrend=()=>{
 const [horizon,setHorizon] = useState<number>(9);
 const [minAgeing,setAgeing] = useState<number>(1);
  const {mutateAsync: GetAvailabilityAgeing} = useGetAvailabilityAgeing();
  const [AvailabilityAgeingTrendData,setAgeingData]=useState();
   const {user} = useUserData()
   const themeUi=user?.user?.theme_ui
  const OnHorizonChange=async(hvalue:any, age:any)=>{
    setAgeing(age);
   
   setHorizon(hvalue);
    const param={horison:horizon, ageing:minAgeing}

   const AvailabilityAgeing=await GetAvailabilityAgeing(param);

  const AvailabilityAgeingTrendData=AvailabilityAgeing?.data?.data;
  setAgeingData(AvailabilityAgeingTrendData);
  }
  
    const handleAgeChange = (event:any) => {
    setAgeing(parseInt(event.target.value));
  };
 
   useEffect(()=>{

        OnHorizonChange(horizon, minAgeing);
      },[])
   
    const AvailabilityAgeingTrendOptions={
   title: {
      text: "Trend of #SKU-Loations with Continuous Black/Red/White Status >= Selected Minimum Ageing",
    },
    data: AvailabilityAgeingTrendData,
    series: [
      {
        type: "line" as const,
        xKey: "date",
        yKey: "red",
        yName: "red",
        strokeWidth: 3,
        stroke: "#DA3535",
        marker: {
          fill: "#DA3535",
          size: 5,
         
         
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "black",
        yName: "black",
        strokeWidth: 3,
        stroke: "#000000",
        marker: {
          fill: "#000000",
          size: 5,
        
         
        },
      },
      {
        type: "line" as const,
        xKey: "date",
        yKey: "white",
        yName: "white",
        strokeWidth: 3,
        stroke: "#BFBFBF",
        marker: {
          fill: "#BFBFBF",
          size: 5,
       
         
        },
      },
    ],

}
 const numbers = Array.from(Array(90), (_, index) => index + 1);
    return <div>
      <div style={{display:"flex", top: 221,
      left: 239,
width: 970,
height: 59,
opacity: 1}}>
  <div style={{paddingLeft:20, paddingTop:10, width:250,  }}>
      <label style={{ fontStyle:"normal",
    fontVariant:"normal",
    fontWeight:400,
    fontSize:20,
    fontFamily:"Roboto",}}><b>Minimum Ageing:</b>  </label>
       <select onChange={handleAgeChange} value={minAgeing} style={{width:50, height:40, border:"1px solid #707070", boxShadow:" 0px 6px 12px #8D8D8D29"}}>
      
        {numbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>))}
  </select>
  </div>
  <div style={{width:450, display:"flex" }}>
  <label style={{fontStyle:"normal",
    fontVariant:"normal",
    fontWeight:400,
    fontSize:20,
   paddingTop:20,
    fontFamily:"Roboto"}}> <b>Select Horizon: </b></label>
     
                    <VFRangeSlider
                        showTriangle={false}
                        min={1}
                        max={90}
                        milestones={[0,9,30,60,90]}
                        strictMode={true}
                        width={250}
                        defaultValue={horizon}
                        handleChange={(e)=>setHorizon(e)}
                        labelValueFormatter={(value:number)=>value>1?`${value} Days`:`${value} Day`}
                    />
                   </div>
                    <VFButtonOutline themeUi={themeUi} onClick={()=>OnHorizonChange(horizon, minAgeing)}>Submit</VFButtonOutline>
                    </div>
      <AgChartsReact options={AvailabilityAgeingTrendOptions} /></div>
}
export default AvailabilityAgeingTrend