import { useState } from "react";
import TabSwitch from "../../../../components/layouts/TabsSwitch";
import ResizableTable from "../../../../components/commons/ResizableTable";
import { prodPlanningMock } from '../../../../mock-data/PROD';
import './style.css';
import Note from "../../../../components/commons/Note";

const tabOptions = ['RM Not Available','RM Available'];

const EnquiryResponse = () => {

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (tab: number)=>{
    setActiveTab(tab);
  }

  const getRMUI = () => {
      return (
        <div className="rm-ui-cont">
          <div className="header-wrapper">
            {activeTab === 0 && <div className="heading">Procurement Buffer</div>} 
            {activeTab === 0 && <div className="vertical-line"/>}
            <div className="heading">Production Buffer</div> 
            <div className="vertical-line"/>
            <div className="heading">Most Loaded CCR</div> 
            <div className="vertical-line"/>
            <div className="heading">Earliest Readiness Date</div>
          </div>
          <div className="value-wrapper">
           {activeTab === 0 &&  <div>7 Days</div> }
            <div>7 Days</div>
            <div>TL 3</div>
            <div className="highlighted-value">Nov - Week 1</div>
          </div>
        </div>
      )
  }

  const message = <p>The Readiness date is valid for order booked today. This can change if there are delays in order booking.
  <br />For large orders please contact planning team.</p>

  return (
    <div className="enquiry-wrapper"> 
      <div className="filter-wrapper">
        <button className="edit-filter-btn">Edit Filter</button>
        <div className="vertical-line" style={{height: '30px'}}/>
        <div className="card-btn">save</div>
        <div className="card-btn">reset</div>
      </div>
      <ResizableTable header={prodPlanningMock?.header} data={prodPlanningMock?.data}/>  
      <TabSwitch 
        heading='Estimated Due Date' 
        tabs={tabOptions} 
        handleTabChange={handleTabChange} 
        tabUI={getRMUI()}
        activeTab={activeTab}
      />
      <Note type='danger' message={message}/>
    </div>
  )
}

export default EnquiryResponse;