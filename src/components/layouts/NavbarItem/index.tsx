import * as NavStyle from "./styles";
import { useState } from "react";
import { SCMenuLeft, SCMenuItem, SCItemChild } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../../../context";
import Particulars from "./particulars";
import { useTranslation } from "react-i18next";
import { ColumnChart } from "../../index";
import ParticularForced from "./ParticularForced";
import ParticularStoreStatus from "./ParticularStoreStatus";
import ParticularAvai from "./ParticularAvai";

const NavbarItem = ({
  setWidthResponsive,
  menuItem,
  isHide,
  setIsHide,
}: any) => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const permission: any = user?.roles?.permission;
  const themeUi = user?.user?.theme_ui;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(true);

  const renderListMenu = (listMenu: any) => {
    return (
      <SCMenuItem
        key={listMenu.id}
        active={
          listMenu.url === location.pathname ||
          listMenu.child.some((i: any) => i.url === location.pathname)
        }
      >
        <>
          <NavStyle.SCNavMenu
            onClick={activeCollapseItem}
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
          {renderListMenuChild(listMenu.child)}
        </>
      </SCMenuItem>
    );
  };

  const renderListMenuChild = (listChild: any) => {
    return listChild.map((item: any) => {
      const checkRole = permission?.some((value: any) =>
        item.role.includes(value)
      );

      if (checkRole) {
        return (
          <SCItemChild
            key={item.url}
            onClick={() => {
              navigate(item.url, { replace: true });
            }}
            active={item.url === location.pathname}
            status={toggle}
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
        );
      }
    });
  };

  const activeCollapseItem = () => {
    setToggle(!toggle);
  };

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
              src={`/assets/img/nav/icon_hide_menu${
                themeUi === "REGALBLAZE" ? "_yellow" : ""
              }.svg`}
              alt="menu"
              onClick={handleClickIconMenu}
              themeUi={themeUi}
              isHide={isHide}
            />
          </NavStyle.SCBoxTop>
          {isHide && !!menuItem && (
            <SCMenuLeft>{renderListMenu(menuItem)}</SCMenuLeft>
          )}
        </NavStyle.SCNavBox>

        {isHide && pathname === "/ist-forced-closure" && menuItem.id === 6 && (
          <ParticularForced themeUi={themeUi} />
        )}

        {isHide && pathname === "/store-status" && menuItem.id === 6 && (
          <ParticularStoreStatus themeUi={themeUi} />
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
