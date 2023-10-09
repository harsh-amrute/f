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
import {handleDownload} from "../../../helpers/utils";

const MenuToolTip = ({ item, tempUrls,setTempUrls, isLoading,setIsLoading }: any) => {
  const { t } = useTranslation();
  const { user } = useUserData();

  const themeUi = user?.user?.theme_ui;
  const location = useLocation();
  const navigate = useNavigate();
  //Add Report Urls to this Array
  const reportUrls = ['/api/download-reports/bpr','/api/download-reports/fr','/api/download-reports/rosn','/api/download-reports/store_classification','/api/download-reports/ist'];
  
  const handleTooltipClick = async (url:string) => {
    
    if(reportUrls.includes(url)){
      setTempUrls([...tempUrls].concat(url));
      setIsLoading(true);
      if(await handleDownload(url,'')) {
        setIsLoading(false);
        const tempArr = tempUrls.filter((tempUrl:string)=>tempUrl===url)
        setTempUrls([...tempArr]);
      }
    }
    else{
      navigate(url, { replace: true })
    }
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
        <TooltipContainer>
          <TooltipTitle>{t(item.name)}</TooltipTitle>
          {item.child.map((itemChild: any, index: number) => {
            if (
              user.url_permission.includes(itemChild.url) ||
              itemChild.url === "" ||
              itemChild.url === "/profile" || reportUrls.includes(itemChild.url)
            ) {
              return (
                <TooltipContent
                  key={index}
                  action={itemChild.url === location.pathname}
                  themeUi={themeUi}
                  onClick={() => handleTooltipClick(itemChild.url)}
                >
                  {t(itemChild.name)}
                  {itemChild.url !== location.pathname && (
                    <SCIcon
                      src={
                        isLoading && tempUrls.includes(itemChild.url) ? "../assets/img/nav/loader.svg" :
                        itemChild.imgHover
                          ? itemChild.imgHover
                          : "../assets/img/nav/arrow_down.svg"
                      }
                      alt="arrow"
                    />
                  )}
                </TooltipContent>
              );
            }
          })}
        </TooltipContainer>
      </Tooltip>
    </WrapToolTip>
  );
};

export default MenuToolTip;
