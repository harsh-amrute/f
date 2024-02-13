import React, { useEffect } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";

const MonitorGITChildLocationWise = () => {
    
    return(
        <>
            <Allotment>
                <Allotment.Pane>
                    <VFTable/>
                </Allotment.Pane>
                <Allotment.Pane>
                    Rohan
                </Allotment.Pane>
            </Allotment>
        </>
    )
    
}

export default MonitorGITChildLocationWise;