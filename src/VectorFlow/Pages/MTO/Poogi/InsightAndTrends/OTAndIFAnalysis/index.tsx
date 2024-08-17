import { Allotment } from 'allotment'
import { useEffect, useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import IFFaildGraph from './IFFailedGraph'
import OTFailedGraph from './OTFailedGraph'
import { useGetOTAndIFAnalysisData } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTAndIFAnalysis'
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import GridView from '../../../Common/GridView'
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";

const OTAndIFAnalysis = () => {

    const [isGridView, setIsGridView] = useState(false);
    const { mutateAsync: getOTAndIFAnalysisData, isLoading, isError, isSuccess }  = useGetOTAndIFAnalysisData();
    const [graphData, setGraphData] = useState<any>({});

    const getGraphData = async (isGraph: any) => {
        try {
          const response = await getOTAndIFAnalysisData(isGraph);
          setGraphData(response.data.data);
        }
        catch (e) {
          console.log(e);
          notifyError('Failed to fetch Graph data!');
        }
    }

    const colDefCustomizations = {
        Tags: {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        BPP: {
            cellRenderer: ColorCellRenderer,
        },
    }

    useEffect(()=>{
        getGraphData(1);
    },[])

    useEffect(() => {
        if (isSuccess) {
          notifySuccess("Fetched Data successfully!")
        }
        if (isError) {
          notifyError("Failed to load data!")
        }
    }, [isSuccess, isError])
    
    return (
        <>
            {
                isError && <OverlayLoader />
            }
            <MTOActionToolBar isAddFilterButton isChartGridToggle setIsGridView={setIsGridView} isGridView={isGridView} />
            {
                !isGridView ?
                    <>
                        <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <BTRTableWrapper style={{ flex: '1', margin: '0' }}>
                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <OTFailedGraph  OTFailedData={graphData?.ot}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <IFFaildGraph IFFailedData={graphData?.if}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>
                            </BTRTableWrapper>
                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GridView 
                            getData={getOTAndIFAnalysisData} 
                            reportName="OTIFAnalysis" 
                            isLoading={isLoading} 
                            isError={isError} 
                            isSuccess={isSuccess} 
                            colDefCustomizations={colDefCustomizations}
                        />
                    </>
            }
        </>
    )
}

export default OTAndIFAnalysis