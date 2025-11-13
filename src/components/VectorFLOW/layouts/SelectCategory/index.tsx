import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  CategoryWrapper,
  DateContainer,
  DateWrapper,
  CardContainer,
  CardLayout,
  CardWrapper,
  TextWrapper,
  IconWrapper,
  CountWrapper,
  CountText,
  ButtonWrapper,
  Separator,
  ButtonComponent,
  PlanningTaskBar,
  ButtonFilterWrapper,
  countColorVar,
  buttonBgVar,
  separatorColorVar,
} from "./style.css";
import VFSelectedFilters from "../../../../components/VectorFLOW/commons/VFSelectedFilters";
import { useState } from "react";
import VFButton from "../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../context";
import VFMultiFilter from "../../../../components/VectorFLOW/commons/VFMultiFilter";
import * as globalStyles from "../../../../styles/global";
import useGetLocation from "../../../../hooks/useGetLocation";
import useGetlastRunData from "../../../../hooks/useGetLastRunData";
import { LastRunDateHeader } from "../../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/Planning/ActionToolBar/styles.css";
import MTAVFMultiFilter from "../../../../VectorFlow/Pages/MTA/Common/MTAVFMultiFilter";

import { skeleton } from "../../../commons/styled/index.css";

interface CountProp {
  childMonitorCount: number;
  parentMonitorCount: number;
  childExpediteCount: number;
  parentExpediteCount: number;
  reviewExcessInventoryCount: number;
  reviewOrderFulfillmentCount: number;
  onMonitorParentClick: () => void;
  onMonitorChildClick: () => void;
  onExpediteParentClick: () => void;
  onExpediteChildClick: () => void;
  onExcessInventoryReviewClick: () => void;
  onOrderFulfillmentReviewClick: () => void;
  currCategory?: any;
  multiFilter: any;
  setMultiFilter: any;
  onDelete: any;
  onApplyFilter: any;
}

