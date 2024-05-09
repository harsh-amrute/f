import React, { useMemo } from 'react';

export default (props) => {
    const colorForMood = (mood) => {
        if (mood === 'BDA1241') return 'pink';
        else if (mood === 'BSE1431') return 'yellow';
        else if (mood === 'Neutral') return 'blue';
        else return 'black'; // default color
    };

    const moodColor = useMemo(() => colorForMood(props.value), [props.value]);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: moodColor,
                marginRight: '5px'
            }}></div>
            <div>{props.value}</div>
        </div>
    );
};
