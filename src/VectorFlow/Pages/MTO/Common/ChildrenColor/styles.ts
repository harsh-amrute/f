import styled from "styled-components";
export const ProcPlanningChildrenColor = styled.div`
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
`
const determineColor = (value: any) => {
    if (value === "Red") return 'Red';
    if (value === "Yellow") return 'Yellow';
    if (value === "Black") return 'Black';
    if (value === "Green") return 'Green';
};
export const ChildrenColorCellRenderer = styled.div<{ value: string }>`
display: flex;
align-items: center;
justify-content: center;
width: 15px;
height: 15px;
border-radius: 50%;
margin-top: 14px;
background-color: ${(props) => determineColor(props.value)};
`;