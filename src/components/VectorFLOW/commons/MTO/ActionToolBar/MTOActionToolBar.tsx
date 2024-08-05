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
    SCChartSliderContainer,
    /**Date component style end */
    ChartHeaderRadioGroup,
    RadioGroup,
    SelectGroup,
    CheckBoxDiv,
    InputCheckBoxTitle
} from './styles';
import moment from 'moment';
import { ReactElement } from 'react';
import { format } from 'date-fns';
import VFRangeSlider from '../../VFRangeSlider';
import CustomSelect from '../../../../../VectorFlow/Pages/MTO/Production/FullKitAssignement/Select';

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
    quickFilter?: ReactElement
    horizonDays?: number;
    setHorizonDays?: (e: number) => void;
    handleHorizonSubmit?: () => void;
    selectedGraphState?: any;
    updateGraphState?: (id: number, option: string) => void;

    //// new props
    isGoBackButton?: boolean
    isReleaseDate?: boolean
    isAsOnDate?: boolean
    isAddFilterButton?: boolean
    isExcelExport?: boolean
    isChartGridToggle?: boolean
    isWIPCheckBox?: boolean
    isReleaseButton?: boolean
    onOrderRelease?: () => void;
    //// new props
}

const MTOActionToolBar = ({
    comp,
    onDateChange,
    isGridView,
    setIsGridView,
    onAddFilter,
    selectedFilters,
    removeFilters,
    submitDate,
    date,
    handleGoBack,
    themeUi,
    horizonDays,
    setHorizonDays,
    handleHorizonSubmit,
    updateGraphState,
    selectedGraphState,
    isGoBackButton,
    isReleaseDate,
    isAsOnDate,
    isAddFilterButton,
    isExcelExport,
    isChartGridToggle,
    isWIPCheckBox,
    isReleaseButton,
    onOrderRelease,
    quickFilter
}: MTOActionToolBarProps) => {

    const handleRemoveFilter = (category: string, name: string) => {
        if (removeFilters) {
            removeFilters(category, name);
        }
    }

    const format2 = "YYYY-MM-DD"
    const d = new Date();
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
                    {isReleaseButton &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', gap: '15px' }}>

                            <div style={{ borderRadius: '5px', background: 'white', padding: '10px 30px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(133, 132, 132, 0.247) -5px 4px 10px', gap: '10px' }}>
                                <input type="checkbox" style={{ color: 'pink' }} />
                                <p>Release</p>
                            </div>
                            <img
                                style={{ cursor: 'pointer' }}
                                src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                height={50}
                                width={60}
                                alt="Group 627"
                                onClick={onOrderRelease}
                            />

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

                    {quickFilter && <div style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"1.8rem"}}>
                        {quickFilter}
                    </div>}

                    {isWIPCheckBox &&
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
                    }


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
                    <DateWrapper data-testid='isAsOnDate'>
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

                        {
                            selectedFilters?.map((filter: filterType) => (
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

                {(comp === 'resourceUtilization') &&
                    <div data-testid='resourceUtilization' style={{ display: ' flex', alignItems: 'flex-end', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: 300,
                                fontSize: 14,
                                fontFamily: "Roboto",
                                width: 'max-content'
                            }}
                            >
                                Please choose an option:
                            </div>
                            <RadioGroup>
                                <ChartHeaderRadioGroup style={{ gap: '4px' }} theme={themeUi}>
                                    <input type="radio" checked={selectedGraphState === 'wipLimit'} value="wipLimit" name="wipLimit" id="wipLimit" data-testid="wip-limit-radio" onChange={() => updateGraphState && updateGraphState(1, 'wipLimit')} style={{ margin: 0, zoom: 1.8, cursor: 'pointer' }} />
                                    <label htmlFor="parent" style={{ fontSize: '14px', fontWeight: 500 }}>WIP Limit</label>
                                </ChartHeaderRadioGroup>
                                <ChartHeaderRadioGroup style={{ marginLeft: '10px', gap: '4px' }} theme={themeUi}>
                                    <input type="radio" checked={selectedGraphState === 'utilization'} value="utilization" name="utilization" id="utilization" data-testid="utilization-radio" onChange={() => updateGraphState && updateGraphState(2, 'utilization')} style={{ margin: 0, zoom: 1.8, cursor: 'pointer' }} />
                                    <label htmlFor="child" style={{ fontSize: '14px', fontWeight: 500 }}>Utilization</label>
                                </ChartHeaderRadioGroup>
                            </RadioGroup>
                        </div>
                        <SCVerticalDividerGray />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div
                                style={{
                                    fontStyle: "normal",
                                    fontVariant: "normal",
                                    fontWeight: 300,
                                    fontSize: 14,
                                    fontFamily: "Roboto",
                                }}
                            >
                                Select Plant/ Department/ CCR
                            </div>
                            <SelectGroup>
                                <CustomSelect placeholder="Select Plant" selected={false} options={[]} optionsWidth={"100%"} />
                                <CustomSelect placeholder="Select Department" selected={false} options={[]} optionsWidth={"100%"} />
                            </SelectGroup>
                        </div>
                        <SCVerticalDividerGray />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: 300,
                                fontSize: 14,
                                fontFamily: "Roboto",
                            }}
                            >
                                Select Horizon(in Days):
                            </div>
                            <SCChartSliderContainer>
                                <VFRangeSlider
                                    showTriangle={false}
                                    min={1}
                                    max={90}
                                    milestones={[0, 30, 60, 90]}
                                    strictMode={false}
                                    width={250}
                                    defaultValue={horizonDays || 0}
                                    handleChange={(e) => setHorizonDays && setHorizonDays(e)}
                                    labelValueFormatter={(value: number) => value > 1 ? `${value} Days` : `${value} Day`}
                                />
                                <div>
                                    {/* <VFButtonOutline themeUi={user.user.theme_ui} onClick={handleSubmitClick} width={120} disabled={false} style={{fontSize:'15px',height:'42px',fontWeight:500}}>
                                    Submit
                                </VFButtonOutline> */}
                                    <img
                                        data-testid='horizon-submit'
                                        style={{ cursor: 'pointer' }}
                                        src={themeUi === "REGALBLAZE" ? "/assets/img/Group 627-regal.svg" : "/assets/img/Group 627.svg"}
                                        height={50}
                                        width={60}
                                        onClick={() => handleHorizonSubmit && handleHorizonSubmit()}
                                    />
                                </div>
                            </SCChartSliderContainer>
                        </div>
                    </div>
                }

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