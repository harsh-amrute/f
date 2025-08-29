import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
`;

export const ColumnSection = styled.table`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  min-width: 20px;
`;

export const CalendarSection = styled.div`
  border: 1px solid #ccc;
  border-radius: 0 8px 0 0;
  background: black;
  flex: 1 1 0;
  overflow-x: auto;
`;

export const ColumnHeaderRow = styled.tr`
  height: 50px;
  background: black;
  border: 1px solid #ccc;
`;

export const ContentRow = styled.tr`
  height: 30px;
  position: relative;
  border: 1px solid #ccc;
  &:nth-child(odd) {
    background: #f5f5f5;
  }
  &:nth-child(even) {
    background: #ffffff;
  }
`;

export const HeaderCell = styled.th<{ width: number }>`
  position: relative;
  padding: 8px;
  height: 100%;
  border-right: 1px solid #ccc;
  color: white;
  text-align: center;
  width: ${({ width }) => width}px;
  min-width: 30px;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
  user-select: none;
`;

export const ContentCell = styled.td<{ width: number }>`
  border-left: 1px solid #ccc;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 300;
  width: ${({ width }) => width}px;
  min-width: 30px;
`;


export const CalendarTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    height: 100%;
`

export const CalendarHeaderRow = styled.tr`
    height: 20px;
  background: black;
  border: 1px solid #ccc;
  color: white;
  text-align: center;
  flex: 0 0 auto;
`


export const CalendarCell = styled.th<{ span?: number }>`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  background: black;
  min-width: 60px;
  height: 20px;          /* ✅ Fix: bound height */
  line-height: 22px;     /* ✅ vertically center */
  white-space: nowrap;
`;

export const TaskBar = styled.div<{left: number, width: number, backgroundColor?: string}>`
    position: absolute;
    background: ${props => props.backgroundColor || 'green'};
    height: 20px;
    border-radius: 2px;
    top:4px;
    border: 0.5px solid #333;
    text-align: center;
    color: white;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
      transform : scale(1.01);
    }
`;


export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 100%;
  justify-content: center;
`

export const SectionWrapper = styled.div`

`

export const ZoomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const ZoomButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  gap: 4px;
  padding: 2px;
`
export const ZoomButton = styled.button<{active?: boolean}>`
  background: ${props => props.active ? '#cecece' : 'white'};
    color: ${props => props.active ? 'none' : '#333'};;
  border: ${props => props.active ? 'none' : '1px solid #333'};;
  border-radius: 4px;
  padding: 3px 6px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background: ${props => props.active ? '#cecece': '#555'};
    color: ${props => props.active ? '#8A8686': 'white'};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #333;
  }
`

export const ColorPallete = styled.div<{color: string}>`
    width: 15px;
    height: 15px;
    background: ${props => props.color || 'grey'};
    border-radius: 3px;
    margin-right: 6px;
    border: 0.4px solid #333;
`
export const Label = styled.span`
    font-size: 0.9rem;
    color: #333;
    margin-right: 16px;
`
