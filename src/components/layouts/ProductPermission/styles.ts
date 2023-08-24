import styled from "styled-components";
import * as gridSystem from "../../../styles/gridSystem";

export const SCSwapPermission = styled.div`
  margin-bottom: 20px;
  border-radius: 6px;
  text-align: left;

  @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
      .size.laptopL}) {
    padding: 5px 0;
    margin-bottom: 1px;
  }
`;

export const SCtitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.6rem;
  margin: 15px 50px 0 50px;

  @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
      .size.laptopL}) {
    font-size: 1.8rem;
    margin-top: 5px;
  }
`;

export const SCSwapContent = styled.div`
  padding: 0 50px;
  display: block;
  width: 100%;
  border-top: 1px solid #929292;
  height: 250px;
  overflow-y: scroll;

  @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
      .size.laptopL}) {
    height: 185px;
  }
`;

export const SCSwapItem = styled.div`
  display: block;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px dashed #929292;
`;

export const SCFlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SCItemTitle = styled.span`
  font-size: 2rem;
  font-weight: 500;
  width: 30%;

  @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
      .size.laptopL}) {
    font-size: 1.6rem;
  }
`;

export const SCItemMulSelect = styled.div`
  width: 70%;
`;
