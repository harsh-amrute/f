import React from 'react';
import {
  MainContainer,
  Box,
  PercentBorderContainer,
  Percentborder,
  Percent,
  BtnGroup,
  Btns,
  TextXAxis,
  Main,
  ViewOrder,
  TextOnBox,
  ColorOnLeft
} from '../MaterialCoverage/styles';
const MaterialCov = () => {


  const boxDesign = () => {
    return (
      <>
        <TextOnBox>
          No Kit
        </TextOnBox>

        <ColorOnLeft color="#000">
        </ColorOnLeft>
        <ColorOnLeft color="red">
        </ColorOnLeft>
        <ColorOnLeft color="yellow">
        </ColorOnLeft>

        <PercentBorderContainer>
          <Percentborder>
            <Percent>98%</Percent>
          </Percentborder>
        </PercentBorderContainer>

        <ViewOrder>
          View All Records
        </ViewOrder>

        <BtnGroup>
          <Btns>Order Count</Btns>
          <Btns>No of Customers</Btns>
          <Btns>Order Value</Btns>
        </BtnGroup>
      </>
    )
  }


  return (
    <div style={{ width: "85%" }}>
      <Main>
        <TextXAxis style={{ transform: 'rotate(-90deg)', fontSize: "16px" }}>
          Orders Priority
        </TextXAxis>

        {/**1st row */}
        <MainContainer>

          {/** 1st Box */}
          <Box>
            {boxDesign()}
          </Box>

          { /**2nd Box */}
          <Box>
            <TextOnBox>
              No Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

          { /**3rd Box */}
          <Box>
            <TextOnBox>
              No Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>
        </MainContainer>

        {/**2nd Row */}
        <MainContainer>
          {/** 1st Box */}

          <Box>
            <TextOnBox>
              Partial Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

          { /**2nd Box */}
          <Box>
            <TextOnBox>
              Partial Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

          { /**3rd Box */}
          <Box>
            <TextOnBox>
              Partial Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>
        </MainContainer>

        {/**3rd Row */}
        <MainContainer>
          {/** 1st Box */}
          <Box>
            <TextOnBox>
              Full Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

          { /**2nd Box */}
          <Box>
            <TextOnBox>
              Full Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

          { /**3rd Box */}
          <Box>
            <TextOnBox>
              Full Kit
            </TextOnBox>
            <PercentBorderContainer>
              <Percentborder>
                <Percent>98%</Percent>
              </Percentborder>
            </PercentBorderContainer>

            <ViewOrder>
              View All Records
            </ViewOrder>

            <BtnGroup>
              <Btns>Order Count</Btns>
              <Btns>No of Customers</Btns>
              <Btns>Order Value</Btns>
            </BtnGroup>
          </Box>

        </MainContainer>
      </Main>
      {/* <DivXAxis> */}
      <TextXAxis>
        Orders
      </TextXAxis>
      {/* </DivXAxis> */}
    </div>
  )
}
export default MaterialCov;