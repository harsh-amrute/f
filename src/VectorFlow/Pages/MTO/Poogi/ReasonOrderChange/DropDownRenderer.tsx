import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { notifyError } from '../../../../../helpers/notify';
import { useGetPoogiMajorMinorReason } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';



const CustomCellEditor = (props: any) => {

  const { data, isLoading, /*refetch*/ } = useGetPoogiMajorMinorReason();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [toogelView, setToggleView] = useState<boolean>(true);
  const getOuterObjectByKey = (data: any, searchKey: string) => {
    return data[searchKey];
    // for (const outerKey in data) {
    //   const innerObject = data[outerKey];
    //   if (innerObject[searchKey]) {
    //     return innerObject;
    //   }
    // }
    // return undefined;
  }

  const initialData = useMemo(() => {
    if (data) {
      //console.log('first',props.data.pln.split(' ')[1])
      const result = getOuterObjectByKey(data?.data?.data, props.data.pln.split(' ')[1]);
      //const minorReason=findAllMindValues(result)
      const selectedVal = Object.values(result).map((item: any) => {
        return item.majd
      })

      return selectedVal
    }
    return undefined

  }, [data])

  // const findAllMindValues = (data: any) => {
  //   let mindValues: string[] = [];
  
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       const innerObj = data[key];
  //       for (const innerKey in innerObj) {
  //         if (innerObj.hasOwnProperty(innerKey)) {
  //           const majObject = innerObj[innerKey];
  //           majObject.min.forEach((minItem) => {
  //             mindValues.push(minItem.mind);
  //           });
  //         }
  //       }
  //     }
  //   }
  
  //   return mindValues;
  // };

  // const findAllMindValues = (data: any) => {
  //   let mindValues: string[] = [];
  
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       const innerObj = data[key];
  //       for (const innerKey in innerObj) {
  //         if (innerObj.hasOwnProperty(innerKey)) {
  //           const majObject = innerObj[innerKey];
  //           majObject.min.forEach((minItem) => {
  //             mindValues.push(minItem.mind);
  //           });
  //         }
  //       }
  //     }
  //   }
  
  //   return mindValues;
  // };




  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value != '') {
      console.log('first', event.target.value)
      setSelectedValue(event.target.value);
    }

  };

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      //notifyLoader("Loading Data ...")
    }
    else {
      if (data?.status === 200) {
        toast.dismiss();
        //notifySuccess("Data Fetched Successfully!")
      }
      else {
        toast.dismiss();
        notifyError("Failed to fetch data!")
      }
    }
  }, [isLoading, selectedValue])


  const clearSelection = () => {
    setToggleView(!toogelView)
    setSelectedValue(''); // Set to empty string to clear selection
  };

  const handleView = () => {
    setToggleView(!toogelView)
  }

  const renderSelect = () => {
    if (props.colDef.colId === 'MajorReason') {
      return (
        <select
          style={{ width: '100%', height: '100%', fontSize: '18px', fontFamily: 'Roboto' }}
          value={selectedValue}
          onChange={handleChange}
          defaultValue={''}
        >
          <option value="" disabled>Select Reason</option>
          {initialData && (
            initialData.map((e, i) => {
              return (
                <option key={i} value={e}>{e}</option>
              )
            })

          )}
        </select>
      )
    }
    if (props.colDef.colId === 'MinorReason') {
      console.log('sekmc', selectedValue)
      return (
        <select
          style={{ width: '100%', height: '100%', fontSize: '18px', fontFamily: 'Roboto' }}
          //value={selectedValue}
          disabled={selectedValue ? true : false}
          //onChange={handleChange}
          defaultValue={''}
        >
          <option>Select Reason</option>
          <option>Fristan</option>
        </select>
      )
    }

  }

  return (
    <>
      {toogelView ?
        <div onClick={handleView} key={props.data.ok} style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: '0 5px 0 5px', height: '100%', border: '1px solid #707070', borderRadius: '4px', width: '100%' }}>
          <div>
            <span style={{ fontSize: '18px', fontFamily: 'Roboto' }}>Select Reason</span>
          </div>

          <div >
            <img
              alt="eye icon"
              src="/assets/img/mto/reasonForDelay/EditPen.svg" />
          </div>

        </div>
        :
        <div style={{ height: '100%', display: 'flex', border: '1px solid #707070', borderRadius: '4px', }}>
          <div style={{ width: '90%' }} >
            {renderSelect()}
          </div>
          <div style={{ padding: '10px', alignSelf: 'center' }} onClick={clearSelection}>
            <img
              alt="cancel icon"
              src="/assets/img/mto/reasonForDelay/close.svg" />
          </div>
        </div>
      }
    </>
  )
};

export default CustomCellEditor;
