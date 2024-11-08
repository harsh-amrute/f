import React from "react";
import { useUserData } from "../../../../context";
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

const LandingPage = () => {
  const { user } = useUserData();
  console.log(user);
  
  return (
    <LandingContainer>
      <h1 style={{ fontSize: "2rem" }}>
        Welcome to{" "}
        <span style={{ color: "#BC3D81", marginBottom: 0 }}>VectorFlow</span>
      </h1>
      <h3 style={{ color: "#707070", top: 0, marginTop: "-2%" }}>
        A seamless, end to end supply chain management system
      </h3>
      <Rectangle text="Replenishment">
        <CardContainer>
          <AppBox>
            <AppBoxDiv>
              <ImageHolder>
                <Image src="/assets/img/planning.svg" alt="Product" />
              </ImageHolder>
              <h2 style={{ zIndex: 4, margin: "1.5rem 0 0.5rem 2.5rem" }}>
                Planning
              </h2>
              <AppBoxDivider />
              <ClickBox>
                <p style={{ color: "#820F4C" }}>Click to view </p>
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
          <AppBox />
          <AppBox />
          <AppBox />
        </CardContainer>
      </Rectangle>
      <LandingPageDivider />
      <Rectangle text="Production & Procurement">
        <AppBox />
        <AppBox />
      </Rectangle>
      <LandingPageDivider />
      <Rectangle text="Retail"></Rectangle>
    </LandingContainer>
  );
};

export default LandingPage;
