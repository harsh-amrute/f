import './styles.css'
import { useState, useEffect } from 'react';

const DueDateCellRenderer = (params: any) => {

    const [currDate, setCurrDate] = useState(params.node.data.dd ? params.data.dd : params.data.dd);
    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedRow, setSelectedRow] = useState(params.api.getSelectedRows())


    const checkIfSelected = () => {
        setSelectedRow(params.api.getSelectedRows())
        console.log("selected Row hai ye", params.api.getSelectedRows())
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

    return (
        <>

            <input type="date"

                className='date-pick'
                data-testid="datepicker"
                style={{
                    top: '141px',
                    left: '651px',
                    width: '80%',
                    height: '100%',
                    textAlign: 'left',
                    background: '#fff',
                    font: '24px',
                    letterSpacing: '0px',
                    color: '#000',
                    opacity: 1,
                    fontSize: '18px',
                    padding: '4px',
                    fontFamily: 'Roboto',
                    border: '0px solid white',
                    pointerEvents: isDisabled ? 'none' : 'unset',
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                }}


                disabled={false}

                onChange={(e) => { params.data.dd = e.target.value; params.data.addChangeDate(e.currentTarget.value, params.data.oid), setCurrDate(e.target.value) }}
                value={currDate}

            />
        </>



    )
}

export default DueDateCellRenderer