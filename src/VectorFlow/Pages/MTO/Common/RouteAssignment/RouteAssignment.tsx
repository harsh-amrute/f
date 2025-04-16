import React, {useEffect, useState} from 'react'
import RadioSelect from '../../../../../components/VectorFLOW/commons/MTO/RadioSelect'
import { FOLIcon, StepGroup, StepperWrapper } from './RouteAssignment.styled'
import _ from 'lodash'

interface IRouteAssignmentProps {
    theme: string,
    ccrGroupMaster?: any,
    selectedRoutes?: any,
    setSelectedRoutes?: any,
    isEditable?: boolean,
    onChange?: (route:any) => void
}

const RouteAssignment = ({theme, ccrGroupMaster=[], selectedRoutes, setSelectedRoutes, isEditable = true}: IRouteAssignmentProps) => {


    useEffect(() => {
        console.log("ccrGroupMaster in routes", ccrGroupMaster);
    }, [ccrGroupMaster])
    useEffect(() => {
        // let animationFrameId: any;
        const adjustLayout =(containerWidth:number, items:any) =>{
          let currWidth = 0;
          let lineType = true;
          let array:any = [];
          let myIndex = 1;
      
          items.forEach((element:any) => {
            if (currWidth + element.offsetWidth + 32 > containerWidth) {
              if (!lineType) {
                array.reverse();
              }
              array.forEach((e:any) => {
                e.style.order = myIndex++;
                e.dataset.order = lineType ? "asc" : "dsc"
              });
              array = [element];
              currWidth = element.offsetWidth;
              lineType = !lineType;
            } else {
              array.push(element);
              currWidth += element.offsetWidth + 32;
            }
          });
      
          if (!lineType) {
            array.reverse();
          }
          array.forEach((e:any) => {
              e.style.order = myIndex++;
              e.dataset.order = lineType ? "asc" : "dsc"
          });
        }
        const animate = () => {
            const stepGroups:any = document.querySelectorAll('.route-assignment .step-group');
            const svg: any = document.querySelector('.line');
            const stepperWrapper: any = document.querySelector('.route-assignment');
            if(stepGroups && stepperWrapper && svg){
                const stepperRect = stepperWrapper?.getBoundingClientRect();
                adjustLayout(stepperWrapper.offsetWidth, stepGroups); 
            // stepGroups = Array.from(stepGroups).sort((a:any,b:any)=>{
            //     return a.style.order - b.style.order
            // });
                if (svg?.innerHTML) {
                    svg.innerHTML = "";
                }
                for (let i = 0; i < stepGroups?.length - 1; i++) {
                    const start: any = stepGroups[i].getBoundingClientRect();
                    const end: any = stepGroups[i + 1].getBoundingClientRect();

                    // Adjust the positions
                    //asc to asc
                    const stepDot = 5.2
                    let adjustedStart = {
                        y: start.top - stepperRect.top,
                        x: start.right - stepperRect.left  + stepDot ,
                        height: start.height        
                    };        
                    let adjustedEnd = {
                        y: end.top - stepperRect.top,
                        x: end.left - stepperRect.left - stepDot,
                        height: end.height,
                        width: end.width
                    };
                    if(stepGroups[i].dataset.order == "asc" && stepGroups[i + 1].dataset.order == "dsc"){ 
                        adjustedStart = {
                            y: start.top - stepperRect.top,
                            x: start.right - stepperRect.left  + stepDot ,
                            height: start.height        
                        };        
                        adjustedEnd = {
                            y: end.top - stepperRect.top,
                            x: end.right - stepperRect.left + stepDot,
                            height: end.height,
                            width: end.width
                        };
                    }
                    else if (stepGroups[i].dataset.order == "dsc" && stepGroups[i + 1].dataset.order == "dsc"){
                        adjustedStart = {
                            y: start.top - stepperRect.top,
                            x: start.left - stepperRect.left  - stepDot ,
                            height: start.height        
                        };        
                        adjustedEnd = {
                            y: end.top - stepperRect.top,
                            x: end.right - stepperRect.left + stepDot,
                            height: end.height,
                            width: end.width
                        };
                    }
                    else if (stepGroups[i].dataset.order == "dsc" && stepGroups[i + 1].dataset.order == "asc"){
                        adjustedStart = {
                            y: start.top - stepperRect.top,
                            x: start.left - stepperRect.left  - stepDot + 1,
                            height: start.height        
                        };        
                        adjustedEnd = {
                            y: end.top - stepperRect.top,
                            x: end.left - stepperRect.left - stepDot + 1,
                            height: end.height,
                            width: end.width
                        };
                    }
                    if (stepGroups[i + 1].id == "inactive") {
                        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                        polyline.setAttribute('points', `${adjustedEnd.x - 8},${adjustedEnd.y + adjustedEnd.height / 2 - 2.5} ${adjustedEnd.x - 8},${adjustedEnd.y - 10} ${adjustedEnd.x + 8 + adjustedEnd.width},${adjustedEnd.y - 10} ${adjustedEnd.x + 8 + adjustedEnd.width},${adjustedEnd.y + adjustedEnd.height / 2 - 2.5}`);
                        svg.appendChild(polyline);
                        polyline.setAttribute('stroke', '#82104C');
                        polyline.setAttribute('fill', 'none');
                        svg.appendChild(polyline);
                    }
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    let leftOffset = 0
                    let rightOffset = 0
                    if (stepGroups[i].id == "inactive") {
                        rightOffset = 5
                    }
                    if (stepGroups[i + 1].id == "inactive") {
                        leftOffset = 5
                    }
                    line.setAttribute('x1', (adjustedStart.x+ rightOffset).toString());
                    line.setAttribute('y1', (adjustedStart.y + adjustedStart.height / 2 - 1).toString());
                    line.setAttribute('x2', (adjustedEnd.x - leftOffset).toString());
                    line.setAttribute('y2', (adjustedEnd.y + adjustedEnd.height / 2 - 1).toString());
                    line.setAttribute('stroke', '#82104C');
                    svg.appendChild(line);
                }
                // animationFrameId = 
                requestAnimationFrame(animate);
            }   
        };
        // animationFrameId = 
        requestAnimationFrame(animate);
        // return cancelAnimationFrame(animationFrameId);
    }, []);

    const [sortedSelectedRoutes, setSortedSelectedRoutes] = useState<any>([]);

    useEffect(()=>{
        if(selectedRoutes && ccrGroupMaster){

            const val = _.cloneDeep(selectedRoutes);
            console.log("ccrGroupMaster", ccrGroupMaster);
            console.log("selectedRoutes intial", selectedRoutes);
            setSortedSelectedRoutes(val.map((routeGroup: any) => {
                const [ccrGroup, ccr] = routeGroup;
                console.log("ccrGroup....", ccrGroup);
                console.log("ccr in route", ccr);
                const sortedCcrs = ccrGroup.ccrs.sort((a: any, b: any) => a.fol - b.fol);
                
                const val = [{ ...ccrGroup, ccrs: sortedCcrs }, ccr];
                console.log("val", val);
                return val;
            }))
            
        }

    },[selectedRoutes, ccrGroupMaster])
    
  return (
    <StepperWrapper style={{justifyContent: ccrGroupMaster.length <= 3 ? "start" :ccrGroupMaster.length <= 6 ? "end" : ccrGroupMaster.length <= 9? "start": 'end'}} key="route-assignment" className="route-assignment">
        {ccrGroupMaster.map((ccrGroup: any, index: number)=>{
            return(
            <StepGroup $step={true} key={`route-assignment-${index}`}>
                <RadioSelect 
                    key={`route-assignment-${index}-${1}`}
                    isDisabled={!isEditable}
                    theme={theme} 
                    color="lightgrey" 
                    options={ccrGroupMaster} 
                    isClearable
                    value={sortedSelectedRoutes?.[index]?.[0] || null}
                    onChange={(newValue: any)=>{
                        const newGroups = [...sortedSelectedRoutes];
                        if(newValue == null || newValue == undefined){
                            newGroups[index] = null
                        }else{
                            newGroups[index] = [newValue,null];
                        }
                        // console.log("newValue", newValue);
                        // console.log("index", index);
                        // console.log("newGroups", newGroups);
                        // console.log(newGroups.filter(item => item !== undefined || item !== null))
                        setSelectedRoutes(newGroups.filter(item => item !== undefined && item !== null));
                    }}
                />
                <RadioSelect 
                    key={`route-assignment-${index}-${2}`}
                    isClearable
                    isDisabled={!isEditable}
                    theme={theme} 
                    value={sortedSelectedRoutes[index]?.[1] || null}
                    options={sortedSelectedRoutes[index]?.[0]?.ccrs.filter((ccr: any) => ccrGroupMaster.some((group: any) => group.ccrs.some((c: any) => c.value === ccr.value)))}
                    onChange={(newValue: any)=>{
                        const newGroups = [...sortedSelectedRoutes];
                        newGroups[index][1] = newValue;
                        setSelectedRoutes(newGroups);
                    }}
                    Icon={(props:any)=>{
                        const data = props.props.data;
                        const color = data.fol === data.minFol? "green": "red";
                        return <div style={{color:color, display:"flex", alignItems:"center", gap:"5px"}}><FOLIcon width={(data.fol/data.maxFol)*100} color={color}/><span>[{data.fol}]</span></div>
                    }}
                />
            </StepGroup>
            )
        })}
        {/* <StepGroup $step={true}>
            <RadioSelect theme={theme} selected={ccrGroupMaster[0]} color="lightgrey" options={ccrGroupMaster}/>
            <RadioSelect theme={theme} selected={{}}/>
        </StepGroup>
        <StepGroup $step={true}>
            <RadioSelect theme={theme} selected={ccrGroupMaster[0]} color="lightgrey" options={ccrGroupMaster}/>
            <RadioSelect theme={theme} selected={{ }}/>
        </StepGroup>
        <StepGroup $step={true}>
            <RadioSelect theme={theme} selected={ccrGroupMaster[0]} color="lightgrey" options={ccrGroupMaster}/>
            <RadioSelect theme={theme} selected={{ }}/>
        </StepGroup>
        <StepGroup id="inactive" $step={true}>
            <RadioSelect theme={theme} selected={ccrGroupMaster[0]} color="lightgrey" options={ccrGroupMaster}/>
            <RadioSelect theme={theme}/>
        </StepGroup>
        <StepGroup $step={true}>
            <StepLabel>Final Product</StepLabel>
        </StepGroup> */}
            <svg className="line" style={{ position: "absolute", width: "100%", height: "100%", top: "0", left: "0", pointerEvents: "none" }}>
            </svg>
        </StepperWrapper>
    )
}

export default RouteAssignment