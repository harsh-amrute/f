import { CategoryWrapper, DateContainer, DateWrapper, CardContainer, CardWrapper, TextWrapper, IconWrapper, CountWrapper, CountText, ButtonWrapper, Separator, ButtonComponent, PlanningTaskBar, ButtonFilterWrapper  } from "./style";
import { format } from "date-fns";
import VFSelectedFilters from '../../../../components/VectorFLOW/commons/VFSelectedFilters';
import useBPRFilter from "../../../../hooks/useBPRFilter";
import {useState} from 'react'
import VFButton from "../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../context"
import VFMultiFilter from "../../../../components/VectorFLOW/commons/VFMultiFilter";
import { MultiFilterSupplyChainCheckboxList } from '../../../../helpers/BPRConstants'



interface CountProp{
    childMonitorCount:number;
    parentMonitorCount:number;
    childExpediteCount:number;
    parentExpediteCount:number;
    reviewExcessInventoryCount:number;
    reviewOrderFulfillmentCount:number;
    onMonitorParentClick:()=>void;
    onMonitorChildClick:()=>void;
    onExpediteParentClick:()=>void;
    onExpediteChildClick:()=>void;
    onExcessInventoryReviewClick:()=>void;
    onOrderFulfillmentReviewClick:()=>void;
    currCategory?:any;

}

const SelectCategory=(props:CountProp)=>{
    const{
        childMonitorCount,
        parentMonitorCount,
        parentExpediteCount,
        childExpediteCount,
        reviewExcessInventoryCount,
        reviewOrderFulfillmentCount,
        onMonitorParentClick,
        onMonitorChildClick,
        onExpediteParentClick,
        onExpediteChildClick,
        onExcessInventoryReviewClick,
        onOrderFulfillmentReviewClick,
        currCategory
    } = props;

    const date= new Date();
    const formattedDate=format(date, 'do MMMM yyyy');

    const [isFilterOpen,toggleFilter] = useState<boolean>(false)

    const {user} = useUserData()
    const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const themeUi = user.user.theme_ui

    console.debug(currCategory)

    return(
    <>


        <PlanningTaskBar>
        <div >
            <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters>
        </div>
        <ButtonFilterWrapper>
        <VFButton onClick={()=>toggleFilter(true)} themeUi={themeUi} disabled={false} width={110}>Edit Filter</VFButton>
            {
                isFilterOpen && (
                <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} locationFilterActive={true} productFilterActive={true} supplyChainNodeFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m:any)=>['1','3','4'].includes(m.id))}></VFMultiFilter>
               
                )
            }
        </ButtonFilterWrapper> 
        </PlanningTaskBar>

   
        <DateContainer>
          <DateWrapper><b>{formattedDate}</b></DateWrapper>
          <CategoryWrapper><p>Please select a category</p></CategoryWrapper>  
        </DateContainer>
       
                <>
                <CardContainer>
                <CardWrapper >
                <IconWrapper><img src="/assets/img/VectorFLOW/BPR/monitor-goods.svg" alt="monitor goods in transit/WIP" height="52px" width="52px"></img></IconWrapper>
                <TextWrapper><b>Monitor Goods In Transit/WIP</b></TextWrapper>
                <CountWrapper>
                   <CountText>{parentMonitorCount}</CountText>
                   <Separator color={'#BC3D81'}></Separator>
                   <CountText>{childMonitorCount}</CountText>   
                </CountWrapper>
                <ButtonWrapper>
                    <ButtonComponent>
                     <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onMonitorParentClick}>From Parent</button>
                    </ButtonComponent>
                    <Separator color={'white'} ></Separator>
                    <ButtonComponent>
                    <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onMonitorChildClick}>To Child</button>
                    </ButtonComponent>
                </ButtonWrapper>
            </CardWrapper>
            
            <CardWrapper>
                <IconWrapper><img src="/assets/img/VectorFLOW/BPR/expedite.svg" alt="expedite"></img></IconWrapper>
                <TextWrapper><b>Expedite</b></TextWrapper>
                <CountWrapper>
                   <CountText>{parentExpediteCount}</CountText>
                   <Separator color={'#BC3D81'}></Separator>
                   <CountText>{childExpediteCount}</CountText>   
                </CountWrapper>
                <ButtonWrapper>
                    <ButtonComponent>
                     <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExpediteParentClick}>From Parent</button>
                    </ButtonComponent>
                    <Separator color={'white'} ></Separator>
                    <ButtonComponent>
                    <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExpediteChildClick}>To Child</button>
                    </ButtonComponent>
                </ButtonWrapper>
            </CardWrapper>
            </CardContainer> 

            <CardContainer>
            <CardWrapper>
                <IconWrapper><img src="/assets/img/VectorFLOW/BPR/excess-inventory.svg" alt="excess inventory" height="58px" width="55px"></img></IconWrapper>
                <TextWrapper><b>Excess Inventory</b></TextWrapper>
                <CountWrapper>
                   <CountText>{reviewExcessInventoryCount}</CountText>
                   {/* <Separator color={'#BC3D81'}></Separator>
                   <CountText>{totalcount}</CountText>    */}
                </CountWrapper>
                <ButtonWrapper>
                    <ButtonComponent>
                    <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExcessInventoryReviewClick}>Review</button>
                    </ButtonComponent>
                </ButtonWrapper>
            </CardWrapper>  
 
            <CardWrapper>
                <IconWrapper><img src="/assets/img/VectorFLOW/BPR/order-fulfillment.svg" alt="order fulfillment" height="52px" width="74px"></img></IconWrapper>
                <TextWrapper><b>Order Fulfillment</b></TextWrapper>
                <CountWrapper>
                   <CountText>{reviewOrderFulfillmentCount}</CountText>
                   {/* <Separator color={'#BC3D81'}></Separator>
                   <CountText>{totalcount}</CountText>    */}
                </CountWrapper>
                <ButtonWrapper>
                    <ButtonComponent>
                    <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onOrderFulfillmentReviewClick}>Review</button>
                    </ButtonComponent>
                </ButtonWrapper>
            </CardWrapper>  

            </CardContainer>  
        </>

    </>
    )
}

