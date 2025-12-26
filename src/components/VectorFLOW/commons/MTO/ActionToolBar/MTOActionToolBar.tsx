import VFButton from "../../VFButton";
import {
  SCTaskBarContainer,
  SCGoBackContainer,
  SCGoBackText,
  SCVerticalDivider,
  SCVerticalDividerGray,
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
  AddFilterWrapper,
  vBgRadius,
  // setWithBgOverrides,
} from "./styles.css";
import { Fragment, ReactElement } from "react";
import moment from "moment";

import { format } from "date-fns";
import VFCommonFilter from "../../../../../VectorFlow/Pages/MTO/Common/VFCommonFilter";
import { getSelectedFilters } from "../../../../../helpers/utils";
import {
  ExportExcelSVG,
  ResetSVG,
  SaveSVG,
  GridView,
  ChartView,
} from "../../../../../helpers/SvgRenderer";
import { Theme } from "../../../../../styles/global";
import VFDatePicker from "../../../../../VectorFlow/Pages/MTO/Common/VFDatePicker";
import {
  textComparators,
  numberComparators,
} from "../../../../../VectorFlow/Pages/MTO/Common/VFCommonFilter/InputTypes";
import { assignInlineVars } from "@vanilla-extract/dynamic";

type filterType = {
  label: string;
  values: string[];
};

interface MTOActionToolBarProps {
  comp?: string;
  onDateChange?: (date: string) => void;
  submitDate?: () => void;
  isGridView?: boolean;
  setIsGridView?: (isGridView: boolean) => void;
  onAddFilter?: () => void;
  selectedFilters?: filterType[];
  removeFilters?: (category: string, name: string) => void;
  disableRemoveFilter?: boolean | undefined;
  date?: string;
  handleGoBack?: () => void;
  themeUi?: Theme | any;
  quickFilter?: ReactElement | null;
  WIPFilter?: ReactElement | null;

  //// new props
  isGoBackButton?: boolean;
  isReleaseDate?: boolean;
  isAsOnDate?: boolean;
  isAddFilterButton?: boolean;
  isExcelExport?: boolean;
  isChartGridToggle?: boolean;
  isWIPCheckBox?: boolean;
  isFilterOpen?: boolean;
  toggleFilter?: (state: boolean) => void;
  multiFilter?: any;
  setMultiFilter?: any;
  onApplyFilter?: (params: any) => void;
  onFilterRemove?: any;
  isMfgSelected?: boolean;
  utilityBtns?: ReactElement | null;
  handleSaveClick?: () => void;
  handleResetClick?: () => void;
  onExcelExportClick?: () => void;
  ReleaseOrderHeader?: ReactElement | null;
  //// new props
}

