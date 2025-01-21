import * as NavStyle from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import { MainService } from "../../../module-main/services/api";
import { listMenuParent } from "./listMenu";
import { MenuToolTip } from "../../../components/index";
import { useState, useEffect } from "react";
import { useUserData } from "../../../context";
import { useNavigate } from "react-router";
import { useGetAllReports } from '../../../VectorFlow/Services/MTA/MDM'
import _ from 'lodash'
// import { useGetAllMTOReports } from "../../../VectorFlow/Services/MTO/Common/DownloadReports";

const NavbarMenu = ({ setMenuItem, isHide, setIsHide, setWidthResponsive }: any) => {
  const { mutateAsync: getAllReports } = useGetAllReports();
  // const {mutateAsync: getAllMTOReports} = useGetAllMTOReports()
  const [listMenu, setListMenu] = useState(listMenuParent);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const queryClient = useQueryClient();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [activeTooltip, setActiveTooltip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tempUrls, setTempUrls] = useState([]); //temp url is used to show downloading
  const [reportUrls, setReportUrls] = useState<string[]>([]);




  // const getReportFields = async () => {

  //   let transformedData: any = undefined;
    
  //   try{
  //     const reports = await getAllReports();
  //     const rawDailyReport = reports.data.data
  //     transformedData = Object.entries(rawDailyReport).map(([key, attributes]: [string, any]) => ({
  //       name: attributes.reportName,
  //       img: "/assets/img/nav/arrow_down.svg",
  //       imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
  //       url: key,
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //       downloadName: attributes.downloadName
  //     }));
  //     console.log(transformedData);
  //     setListMenu(transformedData);
  
  //   }
  //   catch(err){
      
  //     console.error("Error fetching reports", err);
  //   }
  //   finally{
  //     try{
  //       const mtoReports = await getAllMTOReports();
  //       const rawMTOReports = mtoReports.data.data;
  //       const transformedMTOData = Object.entries(rawMTOReports).map(([key, attributes]: [string, any]) => ({
  //         name: attributes.reportName,
  //         img: "/assets/img/nav/arrow_down.svg",
  //         imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
  //         url: key,
  //         role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "BMReportManager"],
  //         isMTO: true,
  //         downloadName: attributes.downloadName
  //       }));

  //       const extractedNewMenu = _.cloneDeep(listMenuParent)
  //       const targetObject = extractedNewMenu.find((item: any) => item.id === 8);
  //       if (targetObject) {
  //         if(transformedData){

  //           targetObject.child.push(...transformedData);
  //         }
  //         targetObject.child.push(...transformedMTOData);
  //         const reporturls = targetObject.child.map((child: any) => child.url).filter((url: string) => url);
  //         setReportUrls(reporturls)
  //     }
  //     setListMenu(extractedNewMenu);
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //   }
  // }

  const getReportFields = async () => {
    const reports = await getAllReports();
    const rawDailyReport = reports.data.data
    const transformedData = Object.entries(rawDailyReport).map(([key, attributes]: [string, any]) => ({
      name: attributes.reportName,
      img: "/assets/img/nav/arrow_down.svg",
      imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      url: key,
      role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "DBMManager", "BPRManager", "MasterUpdater", "MasterApprover"],
      downloadName: attributes.downloadName
    }));
    const extractedNewMenu = _.cloneDeep(listMenuParent)
    const targetObject = extractedNewMenu.find((item: any) => item.id === 8);
    if (targetObject) {
      targetObject.child.push(...transformedData);
      const reporturls = targetObject.child.map((child: any) => child.url).filter((url: string) => url);
      setReportUrls(reporturls)
    }
    setListMenu(extractedNewMenu);
  }

  useEffect(() => {
    getReportFields();
    if (localStorage.getItem("ListItem")) {
      setMenuItem(JSON.parse(localStorage.getItem("ListItem") || ""))
    }
    if (localStorage.getItem("ListMenu")) {
      setListMenu(JSON.parse(localStorage.getItem("ListMenu") || "[]"))
    }
  }, [listMenuParent])

  const handleClickMenu = (item: any, index: number) => {
    if (item.name === 'navbar.listMenuParent.miscellaneousReports.title') return;
    setMenuItem(item);
    const newMenu = [...listMenu];
    newMenu.forEach((itemMenu: any) => {
      itemMenu.status = false;
    });
    newMenu[index].status = true;
    localStorage.setItem("ListItem", JSON.stringify(item));
    localStorage.setItem("ListMenu", JSON.stringify(newMenu));
    setListMenu(newMenu);
    handleItemLeave();
  };

  const handleLogout = async () => {
    await MainService.logout(queryClient);
    window.location.replace("/login");
  };

  const handleItemHover = (e: any, id: number) => {
    setActiveTooltip(id);
  };

  const handleItemLeave = () => {
    setActiveTooltip(0);
  };


  const renderImg = (src: string, active: boolean, id: number) => {
    let srcImg: string;
    if (themeUi === "CHARCOALCHIC" && active && id === 6) {
      srcImg = src + "_CHARCOALCHIC_active.svg";
    } else if (themeUi === "PUREELEGANCE") {
      srcImg = src + "_black.svg";
    } else {
      srcImg = src + ".svg";
    }
    return srcImg;
  };

  const getChild = (item: any): { url: string } | undefined => {
    let childMenuItem;
  
    const result = getNestedChildren(item.child);

    result.some((itemChild: any) => {
      if (
        (user.url_permission.includes(itemChild.url) ||
          reportUrls.includes(itemChild.url))
      ) {
        childMenuItem = itemChild;
        return true;
      }
    })
    
    return childMenuItem;
  }

  const getNestedChildren = (children: Array<any>): any => {
    const stack = [...children];
    const result = [];
    while (stack.length > 0) {
      const current = stack.pop();
      if (current.child) {
        stack.push(...current.child);
      } else {
        result.push(current);
      }
    }
    return result.reverse();
  };

  const navigate = useNavigate();

  return (
    <NavStyle.SCGridNav id="vector_nav" className="list-roles-per--content">
      <NavStyle.SCNavBox>
        {listMenu.map((item: any, index: number) => {

          const childMenu = getChild(item);

          if (childMenu) {
            return (
              <NavStyle.SCMenuItem
                key={item.id}
                active={item.status}
                themeUi={themeUi}
                onMouseEnter={(e) => handleItemHover(e, item.id)}
                onMouseLeave={handleItemLeave}
              >
                <NavStyle.SCNavMenu
                  onClick={() => handleClickMenu(item, index)}
                >
                  <NavStyle.SCNavIcon
                    data-tooltip-id={item.name}
                    src={renderImg(item.img, item.status, item.id)}
                    alt="logo"
                    style={{ zoom: item.id == `11` || item.id == `12` ? 1.2 : 1 }}
                    widthIcon={item.widthIcon}
                    onClick={() => { item.id !== 8 ? navigate(childMenu.url): '' }}

                  />
                  {!item.status && activeTooltip === item.id && (
                    <MenuToolTip 
                      reportUrls={reportUrls} 
                      item={item} 
                      isLoading={isLoading} 
                      setIsLoading={setIsLoading} 
                      tempUrls={tempUrls} 
                      setTempUrls={setTempUrls} 
                      isHide={isHide} 
                      setIsHide={setIsHide} 
                      setWidthResponsive={setWidthResponsive}
                    />
                  )}
                  {item.status && !isHide && activeTooltip === item.id && (
                    <MenuToolTip 
                      reportUrls={reportUrls} 
                      item={item} 
                      isLoading={isLoading} 
                      setIsLoading={setIsLoading} 
                      tempUrls={tempUrls} 
                      setTempUrls={setTempUrls} 
                      isHide={isHide} 
                      setIsHide={setIsHide} 
                      setWidthResponsive={setWidthResponsive} 
                    />
                  )}
                </NavStyle.SCNavMenu>
              </NavStyle.SCMenuItem>
            );
          }
        })}
      </NavStyle.SCNavBox>
      <NavStyle.SCNavLogout onClick={handleLogout}>
        <NavStyle.SCIconLogout src="/assets/img/nav/logout.png" alt="logo" />
      </NavStyle.SCNavLogout>
    </NavStyle.SCGridNav>
  );
};

export default NavbarMenu;
