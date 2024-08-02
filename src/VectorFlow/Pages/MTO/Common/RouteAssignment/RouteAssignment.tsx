import React, { useEffect } from 'react'
import RadioSelect from '../../../../../components/VectorFLOW/commons/MTO/RadioSelect'
import { StepGroup, StepLabel, StepperWrapper } from './RouteAssignment.styled'

interface IRouteAssignmentProps{
    theme: string,
    ccrGroupMaster?: any,
    selectedRoutes?: any,
    setSelectedRoutes?: any,
    isEditable?: boolean
}

const RouteAssignment = ({theme, ccrGroupMaster=[], selectedRoutes, setSelectedRoutes, isEditable = true}: IRouteAssignmentProps) => {
    // useEffect(() => {
    //     // let animationFrameId: any;
    //     const adjustLayout =(containerWidth:number, items:any) =>{
    //       let currWidth = 0;
    //       let lineType = true;
    //       let array:any = [];
    //       let myIndex = 1;
      
    //       items.forEach((element:any) => {
    //         if (currWidth + element.offsetWidth + 32 > containerWidth) {
    //           if (!lineType) {
    //             array.reverse();
    //           }
    //           array.forEach((e:any) => {
    //             e.style.order = myIndex++;
    //           });
    //           array = [element];
    //           currWidth = element.offsetWidth;
    //           lineType = !lineType;
    //         } else {
    //           array.push(element);
    //           currWidth += element.offsetWidth + 32;
    //         }
    //       });
      
    //       if (!lineType) {
    //         array.reverse();
    //       }
    //       array.forEach((e:any) => {
    //         e.style.order = myIndex++;
    //       });
    //     }
    //     const animate = () => {
    //         const stepGroups = document.querySelectorAll('.step-group');
    //         const svg: any = document.querySelector('.line');
    //         const stepperWrapper: any = document.querySelector('.stepper-container');
    //         const stepperRect = stepperWrapper.getBoundingClientRect();
    //         adjustLayout(stepperWrapper.offsetWidth,stepGroups);
    //         if (svg?.innerHTML) {
    //             svg.innerHTML = "";
    //         }
    //         for (let i = 0; i < stepGroups?.length - 1; i++) {
    //             const start: any = stepGroups[i].getBoundingClientRect();
    //             const end: any = stepGroups[i + 1].getBoundingClientRect();
    //             // Adjust the positions
    //             const adjustedStart = {
    //                 top: start.top - stepperRect.top,
    //                 right: start.right - stepperRect.left,
    //                 height: start.height        };        
    //             const adjustedEnd = {
    //                 top: end.top - stepperRect.top,
    //                 left: end.left - stepperRect.left,
    //                 height: end.height,
    //                 width: end.width
    //             };
    //             if (stepGroups[i + 1].id == "inactive") {
    //                 const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    //                 polyline.setAttribute('points', `${adjustedEnd.left - 8},${adjustedEnd.top + adjustedEnd.height / 2 - 2.5} ${adjustedEnd.left - 8},${adjustedEnd.top - 10} ${adjustedEnd.left + 8 + adjustedEnd.width},${adjustedEnd.top - 10} ${adjustedEnd.left + 8 + adjustedEnd.width},${adjustedEnd.top + adjustedEnd.height / 2 - 2.5}`);
    //                 svg.appendChild(polyline);
    //                 polyline.setAttribute('stroke', '#82104C');
    //                 polyline.setAttribute('fill', 'none');
    //                 svg.appendChild(polyline);
    //             }
    //             const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //             let leftOffset = 0
    //             let rightOffset = 0
    //             if (stepGroups[i].id == "inactive") {
    //                 rightOffset = 5
    //             }
    //             if (stepGroups[i + 1].id == "inactive") {
    //                 leftOffset = 5
    //             }
    //             line.setAttribute('x1', (adjustedStart.right + 6 + rightOffset).toString());
    //             line.setAttribute('y1', (adjustedStart.top + adjustedStart.height / 2).toString());
    //             line.setAttribute('x2', (adjustedEnd.left - 6 - leftOffset).toString());
    //             line.setAttribute('y2', (adjustedEnd.top + adjustedEnd.height / 2).toString());
    //             line.setAttribute('stroke', '#82104C');
    //             svg.appendChild(line);
    //         }
    //         // animationFrameId = 
    //         requestAnimationFrame(animate);
    //     };
    //     // animationFrameId = 
    //     requestAnimationFrame(animate);

    //     // return cancelAnimationFrame(animationFrameId);
    // }, []);

  return (
    <StepperWrapper key="route-assignment">
        {ccrGroupMaster.map((ccrGroup: any, index: number)=>{
            return(
            <StepGroup $step={true} key={`route-assignment-${index}`}>
                <RadioSelect 
                    key={`route-assignment-${index}-${1}`}
                    isDisabled={!isEditable}
                    theme={theme} 
                    color="lightgrey" 
                    options={ccrGroupMaster} 
                    value={selectedRoutes[index]?.[0] || null}
                    onChange={(newValue: any)=>{
                        const newGroups = [...selectedRoutes];
                        newGroups[index] = [newValue,null];
                        setSelectedRoutes(newGroups);
                    }}
                />
                <RadioSelect 
                    key={`route-assignment-${index}-${2}`}
                    isDisabled={!isEditable}
                    theme={theme} 
                    value={selectedRoutes[index]?.[1] || null}
                    options={selectedRoutes[index]?.[0].ccrs}
                    onChange={(newValue: any)=>{
                        const newGroups = [...selectedRoutes];
                        newGroups[index][1] = newValue;
                        setSelectedRoutes(newGroups);
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