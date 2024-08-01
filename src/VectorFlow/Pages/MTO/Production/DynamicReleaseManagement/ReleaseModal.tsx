import { AgChartOptions } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import React, { useEffect, } from 'react'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import { StepperWrapper, StepGroup, StepLabel, ContentWrapper, Text } from './DynamicReleaseManagement.styled'
import { Rectangle } from './RectangleMarker'
import CustomSelect from './Select'

const EditRouteModal = ({ showModal, totalOrders, selectedOrders, setShowModal }: any) => {



    return (
        <VFModalCard key={"key2"} openModal={showModal} closeModal={() => { setShowModal((false)) }} headerText={'Release Orders'} headerIcon={''} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} paddingLeftAndRight={0} headerTextColor={'black'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
            <ContentWrapper>
                <Text>
                    Are you sure you want to release these orders?
                    {totalOrders}
                    {selectedOrders}

                </Text>


            </ContentWrapper>
        </VFModalCard>
    )
}

export default EditRouteModal