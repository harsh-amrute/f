import * as NavStyle from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import { MainService } from "../../../module-main/services/api";
import { listMenuParent } from "./listMenu";
import { MenuToolTip } from "../../../components/index";
import { useState } from "react";
import { useUserData } from "../../../context";
import { useNavigate } from "react-router";

const NavbarMenu = ({ setMenuItem, isHide }: any) => {
  const [listMenu, setListMenu] = useState(listMenuParent);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const queryClient = useQueryClient();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [activeTooltip, setActiveTooltip] = useState<number>(0);
  const [isLoading,setIsLoading] = useState(false);
  const [tempUrls,setTempUrls] = useState([]);

  const handleClickMenu = (item: any, index: number) => {
    if(item.name==='navbar.listMenuParent.miscellaneousReports.title') return;
    setMenuItem(item);
    const newMenu = [...listMenuParent];
    newMenu.forEach((itemMenu: any) => {
      itemMenu.status = false;
    });
    newMenu[index].status = true;
    setListMenu(newMenu);
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

  const navigate = useNavigate();
  return (
    <NavStyle.SCGridNav id="vector_nav" className="list-roles-per--content">
      <NavStyle.SCNavBox>
        {listMenu.map((item: any, index: number) => {
          const checkRole = user?.roles?.permission?.some((value: any) =>
            item?.role?.includes(value)
          );

          if (checkRole) {
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
                    widthIcon={item.widthIcon}
                    onClick={()=>{navigate(item.url)}}

                  />
                  {!item.status && activeTooltip === item.id && (
                    <MenuToolTip item={item} isLoading={isLoading} setIsLoading={setIsLoading} tempUrls={tempUrls} setTempUrls={setTempUrls} />
                  )}
                  {item.status && !isHide && activeTooltip === item.id && (
                    <MenuToolTip item={item} isLoading={isLoading} setIsLoading={setIsLoading} tempUrls={tempUrls} setTempUrls={setTempUrls} />
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
