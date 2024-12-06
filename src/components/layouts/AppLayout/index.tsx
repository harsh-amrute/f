import { Outlet } from "react-router";
import {useLocation} from 'react-router-dom';
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

  //URL arrays for excluding layout padding
  const urlDisableZoomScaling = ['/supply-chain-intelligence-hub/merchandising-grid','/supply-chain-intelligence-hub/planning','/insights-and-trends/research-insights','/insights-and-trends/buffer-trends','/insights-and-trends/buffer-trend-report',"/insights-and-trends/guided-insights", "/supply-chain-intelligence-hub/merchandising-grid"];
  const urlExcludePadding = ['/supply-chain-intelligence-hub/merchandising-grid','/insights-and-trends/buffer-trends','/logistics/intransit-whereabouts','/supply-chain-intelligence-hub/sdr','/supply-chain-intelligence-hub/bor','/supply-chain-intelligence-hub/rrr','/supply-chain-intelligence-hub/open-expediting-requests','/master-data-management/control-panel/view-modify','/master-data-management/task-pending','/master-data-management/control-panel/add','/master-data-management/control-panel/delete','/supply-chain-intelligence-hub/bpr','/insights-and-trends/guided-insights',"/insights-and-trends/buffer-trend-report",'/insights-and-trends/research-insights'];
  // const urlExclusdeHeader = ['/master-data-management/control-panel/view-modify','/master-data-management/task-pending','/master-data-management/control-panel/add','/master-data-management/control-panel/delete','/supply-chain-intelligence-hub/bpr','/master-data-management/task-status','/master-data-management/saved-drafts'];
  const urlExclusdeHeader = ['/supply-chain-intelligence-hub/merchandising-grid','/master-data-management/task-pending', '/master-data-management/task-status', '/master-data-management/saved-drafts'];

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
              <Header urlExcludeHeader={urlExclusdeHeader}/>
              <Outlet />
            </ISTStatusContext.Provider>
          </GridSystem.SCCol8>
        </GridSystem.SCRow>
      </GridSystem.SCGrid>
    </AuthenticationTemplate>
  );
};

export default AppLayout;
