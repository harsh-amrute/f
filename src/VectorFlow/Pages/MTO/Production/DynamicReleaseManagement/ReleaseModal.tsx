import { SCButton } from '../../../../../components/layouts/NavbarRight/styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import { ContentWrapper, Text } from './DynamicReleaseManagement.styled'


const EditRouteModal = ({ themeUi, showModal, totalOrders, selectedOrders, setShowModal }: any) => {



    return (
        <VFModalCard key={"key2"} openModal={showModal} closeModal={() => { setShowModal((false)) }} headerText={'Release Orders'} headerIcon={''} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} paddingLeftAndRight={0} headerTextColor={'black'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
            <ContentWrapper>
                <Text style={{ height: '20vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '0 80px 20px 80px', fontSize: '16px' }}>
                    <p>
                        Are you sure? Do you want to
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                        Release {selectedOrders} selected orders out of {totalOrders} orders?
                    </p>

                </Text>

                <div style={{ zoom: '0.7', display: 'flex', justifyContent: 'right', gap: '8px', borderTop: '2px dashed #A0A0A0', padding: '10px 10px 0 0' }}>

                    <div>
                        <SCButton onClick={() => { setShowModal(false) }} style={{ background: 'white', color: 'grey', border: '1px solid grey' }} themeUi={themeUi}>
                            No, Go Back
                        </SCButton>
                    </div>
                    <div>

                        <SCButton themeUi={themeUi}>
                            Yes, Release
                        </SCButton>
                    </div>
                </div>



            </ContentWrapper>
        </VFModalCard>
    )
}

export default EditRouteModal