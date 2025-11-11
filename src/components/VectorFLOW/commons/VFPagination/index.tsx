import {
  gridFilterWrapper,
  textBtn,
} from "../../../../VectorFlow/Pages/MTO/Common/VFPagination/styles.css";
import {
  PaginationWrapper,
  StatusBarLabel,
  StatusBarLabelLight,
  StatusBarLabelBold,
  PaginationContainer,
  PaginationArrowIcon,
  PaginationArrowIconDisabled,
  PaginationArrowIconEnabled,
} from "./styles.css";
import { CSSProperties } from "react";
import { useUserData } from "../../../../context";

export interface VFPaginationProps{
    selectedRows:number
    totalRows:number
    currentPage:number
    rowsPerPage:number
    handleChangePage:(e:any)=>void
    handleChangePerPage?:(e:any)=>void
    showTotalItems?:boolean,
    showPagination?:boolean,
    style?:CSSProperties,
    resetGridRef?: any,
    isDisabled?:any,
    isClearGridFilter?:boolean,
    customPageSizeEnabled?:any,
    userPageSize?:number,
    savePageSize?:(pageSize:number)=>void
}

const VFPagination = (props: VFPaginationProps) => {
  const {
    totalRows,
    currentPage,
    rowsPerPage,
    style,
    handleChangePage,
    resetGridRef,
    isDisabled,
    isClearGridFilter = true,
  } = props;

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const defaultPaginationLimit = 100;
  const totalPages = Math.max(
    Math.ceil(totalRows / (props.rowsPerPage || defaultPaginationLimit)),
    1
  );

  // const totalPages = Math.ceil(totalRows/rowsPerPage)

  const getTotalItemsString = () => {
    if (totalRows === 0) return `0 to ${totalRows}`;
    if (totalRows <= rowsPerPage) return `1 to ${totalRows}`;
    if (currentPage === 1) return `1 to ${rowsPerPage}`;
    const start = currentPage * rowsPerPage - rowsPerPage + 1;
    const end = currentPage * rowsPerPage;
    // console.debug(end,totalRows)
    if (end >= totalRows) return `${start} to ${totalRows}`;
    return `${start} to ${currentPage * rowsPerPage}`;
  };

  const handleOnClick = (newPage: number) => {
    if (newPage === currentPage) return;
    if (newPage > totalPages) return;
    if (newPage < 1) return;
    return handleChangePage(newPage);
  };

  const clearGridFilter = () => {
    if (resetGridRef?.current?.api) {
      resetGridRef.current.api.setFilterModel(null);
      resetGridRef.current.api.onFilterChanged();
    }
  };
  const brand = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";

  return (
    <div
      className={PaginationWrapper}
      data-testid="vf_pagination"
      style={style}
    >
      <div className={PaginationContainer}>
        {isClearGridFilter && (
          <div className={gridFilterWrapper}>
            <button
              className={textBtn[brand]}
              onClick={clearGridFilter}
              disabled={isDisabled}
            >
              Clear All Grid Filters
            </button>
          </div>
        )}

        <div className={StatusBarLabel}>
          <div className={StatusBarLabelBold}>{getTotalItemsString()}</div>
          <div className={StatusBarLabelLight}>of</div>
          <div className={StatusBarLabelBold}>{totalRows}</div>
        </div>

        <div className={StatusBarLabel} style={{ marginLeft: "10px" }}>
          {/* First page */}
          <img
            src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
            alt="pagination-last-prev-arrow"
            className={`${PaginationArrowIcon} ${
              currentPage === 1
                ? PaginationArrowIconDisabled
                : PaginationArrowIconEnabled
            }`}
            style={{ transform: "rotate(180deg)" }}
            onClick={() => currentPage !== 1 && handleOnClick(1)}
          />

          {/* Prev page */}
          <img
            src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
            alt="pagination-prev-arrow"
            className={`${PaginationArrowIcon} ${
              currentPage === 1
                ? PaginationArrowIconDisabled
                : PaginationArrowIconEnabled
            }`}
            style={{ transform: "rotate(180deg)" }}
            onClick={() => currentPage !== 1 && handleOnClick(currentPage - 1)}
          />

          <div className={StatusBarLabelLight}>Page</div>
          <div className={StatusBarLabelBold}>{currentPage}</div>
          <div className={StatusBarLabelLight}>of</div>
          <div className={StatusBarLabelBold}>{totalPages}</div>

          {/* Next page */}
          <img
            src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
            alt="pagination-next-arrow"
            className={`${PaginationArrowIcon} ${
              currentPage === totalPages
                ? PaginationArrowIconDisabled
                : PaginationArrowIconEnabled
            }`}
            onClick={() =>
              currentPage !== totalPages && handleOnClick(currentPage + 1)
            }
          />

          {/* Last page */}
          <img
            src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
            alt="pagination-last-next-arrow"
            className={`${PaginationArrowIcon} ${
              currentPage === totalPages
                ? PaginationArrowIconDisabled
                : PaginationArrowIconEnabled
            }`}
            onClick={() =>
              currentPage !== totalPages && handleOnClick(totalPages)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VFPagination;
