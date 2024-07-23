import VFButton from '../../VFButton';
import Checkbox from '../../../../../components/commons/Checkbox';
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
    CheckBoxDiv,
    InputCheckBox,
    InputCheckBoxTitle
} from './styles';
import moment from 'moment';
import { format } from 'date-fns';

type filterType = {
    label: string,
    values: string[]
}

interface MTOActionToolBarProps {
    comp?: string,
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


    //// new props
    isGoBackButton?: boolean
    isReleaseDate?: boolean
    isAsOnDate?: boolean
    isAddFilterButton?: boolean
    isExcelExport?: boolean
    isChartGridToggle?: boolean


    //// new props
}


const MTOActionToolBar = ({ isGoBackButton, isReleaseDate, isAsOnDate, isAddFilterButton, isExcelExport, isChartGridToggle, comp, onDateChange, isGridView, setIsGridView, onAddFilter, selectedFilters, removeFilters, submitDate, date, handleGoBack, themeUi }: MTOActionToolBarProps) => {

    const handleRemoveFilter = (category: string, name: string) => {
        if (removeFilters) {
            removeFilters(category, name);
        }
    }

    console.log("mto toolbar for ", comp);

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
                    {isGoBackButton &&

                        <SCGoBackContainer onClick={() => { if (handleGoBack) handleGoBack() }}>
                            <img
                                src="/assets/img/VectorFLOW/BPR/goback.svg"
                                alt=""
                            />
                            <SCGoBackText ><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                    }

                    <CheckBoxDiv>
                        <Checkbox
                            name="select"
                            value="1"
                            defaultChecked={true}
                            onChange={() => console.log('hi')}
                        />
                        <InputCheckBoxTitle>Show order with available WIP Only</InputCheckBoxTitle>
                    </CheckBoxDiv>

                    
                    {isReleaseDate &&
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    style={{ cursor: 'pointer' }}
                                    src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                    height={50}
                                    width={60}
                                    alt="Group 627"
                                    onClick={() => { if (submitDate) submitDate() }}
                                />

                            </div>
                        </div>

                    }

                    <SCVerticalDivider />
                </>

                {isAsOnDate &&
                    <DateWrapper>
                        <DateIcon
                            src='/assets/img/calender-icon.svg' alt='calender-icon'
                        />
                        <DateTitle>As on Date</DateTitle>
                        <DateValue>
                            {format(new Date(), 'yyyy-MM-dd')}
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
                                                src='/assets/img/VectorFLOW/BPR/close-circle.svg' alt='close-icon' data-testid={'closeIcon-filter'}
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
                {isAddFilterButton && (onAddFilter ?
                    <VFButton onClick={() => onAddFilter()} themeUi={themeUi || ''} disabled={false} width={110}>{selectedFilters && selectedFilters?.length > 0 ? <p style={{ padding: '2px' }}>Edit Filter</p> : <p style={{ padding: '2px' }}>+ Add Filter</p>}</VFButton>
                    :
                    <SCButton>
                        <p>+ Add Filter</p>
                    </SCButton>)
                }
                <>
                    {isExcelExport && <>
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
                    {isChartGridToggle &&
                        <>
                            <SCViewContainerWithBgToggle >
                                <SCViewContainer onClick={() => { isGridView && setIsGridView && (setIsGridView(!isGridView)) }}>
                                    <SCViewImage src={`/assets/img/VectorFLOW/BPR/${(isGridView) ? 'chart-view-grey' : 'chart-view-pink'}.svg`} />
                                    <p>Chart View</p>

                                </SCViewContainer>

                                <SCHorizontalDivison />

                                <SCViewContainer onClick={() => { !isGridView && setIsGridView && (setIsGridView(!isGridView)) }}>
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