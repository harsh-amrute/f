import React, { useState, useEffect } from 'react';
import './resizableTable.css'; // Import your CSS file for styling

const ROW_HEIGHT = 40; // Adjust as per your row height

interface IResizeTableProps {
    header: {key: string, value: string}[];
    data: any;
}

const ResizableTable = (props: IResizeTableProps) => {

  const { header, data } = props;
  const [tableHeight, setTableHeight] = useState(300); // Initial table height
  const [numRows, setNumRows] = useState(5); // Initial number of visible rows

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    let initialY = e.clientY;

    const handleMouseMove = (moveEvent: any) => {
      const delta = moveEvent.clientY - initialY;
      setTableHeight((prevHeight) => prevHeight + delta);
      initialY = moveEvent.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const updateNumRows = () => {
      const containerElement = document.querySelector('.table-container');
      if (containerElement) {
        const containerHeight = containerElement.clientHeight;
        const newNumRows = Math.floor(containerHeight / ROW_HEIGHT);
        setNumRows(newNumRows);
      }
    };
  
    updateNumRows();
    window.addEventListener('resize', updateNumRows);
    return () => window.removeEventListener('resize', updateNumRows);
  }, []);

  return (
    <div className='table-resizebar-wrapper'>
        <div className="table-container">
        <div className="table-wrapper" style={{ height: tableHeight + 40 }}>
            <table id="resizable-table">
            <thead>
                <tr>
                {header?.map((colHead: {key: string, value: string})=><th>{colHead?.value}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr key={-1}>
                    <td>
                        <input
                            className='filter-input'
                            placeholder=''
                            aria-label="Search components"
                            id='x'
                            type="text"
                        />
                    </td>
                    <td>
                        <input
                            className='filter-input'
                            placeholder=''
                            aria-label="Search components"
                            id='x'
                            type="text"
                        />
                    </td>
                    <td></td>
                    <td>
                        <input
                            className='filter-input'
                            placeholder=''
                            aria-label="Search components"
                            id='x'
                            type="text"
                        />
                    </td>
                    <td>
                        <input
                            className='filter-input'
                            placeholder=''
                            aria-label="Search components"
                            id='x'
                            type="text"
                        />
                    </td>
                </tr>
                {data?.map((rowData: any, index: number) => (
                <tr key={index}>
                    {header?.map((head: any, headIdx: number)=>{
                        if(head?.key !== 'fol'){
                            return (
                                <td key={headIdx}>{rowData[head.key] || '--'}</td>
                            )
                        }
                        return (
                            <td>
                                <div className='cell-with-bar'>
                                    <div className='bar-container'>
                                        <div
                                            className='cell-bar' 
                                            style={{ width: `${rowData[head?.key] * 20}%`}}
                                        />
                                    </div>
                                    <div className='cell-bar-value'>{rowData[head.key] || '--'}</div>
                                </div>
                            </td>
                        )
                    })}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        <div className="resize-bar" onMouseDown={handleMouseDown}></div>
    </div>

  );
};

export default ResizableTable;
