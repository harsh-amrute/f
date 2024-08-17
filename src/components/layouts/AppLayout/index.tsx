import { Outlet } from "react-router";
import { useLocation } from 'react-router-dom';
import {
  Header,
  NavbarTop,
  NavbarRight,
  NavbarMenu,
  NavbarItem,
} from "../../index";
import { useEffect, useState } from "react";
import { AuthenticationTemplate } from "./AuthenticationTemplate";
import * as GridSystem from "../../../styles/gridSystem";
import { ISTStatusContext } from "../../../context/ISTStatusContext";
import { useTranslation } from "react-i18next";
// import { listMenuParent } from "../NavbarMenu/listMenu";

const isAnonymous = false;

const AppLayout = () => {
  const { t } = useTranslation();

  const mtoPageUrls: any = ['/production-planning-scheduling/dynamic-release-mangement', "/production-planning-and-scheduling/due-date-quotation", "/poogi/insight-and-trends/otif-analysis", '/poogi/insight-and-trends/ot-and-if-analysis', '/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons', '/production-planning-scheduling/insights-and-trends/elapsed-time', '/poogi/insight-and-trends/lead-time'];

  //URL arrays for excluding layout padding
  let urlDisableZoomScaling = ['/logistics/intransit-whereabouts', '/supply-chain-intelligence-hub/planning', '/insights-and-trends/research-insights', '/insights-and-trends/buffer-trends', '/insights-and-trends/buffer-trend-report', "/insights-and-trends/guided-insights", "/production-planning-scheduling/enquiry-response", "/production-planning-scheduling/insight-and-trends/bm-trends", "/production-planning-scheduling/insight-and-trends/stpl-full-kits", "/production-planning-and-scheduling/order-rescheduling", "/production-planning-scheduling/full-kit-assignment", '/production-planning-scheduling/insight-and-trends/order-at-risk', '/procurement/insights-and-trends/rmpm-orderwise-coverage', "/production-planning-scheduling/insight-and-trends/order-balance", "/poogi/insight-and-trends/resource-utilization-wip-profile", "/production-planning-scheduling/insights-and-trends/fol-summary"];
  let urlExcludePadding = ['/logistics/intransit-whereabouts', '/master-data-management/control-panel/view-modify', '/master-data-management/task-pending', '/master-data-management/control-panel/add', '/master-data-management/control-panel/delete', '/supply-chain-intelligence-hub/bpr', '/insights-and-trends/guided-insights', "/insights-and-trends/buffer-trend-report", '/insights-and-trends/research-insights', "/procurement/insights-and-trends/rmpm", "/procurement/insights-and-trends/rmpm-buffer-trends", "/procurement/insights-and-trends/rmpm-expediting-rm-suppliers", "/production-planning-and-scheduling/order-rescheduling", "/planning/simulative-fullkit", "/procurement-planning/planning", '/procurement/material-requirement', '/procurement/insights-and-trends/rmpm-orderwise-coverage', "/procurement/material-coverage-open-sales", "/production-planning-scheduling/insight-and-trends/order-balance", "/production-planning-scheduling/enquiry-response", "/production-planning-scheduling/insight-and-trends/bm-trends", "/production-planning-scheduling/insight-and-trends/order-at-risk", "/production-planning-scheduling/insight-and-trends/order-balance", "/production-planning-scheduling/enquiry-response", '/poogi/insight-and-trends/resource-utilization-wip-profile', "/production-planning-scheduling/insights-and-trends/fol-summary"];
  // const urlExclusdeHeader = ['/master-data-management/control-panel/view-modify','/master-data-management/task-pending','/master-data-management/control-panel/add','/master-data-management/control-panel/delete','/supply-chain-intelligence-hub/bpr','/master-data-management/task-status','/master-data-management/saved-drafts'];
  let urlExclusdeHeader = ['/procurement/material-coverage-open-sales', '/master-data-management/task-pending', '/master-data-management/task-status', '/master-data-management/saved-drafts', "/production-planning-scheduling/full-kit-assignment", '/production-planning-scheduling/insight-and-trends/order-at-risk', "/procurement-planning/planning", "/planning/simulative-fullkit", "/procurement/material-requirement", "/procurement/insights-and-trends/rmpm-orderwise-coverage", "/procurement/insights-and-trends/day-wise-coverage", "/procurement/insights-and-trends/rmpm-buffer-trends", "/procurement/insights-and-trends/rmpm-expediting-rm-suppliers", "/production-planning-scheduling/insight-and-trends/order-balance", "/production-planning-scheduling/enquiry-response", "/production-planning-and-scheduling/order-rescheduling", "/production-planning-scheduling/insight-and-trends/bm-trends", "/production-planning-scheduling/insight-and-trends/stpl-full-kits", "/production-planning-scheduling/insight-and-trends/order-balance", "/production-planning-scheduling/deptwise-bm-report", '/poogi/insight-and-trends/resource-utilization-wip-profile', "/production-planning-scheduling/insights-and-trends/fol-summary", "/poogi/reasons-for-delayed-orders"];

  urlDisableZoomScaling = [...urlDisableZoomScaling, ...mtoPageUrls];
  urlExcludePadding = [...urlExcludePadding, ...mtoPageUrls];
  urlExclusdeHeader = [...urlExclusdeHeader, ...mtoPageUrls];

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [currentViewCount, setCurrentViewCount] = useState(0);
  const [currentDataCount, setCurrentDataCount] = useState(0);
  const [currentAction, setCurrentAction] = useState("edit");
  const [exportView, setExportView] = useState(false);
  const [currentViewName, setCurrentViewName] = useState(
    t("ISTStatus.viewName") as string
  );
  const [widthResponsive, setWidthResponsive] = useState<object>({
    widthLeft: "0%",
    widthRight: "95%",
  });

  const [isOpenNavbarRight, setIsOpenNavbarRight] = useState<boolean>(false);
  const [isLoadSpinner, setIsLoadSpinner] = useState<any>(false);
  const [menuItem, setMenuItem] = useState<any>();
  const [colorTheme, setColorTheme] = useState<string>("NOIRFUSION");
  const [isHide, setIsHide] = useState<boolean>(false);

  return (
    <AuthenticationTemplate
      loadingComponent={<>Loading...</>}
      isAnonymous={isAnonymous}
      setMenuItem={setMenuItem}
    >
      <NavbarRight
        isOpenNavbarRight={isOpenNavbarRight}
        setIsOpenNavbarRight={setIsOpenNavbarRight}
        setColorTheme={setColorTheme}
        isLoadSpinner={isLoadSpinner}
        setIsLoadSpinner={setIsLoadSpinner}
      />
      <GridSystem.SCGrid>
        <GridSystem.SCFullScreen>
          <NavbarTop
            setIsOpenNavbarRight={setIsOpenNavbarRight}
            setIsLoadSpinner={setIsLoadSpinner}
            isLoadSpinner={isLoadSpinner}
          />
        </GridSystem.SCFullScreen>
        <GridSystem.SCRow>
          <GridSystem.SCCol1 colorTheme={colorTheme}>
            <NavbarMenu setMenuItem={setMenuItem} isHide={isHide} setIsHide={setIsHide} setWidthResponsive={setWidthResponsive} />
          </GridSystem.SCCol1>
          <GridSystem.SCCol2 width={widthResponsive} colorTheme={colorTheme}>
            <NavbarItem
              setWidthResponsive={setWidthResponsive}
              menuItem={menuItem}
              isHide={isHide}
              setIsHide={setIsHide}
            />
          </GridSystem.SCCol2>
          <GridSystem.SCCol8 width={widthResponsive} hidePadding={urlExcludePadding.includes(location.pathname)} disableZoomScaling={urlDisableZoomScaling.includes(location.pathname)}>
            <ISTStatusContext.Provider
              value={{
                currentAction,
                setCurrentAction,
                exportView,
                setExportView,
                currentViewName,
                setCurrentViewName,
                currentViewCount,
                setCurrentViewCount,
                currentDataCount,
                setCurrentDataCount,
              }}
            >
              <Header urlExcludeHeader={urlExclusdeHeader} />
              <Outlet />
            </ISTStatusContext.Provider>
          </GridSystem.SCCol8>
        </GridSystem.SCRow>
      </GridSystem.SCGrid>
    </AuthenticationTemplate>
  );
};

export default AppLayout;
