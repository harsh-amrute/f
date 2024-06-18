import React, { useState } from 'react'
import ActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView'
import GraphView from './GraphView';

export const RMPM = () => {

    const [isGridView, setIsGridView] = useState(false);
    return (
        <>
            <ActionToolBar comp={"rmpm"} isGridView={isGridView} setIsGridView={setIsGridView} />

            {(isGridView) ? <GridView /> : <GraphView />}
        </>
    )
}
