import React from 'react';
import {
    SCTaskBarContainer,
    SCGoBackContainer,
    SCGoBackText,
    SCViewContainer,
    SCViewBackground,
    SCVerticalDivider,
    SCViewImage,
    SCCustomActionsContainer,
    SCViewContainerWithBg,
    SCTaskFilterContainer,
    SCButton,
    /**search filter styles starts */
    VFSelectedFiltersChip,
    VFSelectedFiltersFilterCloseIcon,
    VFSelectedFiltersFilterContent,
    VFSelectedFiltersFilterLabel,
    VFSelectedFiltersFilterValue,
    VFSelectedFiltersPlaceHolder,
    VFSelectedFiltersWrapper,
    VFFilterScrollBar,
    /**search filter styles end*/
} from './styles'

const MTOActionToolBar = () => {
    return (
        <SCTaskBarContainer>
            <SCTaskFilterContainer
                style={{
                    maxWidth: '50%',
                    width: 'unset',
                    justifyContent: 'unset'
                }}
            >
                {/**Go back button starts */}
                {/* <SCGoBackContainer>
                    <img
                        src="/assets/img/VectorFLOW/BPR/goback.svg"
                        alt=""
                    />
                    <SCGoBackText><b>Go Back</b></SCGoBackText>
                </SCGoBackContainer> */}
                {/**Go back button end */}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginRight: '3px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    width: '70%'
                }}>
                    <p>Release Date Till</p>

                    <div style={{
                        top: '133px',
                        left: '638px',
                        width: '204px',
                        height: '43px',
                        /* UI Properties */
                        background: '#FFFFFF 0% 0% no-repeat padding-box',
                        border: '0.5px solid #ACACAC',
                        borderRadius: '4px',
                        opacity: 1,
                    }}>
                        <input type="date"
                            style={{
                                top: '141px',
                                left: '651px',
                                width: '100%',
                                height: '100%',
                                textAlign: 'left',
                                font: '24px',
                                letterSpacing: '0px',
                                color: '#000',
                                opacity: 1,
                                fontSize:'18px',
                                padding:'4px',
                                fontWeight:'bold',
                                fontFamily:'Roboto'
                            }}
                        //         font: 'normal normal medium 18px/24px Roboto',

                        />
                    </div>
                </div>

                <SCVerticalDivider />

                {/**Selected Filter start */}
                <VFSelectedFiltersWrapper>
                    <VFSelectedFiltersPlaceHolder>
                        Selected Filters
                    </VFSelectedFiltersPlaceHolder>
                    <VFFilterScrollBar>
                        <VFSelectedFiltersChip>
                            <VFSelectedFiltersFilterLabel>
                                <b></b>

                            </VFSelectedFiltersFilterLabel>

                            <VFSelectedFiltersFilterContent style={{ borderRight: 'solid 2px black' }}>
                                <VFSelectedFiltersFilterValue>
                                    <p>{ }</p>
                                    <p style={{ margin: '0px 5px 0px 5px' }}>:</p>
                                    <p>{ }</p>
                                </VFSelectedFiltersFilterValue>
                                <VFSelectedFiltersFilterCloseIcon
                                    src='/assets/img/VectorFLOW/BPR/close-circle.svg' data-testid={'closeIcon-filter'} />
                            </VFSelectedFiltersFilterContent>

                        </VFSelectedFiltersChip>

                    </VFFilterScrollBar>
                </VFSelectedFiltersWrapper>
                {/**Selected Filter ends*/}

            </SCTaskFilterContainer>

            <SCCustomActionsContainer>
                <SCButton>
                    <p>+ Add Filter</p>
                </SCButton>
                <>
                    <>
                        <SCVerticalDivider />
                        <SCViewContainerWithBg >
                            <>
                                <SCViewImage
                                    src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                <p>Excel Export</p>
                            </>
                        </SCViewContainerWithBg>
                    </>

                    <>

                        <SCVerticalDivider />
                        <SCViewContainerWithBg>
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" />
                            <p>Save</p>
                        </SCViewContainerWithBg>
                        <SCViewContainerWithBg >
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" />
                            <p>Reset</p>

                        </SCViewContainerWithBg>
                        {/* <SCVerticalDivider /> */}
                    </>

                </>


            </SCCustomActionsContainer>
        </SCTaskBarContainer>
    )
}

export default MTOActionToolBar

{/* <SCViewBackground>
                    <SCViewContainer>
                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-grey.svg"} alt="" />
                        <p style={{ color: '#b0acac' }}>Chart View</p>
                    </SCViewContainer>
                    <div><SCVerticalDivider /></div>

                    <SCViewContainer>
                        <SCViewImage
                            src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"} alt="" />
                        <p style={{ color: '#bc3d81' }}>Grid View</p>
                    </SCViewContainer>
                </SCViewBackground> */}