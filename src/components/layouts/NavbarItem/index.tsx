import * as NavStyle from "./styles";
import { useState, useEffect, useCallback } from "react";
import { SCMenuLeft, SCMenuItem, SCItemChild } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../../../context";
import Particulars from "./particulars";
import { useTranslation } from "react-i18next";
import { ColumnChart } from "../../index";
import ParticularForced from "./ParticularForced";
import ParticularStoreStatus from "./ParticularStoreStatus";
import ParticularAvai from "./ParticularAvai";
import { navigateWithPrompt } from '../../../helpers/utils'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../redux/store/store";
import { RESET_STATE } from "../../../redux/actions/MDM";
import BPRDailyAnalytics from "../../../components/VectorFLOW/layouts/BPRDailyAnalytics";
import AnalyticalScreen from "../../../VectorFlow/Pages/MTO/Procurement/MaterialCoverage/AnalyticalScreen";
import ProcPlanningAnalytics from "../../../components/VectorFLOW/layouts/ProcPlanningAnalytics";

const NavbarItem = ({
  setWidthResponsive,
  menuItem,
  isHide,
  setIsHide,
}: any) => {
  const { t } = useTranslation();
  const { user, isSideBarOpen, toggleSideBar } = useUserData();
  const permission: any = user?.roles?.permission;
  const { currentView, currentCategory } = useSelector((state: RootState) => state.mta.planning)
  const analyticsPaths: Array<string> = ["/supply-chain-intelligence-hub/bpr", "/supply-chain-intelligence-hub/rrr", "/supply-chain-intelligence-hub/bor", "/dbm/dbm-norm-suggestions", "/insights-and-trends/research-insights"]
  const themeUi = user?.user?.theme_ui;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();

  const mdm = useSelector((state: RootState) => state.mdm);
  const dispatch = useDispatch();
  useEffect(() => {
    // if(location.pathname==="/supply-chain-intelligence-hub/planning" && currentCategory===""){
    //   dispatch(UPDATE_PLANNING_DATA({
    //     currentView:'null',
    //     currentTab:'',
    //     currentCategory:''
    //   }))
    // }
    // if(location.pathname!=="/supply-chain-intelligence-hub/planning"){
    //   dispatch(UPDATE_PLANNING_DATA({
    //     currentView:'null',
    //     currentTab:'',
    //     currentCategory:''
    //   }))
    // }
  }, [location.pathname])

  const resetState = () => {
    dispatch(RESET_STATE());
  }
  const RenderListMenu = (props: { listMenu: any }) => {

    const [toggle, setToggle] = useState(true);
    const {
      listMenu
    } = props

    return (
      <SCMenuItem
        key={listMenu.id}
        active={
          listMenu.url === location.pathname ||
          listMenu.child.some((i: any) => i.url === location.pathname)
        }
      >
        <>
          {
            !listMenu.avoidHeader && (
              <NavStyle.SCNavMenu
                onClick={() => setToggle(!toggle)}
                className={`${toggle ? "active" : ""}`}
              >
                <NavStyle.SCInterStore themeUi={themeUi}>
                  {t(listMenu.name)}
                </NavStyle.SCInterStore>
                <NavStyle.SCInterStoreArrowDown
                  toggle={toggle}
                  src="/assets/img/nav/arrow_down.svg"
                />
              </NavStyle.SCNavMenu>
            )
          }
          {
            listMenu.child.map((l: any, index: number) => {
              if (l.child) {
                return (
                  <RenderListMenu listMenu={l} key={index} />
                )
              }
              return renderListMenuChild([l], toggle)
            })
          }

        </>
      </SCMenuItem>
    );
  };


  const renderAnalyticsGrid = useCallback(() => {

    if (location.pathname === "/supply-chain-intelligence-hub/planning") {

      if (currentView !== 'chart' && currentCategory !== "") {
        return true
      }
    }
    if (analyticsPaths.includes(pathname)) {
      return true
    }
    return false
  }, [location.pathname, currentCategory, currentView])


  const renderListMenuChild = (listChild: any, status: boolean) => {
    return listChild.map((item: any) => {
      ``
      const checkRole = permission?.some((value: any) => {
        return item.role.includes(value)
      });

      if (checkRole) {
        return (
          <SCItemChild
            key={item.url}
            onClick={() => {
              navigateWithPrompt(() => navigate(item.url, { replace: true }), item.url, mdm, resetState);
            }}
            active={item.url === location.pathname}
            status={status}
            themeUi={themeUi}
          >
            <NavStyle.SCNavChild
              themeUi={themeUi}
              active={item.url === location.pathname}
            >
              {" "}
              {t(item.name)}
            </NavStyle.SCNavChild>
            {!(item.url === location.pathname) && (
              <NavStyle.SCInputIcon src={item.img} />
            )}

          </SCItemChild>
          //  {item.child && (
          //   <React.Fragment>
          //   {item.child.map((i:any,index:number)=>{
          //     return (
          //       <React.Fragment>
          //         {renderListMenu(i)}
          //       </React.Fragment>
          //     )
          //   })}
          // </React.Fragment>
          // )}
        );
      }
    });
  };

  // const activeCollapseItem = () => {
  //   setToggle(!toggle);
  // };

  const handleClickIconMenu = () => {
    if (isHide) {
      setWidthResponsive({
        widthLeft: "0%",
        widthRight: "95%",
      });
    } else {
      setWidthResponsive({
        widthLeft: "20%",
        widthRight: "75%",
      });
    }
    setIsHide(!isHide);
    toggleSideBar(!isSideBarOpen)
  };

  return (
    <NavStyle.SCGridNav
      id="vector_nav"
      className="list-roles-per--content"
      isHide={isHide}
      pathname={pathname}
    >
      <NavStyle.SCNavbar>
        <NavStyle.SCNavBox>
          <NavStyle.SCBoxTop>
            {isHide && (
              <NavStyle.SCText themeUi={themeUi}>COMPONENTS</NavStyle.SCText>
            )}
            <NavStyle.SCIconMenu
              src={`/assets/img/nav/icon_hide_menu${themeUi === "REGALBLAZE" ? "_yellow" : ""
                }.svg`}
              alt="menu"
              onClick={handleClickIconMenu}
              themeUi={themeUi}
              isHide={isHide}
            />
          </NavStyle.SCBoxTop>
          {isHide && !!menuItem && (
            <SCMenuLeft><RenderListMenu listMenu={menuItem} /></SCMenuLeft>
          )}
        </NavStyle.SCNavBox>
        {isHide && renderAnalyticsGrid() && menuItem.id === 9 && (
          <BPRDailyAnalytics
            colDefs={[
              {
                headerName: '',
                colId: 'color'
              },
              {
                headerName: 'Tech.'
              },
              {
                headerName: 'Eco.'
              },
            ]}
          />
        )}

        {
          //my code goes here
          // isHide && pathname === "/procurement/material-coverage-open-sales" && menuItem.id === 19 && (
          //   <AnalyticalScreen />

          // )
        }

        {isHide && pathname === "/ist-forced-closure" && menuItem.id === 6 && (
          <ParticularForced themeUi={themeUi} />
        )}

        {isHide && pathname === "/store-status" && menuItem.id === 6 && (
          <ParticularStoreStatus themeUi={themeUi} />
        )}

        {isHide && pathname === "/procrmenPlanning/planning" && menuItem.id === 19 && (
          <ProcPlanningAnalytics themeUi={themeUi} />
        )}

        {isHide &&
          pathname === "/availability-comparison" &&
          menuItem.id === 6 && <ColumnChart themeUi={themeUi} />}

        {isHide && pathname === "/availability-comparison" && menuItem.id === 6 && (
          <ParticularAvai themeUi={themeUi} />
        )}



        {pathname === "/" || pathname === "/ist-status" ? (
          <>
            {isHide && menuItem.id === 6 ? (
              <>
                {permission?.includes("IST Admin") ||
                  permission?.includes("IST Liaison") ||
                  permission?.includes("IST Governor") ? (
                  <Particulars themeUi={themeUi} />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </NavStyle.SCNavbar>
    </NavStyle.SCGridNav>
  );
};

export default NavbarItem;
