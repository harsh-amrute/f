import { render, fireEvent, screen} from '@testing-library/react';
import VFTab from './index';
import { type Master, type Tab} from "../../../../VectorFlow/types/MDM";
import _ from 'lodash';

const allMasters:Master[] = [
  { 
    id: 1,
    name: 'SKU', 
    fields:[
        {
          displayName:'SKU Code',
          key:"sku_code",
          visible:true
        },
        {
          displayName:'SKU Name',
          key:"sku_name",
          visible:true
        },
        {
          displayName: "Item Category Code",
          key: "item_category_code",
          visible: false
        },
    ] 
  },
  { 
    id: 2,
    name: 'Location', 
    fields:[
        {
          displayName:'Location Code',
          key:"location_code",
          visible:true
        },
        {
          displayName:'Location Name',
          key:"location_name",
          visible:true
        },
        {
          displayName: "c1",
          key: "LocAttr1",
          visible: false
        },
    ] 
  },
  { 
    id: 3,
    name: 'SKU Location', 
    fields:[
        {
          displayName:'SKU Code',
          key:"sku_code",
          visible:true
        },
        {
          displayName:'SKU Name',
          key:"sku_name",
          visible:true
        },
        {
          displayName: "Segment",
          key: "SKULocAttr1",
          visible: false
        },
    ] 
  },
  
];

const tabs:Tab[] = [
  { 
    id: 1,
    name: 'SKU', 
    fields:[
        {
          displayName:'SKU Code',
          key:"sku_code",
          visible:true
        },
        {
          displayName:'SKU Name',
          key:"sku_name",
          visible:true
        },
        {
          displayName: "Item Category Code",
          key: "item_category_code",
          visible: false
        },
    ],
    status:'' 
  },
  { 
    id: 2,
    name: 'Location', 
    fields:[
        {
          displayName:'Location Code',
          key:"location_code",
          visible:true
        },
        {
          displayName:'Location Name',
          key:"location_name",
          visible:true
        },
        {
          displayName: "c1",
          key: "LocAttr1",
          visible: false
        },
    ],
    status:'' 
  },
  { 
    id: 3,
    name: 'SKU Location', 
    fields:[
        {
          displayName:'SKU Code',
          key:"sku_code",
          visible:true
        },
        {
          displayName:'SKU Name',
          key:"sku_name",
          visible:true
        },
        {
          displayName: "Segment",
          key: "SKULocAttr1",
          visible: false
        },
    ],
    status:'' 
  }
];

const activeMaster:Master = allMasters[0];
const setActiveMaster = jest.fn();
const setTabs = jest.fn();
const themeUi = 'NOIRFUSION';
const handleTabClose = jest.fn();
const newTabHandler = jest.fn();


describe('View Modify Component', () => {

  it('renders the VF Tab component', () => {


    render(<VFTab
              allMasters={allMasters}
              activeMaster={activeMaster}
              setActiveMaster={setActiveMaster}
              tabs={tabs}
              setTabs={setTabs}
              themeUi={themeUi}
              onClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={newTabHandler}
    
            />
          )
  
  });

  it('changes tab when clicking', () => {

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabTitle={"Add Master"}
      newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
      newTabHandler={newTabHandler}

    />
  )

    const tabsList = screen.getAllByTestId('tab-button');
    const tabNo = _.random(1,tabsList.length-1);  
    fireEvent.click(tabsList[tabNo]);

    expect(setActiveMaster).toBeCalledWith(allMasters[tabNo]);


  });

  it('closes tab when clicking close icon', () => {

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabTitle={"Add Master"}
      newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
      newTabHandler={newTabHandler}

    />)

    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn)
    expect(handleTabClose).toHaveBeenCalled();

  });

  it('calls New Tab Handler on clickng add new tab', () => {

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabTitle={"Add Master"}
      newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
      newTabHandler={newTabHandler}

    />)

    const addNewTab = screen.getByTestId('new-tab');
    fireEvent.click(addNewTab);
    expect(newTabHandler).toHaveBeenCalled();

  });

  it('Renders component correctly when new tab details are not provided (i.e. optional props)', () => {

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabHandler={undefined}
    />)

  });

  it('calls Completed tab when status is completed', () => {

    tabs[0].status = 'completed';

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabTitle={"Add Master"}
      newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
      newTabHandler={newTabHandler}

    />)

  });

  it('Prevents changing to Already Completed Tab', () => {

    tabs[0].status = 'completed';

    render(<VFTab
      allMasters={allMasters}
      activeMaster={activeMaster}
      setActiveMaster={setActiveMaster}
      tabs={tabs}
      setTabs={setTabs}
      themeUi={themeUi}
      onClose={handleTabClose}
      newTabTitle={"Add Master"}
      newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
      newTabHandler={newTabHandler}

    />)

    const tabCloseBtn = screen.getAllByTestId('tab-close')[0];
    fireEvent.click(tabCloseBtn);

  });

  
});
