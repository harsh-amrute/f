import VFButton from '../../VFButton';
import {
    SCTaskBarContainer,
    SCGoBackContainer,
    SCGoBackText,
    SCVerticalDivider,
    SCVerticalDividerGray,
    SCViewImage,
    SCCustomActionsContainer,
    SCViewContainerWithBg,
    SCTaskFilterContainer,
    SCButton,
    SCViewContainerWithBgToggle,
    SCHorizontalDivison,
    SCViewContainer,
    SCFilterVerticalDivider,
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
    /**Date component style starts */
    DateWrapper,
    DateIcon,
    DateTitle,
    DateValue,
    /**Date component style end */
} from './styles';
import moment from 'moment';

type filterType = {
    label: string,
    values: string[]
}

interface MTOActionToolBarProps {
    comp: string,
    onDateChange?: (date: string) => void;
    submitDate?: () => void;
    isGridView?: boolean;
    setIsGridView?: (isGridView: boolean) => void;
    onAddFilter?: () => void;
    selectedFilters?: filterType[];
    removeFilters?: (category: string, name: string) => void;
    date?: string
    handleGoBack?: () => void;
    themeUi?: string;
}


const MTOActionToolBar = ({ comp, onDateChange, isGridView, setIsGridView, onAddFilter, selectedFilters, removeFilters, submitDate, date, handleGoBack, themeUi }: MTOActionToolBarProps) => {

    const handleRemoveFilter = (category: string, name: string) => {
        if (removeFilters) {
            removeFilters(category, name);
        }
    }

    const getTodayDate = () => {
        const today = new Date();

        // Extract year, month, and day
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = today.getDate().toString().padStart(2, '0');

        // Construct the date string in the desired format
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }


    const format2 = "YYYY-MM-DD"
    const d = new Date();
    //.setDate(d.getDate() - 1)
    const datetime = moment(d).format(format2);

    return (
        <SCTaskBarContainer className='toolbar-container'>
            <SCTaskFilterContainer
                style={{
                    maxWidth: '50%',
                    width: 'unset',
                    justifyContent: 'unset'
                }}
            >

                <>
                    {((comp !== 'MaterialCov') && (comp !== 'rmpm')) && (comp !== 'EnquiryResponse') && (comp !== 'BMTrends') && (comp !== 'MaterialRequirement') && (comp !== 'BTRMTO') && (comp !== 'orderReschedule') && (comp != "FullKitAssignment") &&

                        <SCGoBackContainer onClick={() => { if (handleGoBack) handleGoBack() }}>
                            <img
                                src="/assets/img/VectorFLOW/BPR/goback.svg"
                                alt=""
                            />
                            <SCGoBackText ><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                    }

                    {((comp !== 'MaterialCov') && (comp !== 'rmpm')) && (comp !== 'EnquiryResponse') && (comp !== 'BMTrends') && (comp != "MaterialCovDetailData") && (comp !== 'BTRMTO') && (comp !== 'orderReschedule') && (comp != "FullKitAssignment") &&
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginRight: '3px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            width: '100%'
                        }}>

                            &nbsp;
                            <p>Release Date Till</p>
                            &nbsp;
                            &nbsp;
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
                                    data-testid="datepicker"
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
                                    value={date}
                                    min={datetime}
                                    onChange={(e) => { if (onDateChange) onDateChange(e.target.value) }}
                                />
                            </div>
                            &nbsp;
                            <div>
                                <button
                                    style={{
                                        borderRadius: '8px',
                                        border: 'solid 1px #BC3D81',
                                        width: '112px',
                                        height: '43px',
                                    }}

                                    onClick={() => { if (submitDate) submitDate() }}
                                >Submit</button>
                            </div>
                        </div>

                    }

                    {comp !== 'EnquiryResponse' && <SCVerticalDivider />}
                </>

                {comp === 'EnquiryResponse' &&
                    <DateWrapper>
                        <DateIcon
                            src='/assets/img/calender-icon.svg' alt='calender-icon'
                        />
                        <DateTitle>As on Date</DateTitle>
                        <DateValue>
                            {getTodayDate()}
                        </DateValue>
                    </DateWrapper>}
                {/**Selected Filter start */}
                {selectedFilters && selectedFilters?.length > 0 && <VFSelectedFiltersWrapper>
                    <VFSelectedFiltersPlaceHolder>
                        Selected Filters
                    </VFSelectedFiltersPlaceHolder>
                    <VFFilterScrollBar>
                        {selectedFilters?.map((filter: filterType) => (
                            <VFSelectedFiltersChip key={filter.label}>
                                <VFSelectedFiltersFilterLabel>
                                    {filter?.label}:
                                </VFSelectedFiltersFilterLabel>
                                {filter?.values?.map((value: string) => (
                                    <div key={value}>
                                        <VFSelectedFiltersFilterContent>
                                            <VFSelectedFiltersFilterValue>
                                                <p style={{ margin: '0px 5px 0px 5px' }}> {value}</p>
                                            </VFSelectedFiltersFilterValue>
                                            <VFSelectedFiltersFilterCloseIcon
                                                onClick={() => handleRemoveFilter(filter?.label, value)}
                                                src='/assets/img/VectorFLOW/BPR/close-circle.svg' data-testid={'closeIcon-filter'}
                                            />
                                            {filter?.values?.length > 1 && <SCFilterVerticalDivider />}
                                        </VFSelectedFiltersFilterContent>
                                    </div>
                                ))}
                            </VFSelectedFiltersChip>
                        ))}
                    </VFFilterScrollBar>
                </VFSelectedFiltersWrapper>}
                {/**Selected Filter ends*/}


            </SCTaskFilterContainer>

            <SCCustomActionsContainer>
                {comp === 'EnquiryResponse' && onAddFilter ?
                    <VFButton onClick={() => onAddFilter()} themeUi={themeUi || ''} disabled={false} width={110}>{selectedFilters && selectedFilters?.length > 0 ? <p>Edit Filter</p> : <p>+ Add Filter</p>}</VFButton>
                    :
                    <SCButton>
                        <p>+ Add Filter</p>
                    </SCButton>
                }
                <>
                    {comp !== 'EnquiryResponse' && comp !== 'BMTrends' && <>
                        <SCVerticalDivider />
                        <SCViewContainerWithBg >
                            <>
                                <SCViewImage
                                    src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                <p>Excel Export</p>
                            </>
                        </SCViewContainerWithBg>
                    </>}

                    <>
                        <SCVerticalDividerGray />

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
                    {(comp === 'rmpm') &&
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
                        </>
                    }

                </>


            </SCCustomActionsContainer >
        </SCTaskBarContainer >
    )
}

export default MTOActionToolBar