const MTOActionToolBar = ({
  onDateChange,
  isGridView = true,
  setIsGridView,
  onAddFilter,
  selectedFilters,
  removeFilters,
  disableRemoveFilter,
  isMfgSelected,
  themeUi,
  submitDate,
  date,
  handleGoBack,
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
  quickFilter,
  utilityBtns,
  WIPFilter,
  handleSaveClick,
  handleResetClick,
  onExcelExportClick,
  ReleaseOrderHeader,
}: MTOActionToolBarProps) => {
  const handleRemoveFilter = (category: string, name: string) => {
    if (removeFilters) {
      removeFilters(category, name);
    }
  };

  const format2 = "yyyy-MM-dd";

  const newFilters = getSelectedFilters(multiFilter, isMfgSelected);

  return (
    <div className={`${SCTaskBarContainer} toolbar-container`}>
      <div
        className={SCTaskFilterContainer}
        style={{ maxWidth: "50%", width: "unset", justifyContent: "unset" }}
      >
        <>{ReleaseOrderHeader && <div>{ReleaseOrderHeader}</div>}</>

        <>
          {isGoBackButton && (
            <div
              className={SCGoBackContainer}
              onClick={() => {
                if (handleGoBack) handleGoBack();
              }}
            >
              <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" />
              <div className={SCGoBackText}>
                <b>Go Back</b>
              </div>
            </div>
          )}

          {quickFilter && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.8rem",
                minWidth: "max-content",
              }}
            >
              {quickFilter}
            </div>
          )}

          {isReleaseDate && (
            <div
              data-testid="isReleaseDate"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "3px",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              &nbsp;<p>Release Date Till</p>&nbsp;&nbsp;
              <VFDatePicker
                date={date ? new Date(date) : null}
                onDateChange={onDateChange}
                dateInputStyle={{ fontSize: "18px", fontWeight: "bold" }}
                imgStyle={{ height: "25px", width: "25px" }}
                showCalendarIcon
              />
              &nbsp;
              <VFButton
                data-testid="Group 627"
                onClick={() => submitDate && submitDate()}
                themeUi={themeUi}
                disabled={false}
                style={{ height: "45px", width: "60px", borderRadius: "3px" }}
              >
                <img
                  src="/assets/img/rightArrowHorizontal.svg"
                  height={13}
                  width={7}
                />
              </VFButton>
            </div>
          )}
        </>

        {isAsOnDate && (
          <div className={DateWrapper} data-testid="isAsOnDate">
            <img
              className={DateIcon}
              src="/assets/img/calender-icon.svg"
              alt="calender-icon"
            />
            <div className={DateTitle}>As on Date</div>
            <div className={DateValue}>{format(new Date(), format2)}</div>
          </div>
        )}

        {/* Temp Enquiry response Filter */}
        {selectedFilters && selectedFilters?.length > 0 && (
          <div className={VFSelectedFiltersWrapper} style={{ width: "700px" }}>
            <p className={VFSelectedFiltersPlaceHolder}>Selected Filters</p>
            <div className={VFFilterScrollBar}>
              {selectedFilters?.map((filter: filterType) => {
                if (filter.values.length > 0) {
                  return (
                    <span className={VFSelectedFiltersChip} key={filter.label}>
                      <div className={VFSelectedFiltersFilterLabel}>
                        {filter?.label}:
                      </div>
                      {filter?.values?.map((value: string) => (
                        <div key={value}>
                          <div className={VFSelectedFiltersFilterContent}>
                            <div className={VFSelectedFiltersFilterValue}>
                              <p style={{ margin: "0px 5px 0px 5px" }}>
                                {value}
                              </p>
                            </div>
                            <img
                              className={VFSelectedFiltersFilterCloseIcon}
                              onClick={() =>
                                handleRemoveFilter(filter?.label, value)
                              }
                              src="/assets/img/VectorFLOW/BPR/close-circle.svg"
                              alt="close-icon"
                              data-testid="closeIcon-filter"
                            />
                            {filter?.values?.length > 1 && (
                              <div className={SCFilterVerticalDivider} />
                            )}
                          </div>
                        </div>
                      ))}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {WIPFilter && <div>{WIPFilter}</div>}
      </div>

      {/* New Selected Filter */}
      {isAddFilterButton &&
        newFilters &&
        Object.keys(newFilters)?.length > 0 && (
          <div className={VFSelectedFiltersWrapper}>
            <p className={VFSelectedFiltersPlaceHolder}>Selected Filters</p>

            <div className={VFFilterScrollBar}>
              {Object.keys(newFilters)?.map((key: any) => (
                <span className={VFSelectedFiltersChip} key={key}>
                  <div className={VFSelectedFiltersFilterLabel}>
                    {newFilters[key]?.name}{" "}
                    <div className={SCFilterVerticalDivider} />
                  </div>

                  {newFilters[key]?.filters?.map(
                    (filter: any, index: number) => {
                      const operatorText =
                        filter?.operator && filter?.operator !== ""
                          ? filter?.type === "textCompare"
                            ? textComparators?.find(
                                (item: any) => item.value === filter?.operator
                              )?.label + " "
                            : filter?.type === "numberCompare"
                            ? numberComparators?.find(
                                (item: any) => item.value === filter?.operator
                              )?.label + " "
                            : ""
                          : "";

                      return (
                        filter?.value?.length > 0 && (
                          <>
                            <div className={VFSelectedFilterLabel}>
                              {filter?.label}:
                            </div>

                            {filter?.value?.map((f: any) => {
                              return (
                                <div key={f.value}>
                                  <div
                                    className={VFSelectedFiltersFilterContent}
                                  >
                                    <div
                                      className={VFSelectedFiltersFilterValue}
                                    >
                                      <p
                                        style={{
                                          margin: "0px 5px 0px 5px",
                                          fontFamily: "500",
                                        }}
                                      >
                                        {operatorText ? operatorText : ""}
                                        {f.label || f.value}
                                      </p>
                                    </div>

                                    {disableRemoveFilter ? (
                                      <div>-</div>
                                    ) : (
                                      <img
                                        className={
                                          VFSelectedFiltersFilterCloseIcon
                                        }
                                        onClick={() => {
                                          const filtervalue = f.id || f.value;
                                          onFilterRemove(
                                            key,
                                            filter.filterId,
                                            filtervalue
                                          );
                                        }}
                                        src="/assets/img/VectorFLOW/BPR/close-circle.svg"
                                        alt="close-icon"
                                        data-testid="closeIcon-filter"
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {index !== newFilters[key]?.filters?.length - 1 && (
                              <SCFilterVerticalDivider />
                            )}
                          </>
                        )
                      );
                    }
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      {/**Selected Filter ends*/}

      <div className={SCCustomActionsContainer}>
        {utilityBtns && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.8rem",
              gap: "1.5rem",
              marginRight: "10px",
            }}
          >
            {utilityBtns}
          </div>
        )}

        {isAddFilterButton &&
          (onAddFilter ? (
            <div className={AddFilterWrapper}>
              <VFButton
                onClick={() => onAddFilter()}
                themeUi={themeUi}
                disabled={false}
                width={110}
              >
                {(selectedFilters || newFilters) &&
                (selectedFilters?.length || Object.keys(newFilters).length) ? (
                  <p style={{ padding: "2px" }}>Edit Filter</p>
                ) : (
                  <p style={{ padding: "2px" }}>+ Add Filter</p>
                )}
              </VFButton>
            </div>
          ) : (
            <div className={AddFilterWrapper}>
              <button className={SCButton}>
                <p>+ Add Filter</p>
              </button>
            </div>
          ))}

        <>
          {isExcelExport && (
            <>
              <div className={SCVerticalDivider} />
              <div
                className={SCViewContainerWithBg}
                onClick={onExcelExportClick}
              >
                <>
                  <ExportExcelSVG theme={themeUi} />
                  <p style={{ padding: "5px" }}>Excel Export</p>
                </>
              </div>
            </>
          )}

          {isGridView && handleSaveClick && handleResetClick && (
            <>
              <div className={SCVerticalDividerGray} />
              <div
                className={SCViewContainerWithBg}
                onClick={() => handleSaveClick()}
              >
                <SaveSVG theme={themeUi} />
                <p style={{ padding: "5px" }}>Save Layout</p>
              </div>
              <div
                className={SCViewContainerWithBg}
                onClick={() => handleResetClick()}
              >
                <ResetSVG theme={themeUi} />
                <p style={{ padding: "5px" }}>Reset Layout</p>
              </div>
            </>
          )}

          {/* Toggle button for chart/grid view */}
          {isChartGridToggle && (
            <>
              {isAddFilterButton && <div className={SCVerticalDividerGray} />}
              <div className={SCViewContainerWithBgToggle}>
                <div
                  className={SCViewContainer}
                  onClick={() => {
                    isGridView && setIsGridView && setIsGridView(!isGridView);
                  }}
                >
                  <ChartView theme={themeUi} view={!isGridView} />
                  <p>Chart View</p>
                </div>

                <div className={SCHorizontalDivison} />

                <div
                  className={SCViewContainer}
                  onClick={() => {
                    !isGridView && setIsGridView && setIsGridView(!isGridView);
                  }}
                  style={{ paddingTop: "7px" }}
                >
                  <GridView theme={themeUi} view={isGridView} />
                  <p>Grid View</p>
                </div>
              </div>
            </>
          )}
        </>

        {isFilterOpen &&
          toggleFilter &&
          onApplyFilter &&
          setMultiFilter &&
          multiFilter && (
            <VFCommonFilter
              onApplyFilter={onApplyFilter}
              onGoBack={() => toggleFilter(false)}
              multiFilter={multiFilter}
              setMultiFilter={setMultiFilter}
              isFilterOpen={isFilterOpen}
            />
          )}
      </div>
    </div>
  );
};

export default MTOActionToolBar;
