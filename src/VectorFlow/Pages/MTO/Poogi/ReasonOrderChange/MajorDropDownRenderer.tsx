import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { notifyError } from '../../../../../helpers/notify';
import { useGetPoogiMajorMinorReason } from '../../../../Services/MTO/Poogi/ReasonOrderChange/index';


type MyObject = {
  ok: string;
  minid: number;
  majid: number;
};

const CustomCellEditor = (props: any) => {


  const { data, isLoading } = useGetPoogiMajorMinorReason();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedMinorReason, setSelectedMinorReason] = useState<string>();
  const [minorReasons, setMinorReasons] = useState<any>();
  const [toogelView, setToggleView] = useState<boolean>(true);
  //const [items, setItems] = useState<MyObject[]>([]);

  const getOuterObjectByKey = (data: any, searchKey: string) => {
    return data[searchKey];
  }

  const extractMind = (data: any, key: string): string[] => {
    const mindValues: any = [];
    if (data[key]) {
      Object.values(data[key]).forEach((majItem: any) => {
        majItem.min.forEach((minItem: any) => {
          mindValues.push({
            'des': minItem.mind,
            'id': minItem.minid
          });
        });
      });
    }

    return mindValues;
  };


  const initialData = useMemo(() => {
    if (data) {
      const result = getOuterObjectByKey(data?.data?.data, props.data.pln.split(' ')[1]);
      const selectedVal = Object.values(result).map((item: any) => {
        return { 'des': item.majd, 'id': item.majid }
      })

      return selectedVal
    }
    return undefined

  }, [data])


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value != '') {
      setToggleView(!toogelView)
      props.data["MajRsn"] = event.target.value;
      //renderMinorSelect();
      setSelectedValue(event.target.value);
      // setMinorReasons('');
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
        //props.data.reason = data?.data?.data
        const result = extractMind(data?.data?.data, props.data.pln.split(' ')[1]);
        setMinorReasons(result);
        //notifySuccess("Data Fetched Successfully!")
      }
      else {
        toast.dismiss();
        notifyError("Failed to fetch data!")
      }
    }
  }, [isLoading, props.data.MajorReason])


  const addObject = (newObject: MyObject) => {

    props.handleData(newObject)
  };

  const clearSelection = () => {
    //props.data["MajorReason"] = undefined;
    setToggleView(!toogelView)
    setSelectedValue(''); // Set to empty string to clear selection
    setSelectedMinorReason('');
  };


  const handleMinorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToggleView(!toogelView)
    props.data["MinRsn"] = event.target.value;
    setSelectedMinorReason(event.target.value);
    addObject({
      'ok': props.data.ok,
      minid: Number(event.target.value),
      majid: Number(props.data.MajRsn)
    })
  };

  const renderMajorSelect = () => {

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
              <option key={i} value={e.id}>{e.des}</option>
            )
          })

        )}
      </select>
    )
  }

  const renderMinorSelect = () => {

    return (
      <select
        style={{ width: '100%', height: '100%', fontSize: '18px', fontFamily: 'Roboto' }}
        value={selectedMinorReason}
        onChange={handleMinorChange}
        // Enabled only if a major reason is selected
        defaultValue={''}
      >
        <option value="" disabled>Select Reason</option>
        {minorReasons && (
          minorReasons.map((e: any, i: number) => {
            return (
              <option key={i} value={e.id}>{e.des}</option>
            )
          })
        )}
      </select>
    )
  }


  return (
    <>

      <div style={{ height: '100%', display: 'flex', border: '1px solid #707070', borderRadius: '4px', }}>
        <div style={{ width: '90%' }} >
          {props.colDef.colId === 'MajorReason' ?renderMajorSelect(): renderMinorSelect()}
          
        </div>
        {toogelView ?
          <div style={{ padding: '10px', alignSelf: 'center' }}>
            <img
              alt="eye icon"
              src="/assets/img/mto/reasonForDelay/EditPen.svg" />
          </div>
          :
          <div style={{ padding: '10px', alignSelf: 'center' }} onClick={clearSelection}>
            <img
              alt="cancel icon"
              src="/assets/img/mto/reasonForDelay/close.svg" />
          </div>
        }
      </div>

    </>
  )
};

export default CustomCellEditor;
