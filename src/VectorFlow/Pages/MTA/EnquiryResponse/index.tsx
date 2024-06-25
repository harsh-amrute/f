import { useState } from "react";
import TabSwitch from "../../../../components/layouts/TabsSwitch";
import ResizableTable from "../../../../components/commons/ResizableTable";
import { prodPlanningMock, APIMock } from '../../../../mock-data/PROD';
import './style.css';
import Note from "../../../../components/commons/Note";
import FilterModal from "../../../../components/commons/FilterModal";
import { getRandomValues } from "crypto";

const tabOptions = ['RM Not Available','RM Available'];

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
  const [tableData, setTableData] = useState<any>(APIMock?.ccrData);
  const [filterData, setFilterData] = useState<any>(APIMock?.ccrData);
  const [selectedOptions, setSelectedOptions] = useState<any>({
    plantName : '',
    productGroup: [],
    department: [],
    ccrGroup: [],
    ccrName: [],
  });

  const handleTabChange = (tab: number)=>{
    setActiveTab(tab);
  }

  const getMostloadedCCR = () => {
    let mostLoadedCR = filterData[0];
    for(let i = 0; i < filterData?.length; i++){
      const current = filterData[i];
      if(current?.fol > mostLoadedCR?.fol){
        mostLoadedCR = current;
      }
    }
    return mostLoadedCR?.cnm;
  }
  
  const getRMValues = (bufferType: string) => {
    const bufferData = APIMock?.bufferData;
    
    const productGroup: keyof BufferData = selectedOptions?.productGroup[0];
    if(!productGroup){
      return '--'
    }
    console.log(bufferData[productGroup]);
    if(bufferType === 'procurement'){
      return bufferData[productGroup]?.proc_size;
    }
    return bufferData[productGroup]?.prod_size;
  }

  const getRMUI = () => {
      return (
        <div className="rm-ui-cont">
          <div className="header-wrapper">
            {activeTab === 0 && <div className="rm-heading">Procurement Buffer</div>} 
            {activeTab === 0 && <div className="vertical-line"/>}
            <div className="rm-heading">Production Buffer</div> 
            <div className="vertical-line"/>
            <div className="rm-heading">Most Loaded CCR</div> 
            <div className="vertical-line"/>
            <div className="rm-heading">Earliest Readiness Date</div>
          </div>
          <div className="value-wrapper">
           {activeTab === 0 &&  <div>{getRMValues('procurement')}</div> }
            <div>{getRMValues('production')}</div>
            <div>{getMostloadedCCR()}</div>
            <div className="highlighted-value">Nov - Week 1</div>
          </div>
        </div>
      )
  }

  const handleNameChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedOptions((prev: any) => ({ ...prev, [name]: value}));
  }

  const handleFilterSelect = (event: any, category: string, index: number) => {
    const { name, checked } = event.target;

    if(category === 'Product Group'){
      const prodGrp = selectedOptions?.productGroup;
      if(checked){
        prodGrp[0] = name;
      }else{
        prodGrp?.splice(index, 1);
      }
      setSelectedOptions((prev: any) => ({ ...prev, productGroup: [...prodGrp] }));
    }

    if(category === 'Department'){
      const dept = selectedOptions?.department;
      if(checked){
        dept.push(name);
      }else{
        dept?.splice(index, 1);
      }
      setSelectedOptions((prev: any) => ({ ...prev, department: [...dept] }));
    }

    if(category === 'CCR Group'){
      const ccrGrp = selectedOptions?.ccrGroup;
      if(checked){
        ccrGrp.push(name);
      }else{
        ccrGrp?.splice(index, 1);
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrGroup: [...ccrGrp] }));
    }

    if(category === 'CCR'){
      const ccrNm = selectedOptions?.ccrName;
      if(checked){
        ccrNm.push(name);
      }else{
        ccrNm?.splice(index, 1);
      }
      setSelectedOptions((prev: any) => ({ ...prev, ccrName: [...ccrNm] }));
    }
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  const applyFilter = () => {
    const data = [];
    for(let i = 0; i < tableData?.length; i++){

      const current = tableData[i];
      
      let flag = false;
      if(current?.plnm?.includes(selectedOptions?.plantName)){
        flag = true;
      }

      if(selectedOptions?.department?.includes(current?.dpnm)){
        flag = true;
      }

      if(selectedOptions?.ccrGroup?.includes(current?.gnm)){
        flag = true;
      }

      if(selectedOptions?.ccrName?.includes(current?.cnm)){
        flag = true;
      }

      if(flag){
        data?.push(current);
      }
    
    }

    setFilterData(data);
    handleModalToggle()
  }

  const message = <p>The Readiness date is valid for order booked today. This can change if there are delays in order booking.
  <br />For large orders please contact planning team.</p>

  const productGroupOptions: any = [];
  const departmentOptions: any = [];
  const ccrGroupOptions: any = [];
  const ccrNameOptions: any = [];

  for(let i = 0; i < APIMock?.ccrData?.length; i++){
    const ccrObj = APIMock?.ccrData[i];
    if(ccrObj?.it){
      const types = ccrObj?.it;
      for(let j = 0; j < types.length; j++){
        if(!productGroupOptions?.includes(types[j])){
          productGroupOptions.push(types[j]);
        }
      }
    }

    if(ccrObj?.dpnm){
      if(!departmentOptions?.includes(ccrObj?.dpnm)){
        departmentOptions.push(ccrObj?.dpnm);
      }
    }

    if(ccrObj?.gnm){
      if(!ccrGroupOptions?.includes(ccrObj?.gnm)){
        ccrGroupOptions.push(ccrObj?.gnm);
      }
    }

    if(ccrObj?.cnm){
      if(!ccrNameOptions?.includes(ccrObj?.cnm)){
        ccrNameOptions.push(ccrObj?.cnm);
      }
    }
  }

  const filters = [
    {
      heading:'Product Group', 
      options: productGroupOptions,
    }, 
    {
      heading:'Department', 
      options: departmentOptions,
    }, 
    {
      heading:'CCR Group', 
      options: ccrGroupOptions,
    }, 
    {
      heading:'CCR', 
      options: ccrNameOptions,
    }, 
  ];

  return (
    <div className="enquiry-wrapper"> 
      <div className="filter-wrapper">
        <button className="edit-filter-btn" onClick={handleModalToggle}>Edit Filter</button>
        <div className="vertical-line" style={{height: '30px'}}/>
        <div className="card-btn">save</div>
        <div className="card-btn">reset</div>
      </div>
      <ResizableTable header={prodPlanningMock?.header} data={filterData}/>  
      <TabSwitch 
        heading='Estimated Due Date' 
        tabs={tabOptions} 
        handleTabChange={handleTabChange} 
        tabUI={getRMUI()}
        activeTab={activeTab}
      />
      <Note type='danger' message={message}/>
      <FilterModal
        filters={filters}
        isOpen={isModalOpen} 
        handleClose={handleModalToggle} 
        handleOkay={()=>{applyFilter()}} 
        selectedOptions={selectedOptions}
        handleOptionSelect={handleFilterSelect}
        handleNameChange={handleNameChange}
      />
    </div>
  )
}

export default EnquiryResponse;