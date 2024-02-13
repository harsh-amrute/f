import { CategoryWrapper, DateContainer, DateWrapper, CardContainer, CardWrapper, TextWrapper, IconWrapper, CountWrapper, CountText, ButtonWrapper, Separator, ButtonComponent  } from "./style";
import { format } from "date-fns";

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
        onOrderFulfillmentReviewClick
    } = props;

    const date= new Date();
    const formattedDate=format(date, 'do MMMM yyyy');

    return(
    <>
        <DateContainer>
          <DateWrapper><b>{formattedDate}</b></DateWrapper>
          <CategoryWrapper><p>Please select a category</p></CategoryWrapper>  
        </DateContainer>
        <CardContainer>
            <CardWrapper>
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
    )
}

export default SelectCategory;