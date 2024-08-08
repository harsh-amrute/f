import styled from "styled-components";

export const StepperWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: start;
  font-size: 12px;
  padding: 2rem 2rem;
  margin: 1.5rem 0;
  gap: 32px;
  border: 1px dashed #707070;
  border-radius: 10px;
  position: relative;
  &.route-assignment > .step-group > div{
    flex: 1;
  }
  &.buffer-assignment > .step-group > div:nth-of-type(2){
    flex: 1.5;
  }
`;

StepperWrapper.defaultProps = {
    className: "stepper-container",
};

export const StepGroup = styled.div<{$step:boolean}>`
  width: 43%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  background: #eae8e8;
  border-radius: 4px;
  position: relative;


  ${props => {
    return (props.$step &&
    `&:not(:first-of-type):before {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #82104c;
        right: 100%;
        background: #82104c;
        border-radius: 50%;
      }
      &#inactive:before {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #82104c;
        right: calc(100% + 5px);
        background: transparent;
        border-radius: 50%;
      }
      &:not(:last-of-type):after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #82104c;
        left: 100%;
        border-radius: 50%;
      }
      &#inactive:after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        border: 1px solid #82104c;
        left: calc(100% + 5px);
        border-radius: 50%;
      }`)}
    }
`;

StepGroup.defaultProps = {
  className: "step-group",
};

export const StepLabel = styled.div`
  margin: 0 1rem;
  width: max-content;
`;