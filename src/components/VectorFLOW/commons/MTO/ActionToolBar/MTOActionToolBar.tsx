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
    VFSelectedFilterLabel,
} from './styles';
import moment from 'moment';
import { ReactElement } from 'react';
import { format } from 'date-fns';
import VFCommonFilter from '../../../../../VectorFlow/Pages/MTO/Common/VFCommonFilter';
import { getSelectedFilters } from '../../../../../helpers/utils';
import { ColorsMTO } from '../../../../../VectorFlow/Pages/MTO/Common/Colors';

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
    disableRemoveFilter?: boolean | undefined;
    date?: string
    handleGoBack?: () => void;
    themeUi?: string;
    quickFilter?: ReactElement | null
    WIPFilter?: ReactElement | null

    //// new props
    isGoBackButton?: boolean
    isReleaseDate?: boolean
    isAsOnDate?: boolean
    isAddFilterButton?: boolean
    isExcelExport?: boolean
    isChartGridToggle?: boolean
    isWIPCheckBox?: boolean
    isFilterOpen?: boolean
    toggleFilter?: (state: boolean) => void
    multiFilter?: any
    setMultiFilter?: any
    onApplyFilter?: (params: any) => void;
    onFilterRemove?: any;
    isMfgSelected?: boolean;
    isReleaseButton?: boolean
    onOrderRelease?: () => void;
    onCheckBoxToggle?: any;
    isReleaseButtonDisabled?: boolean,
    utilityBtns?: ReactElement | null,
    handleSaveClick?: () => void
    handleResetClick?: () => void
    onExcelExportClick?: () => void
    //// new props
}

