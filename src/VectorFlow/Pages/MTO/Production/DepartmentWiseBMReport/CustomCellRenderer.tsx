import React, { useCallback, useEffect, useState } from 'react'
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { RowEvent } from '@ag-grid-community/core';
import { FlatIcon } from './styles';

const customCellRenderer = (props: CustomCellRendererProps) => {
    const { node } = props;
    const [expanded, setExpanded] = useState(node.expanded);

    useEffect(() => {
        const expandListener = (event: RowEvent) => setExpanded(event.node.expanded);

        node.addEventListener('expandedChanged', expandListener);

        return () => {
            node.removeEventListener('expandedChanged', expandListener);
        }
    }, []);

    const onClick = useCallback(() => node.setExpanded(!node.expanded), [node]);

    return (

        <button data-testid='collapsable' style={{ fontSize: "18px", background: "transparent", fontWeight: "bold" }} onClick={onClick}>
            <FlatIcon src={expanded ? "/assets/img/mto/dayWiseCoverage/arrow_down.svg" : "/assets/img/mto/dayWiseCoverage/arrow_right.svg"} />
        </button>
    )
}

export default customCellRenderer