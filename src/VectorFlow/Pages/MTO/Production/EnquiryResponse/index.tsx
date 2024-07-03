import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import Note from "./Note";
import ResizableTable from "./ResizableTable";
import TabSwitch from "./TabsSwitch";
import MTOActionToolBar from "../../../../../../src/components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { prodPlanningMock } from "../../../../../mock-data/PROD";
import {
  BlurCover,
  CardCover,
  DashedCard,
  EnquiryWrapper,
  EstimatedWrapper,
  FilterWrapper,
  HeaderWrapper,
  HighlightedValue,
  MessageText,
  RmHeading,
  RmUICont,
  ValueWrapper,
  VerticalLine,
} from "./styles";
// import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
// import { FilterAccordianWrapper, FilterContainer, FilterHeading, HorizontalLine, PlantInput, SearchBar } from "./FilterModal/styles";
// import FilterAccordian from "./FilterAccordian";
import { useGetEnquiryResData } from "../../../../Services/MTO/Production/EnquiryResponse";
import { useUserData } from "../../../../../context/index";

const tabOptions = ["RM Not Available", "RM Available"];

interface BufferData {
  ItemType1: { proc_size: number; prod_size: number };
  ItemType2: { proc_size: number; prod_size: number };
  ItemType3: { proc_size: number; prod_size: number };
  ItemType4: { proc_size: number; prod_size: number };
  // Add more types as needed
}

