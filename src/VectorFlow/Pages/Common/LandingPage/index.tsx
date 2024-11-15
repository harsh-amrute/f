import React, { useEffect, useRef, useState } from "react";
import { useUserData } from "../../../../context";
import { listMenuParent } from "../../../../../src/components/layouts/NavbarMenu/listMenu";
import {
  AppBox,
  ImageHolder,
  LandingContainer,
  LandingPageDivider,
  Rectangle,
  Image,
  AppBoxDivider,
  ClickBox,
  CardContainer,
  AppBoxDiv,
} from "./LandingPage.styled";
import { ApplicationName } from "../../MTO/Common/Enum";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const { user } = useUserData();
  const [listMenu] = useState(listMenuParent);
  const map = useRef(new Map());
  const { t } = useTranslation();
  const navigate = useNavigate();


  const findUrl = (item: any)=>{
    const checkUrl = user?.url_permission?.some((value : any)=>{
      return item.url == value;
    })
    if(checkUrl){
      return item.url;
    }else if(item?.child){
      item.child.forEach((child : any)=>{
        const foundUrl =  findUrl(child);
        if(foundUrl){
          return foundUrl;
        }
      })
    }
    return null;
  }

  const CreateMenuFunction = (app_id: any, item: any) => {
    if (item?.lp_attr) {
      const allowed = user?.roles?.permission?.some((value: any) => {
        return item?.role?.includes(value);
      });
      if (allowed) {
        const currentList = map.current.get(app_id) || [];
        if (
          !currentList.some(
            (existingItem: any) => existingItem.name === item.name
          )
        ) {
          const checkUrl = user?.url_permission?.some((value : any)=>{
            return item.url == value;
          })
          let url = undefined;
          if(checkUrl){
              url = item.url
          }else{
            if(item?.child){
              for (const child of item.child) {
                url = findUrl(child);
                if (url != null && url != undefined) {
                  break;  // Exit the loop once URL is found
                }
              }
            }
          }
          if(url != null && url != undefined){
            currentList.push({
              name: item.name,
              img: item.lp_img,
              url: url,
            });
          }
          map.current.set(app_id, currentList);
        }
      }
    } else if (item?.child) {
      item?.child.forEach((child: any) => {
        CreateMenuFunction(app_id, child);
      });
    }
  };

  const createMenu = () => {
    listMenu?.forEach((item: any) => {
      const role = user?.roles?.permission?.some((value: any) => {
        return item?.role?.includes(value);
      });

      if (role) {
        if (!map.current.has(item?.app_id)) {
          map.current.set(item?.app_id, []);
        }
        CreateMenuFunction(item?.app_id, item);
      }
    });
  };

  useEffect(() => {
    createMenu();
  }, []);


  const [myMap, setMyMap] = useState<any>(null);
  useEffect(()=>{
    setMyMap(map);
  },[map])
  return (
    <LandingContainer>
      <h1 style={{ fontSize: "2rem" }}>
        Welcome to{" "}
        <span style={{ color: "#BC3D81", marginBottom: 0 }}>VectorFlow</span>
      </h1>
      <h3 style={{ color: "#707070", top: 0, marginTop: "-2%" }}>
        A seamless, end to end supply chain management system
      </h3>
      <>
        {myMap && Array.from(myMap?.current?.entries()).map(
          (item: any, index: number, array: any[]) => {
            if (item[1]?.length > 0) {
              return (
                <>
                  <Rectangle key={item[0]} text={ApplicationName[item[0]]}>
                    <CardContainer>
                      {item[1].map((subItem: any, subIndex: number) => {
                        return (
                          <AppBox key={subIndex}>
                            <AppBoxDiv>
                              <ImageHolder>
                                <Image src={subItem.img} alt="Product" />
                              </ImageHolder>
                              <h3
                                style={{
                                  zIndex: 4,
                                  margin: "1.5rem 0 0.5rem 2.5rem",
                                }}
                              >
                                {t(subItem.name)}
                              </h3>
                              <AppBoxDivider />
                              <ClickBox onClick={()=>{
                                navigate(subItem?.url);
                              }}>
                                <p style={{ color: "#820F4C" }}>
                                  Click to view{" "}
                                </p>
                                <img
                                  style={{
                                    position: "relative",
                                    width: "7%",
                                    marginLeft: "1rem",
                                  }}
                                  src="/assets/img/Clicktoview.svg"
                                />
                              </ClickBox>
                            </AppBoxDiv>
                          </AppBox>
                        );
                      })}
                    </CardContainer>
                  </Rectangle>
                  {index < array.length - 1 && item.length > 0 && (
                    <LandingPageDivider />
                  )}
                </>
              );
            }
          }
        )}
      </>
    </LandingContainer>
  );
};

export default LandingPage;
