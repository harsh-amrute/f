
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import VFSelect from '../../../../../../src/components/VectorFLOW/commons/MTO/VFSelect';
import { notifyError } from '../../../../../helpers/notify';
import { useGetPoogiMajorMinorReason } from '../../../../Services/MTO/Poogi/ReasonOrderChange/index';
import { useUserData } from "../../../../../context/index";

const CustomCellEditor = (props: any) => {
  const { data: reasonData, isLoading } = useGetPoogiMajorMinorReason();
  const [selectedValue, setSelectedValue] = useState<string>(props.data.maj);
  const [selectedMinorReason, setSelectedMinorReason] = useState<string>(props.data.min);
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  
  const getOuterObjectByKey = (data: any, searchKey: string) => {
    return data[searchKey];
  }

  const initialData = useMemo(() => {
    console.log(reasonData);
    if (reasonData && Object.entries(reasonData.data.data).length) {
      const result = getOuterObjectByKey(reasonData?.data?.data, props.data.pid);
      const selectedVal = Object.values(result).map((item: any) => {
        return { 'des': item.majd, 'id': item.majid, 'min': item.min }
      })
      return selectedVal;
    }
    return undefined;
  }, [reasonData]);

  const extractMinDetails = (data: any, keyId: string) => {
    const item = data.find((d: any) => d.id == keyId);
    if (item && item.min.length > 0) {
      const { mind, minid } = item.min[0];
      return [{ 'des': mind, 'id': minid }];
    }
    return null;
  };

  const handleChange = (event:any) => {
    try {
      console.log(event)
      console.log("handleChange");
      if (event !== null ) {
        if (event.value != '') {
          const minRsnData = extractMinDetails(initialData, event.value);
          props.data["minordropval"] = minRsnData
          props.data["maj"] = event.value;
          // const rowData = [...props.rowData];
          // rowData[props.rowIndex] = props.data;
          // props.setRowData(rowData);
          setSelectedValue(event.value);
          props.api.refreshCells({force: true});
        }
      } else {
        if (props.isWip) {
          console.log(props);
          // if (currRowIndex === props.rowIndex) {
          
          props.data["min"] = null;
          setSelectedMinorReason('');

          props.data["maj"] = null;
          setSelectedValue('');
          props.api.refreshCells({ force: true });

          // if (props.rowData) {
          //   const rowData = [...props.rowData];
          //   rowData[props.rowIndex] = props.data;
          //   props.setRowData(rowData);
          // }
          // }
        }
      }
      
    } catch (e) {
      console.log(e)
    }
    
  };

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();

    }
    else {
      if (reasonData?.status === 200) {
        toast.dismiss();
      }
      else {
        toast.dismiss();
        notifyError("Failed to fetch data!")
      }
    }
  }, [isLoading])

  // const clearSelection = (currRowIndex: any, currColId: any) => {
  //   if (props.isWip) {
  //     if (currRowIndex === props.rowIndex) {
  //       if (currColId) {
  //         props.data["maj"] = null;
  //         setSelectedValue('');
          
  //         props.api.refreshCells({ force: true });

  //       }
  //       else {
  //         props.data["min"] = null;
  //         setSelectedMinorReason('');
  //       }
  //       // if (props.rowData) {
  //       //   const rowData = [...props.rowData];
  //       //   rowData[props.rowIndex] = props.data;
  //       //   props.setRowData(rowData);
  //       // }
  //     }
  //   }
  //   else {
  //     notifyError('User can modify Major and Minor Reason, but cannot deselect')
  //   }

  // };

  const handleMinorChange = (event: any) => {
    if (event !== null) {
      props.data["min"] = event.value;
      setSelectedMinorReason(event.value);
    } else {
      props.data["min"] = null;
      setSelectedMinorReason('');
    }
  };

  const renderMajorSelect = () => {
    console.log("renderMajorSelect");

    const reasonOptions = (initialData && Object.entries(initialData).length) ?
      initialData?.map((reason: any) => {
        return { label: reason.des, value: reason.id }
      }) : [];
    
    const defaultSelected = reasonOptions !== undefined ? reasonOptions.find((reason: any) => reason.value === props.data.maj) : undefined;

    return (
      <VFSelect
        isClearable
        themeUi={themeUi}
        placeholder={"Select Major Reason"}
        options={reasonOptions}
        value={defaultSelected}
        isSelected={selectedValue}
        onChange={handleChange}
      />
      // <select
      //   style={{ width: '100%', height: '100%', fontSize: '12px', fontFamily: 'Roboto' }}
      //   value={selectedValue}
      //   onChange={handleChange}
      // >
      //   <option value="" disabled>Select Reason</option>
      //   {initialData && (
      //     initialData.map((e, i) => {
      //       return (
      //         <option key={i} value={e.id}>{e.des}</option>
      //       )
      //     })

      //   )}
      // </select>
    )
  }

  const renderMinorSelect = () => {
    console.log("renderMinorSelect");

    const majList: Array<any> = reasonData?.data.data
    const majId = parseInt(props.data.maj)

    function getMinArrayByMajid(majid: number): Array<{ label: string | null; value: number | null }> {

      for (const categoryKey in majList) {
        const category = majList[categoryKey];
        for (const itemKey in category) {
          const item = category[itemKey];
          if (item.majid === majid) {
            return item.min.map(({ mind, minid }: any) => ({
              label: mind,
              value: minid
            }));
          }
        }
      }

      return [];
    }

    const optionsList = (props.data.minordropVal || !majId) ? props.data.minordropVal : getMinArrayByMajid(majId)
    console.log(optionsList);
    const defaultSelected = optionsList !== undefined ?
      optionsList.find((options: any) => options.value === props.data.min) : undefined;
    
    return (
      <VFSelect
        isClearable
        themeUi={themeUi}
        placeholder={"Select Minor Reason"}
        options={optionsList}
        isSelected={selectedMinorReason}
        value={defaultSelected}
        onChange={handleMinorChange}
        isDisabled={props.data.maj == undefined}
      />
      // <select
      //   disabled={props.data.maj == undefined}
      //   style={{ width: '100%', height: '100%', fontSize: '12px', fontFamily: 'Roboto' }}
      //   //value={props.data.min === null ? selectedMinorReason : props.data.min}
      //   value={props.data.maj == undefined ? undefined : selectedMinorReason}
      //   onChange={handleMinorChange}
      // >
      //   <option value="" disabled>Select Reason</option>
      //   {(optionsList) && (
      //     optionsList.map((e: any, i: number) => {
      //       return (
      //         <option key={i} value={e.id}>{e.des}</option>
      //       )
      //     })
      //   )}
      // </select>
    )
  }

  return (
    <>
      <div style={{ height: '100%', width: "95%", display: 'flex', border: '1px solid #707070', borderRadius: '4px'}}>
        <div style={{ width: '100%', height:"100%", paddingLeft:"2px", paddingRight:"2px" }} >
          {props.colDef.colId === 'MajorReason' ? renderMajorSelect() : renderMinorSelect()}

        </div>
        {/* <div style={{ padding: '10px', alignSelf: 'center' }} onClick={() => clearSelection(props.rowIndex, props.colDef.colId === 'MajorReason')}>
          <img
            alt="cancel icon"
            src="/assets/img/mto/reasonForDelay/close.svg" />
        </div> */}
      </div>
    </>
  )
};

export default CustomCellEditor;