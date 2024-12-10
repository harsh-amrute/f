import { useState } from "react";
import useMCGrid from "./useMCGrid";
import ChartView from "./ChartView";
import MCGridView from "./GridView"; 
import { TableLabelStatus } from "../../../../../VectorFlow/types/MCGrid";

const MCGrid = () => {
    const { gridData: data } = useMCGrid();

    const [view, setView] = useState<'chart' | 'grid'>('chart'); 
    const [status, setStatus] = useState<TableLabelStatus>('surplus');

    const handleViewChange = () => {
        if (view === 'chart') {
            setView('grid'); 
        }
    };
    console.log(view)

    return (
        <div>
            <div onClick={handleViewChange}>
                {view === 'chart' ? (
                    <ChartView data={data} setStatus={setStatus} />
                ) : (
                    <MCGridView view={view} setView={setView} status={status} setStatus={setStatus} />
                )}
            </div>
        </div>
    );
};

export default MCGrid;
