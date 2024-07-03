import { useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView/GridView'
import GraphView from './GraphView/GraphView'

const RMPMOrderwiseCoverage = () => {

    const [isGridView, setIsGridView] = useState(false);
    return (
        <>
            <MTOActionToolBar comp={"rmpm"} isGridView={isGridView} setIsGridView={setIsGridView} />
            {(isGridView) ? <GridView /> : <GraphView />}
        </>
    )
}
export default RMPMOrderwiseCoverage
