import './styles.css'
import { useState } from 'react';

const DueDateCellRenderer = (params: any) => {

    const [currDate, setCurrDate] = useState(params.data.dd);

    return (
        <>
            <input type="date"
                data-testid="datepicker"
                style={{
                    top: '141px',
                    left: '651px',
                    width: '80%',
                    height: '100%',
                    textAlign: 'left',
                    font: '24px',
                    letterSpacing: '0px',
                    color: '#000',
                    opacity: 1,
                    fontSize: '18px',
                    padding: '4px',
                    fontFamily: 'Roboto',
                    border: '0px solid white'

                }}

                onChange={(e) => { params.data.dd = e.target.value; params.data.addChangeDate(e.currentTarget.value, params.data.oid), setCurrDate(e.target.value) }}
                value={currDate}

            />
        </>

    )
}

export default DueDateCellRenderer