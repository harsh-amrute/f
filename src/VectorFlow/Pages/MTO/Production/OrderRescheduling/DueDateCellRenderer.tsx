import './styles.css'
import { useState, useEffect } from 'react';
import moment from 'moment';

const DueDateCellRenderer = (params: any) => {

    const [currDate, setCurrDate] = useState(params.data.dd);
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const [datetime] = useState(moment(d).format(format2));

    return (
        <div style={{width: '100%', height: '100%', padding: '1%', position: 'relative'}}>
            <input type="date"
                className='date-pick'
                id='dateField'
                data-testid="datepicker"
                style={{
                    // top: '141px',
                    left: '651px',
                    // width: '80%',
                    // height: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    font: '24px',
                    zoom: 0.75,
                    letterSpacing: '0px',
                    color: 'transparent',
                    opacity: 1,
                    fontSize: '15px',
                    padding: '2%',
                    fontFamily: 'Roboto',
                    border: '0px solid white',
                    pointerEvents: (!params.node.selected) ? 'none' : 'unset',
                    cursor: (!params.node.selected) ? 'not-allowed' : 'pointer'
                }}
                min={datetime}

                disabled={!params.node.selected}
                onChange={(e) => { params.data.dd = e.target.value,params.data.addChangeDate(e.currentTarget.value, params.data.odk), setCurrDate(e.target.value) }}
                value={(!params.node.selected)?params.data.oldDate:currDate}

            />
            <p style={{position: 'absolute', zIndex: '2', top: '9%', left: '25%', padding: '0.8% 6%', background: 'transparent'}}>
                {(!params.node.selected)?params.data.oldDate:currDate}
            </p>
        </div>



    )
}

export default DueDateCellRenderer