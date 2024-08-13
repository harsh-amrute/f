import _ from 'lodash';
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
  const [selectedValue, setSelectedValue] = useState<string>();
  const [selectedMinorReason, setSelectedMinorReason] = useState<string>('');
  const [minorReasons, setMinorReasons] = useState<any>();

  useEffect(() => {
    setSelectedValue(props.selectedValue);
  }, [props.rowData])

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
      props.data["maj"] = event.target.value;
      const rowData = [...props.rowData];
      rowData[props.rowIndex] = props.data;
      props.setRowData(rowData);

    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();

    }
    else {
      if (data?.status === 200) {
        toast.dismiss();
        const result = extractMind(data?.data?.data, props.data.pln.split(' ')[1]);
        setMinorReasons(result);
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

  const clearSelection = (currRowIndex: any, currColId: any) => {

    if (currRowIndex === props.rowIndex) {
      if (currColId) {
        props.data["maj"] = null;

      }
      else {
        props.data["min"] = null;
        setSelectedMinorReason('');
      }
      if(props.rowData){
        const rowData = [...props.rowData];
        rowData[props.rowIndex] = props.data;
        props.setRowData(rowData);
      }
    }

  };


  const handleMinorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.data["min"] = event.target.value;
    setSelectedMinorReason(event.target.value);
    addObject({
      'ok': props.data.ok,
      minid: Number(event.target.value),
      majid: Number(props.data.maj)
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
    //console.log('props.data', props.data)
    return (
      <select
        disabled={props.data.maj == undefined}
        style={{ width: '100%', height: '100%', fontSize: '18px', fontFamily: 'Roboto' }}
        value={props.data.min === null ? selectedMinorReason : props.data.min}
        onChange={handleMinorChange}
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
          {props.colDef.colId === 'MajorReason' ? renderMajorSelect() : renderMinorSelect()}

        </div>
        <div style={{ padding: '10px', alignSelf: 'center' }} onClick={() => clearSelection(props.rowIndex, props.colDef.colId === 'MajorReason')}>
          <img
            alt="cancel icon"
            src="/assets/img/mto/reasonForDelay/close.svg" />
        </div>
      </div>
    </>
  )
};

export default CustomCellEditor;
