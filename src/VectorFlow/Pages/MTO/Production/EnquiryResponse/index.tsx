import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import Note from "./Note";
import ResizableTable from "./ResizableTable";
import MTOActionToolBar from "../../../../../../src/components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { prodPlanningMock } from "./PROD";
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
  TabSwitchContainer,
  TabSwitchHeading,
  TabsWrapper,
  ValueWrapper,
  VerticalLine,
} from "./styles";
// import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
// import { FilterAccordianWrapper, FilterContainer, FilterHeading, HorizontalLine, PlantInput, SearchBar } from "./FilterModal/styles";
// import FilterAccordian from "./FilterAccordian";
import { useGetEnquiryResData } from "../../../../Services/MTO/Production/EnquiryResponse";
import { useUserData } from "../../../../../context/index";
import { notifyLoader } from "../../../../../helpers/notify";
import { toast } from "react-toastify"
import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule";

const tabOptions = [{ label: "RM Not Available", value: "RM Not Available" }, { label: "RM Available", value: "RM Available" }];

interface BufferData {
  ItemType1: { proc_size: number; prod_size: number };
  ItemType2: { proc_size: number; prod_size: number };
  ItemType3: { proc_size: number; prod_size: number };
  ItemType4: { proc_size: number; prod_size: number };
  // Add more types as needed
}