const EnquiryResponse = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const data = useGetEnquiryResData();
  const [selectedOptions, setSelectedOptions] = useState<any>({
    plantName: "",
    productGroup: [],
    department: {},
    ccrGroup: {},
    ccrName: {},
  });
  const { user } = useUserData()
    // const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
  const themeUi = user.user.theme_ui;

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const getMostloadedCCR = () => {
    let mostLoadedCR =  filterData?.length > 0 ? filterData[0] : {};
    for (let i = 0; i < filterData?.length; i++) {
      const current = filterData[i];
      if (current?.fol > mostLoadedCR?.fol) {
        mostLoadedCR = current;
      }
    }
    return mostLoadedCR?.cnm;
  };

  const getRMValues = (bufferType: string) => {
    let bufferData = filterData?.length > 0 ? filterData[0] : {};
    const productGroup: keyof BufferData = selectedOptions?.productGroup[0];

    if (!productGroup) {
      return "--";
    }

    for (let i = 0; i < filterData?.length; i++) {
      const current = filterData[i];

      if (current?.it[productGroup]) {
        bufferData = current;
      }
    }
    if (bufferType === "procurement") {
      return bufferData?.it && bufferData?.it[productGroup]?.proc_size || "--";
    }
    return bufferData?.it && bufferData?.it[productGroup]?.prod_size || "--";
  };

  function getWeekOfMonth(dateString: string): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Parse the input date string
    const [dayStr, monthStr, yearStr] = dateString.split(' ');
    const day = parseInt(dayStr, 10);
    const monthIndex = months.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
    const year = parseInt(yearStr, 10);
  
    // Create a Date object
    const date = new Date(year, monthIndex, day);
  
    // Get the day of the month and calculate the week number
    const dayOfMonth = date.getDate();
    const startOfMonth = new Date(year, monthIndex, 1);
    const startOfMonthDay = startOfMonth.getDay();
    const weekOfMonth = Math.ceil((dayOfMonth + startOfMonthDay) / 7);
  
    // Format output
    const month = months[monthIndex];
    const weekString = `${month}-week ${weekOfMonth}`;
  
    return weekString;
  }
  

  const getFormattedDate = (date: any) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return getWeekOfMonth(`${day} ${month} ${year}`);
  };

  const getEarliestDate = (activeTab: number) => {
    let bufferData =  filterData?.length > 0 ? filterData[0] : {};
    const productGroup: keyof BufferData = selectedOptions?.productGroup[0];

    if (!productGroup) {
      return "--";
    }

    for (let i = 0; i < filterData?.length; i++) {
      const current = filterData[i];

      if (current?.it[productGroup]) {
        bufferData = current;
      }
    }

    const prodBuffer = bufferData?.it[productGroup]?.prod_size;
    const procBuffer = bufferData?.it[productGroup]?.proc_size;
    const fol = bufferData?.fol;

    const today = new Date();
    const result = new Date(today);
    let daysToAdd = 0;

    if (activeTab === 0) {
      daysToAdd = (prodBuffer + procBuffer) || 0;
    } else {
      daysToAdd = Math.max(prodBuffer, fol + (0.5 * prodBuffer));
    }

    return getFormattedDate(
      new Date(result.setDate(today.getDate() + daysToAdd))
    );
  };

  const getRMUI = () => {
    return (
      <RmUICont>
        <HeaderWrapper>
          {activeTab === 0 && <RmHeading>Procurement Buffer</RmHeading>}
          {activeTab === 0 && <VerticalLine />}
          <RmHeading>Production Buffer</RmHeading>
          <VerticalLine />
          <RmHeading>Most Loaded CCR</RmHeading>
          <VerticalLine />
          <RmHeading>Earliest Readiness Date</RmHeading>
        </HeaderWrapper>
        <ValueWrapper>
          {activeTab === 0 && <div>{getRMValues("procurement")}</div>}
          <div>{getRMValues("production")}</div>
          <div>{getMostloadedCCR()}</div>
          <HighlightedValue>{getEarliestDate(activeTab)}</HighlightedValue>
        </ValueWrapper>
      </RmUICont>
    );
  };

  const handleNameChange = ({name , value}: {name: string, value: string}) => {
    setSelectedOptions((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFilterSelect = (event: any, category: string, index: number) => {
    const { name, checked } = event.target;

    if (category === "Product Group") {
      const prodGrp = selectedOptions?.productGroup;
      if (checked) {
        prodGrp[0] = name;
      } else {
        prodGrp?.splice(index, 1);
      }
      setSelectedOptions((prev: any) => ({
        ...prev,
        productGroup: [...prodGrp],
      }));
    }

    if (category === "Department") {
      const dept = selectedOptions?.department;
      if (checked && !dept[name]) {
        dept[name] = checked;
      } else {
        delete dept[name];
      }
      setSelectedOptions((prev: any) => ({ ...prev, department: {...dept} }));
    }

    if (category === "CCR Group") {
      const ccrGrp = selectedOptions?.ccrGroup;
      if (checked && !ccrGrp[name]) {
        ccrGrp[name] = checked;
      } else {
        delete ccrGrp[name];
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrGroup: {...ccrGrp} }));
    }

    if (category === "CCR") {
      const ccrNm = selectedOptions?.ccrName;
      if (checked && !ccrNm[name]) {
        ccrNm[name] = checked;
      } else {
        delete ccrNm[name];
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrName: {...ccrNm} }));
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filterByPlName = () => {
    if(selectedOptions?.plantName === ''){
      return tableData;
    }
    const data = [];
    for (let i = 0; i < tableData?.length; i++) {
      const current = tableData[i];
      if (current?.plnm?.includes(selectedOptions?.plantName)) {
        data?.push(current);
      }
    }
    return data;
  };

  const filterByProdGrpName = (data: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (Object.keys(current?.it).includes(selectedOptions?.productGroup[0])) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };

  const filterByDeptName = (data: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (selectedOptions?.department[current?.dpnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };
  const filterByccrGroupName = (data: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (selectedOptions?.ccrGroup[current?.gnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };
  const filterByccrName = (data: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (selectedOptions?.ccrName[current?.cnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };

  const applyFilter = () => {
    let data = [];
    data = filterByPlName();
    data = selectedOptions?.productGroup?.length > 0 ? filterByProdGrpName(data) : data;
    data = Object.keys(selectedOptions?.department)?.length > 0 ? filterByDeptName(data) : data;
    data = Object.keys(selectedOptions?.ccrGroup)?.length > 0 ? filterByccrGroupName(data) : data;
    data = Object.keys(selectedOptions?.ccrName)?.length > 0 ? filterByccrName(data) : data;
    setFilterData(data);
    setIsModalOpen(false);
  };

  const message = (
    <p>
      The Readiness date is valid for order booked today. This can change if
      there are delays in order booking.
      <br />
      For large orders please contact planning team.
    </p>
  );

  const productGroupOptions: any = [];
  const departmentOptions: any = [];
  const ccrGroupOptions: any = [];
  const ccrNameOptions: any = [];

  for (let i = 0; i < tableData?.length; i++) {
    const ccrObj = tableData[i];
    if (ccrObj?.it) {
      const types = Object.keys(ccrObj?.it);
      for (let j = 0; j < types.length; j++) {
        if (!productGroupOptions?.includes(types[j])) {
          productGroupOptions.push(types[j]);
        }
      }
    }

    if (ccrObj?.dpnm) {
      if (!departmentOptions?.includes(ccrObj?.dpnm)) {
        departmentOptions.push(ccrObj?.dpnm);
      }
    }

    if (ccrObj?.gnm) {
      if (!ccrGroupOptions?.includes(ccrObj?.gnm)) {
        ccrGroupOptions.push(ccrObj?.gnm);
      }
    }

    if (ccrObj?.cnm) {
      if (!ccrNameOptions?.includes(ccrObj?.cnm)) {
        ccrNameOptions.push(ccrObj?.cnm);
      }
    }
  }

  const filters = [
    {
      heading: "Product Group",
      options: productGroupOptions,
    },
    {
      heading: "Department",
      options: departmentOptions,
    },
    {
      heading: "CCR Group",
      options: ccrGroupOptions,
    },
    {
      heading: "CCR",
      options: ccrNameOptions,
    },
  ];

  const removeFilters = (category: string, name: string) => {
    if(category === 'Plant'){
      setSelectedOptions((prev: any) => ({...prev, plantName: ''}));
    }
    if(category === 'Product Group'){
      setSelectedOptions((prev: any) => ({...prev, productGroup: []}));
    }
    if(category === 'Department'){
      const updatedFilter = selectedOptions?.department;
      delete updatedFilter[name];
      setSelectedOptions((prev: any) => ({...prev, department: updatedFilter}));
    }
    if(category === 'CCR Group'){
      const updatedFilter = selectedOptions?.ccrGroup;
      delete updatedFilter[name];
      setSelectedOptions((prev: any) => ({...prev, ccrGroup: updatedFilter}));
    }
    if(category === 'CCR Name'){
      const updatedFilter = selectedOptions?.ccrName;
      delete updatedFilter[name];
      setSelectedOptions((prev: any) => ({...prev, ccrName: updatedFilter}));
    }
    applyFilter();
  }

  useEffect(()=>{
    setTableData(data?.data?.data?.data?.results)
  },[data]);

  useEffect(()=>{
    setFilterData(data?.data?.data?.data?.results);
  },[tableData]);

  const hasProductGroup = selectedOptions?.productGroup[0];

  const selectedFilters: { label: string, values: string[] }[] = [];

  if(selectedOptions?.plantName){
    selectedFilters.push({
      label: 'Plant',
      values: [`${selectedOptions?.plantName}`]
    })
  }
  if(selectedOptions?.productGroup?.length > 0){
    selectedFilters.push({
      label: 'Product Group',
      values: [...selectedOptions.productGroup]
    })
  }
  if(Object.keys(selectedOptions?.department)?.length > 0){
    selectedFilters.push({
      label: 'Department',
      values: [...Object.keys(selectedOptions?.department)]
    })
  }
  if(Object.keys(selectedOptions?.ccrGroup)?.length > 0){
    selectedFilters.push({
      label: 'CCR Group',
      values: [...Object.keys(selectedOptions?.ccrGroup)]
    })
  }
  if(Object.keys(selectedOptions?.ccrName)?.length > 0){
    selectedFilters.push({
      label: 'CCR Name',
      values: [...Object.keys(selectedOptions?.ccrName)]
    })
  }

  return (
    <EnquiryWrapper>
      <FilterWrapper>
        <MTOActionToolBar
          comp={"EnquiryResponse"}
          onAddFilter={handleModalToggle}
          selectedFilters={selectedFilters}
          removeFilters={removeFilters}
          themeUi={themeUi}
        />
      </FilterWrapper>
      <ResizableTable header={prodPlanningMock?.header} data={filterData} />
      <EstimatedWrapper>
        <div  style={{ WebkitFilter: `blur(${hasProductGroup ? '0px' : '3px' })` }}>
          <TabSwitch
            heading="Estimated Due Date"
            tabs={tabOptions}
            handleTabChange={handleTabChange}
            tabUI={getRMUI()}
            activeTab={activeTab}
          />
          <Note type="danger" message={message} />
        </div>
        <BlurCover style={{display: hasProductGroup ? 'none' : 'block'}}>
          <CardCover>
            <DashedCard>
              <MessageText>Please select filter for product group to view estimated due date</MessageText>
            </DashedCard>
          </CardCover>
        </BlurCover>
      </EstimatedWrapper>
      <FilterModal
        filters={filters}
        isOpen={isModalOpen}
        handleClose={handleModalToggle}
        handleOkay={() => {
          applyFilter();
        }}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleFilterSelect}
        handleNameChange={handleNameChange}
      />
    </EnquiryWrapper>
  );
};

export default EnquiryResponse;
