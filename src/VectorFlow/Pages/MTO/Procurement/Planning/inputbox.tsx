import React from "react";
export default function inputbox(props: any) {
    const handleClick = () => {
        props.api.startEditingCell({
            rowIndex: props.node.rowIndex,
            colKey: props.column.getId(),
        });
    };
    return (
        <span>
            <button style={{ height: '40px', width: '100px', backgroundColor: 'white', borderColor: 'black' }} onClick={handleClick}>
                <span style={{ paddingRight: '4px', fontSize: 20 }}>{props.value}</span>
            </button>
        </span>
    );
}