export default SelectCategory;

// <CardContainer>
// {
//     currCategory==="GITFromParent" || currCategory==="GITToChild" && (
//         <CardWrapper >
//         <IconWrapper><img src="/assets/img/VectorFLOW/BPR/monitor-goods.svg" alt="monitor goods in transit/WIP" height="52px" width="52px"></img></IconWrapper>
//         <TextWrapper><b>Monitor Goods In Transit/WIP</b></TextWrapper>
//         <CountWrapper>
//            <CountText>{parentMonitorCount}</CountText>
//            <Separator color={'#BC3D81'}></Separator>
//            <CountText>{childMonitorCount}</CountText>   
//         </CountWrapper>
//         <ButtonWrapper>
//             <ButtonComponent>
//              <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onMonitorParentClick}>From Parent</button>
//             </ButtonComponent>
//             <Separator color={'white'} ></Separator>
//             <ButtonComponent>
//             <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onMonitorChildClick}>To Child</button>
//             </ButtonComponent>
//         </ButtonWrapper>
//     </CardWrapper>
//     )
// }
// {
// currCategory==="ExpediteFromParent" || currCategory==="ExpediteToChild"&&(
//     <CardWrapper>
//     <IconWrapper><img src="/assets/img/VectorFLOW/BPR/expedite.svg" alt="expedite"></img></IconWrapper>
//     <TextWrapper><b>Expedite</b></TextWrapper>
//     <CountWrapper>
//        <CountText>{parentExpediteCount}</CountText>
//        <Separator color={'#BC3D81'}></Separator>
//        <CountText>{childExpediteCount}</CountText>   
//     </CountWrapper>
//     <ButtonWrapper>
//         <ButtonComponent>
//          <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExpediteParentClick}>From Parent</button>
//         </ButtonComponent>
//         <Separator color={'white'} ></Separator>
//         <ButtonComponent>
//         <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExpediteChildClick}>To Child</button>
//         </ButtonComponent>
//     </ButtonWrapper>
// </CardWrapper>   
// )
// } 
//  </CardContainer>


// <CardContainer>
// {
// currCategory==="ExcessInventory" && (
//     <CardWrapper>
//     <IconWrapper><img src="/assets/img/VectorFLOW/BPR/excess-inventory.svg" alt="excess inventory" height="58px" width="55px"></img></IconWrapper>
//     <TextWrapper><b>Excess Inventory</b></TextWrapper>
//     <CountWrapper>
//        <CountText>{reviewExcessInventoryCount}</CountText>
//        {/* <Separator color={'#BC3D81'}></Separator>
//        <CountText>{totalcount}</CountText>    */}
//     </CountWrapper>
//     <ButtonWrapper>
//         <ButtonComponent>
//         <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onExcessInventoryReviewClick}>Review</button>
//         </ButtonComponent>
//     </ButtonWrapper>
// </CardWrapper>   
// )
// }
// {
// currCategory==="OrderFulfillment" && (
//     <CardWrapper>
//     <IconWrapper><img src="/assets/img/VectorFLOW/BPR/order-fulfillment.svg" alt="order fulfillment" height="52px" width="74px"></img></IconWrapper>
//     <TextWrapper><b>Order Fulfillment</b></TextWrapper>
//     <CountWrapper>
//        <CountText>{reviewOrderFulfillmentCount}</CountText>
//        {/* <Separator color={'#BC3D81'}></Separator>
//        <CountText>{totalcount}</CountText>    */}
//     </CountWrapper>
//     <ButtonWrapper>
//         <ButtonComponent>
//         <button style={{backgroundColor:'#BC3D81',color:'white', font:"inherit"}} onClick={onOrderFulfillmentReviewClick}>Review</button>
//         </ButtonComponent>
//     </ButtonWrapper>
// </CardWrapper>  
// )
// }
// </CardContainer>