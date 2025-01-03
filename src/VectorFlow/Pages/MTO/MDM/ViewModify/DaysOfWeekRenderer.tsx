import React from 'react'

const DaysOfWeekRenderer = (params: any) => {

    const days = params?.data?.dow?.split(' ');

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {days?.map((day: string, index: number) => (
                <div key={index} style={{ background: 'grey', color: 'white',padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {day}
                </div>
            ))}
        </div>
    );
}

export default DaysOfWeekRenderer