const SelectCategory = (props: CountProp) => {
  const {
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
    multiFilter,
    setMultiFilter,
    onDelete,
    onApplyFilter,
  } = props;

  const { date: formattedDate } = useGetlastRunData();

  const [isFilterOpen, toggleFilter] = useState<boolean>(false);

    const { user } = useUserData()
    // const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const themeUi = user.user.theme_ui

    const currentTheme = globalStyles.chooseThemeColor[themeUi]
    const handleResetFilters = () => {
        console.log('Filters reset');
        // Handle reset logic if needed beyond the modal
    };
    const handleApplyFilter = (state: any) => {
        setMultiFilter(state)
        onApplyFilter(state)
        toggleFilter(false)
    }

    const {locations} = useGetLocation()

  const getTotalFilterCount = (multiFilter: any) => {
    let total = 0;
    for (const key in multiFilter) {
      if (multiFilter[key]?.filters) {
        total += multiFilter[key].filters.length;
      }
    }
    return total;
  };

  return (
    <>
      <div className={PlanningTaskBar}>
        <div>
          <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete} />
        </div>

        <div className={ButtonFilterWrapper}>
          <VFButton
            onClick={() => toggleFilter(true)}
            themeUi={themeUi}
            disabled={false}
            width={110}
          >
            {getTotalFilterCount(multiFilter) > 0
              ? "Edit Filter"
              : "Add Filter"}
          </VFButton>

          {isFilterOpen && (
            <MTAVFMultiFilter
              isOpen={isFilterOpen}
              onApply={handleApplyFilter}
              multiFilter={multiFilter}
              onClose={() => toggleFilter(false)}
              onReset={handleResetFilters}
            />
          )}
        </div>
      </div>

      <div className={DateContainer}>
        <div className={DateWrapper}>
          {formattedDate === "Loading" ? (
            <div className={skeleton} style={{ height: 30, width: 150 }} />
          ) : (
            <div className={LastRunDateHeader}>{formattedDate}</div>
          )}
        </div>
        <div className={CategoryWrapper}>
          <p>Please select a category</p>
        </div>
      </div>

      <div className={CardLayout}>
        <div className={CardContainer}>
          {/* Monitor Goods */}
          <div className={CardWrapper}>
            <div className={IconWrapper}>
              <img
                src={
                  themeUi === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/BPR/monitor-goods-regal.svg"
                    : "/assets/img/VectorFLOW/BPR/monitor-goods.svg"
                }
                alt="monitor goods in transit/WIP"
                height={52}
                width={52}
              />
            </div>

            <div className={TextWrapper}>
              <b>Monitor Goods In Transit/WIP</b>
            </div>

            <div
              className={CountWrapper}
              style={assignInlineVars({
                [countColorVar]: currentTheme.color4,
              })}
            >
              <div className={CountText}>{parentMonitorCount}</div>
              <div
                className={Separator}
                style={assignInlineVars({
                  [separatorColorVar]: currentTheme.color4,
                })}
              />
              <div className={CountText}>{childMonitorCount}</div>
            </div>

            <div
              className={ButtonWrapper}
              style={assignInlineVars({
                [buttonBgVar]: currentTheme.color4,
              })}
            >
              <div className={ButtonComponent} onClick={onMonitorParentClick}>
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  From Parent
                </button>
              </div>

              <div
                className={Separator}
                style={assignInlineVars({
                  [separatorColorVar]: "white",
                })}
              />

              <div className={ButtonComponent} onClick={onMonitorChildClick}>
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  To Child
                </button>
              </div>
            </div>
          </div>

          {/* Expedite */}
          <div className={CardWrapper}>
            <div className={IconWrapper}>
              <img
                src={
                  themeUi === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/BPR/expedite-regal.svg"
                    : "/assets/img/VectorFLOW/BPR/expedite.svg"
                }
                alt="expedite"
              />
            </div>

            <div className={TextWrapper}>
              <b>Expedite</b>
            </div>

            <div
              className={CountWrapper}
              style={assignInlineVars({
                [countColorVar]: currentTheme.color4,
              })}
            >
              <div className={CountText}>{parentExpediteCount}</div>
              <div
                className={Separator}
                style={assignInlineVars({
                  [separatorColorVar]: currentTheme.color4,
                })}
              />
              <div className={CountText}>{childExpediteCount}</div>
            </div>

            <div
              className={ButtonWrapper}
              style={assignInlineVars({
                [buttonBgVar]: currentTheme.color4,
              })}
            >
              <div className={ButtonComponent} onClick={onExpediteParentClick}>
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  From Parent
                </button>
              </div>

              <div
                className={Separator}
                style={assignInlineVars({
                  [separatorColorVar]: "white",
                })}
              />

              <div className={ButtonComponent} onClick={onExpediteChildClick}>
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  To Child
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={CardContainer}>
          {/* Excess Inventory */}
          <div className={CardWrapper}>
            <div className={IconWrapper}>
              <img
                src={
                  themeUi === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/BPR/excess-inventory-regal.svg"
                    : "/assets/img/VectorFLOW/BPR/excess-inventory.svg"
                }
                alt="excess inventory"
                height={58}
                width={55}
              />
            </div>

            <div className={TextWrapper}>
              <b>Excess Inventory</b>
            </div>

            <div
              className={CountWrapper}
              style={assignInlineVars({
                [countColorVar]: currentTheme.color4,
              })}
            >
              <div className={CountText}>{reviewExcessInventoryCount}</div>
            </div>

            <div
              className={ButtonWrapper}
              style={assignInlineVars({
                [buttonBgVar]: currentTheme.color4,
              })}
            >
              <div
                className={ButtonComponent}
                onClick={onExcessInventoryReviewClick}
              >
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* Order Fulfillment */}
          <div className={CardWrapper}>
            <div className={IconWrapper}>
              <img
                src={
                  themeUi === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/BPR/order-fulfillment-regal.svg"
                    : "/assets/img/VectorFLOW/BPR/order-fulfillment.svg"
                }
                alt="order fulfillment"
                height={52}
                width={74}
              />
            </div>

            <div className={TextWrapper}>
              <b>Order Fulfillment</b>
            </div>

            <div
              className={CountWrapper}
              style={assignInlineVars({
                [countColorVar]: currentTheme.color4,
              })}
            >
              <div className={CountText}>{reviewOrderFulfillmentCount}</div>
            </div>

            <div
              className={ButtonWrapper}
              style={assignInlineVars({
                [buttonBgVar]: currentTheme.color4,
              })}
            >
              <div
                className={ButtonComponent}
                onClick={onOrderFulfillmentReviewClick}
              >
                <button
                  style={{
                    backgroundColor: currentTheme.color4,
                    color: "white",
                    font: "inherit",
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
