import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../../../context";
import {
  WrapToolTip,
  TooltipContainer,
  TooltipTitle,
  TooltipContent,
  SCIcon,
} from "./style";
import { useRef, useEffect } from 'react';
import { handleDownload, navigateWithPrompt } from "../../../helpers/utils";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../redux/store/store";
import { RESET_STATE } from "../../../redux/actions/MDM";

const MenuToolTip = ({ item, tempUrls, setTempUrls, isLoading, isHide, setIsLoading, setIsHide, setWidthResponsive }: any) => {
  const { t } = useTranslation();
  const { user, toggleSideBar } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const location = useLocation();
  const navigate = useNavigate();
  //Add Report Urls to this Array
  const reportUrls = ['/api/download-reports/bpr', '/api/download-reports/fr', '/api/download-reports/rosn', '/api/download-reports/store_classification', '/api/download-reports/ist'];

  const mdm = useSelector((state: RootState) => state.mdm);
  const dispatch = useDispatch();

  const resetState = () => {
    dispatch(RESET_STATE());
  }


  const handleTooltipClick = async (url: string) => {

    if (reportUrls.includes(url)) {
      setTempUrls([...tempUrls].concat(url));
      setIsLoading(true);
      if (await handleDownload(url, '')) {
        setIsLoading(false);
        const tempArr = tempUrls.filter((tempUrl: string) => tempUrl === url)
        setTempUrls([...tempArr]);
      }
    }
    else {
      // navigate(url, { replace: true })
      navigateWithPrompt(() => {
        navigate(url, { replace: true });
        if (isHide) {
          setWidthResponsive({
            widthLeft: "0%",
            widthRight: "95%",
          });
        }
        setIsHide(false);
        toggleSideBar(false)
      }, url, mdm, resetState);
    }
  }

  const getNestedChildren = (children: Array<any>): any => {
    const stack = [...children];
    const result = [];

    while (stack.length > 0) {
      const current = stack.pop();

      if (current.child) {
        stack.push(...current.child);
      }

      else {
        result.push(current);
      }
    }

    return result.reverse();
  };


  const tooltipRef = useRef<any>(null);


  const renderToolTipContent = (items: any): any => {
    const result = getNestedChildren(items.child)
    return (
      result.map((itemChild: any, index: number) => {
        const checkRole = user?.roles?.permission?.some((value: any) =>
          itemChild?.role?.includes(value)
        );
        if (
          (user.url_permission.includes(itemChild.url) ||
            itemChild.url === "" ||
            itemChild.url === "/profile" || reportUrls.includes(itemChild.url)) && checkRole
        ) {
          return (

            <TooltipContent
              key={index}
              action={itemChild.url === location.pathname}
              themeUi={themeUi}
              onClick={() => handleTooltipClick(itemChild.url)}
            >
              {t(itemChild.name) || itemChild.name}
              {itemChild.url !== location.pathname && (
                <SCIcon
                  src={
                    isLoading && tempUrls.includes(itemChild.url) ? "/assets/img/nav/loader.svg" :
                      itemChild.imgHover
                        ? itemChild.imgHover
                        : "/assets/img/nav/arrow_down.svg"
                  }
                  alt="arrow"
                />
              )}
            </TooltipContent>
          );
        }
      })
    )
  }

  useEffect(() => {
    // Access the div's position when the component mounts
    if (tooltipRef.current) {
      const rect = tooltipRef.current?.getBoundingClientRect();
      console.log('Div position:', rect); // You can log or use rect's properties here

      // Example: Accessing specific properties
      console.log('Top:', rect.top);
      console.log('Left:', rect.left);
      console.log('Width:', rect.width);
      console.log('Height:', rect.height);
    }
  }, [tooltipRef]);


  let maxHeight = 'fit-content';


  if (item.name === "navbar.listMenuParent.prodAndPlanningScheduling.title") {
    maxHeight = '250px';
  }
  else if (item.name === "navbar.listMenuParent.manufacturingHub.title") {
    maxHeight = '160px';
  }
  else if (item.name === "navbar.listMenuParent.poogi.title") {
    maxHeight = "200px";
  }
  else if (item.name === "Replenishment and Replacement") {
    maxHeight = '340px';
  }

  return (
    <WrapToolTip>
      <Tooltip
        id={item.name}
        place="right"
        className="tooltip_list"
        noArrow
        isOpen

      >
        <TooltipContainer style={{ maxHeight }} ref={tooltipRef}>
          <TooltipTitle>{t(item.name)}</TooltipTitle>
          {renderToolTipContent(item)}
        </TooltipContainer>
      </Tooltip>
    </WrapToolTip>
  );
};

export default MenuToolTip;
