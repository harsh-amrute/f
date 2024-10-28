import './styles.css'
import { useState, useEffect } from 'react';
import moment from 'moment';

const DueDateCellRenderer = (params: any) => {

    const [currDate, setCurrDate] = useState(params.node.data.dd ? params.data.dd : params.data.dd);
    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedRow, setSelectedRow] = useState(params.api.getSelectedRows())

    const checkIfSelected = () => {
        setSelectedRow(params.api.getSelectedRows())
        let isThere = false;
        for (let index = 0; index < selectedRow.length; index++) {
            const element = selectedRow[index];
            if (element.oid === params.data.oid) {
                isThere = true;
            }

        }

        if (isThere) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }

        return;
    }

    useEffect(() => {
        checkIfSelected()
    }, [selectedRow])

    const format2 = "YYYY-MM-DD"
    const d = new Date();
    //.setDate(d.getDate() - 1)
    const [datetime] = useState(moment(d).format(format2));


    return (
        <>

            <input type="date"
                className='date-pick'
                id='dateField'
                data-testid="datepicker"
                style={{
                    top: '141px',
                    left: '651px',
                    width: '80%',
                    height: '100%',
                    textAlign: 'left',
                    background: '#fff',
                    font: '24px',
                    zoom: 0.7,
                    letterSpacing: '0px',
                    color: '#000',
                    opacity: 1,
                    fontSize: '15px',
                    padding: '4px',
                    fontFamily: 'Roboto',
                    border: '0px solid white',
                    pointerEvents: isDisabled ? 'none' : 'unset',
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                }}
                min={datetime}

                disabled={false}

                onChange={(e) => { params.data.dd = e.target.value; params.data.addChangeDate(e.currentTarget.value, params.data.oid), setCurrDate(e.target.value) }}
                value={currDate}

            />
        </>



    )
}

export default DueDateCellRenderer