const MTOActionToolBar = ({
    onDateChange,
    isGridView,
    setIsGridView,
    onAddFilter,
    selectedFilters,
    removeFilters,
    disableRemoveFilter,
    isMfgSelected,
    submitDate,
    date,
    handleGoBack,
    themeUi,
    isGoBackButton,
    isReleaseDate,
    isAsOnDate,
    isAddFilterButton,
    isExcelExport,
    isChartGridToggle,
    // isWIPCheckBox,
    isFilterOpen,
    toggleFilter,
    multiFilter,
    setMultiFilter,
    onApplyFilter,
    onFilterRemove,
    isReleaseButton,
    onOrderRelease,
    quickFilter,
    onCheckBoxToggle,
    isReleaseButtonDisabled,
    utilityBtns,
    WIPFilter,
    handleSaveClick,
    handleResetClick,
    onExcelExportClick

}: MTOActionToolBarProps) => {

    const handleRemoveFilter = (category: string, name: string) => {
        if (removeFilters) {
            removeFilters(category, name);
        }
    }

    const format2 = "MM-dd-yyyy"
    const d = new Date();
    const datetime = moment(d).format(format2);
    
    const newFilters = getSelectedFilters(multiFilter, isMfgSelected);

    return (
        <SCTaskBarContainer className='toolbar-container'>
            <SCTaskFilterContainer
                style={{
                    maxWidth: '50%',
                    width: 'unset',
                    justifyContent: 'unset'
                }}>
                <>
                    {isReleaseButton &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', gap: '15px' }}>

                            <div style={{ borderRadius: '5px', background: 'white', padding: '10px 30px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(133, 132, 132, 0.247) -5px 4px 10px', gap: '10px' }}>
                                <input onChange={(e) => { onCheckBoxToggle(e) }} type="checkbox" style={{ color: 'pink' }} />
                                <p>Release</p>
                            </div>
                            {
                                isReleaseButtonDisabled ?
                                    // <img
                                    //     style={{ cursor: 'pointer', opacity: `${isReleaseButtonDisabled ? "0.8" : '1'}` }}
                                    //     src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                    //     height={50}
                                    //     width={60}
                                    //     alt="Group 627"
                                    // // onClick={onOrderRelease}
                                    // />
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            background: `linear-gradient(to right, ${ColorsMTO.darkPink.code},${ColorsMTO.Pink.code})`,
                                            backgroundColor: ColorsMTO.darkPink.code,
                                            height: '43px',
                                            width: '59px',
                                            borderRadius: '4px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            display: 'flex'
                                        }}
                                        data-testid={'isReleaseBtn'}
                                    >
                                        <img
                                            style={{}}
                                            src="/assets/img/rightArrowHorizontal.svg"
                                            height={13}
                                            width={7}
                                        />
                                    </div>
                                    :
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            background: `linear-gradient(to right, ${ColorsMTO.darkPink.code},${ColorsMTO.Pink.code})`,
                                            backgroundColor: ColorsMTO.darkPink.code,
                                            height: '43px',
                                            width: '59px',
                                            borderRadius: '4px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            display: 'flex'
                                        }}
                                        data-testid={'isReleaseBtn'}
                                        onClick={onOrderRelease}>
                                        <img
                                            style={{}}
                                            src="/assets/img/rightArrowHorizontal.svg"
                                            height={13}
                                            width={7}
                                        />
                                    </div>
                                // <img
                                //     style={{ cursor: 'pointer', opacity: `${isReleaseButtonDisabled ? "0.8" : '1'}` }}
                                //     src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                //     height={50}
                                //     width={60}
                                //     alt="Group 627"
                                //     onClick={onOrderRelease}
                                // />
                            }

                        </div>
                    }
                </>

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

                    {quickFilter && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", minWidth: "max-content" }}>
                        {quickFilter}
                    </div>}

                    {/* {isWIPCheckBox &&
                        <CheckBoxDiv data-testid='check-box'>
                            <Checkbox
                                data-testid='check-box'
                                name="select"
                                value="1"
                                defaultChecked={true}
                                //type="checkbox"
                                onChange={() => console.log('hi')}
                            //style={{ display: 'inline' }}
                            />
                            <InputCheckBoxTitle>Show order with available WIP Only</InputCheckBoxTitle>
                        </CheckBoxDiv>
                    } */}


                    {isReleaseDate &&
                        <div
                            data-testid='isReleaseDate'
                            style={{
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
                                    required
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
                            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    style={{ cursor: 'pointer' }}
                                    src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                    height={50}
                                    width={60}
                                    alt="Group 627"
                                    onClick={() => { if (submitDate) submitDate() }}
                                />

                            </div> */}
                            <div
                                style={{
                                    cursor: 'pointer',
                                    background: `linear-gradient(to right, ${ColorsMTO.darkPink.code},${ColorsMTO.Pink.code})`,
                                    backgroundColor: ColorsMTO.darkPink.code,
                                    height: '43px',
                                    width: '59px',
                                    borderRadius: '4px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    display: 'flex'
                                }}
                                onClick={() => { if (submitDate) submitDate() }}
                                data-testid={"Group 627"}
                            >
                                <img
                                    // style={{}}
                                    src="/assets/img/rightArrowHorizontal.svg"
                                    height={13}
                                    width={7}
                                />
                            </div>
                        </div>

                    }

                    <SCVerticalDivider />
                </>

                {isAsOnDate &&
                    <DateWrapper data-testid='isAsOnDate'>
                        <DateIcon
                            src='/assets/img/calender-icon.svg' alt='calender-icon'
                        />
                        <DateTitle>As on Date</DateTitle>
                        <DateValue>
                            {format(new Date(), format2)}
                        </DateValue>
                    </DateWrapper>}
                {/**Temp Enquiry response Filter start */}
                {selectedFilters && selectedFilters?.length > 0 && <VFSelectedFiltersWrapper style={{ width: '700px' }}>
                    <VFSelectedFiltersPlaceHolder>
                        Selected Filters
                    </VFSelectedFiltersPlaceHolder>
                    <VFFilterScrollBar >
                        {
                            selectedFilters?.map((filter: filterType) => {
                                if (filter.values.length > 0) {
                                    return (
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
                                                        {<VFSelectedFiltersFilterCloseIcon
                                                            onClick={() => handleRemoveFilter(filter?.label, value)}
                                                            src='/assets/img/VectorFLOW/BPR/close-circle.svg' alt='close-icon' data-testid={'closeIcon-filter'}
                                                        />}
                                                        {filter?.values?.length > 1 && <SCFilterVerticalDivider />}
                                                    </VFSelectedFiltersFilterContent>
                                                </div>
                                            )
                                            )}
                                        </VFSelectedFiltersChip>
                                    )
                                }
                            })
                        }
                    </VFFilterScrollBar>
                </VFSelectedFiltersWrapper>}
                {/**Selected Filter ends*/}

                {
                    WIPFilter &&
                    <div>
                        {WIPFilter}
                    </div>
                }

            </SCTaskFilterContainer>
            {/**New Selected Filter start */}
            {newFilters && Object.keys(newFilters)?.length > 0 &&
                <VFSelectedFiltersWrapper>
                    <VFSelectedFiltersPlaceHolder>
                        Selected Filters
                    </VFSelectedFiltersPlaceHolder>
                    <VFFilterScrollBar>
                        {
                            Object.keys(newFilters)?.map((key: any) => (
                                <VFSelectedFiltersChip key={key}>
                                    <VFSelectedFiltersFilterLabel>
                                        {newFilters[key]?.name} <SCFilterVerticalDivider />
                                    </VFSelectedFiltersFilterLabel>
                                    {newFilters[key]?.filters?.map((filter: any, index: number) => (
                                        (filter?.value?.length) > 0 &&
                                        <>
                                            <VFSelectedFilterLabel>
                                                {filter?.label}:
                                            </VFSelectedFilterLabel>
                                            { filter?.value?.map((f: any) => (
                                                <div key={f.value}>
                                                    <VFSelectedFiltersFilterContent>
                                                        <VFSelectedFiltersFilterValue>
                                                            <p style={{ margin: '0px 5px 0px 5px', fontFamily: '500' }}> {f.label}</p>
                                                        </VFSelectedFiltersFilterValue>
                                                        {disableRemoveFilter ? <div>-</div> : <VFSelectedFiltersFilterCloseIcon
                                                            onClick={() => {
                                                                const filtervalue = f.id || f.value;
                                                                onFilterRemove(key, filter.filterId, filtervalue)
                                                            }}
                                                            src='/assets/img/VectorFLOW/BPR/close-circle.svg' alt='close-icon' data-testid={'closeIcon-filter'}
                                                        />}
                                                    </VFSelectedFiltersFilterContent>
                                                </div>
                                            ))}
                                            {index !== newFilters[key]?.filters?.length - 1 && <SCFilterVerticalDivider />}
                                        </>
                                    ))}
                                </VFSelectedFiltersChip>
                            ))
                        }
                    </VFFilterScrollBar>
                </VFSelectedFiltersWrapper>}
            {/**Selected Filter ends*/}

            <SCCustomActionsContainer>
                {utilityBtns && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", gap: "1.5rem", marginRight: "10px" }}>
                    {utilityBtns}
                </div>}
                {isAddFilterButton && (onAddFilter ?
                    <VFButton onClick={() => onAddFilter()}
                        themeUi={themeUi || ''}
                        disabled={false}
                        width={110}
                    >{(selectedFilters || newFilters) && (selectedFilters?.length || Object.keys(newFilters).length) ?
                        <p style={{ padding: '2px' }}>Edit Filter</p>
                        :
                        <p style={{ padding: '2px' }}>+ Add Filter</p>}
                    </VFButton>
                    :
                    <SCButton>
                        <p>+ Add Filter</p>
                    </SCButton>)
                }
                <>
                    {isExcelExport && <>
                        <SCVerticalDivider />
                        <SCViewContainerWithBg onClick={onExcelExportClick} >
                            <>
                                <SCViewImage
                                    src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                <p>Excel Export</p>
                            </>
                        </SCViewContainerWithBg>
                    </>}

                    {handleSaveClick && handleResetClick && <>
                        <SCVerticalDividerGray />
                        <SCViewContainerWithBg onClick={() => handleSaveClick()}>
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" />
                            <p>Save</p>
                        </SCViewContainerWithBg>
                        <SCViewContainerWithBg onClick={() => handleResetClick()}>
                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" />
                            <p>Reset</p>
                        </SCViewContainerWithBg>
                    </>}

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
                {isFilterOpen && toggleFilter && onApplyFilter && setMultiFilter && multiFilter &&
                    <VFCommonFilter
                        onApplyFilter={onApplyFilter}
                        onGoBack={() => toggleFilter(false)}
                        multiFilter={multiFilter}
                        setMultiFilter={setMultiFilter}
                        isFilterOpen={isFilterOpen}
                    />
                }

            </SCCustomActionsContainer >
        </SCTaskBarContainer >
    )
}

export default MTOActionToolBar