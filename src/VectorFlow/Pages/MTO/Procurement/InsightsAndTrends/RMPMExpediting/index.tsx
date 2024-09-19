import { Allotment } from "allotment"
import React, { useEffect, useState } from "react"
import useViewPort from "../../../../../../hooks/useViewPort"
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import '../RMPMBufferTrends/style.css';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from "../RMPMBufferTrends/styles";
import ExpeditingMTA from "./MTAGraph/ExpeditingMTA";
import ExpeditingMTO from "./MTOGraph/ExpeditingMTO";
import { useGetDate } from '../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting/index';
import { useGetFilterData } from '../../../../../..//VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../../hooks/useFilter';
import { FilterPageName } from "../../../Common/Enum";

const APIFilterConfig = {
    filSecVisConfig: {
        "Proc_Expediting_RM_And_Suppliers" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};


const RMExpeditionSuppliers = () => {
    const [isMTO] = useState(true);
    const [filterData, setFilterData] = useState({});
    const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const { 
        state: currFilter, 
        setState: setCurrFilter, 
        onFilterRemove, 
        isFilterOpen, 
        isMfgSelected,
        onAddFilter, 
        onApplyFilter, 
        toggleFilter 
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Proc_Expediting_RM_And_Suppliers);

    const { data, /*isLoading, refetch*/ } = useGetDate();


    const { screenHeight } = useViewPort()

    const getFilterData = async () => {
        try {
            const response = await getPageWiseFilterData({page_name: FilterPageName.Proc_Expediting_RM_And_Suppliers});
            setFilterData(response?.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        getFilterData()
    },[])

    return (
        <div style={{ zoom: 1.33, marginLeft: '30px' }}>
            <MTOActionToolBar 
                comp={"BTRMTO"} 
                isAddFilterButton 
                isFilterOpen={isFilterOpen}
                onAddFilter={onAddFilter}
                toggleFilter={toggleFilter}
                onApplyFilter={onApplyFilter}
                multiFilter={currFilter}
                setMultiFilter={setCurrFilter}
                onFilterRemove={onFilterRemove}
                isMfgSelected={isMfgSelected}
            />
            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 160, margin: '0' }}>
                    {
                        (isMTO) ?
                            (<Allotment
                                vertical={false}
                                separator={false}   >
                                <Allotment.Pane
                                    minSize={350}
                                    preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <ExpeditingMTO
                                            isMTO={isMTO}
                                            date={data?.data?.data}
                                        />
                                    </BTRAllomentSection>
                                </Allotment.Pane>

                                <Allotment.Pane
                                    minSize={350}
                                    preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <ExpeditingMTA
                                            isMTO={isMTO}
                                            date={data?.data?.data}

                                        />
                                    </BTRAllomentSection>
                                </Allotment.Pane>
                            </Allotment>)
                            :
                            <ExpeditingMTO
                                isMTO={isMTO}
                                date={data?.data?.data}

                            />
                    }
                </BTRTableWrapper>

            </HorizontalViewWrapper>
        </div>
    )
}

export default RMExpeditionSuppliers;