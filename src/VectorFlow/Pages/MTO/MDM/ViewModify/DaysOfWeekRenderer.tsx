import React from 'react'

const DaysOfWeekRenderer = (params: any) => {

    if (params?.data?.rb !== 'Weekly' || (typeof params?.data?.dow === 'string' || params?.data?.rd >= 1)) {
        return null
    }

    const days :any = params.data?.dow?.map((day: any) => {
        return day?.md
    })

   return (
    days?.length > 0  && !days?.includes("") ? (
        <div style={{ display: 'flex', gap: '4px' }}>
            {days?.map((day: string, index: number) => (
                <div
                    key={index}
                    style={{
                        background: 'grey',
                        color: 'white',
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                >
                    {day}
                </div>
            ))}
        </div>
    ) : null
);
}

export default DaysOfWeekRenderer