const EnquiryResponse = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeCapsule, setActiveCapsule] = useState<{ label: string, value: string }>(tabOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>([]);
  const [hasProductGroup, setHasProductGroup] = useState<any>(false);
  const { data } = useGetEnquiryResData() || {};
  const [selectedOptions, setSelectedOptions] = useState<any>({
    plantName: "",
    productGroup: [],
    department: {},
    ccrGroup: {},
    ccrName: {},
  });
  const { user } = useUserData();
  // const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
  const themeUi = user.user.theme_ui;

  const handleTabChange = (tab: any) => {
    console.log(tab, 'TAB');
    if (tab?.label === 'RM Not Available') {
      setActiveTab(0);
    } else {
      setActiveTab(1);
    }
    setActiveCapsule(tab);
  };

  const getMostloadedCCR = () => {
    let mostLoadedCR = filterData?.length > 0 ? filterData[0] : {};
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
    const productGroup: keyof BufferData = selectedOptions?.productGroup && selectedOptions?.productGroup[0];

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
      return (
        (bufferData?.it && bufferData?.it[productGroup]?.proc_size) || "--"
      );
    }
    return (bufferData?.it && bufferData?.it[productGroup]?.prod_size) || "--";
  };

  function getWeekOfMonth(dateString: string): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Parse the input date string
    const [dayStr, monthStr, yearStr] = dateString.split(' ');
    const day = parseInt(dayStr, 10);
    const monthIndex = months.findIndex(
      (m) => m.toLowerCase() === monthStr.toLowerCase()
    );
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
    let bufferData = filterData?.length > 0 ? filterData[0] : {};
    const productGroup: keyof BufferData = selectedOptions?.productGroup && selectedOptions?.productGroup[0];

    if (!productGroup) {
      return "--";
    }

    for (let i = 0; i < filterData?.length; i++) {
      const current = filterData[i];

      if (current?.it[productGroup]) {
        bufferData = current;
      }
    }

    const prodBuffer = (bufferData?.it && productGroup) && bufferData?.it[productGroup]?.prod_size;
    const procBuffer = (bufferData?.it && productGroup) && bufferData?.it[productGroup]?.proc_size;
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

  const handleNameChange = ({ name, value }: { name: string, value: string }) => {
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
      setSelectedOptions((prev: any) => ({ ...prev, department: { ...dept } }));
    }

    if (category === "CCR Group") {
      const ccrGrp = selectedOptions?.ccrGroup;
      if (checked && !ccrGrp[name]) {
        ccrGrp[name] = checked;
      } else {
        delete ccrGrp[name];
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrGroup: { ...ccrGrp } }));
    }

    if (category === "CCR") {
      const ccrNm = selectedOptions?.ccrName;
      if (checked && !ccrNm[name]) {
        ccrNm[name] = checked;
      } else {
        delete ccrNm[name];
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrName: { ...ccrNm } }));
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filterByPlName = (name: string) => {
    if (name === '') {
      return tableData;
    }
    const data = [];
    for (let i = 0; i < tableData?.length; i++) {
      const current = tableData[i];
      if (current?.plnm?.includes(name)) {
        data?.push(current);
      }
    }
    return data;
  };

  const filterByProdGrpName = (data: any, productGrp: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (Object.keys(current?.it).includes(productGrp[0])) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };

  const filterByDeptName = (data: any, department: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (department[current?.dpnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };
  const filterByccrGroupName = (data: any, ccrGrpName: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (ccrGrpName[current?.gnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };
  const filterByccrName = (data: any, ccrName: any) => {
    const updatedData = [];
    for (let i = 0; i < data?.length; i++) {
      const current = data[i];
      if (ccrName[current?.cnm]) {
        updatedData?.push(current);
      }
    }
    return updatedData;
  };

  const updatedSelectedFilters = (options: any) => {
    const filters: { label: string; values: string[] }[] = [];

    if (options?.plantName) {
      filters.push({
        label: "Plant",
        values: [`${options?.plantName}`],
      });
    }
    if (options?.productGroup?.length > 0) {
      filters.push({
        label: "Product Group",
        values: [...options.productGroup],
      });
    }
    if (Object.keys(options?.department)?.length > 0) {
      filters.push({
        label: "Department",
        values: [...Object.keys(options?.department)],
      });
    }
    if (Object.keys(options?.ccrGroup)?.length > 0) {
      filters.push({
        label: "CCR Group",
        values: [...Object.keys(options?.ccrGroup)],
      });
    }
    if (Object.keys(options?.ccrName)?.length > 0) {
      filters.push({
        label: "CCR Name",
        values: [...Object.keys(options?.ccrName)],
      });
    }

    setSelectedFilters(filters);
  }

  const applyFilter = (options: any) => {

    let data = [];
    data = filterByPlName(options?.plantName);
    data =
      options?.productGroup?.length > 0
        ? filterByProdGrpName(data, options?.productGroup)
        : data;
    data =
      Object.keys(options?.department)?.length > 0
        ? filterByDeptName(data, options?.department)
        : data;
    data =
      Object.keys(options?.ccrGroup)?.length > 0
        ? filterByccrGroupName(data, options?.ccrGroup)
        : data;
    data =
      Object.keys(options?.ccrName)?.length > 0
        ? filterByccrName(data, options?.ccrName)
        : data;

    updatedSelectedFilters(options);
    setHasProductGroup(options?.productGroup?.length > 0);
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
  const plantOptions: any = []

  for (let i = 0; i < tableData?.length; i++) {
    const ccrObj = tableData[i];
    if (ccrObj?.plnm) {
      plantOptions.push({ value: ccrObj.plnm, label: ccrObj.plnm, name: ccrObj.plnm });
    }
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
      key: "plnm",
      heading: "Plant",
      options: plantOptions
    },
    {
      key: 'prdGrp',
      heading: "Product Group",
      options: productGroupOptions,
    },
    {
      key: 'dept',
      heading: "Department",
      options: departmentOptions,
    },
    {
      key: 'ccrGrp',
      heading: "CCR Group",
      options: ccrGroupOptions,
    },
    {
      key: 'ccrNm',
      heading: "CCR",
      options: ccrNameOptions,
    },
  ];

  const removeFilters = (category: string, name: string) => {

    const updtedCCRName = selectedOptions?.ccrName;
    const updtedDept = selectedOptions?.department;
    const updtedCCRGrp = selectedOptions?.ccrGroup;
    let updatedPlantName = selectedOptions?.plantName;
    let updatedProductGrp = selectedOptions?.productGroup;

    if (category === "Plant") {
      updatedPlantName = '';
      setSelectedOptions((prev: any) => ({
        ...prev,
        plantName: '',
      }));
    }
    if (category === "Product Group") {
      updatedProductGrp = [];
      setSelectedOptions((prev: any) => ({
        ...prev,
        productGroup: updatedProductGrp,
      }));
    }
    if (category === "Department") {
      delete updtedDept[name];
      setSelectedOptions((prev: any) => ({
        ...prev,
        department: updtedDept,
      }));
    }
    if (category === "CCR Group") {
      delete updtedCCRGrp[name];
      setSelectedOptions((prev: any) => ({
        ...prev,
        ccrGroup: updtedCCRGrp
      }));
    }
    if (category === "CCR Name") {
      delete updtedCCRName[name];
      setSelectedOptions((prev: any) => ({
        ...prev,
        ccrName: updtedCCRName,
      }));
    }
    updatedSelectedFilters({
      plantName: updatedPlantName,
      productGroup: updatedProductGrp,
      department: updtedDept,
      ccrGroup: updtedCCRGrp,
      ccrName: updtedCCRName
    });
    applyFilter({
      plantName: updatedPlantName,
      productGroup: updatedProductGrp,
      department: updtedDept,
      ccrGroup: updtedCCRGrp,
      ccrName: updtedCCRName
    });
  };

  useEffect(() => {
    notifyLoader("Loading Grid Data")
    if (data?.data?.data?.results) {
      setTableData(data?.data?.data?.results);
    }
    toast.dismiss()
  }, [data]);

  useEffect(() => {
    setFilterData(data?.data?.data?.results);
  }, [tableData]);

  return (
    <EnquiryWrapper>
      <FilterWrapper>
        <MTOActionToolBar
          comp={"EnquiryResponse"}
          isAddFilterButton
          isAsOnDate
          onAddFilter={handleModalToggle}
          selectedFilters={selectedFilters}
          removeFilters={removeFilters}
          themeUi={themeUi}
        />
      </FilterWrapper>
      <div style={{ paddingLeft: '25px' }}>

        <ResizableTable header={prodPlanningMock?.header} data={filterData} />
        <EstimatedWrapper>
          <div
            style={{ WebkitFilter: `blur(${hasProductGroup ? "0px" : "3px"})`, padding: "1rem" }}
          >
            <TabSwitchContainer>
              <TabSwitchHeading>Estimated Due Date</TabSwitchHeading>
              <TabsWrapper>
                <VFCapsule activeBtn={activeCapsule} capsules={tabOptions} handleClick={handleTabChange} />
              </TabsWrapper>
            </TabSwitchContainer>
            {getRMUI()}
            <Note type="danger" message={message} />
          </div>
          <BlurCover style={{ display: hasProductGroup ? "none" : "block" }}>
            <CardCover>
              <DashedCard>
                <MessageText>
                  Please select filter for product group to view estimated due
                  date
                </MessageText>
              </DashedCard>
            </CardCover>
          </BlurCover>
        </EstimatedWrapper>
        <FilterModal
          filters={filters}
          isOpen={isModalOpen}
          handleClose={handleModalToggle}
          handleOkay={() => applyFilter(selectedOptions)}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleFilterSelect}
          handleNameChange={handleNameChange}
          themeUi={themeUi}
        />
      </div>
    </EnquiryWrapper>
  );
};

export default EnquiryResponse;
