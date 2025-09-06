import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VFTable from "../../Common/VFTable";
import { AgGridReactProps } from "ag-grid-react";
import "../gridStyles.css";
const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 16px 16px;
  position: relative;
  margin-top: 24px;
`;

const GridWrapper = styled.div`
  position: relative; /* important for absolute positioning of the tab */
  border: 1px solid #ccc;
  border-radius: 0 8px 8px 8px;
  padding: 16px 16px 25px 16px; /* top padding increased so content doesn't overlap with the tab */
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 400px;

  & > .ag-theme-alpine {
    flex: 1;
    }
`;

const WorkStationDropDown = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: fit-content;
    font-size: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    &:focus {
        outline: none;
        border-color: #9c0d64;
        box-shadow: 0 0 5px rgba(156, 13, 100, 0.5);
    }
`;

const Tab = styled.div`
  position: absolute;
  top: -25px;
  left: 16px;
  height: 40px;
  padding: 10px 80px 10px 20px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 500;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #9c0d64, #c71585);
  border-top-left-radius: 8px;
  clip-path: polygon(0 0, 75% 0, 100% 100%, 0% 100%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

const FilterSection = styled.div`

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ToggleWrapper = styled.div`
  display: flex;
  background: #fff;
  border-radius: 50px;
  padding: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
  gap: 6px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? "#b23a7d" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#555")};
  font-size: 0.85rem;
  font-weight: 500;
  min-width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => (active ? "#b23a7d" : "#f0f0f0")};
  }
`;





const ResourceViewSummary = ({TaskTypeMaster}: any) => {

    const [workStation, setWorkStation] = useState("");

    const [active, setActive] = useState("Percentage Wise");

  const options = ["Percentage Wise", "Day Wise", "Hrs Wise", "Count Wise"];

    const agGridProps: AgGridReactProps = {

        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
            flex: 1,
        },
        rowClass: 'my-row-class',

        // all even rows assigned 'my-shaded-effect'
        getRowClass: params => {
            if (params && params.node && params.node.rowIndex &&  params?.node?.rowIndex % 2 === 0) {
                return 'my-shaded-effect';
            }
        },
        animateRows: true,
        rowSelection: "single",
        pagination: true,
        paginationPageSize: 10,

    }

    const [colDef, setColDef] = useState<any>([]);
    const [rowData, setRowData] = useState<any>([]);


    useEffect(()=>{
        const ColDef = [
            { headerName: 'Workstation', colId: 'work_station', field: 'work_station', width: 120, flex: 1, position: 1 },
        ];
    
        const TaskTypes = Object.keys(TaskTypeMaster);
    
        TaskTypes.forEach((type: any, index: number) => {
            ColDef.push({ headerName: type, colId: type, field: type, width: 120, flex: 1, position: index + 2 });
        });

        if(active !== "Percentage Wise"){
          ColDef.push({headerName: "Total", colId: "total", field: "total", width: 120, flex: 1, position: TaskTypes.length + 2})
        }

        setColDef(ColDef);


    },[TaskTypeMaster,active])


   


  return (
    <SectionWrapper>
        <Tab>Summary</Tab>
      <GridWrapper>
        {/* Content inside the grid */}

      <FilterSection>

        <WorkStationDropDown placeholder="Select Work Station" value={workStation} onChange={(e) => {setWorkStation(e.target.value)}}>
          <option value="ws1">Work Station 1</option>
          <option value="ws2">Work Station 2</option>
          <option value="ws3">Work Station 3</option>
        </WorkStationDropDown>

        <ToggleWrapper>
      {options.map((opt) => (
        <ToggleButton
          key={opt}
          active={active === opt}
          onClick={() => setActive(opt)}
        >
          {opt}
        </ToggleButton>
      ))}
    </ToggleWrapper>
      </FilterSection>

        <VFTable {...agGridProps} columnDefs={colDef} rowData={[]} />

      </GridWrapper>
    </SectionWrapper>
  );
};

export default ResourceViewSummary;
