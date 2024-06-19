import React from 'react';
import {
    SCTaskBarContainer,
    SCGoBackContainer,
    SCGoBackText,
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
    SCViewContainerWithBgToggle,
    SCHorizontalDivison,
    SCViewContainer,
    /**search filter styles end*/
} from './styles'

interface MTOActionToolBarProps {
    comp: string,
    onDateChange?: (date: string) => void;
    submitDate?: () => void;
    isGridView?: boolean;
    setIsGridView?: (isGridView: boolean) => void;
}


const MTOActionToolBar = ({ comp, onDateChange, isGridView, setIsGridView }: MTOActionToolBarProps) => {
    return (
        <SCTaskBarContainer>
            <SCTaskFilterContainer
                style={{
                    maxWidth: '50%',
                    width: 'unset',
                    justifyContent: 'unset'
                }}
            >

                <>
                    {((comp !== 'MaterialCov') && (comp !== 'rmpm')) ?
                        <SCGoBackContainer>
                            <img
                                src="/assets/img/VectorFLOW/BPR/goback.svg"
                                alt=""
                            />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        : null
                    }

                    {((comp !== 'MaterialCov') && (comp !== 'rmpm')) ?
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
                                        fontSize: '18px',
                                        padding: '4px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                        border: '0.5px solid #ACACAC',
                                    }}
                                    onChange={(e) => onDateChange ? (e.target.value) : null}
                                />
                            </div>
                            <div>
                                <button
                                    style={{
                                        borderRadius: '8px',
                                        border: 'solid 1px #BC3D81',
                                        width: '112px',
                                        height: '43px',
                                    }}

                                // onClick={() => submitDate?(): null}
                                >Submit</button>
                            </div>
                        </div>
                        :
                        null
                    }

                    <SCVerticalDivider />
                </>


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
                                    <p style={{ margin: '0px 5px 0px 5px' }}>:</p>
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

                    {/* Toggle button for chartview/ grid view */}
                    {(comp === 'rmpm') ?
                        <>
                            <SCViewContainerWithBgToggle onClick={() => { setIsGridView && (setIsGridView(!isGridView)); console.log(isGridView) }}>
                                <SCViewContainer>
                                    <SCViewImage src={`/assets/img/VectorFLOW/BPR/${(isGridView) ? 'chart-view-grey' : 'chart-view-pink'}.svg`} />
                                    <p>Chart View</p>

                                </SCViewContainer>
                                <SCHorizontalDivison />
                                <SCViewContainer>
                                    <SCViewImage src={`/assets/img/VectorFLOW/BPR/${(!isGridView) ? 'grid-view-grey' : 'grid-view-pink'}.svg`} />
                                    <p>Grid View</p>

                                </SCViewContainer>

                            </SCViewContainerWithBgToggle>
                        </> : <></>
                    }

                </>


            </SCCustomActionsContainer >
        </SCTaskBarContainer >
    )
}

export default MTOActionToolBar