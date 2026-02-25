import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { listMenuParent } from "../../../../../src/components/layouts/NavbarMenu/listMenu";
import { useUserData } from "../../../../context";
import { ApplicationName } from "../../MTO/Common/Enum";
import {
  appBox,
  appBoxDiv,
  appBoxDivider,
  cardContainer,
  clickBox,
  image,
  imageHolder,
  landingContainer,
  landingPageDivider,
  rectangle,
} from "./LandingPage.styled.css";
import { NOIRFUSION, REGALBLAZE } from "../../../../styles/global";

const LandingPage = () => {
  const { user } = useUserData();
  const [listMenu] = useState(listMenuParent);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [myMap, setMyMap] = useState<any>(null);

  const themeUi = user?.user?.theme_ui;

  const permittedUrls = new Set<string>(user?.url_permission ?? []);

  const findUrl = (url: any) => {
    return permittedUrls.has(url);
  }

  const CreateMenuFunction = (item: any): string => {
    if (findUrl(item.url)) return item.url;
    if (!item.child?.length) return "";

    for (const child of item.child) {
      const result = findUrl(child.url)
        ? child.url
        : CreateMenuFunction(child);

      if (result) return result;
    }

    return "";
  };


  const pushToMap = (finMap: Map<any, any>, appId: any, node: any, url: string) => {
    const foundItem = {
      name: node.name,
      img: themeUi === "REGALBLAZE" ? node.rp_img : node.lp_img,
      url: url,
    };

    const mapArr = finMap.get(appId) || [];
    mapArr.push(foundItem);
    finMap.set(appId, mapArr);
  };

  const createMenu = () => {

    const finMap = new Map();
    listMenu?.forEach((item: any) => {
      if (item?.lp_attr) {
        const urlAvailable: string = CreateMenuFunction(item);

        if (urlAvailable.length > 0) {
          pushToMap(finMap, item?.app_id, item, urlAvailable);
        }
      }
      else {
        // MTA
        item.child.forEach((child: any) => {
          if (child.lp_attr && findUrl(child?.url)) {
            pushToMap(finMap, item?.app_id, child, child?.url);
          }
          else {
            child?.child?.forEach((grand_child: any) => {
              if (grand_child.lp_attr && findUrl(grand_child?.url)) {
                pushToMap(finMap, item?.app_id, grand_child, grand_child?.url);
              }
            })
          }
        })

      }
    });
    setMyMap(finMap)
  };

  useEffect(() => {
    createMenu();
  }, [themeUi, user?.url_permission]);


  const imageSrc = themeUi === "REGALBLAZE"
    ? "/assets/img/Clicktoview1.svg"
    : "/assets/img/Clicktoview.svg";
  return (
    <div className={landingContainer}>
      <h1 style={{ fontSize: "2rem" }}>
        Welcome to{" "}
        <span
          style={{
            color: themeUi === "REGALBLAZE" ? REGALBLAZE.color5 : NOIRFUSION.color5,
            marginBottom: 0,
          }}
        >
          VectorFlow
        </span>
      </h1>
      <h3 style={{ color: "#707070", top: 0, marginTop: "-2%" }}>
        A seamless, end to end supply chain management system
      </h3>
      {myMap &&
        Array.from(myMap?.entries()).map(
          (item: any, index: number, array: any[]) => {
            if (item[1]?.length > 0) {
              return (
                <Fragment key={index}>
                  <div
                    className={rectangle}
                    data-label={ApplicationName[item[0]] ?? ""}
                    data-theme={themeUi ?? ""}
                  >
                    <div className={cardContainer}>
                      {item[1].map((subItem: any, subIndex: number) => {
                        return (
                          <div className={appBox} key={subIndex}>
                            <div className={appBoxDiv}>
                              <div
                                className={imageHolder}
                                data-theme={themeUi}
                              >
                                <img
                                  className={image}
                                  src={subItem.img}
                                  alt="Product"
                                />
                              </div>
                              <h3
                                style={{
                                  zIndex: 4,
                                  margin: "1.5rem 0 0.5rem 2.5rem",
                                }}
                              >
                                {t(subItem.name)}
                              </h3>
                              <div className={appBoxDivider} />
                              <div
                                className={clickBox}
                                onClick={() => {
                                  navigate(subItem?.url);
                                }}
                              >
                                <p
                                  style={{
                                    color:
                                      themeUi === "REGALBLAZE"
                                        ? REGALBLAZE.color5
                                        : NOIRFUSION.color5,
                                  }}
                                >
                                  Click to view{" "}
                                </p>
                                <img
                                  style={{
                                    position: "relative",
                                    width: "7%",
                                    marginLeft: "1rem",
                                  }}
                                  src={imageSrc}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {index < array.length - 1 && item.length > 0 && (
                    <div className={landingPageDivider} />
                  )}
                </Fragment>
              );
            }
          }
        )}
    </div>
  );
};

export default LandingPage;
