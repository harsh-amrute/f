import { useEffect, useState } from 'react';
import { useUserData } from '../../../../../context';
import {
  paginationWrapper,
  paginationContainer,
  gridFilterWrapper,
  statusBarWrapper,
  statusBarLabel,
  statusBarLabelLight,
  statusBarLabelBold,
  arrowIcon,
  arrowIconDisabled,
  rotate180,
  ml10,
  textBtn,
} from './styles.css';
import CustomPageSizeInput from './CustomPageSizeInput';

export interface VFPaginationProps {
  selectedRows: number;
  totalRows: number;
  currentPage: number;
  rowsPerPage: number;
  handleChangePage: (page: number) => void; // tighten type
  handleChangePerPage?: (n: number) => void;
  showTotalItems?: boolean;
  showPagination?: boolean;
  resetGridRef?: any;
  isDisabled?: boolean;
  customPageSizeEnabled?: boolean;
  savePageSize?: (n: number) => void; // align with child
  userPageSize?: number;
}

const VFPagination = (props: VFPaginationProps) => {
  const {
    totalRows,
    currentPage,
    rowsPerPage,
    handleChangePage,
    resetGridRef,
    isDisabled,
    customPageSizeEnabled,
    savePageSize,
    userPageSize,
  } = props;

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [customPageSize, setCustomPageSize] = useState<number | undefined>();

  useEffect(() => {
    setCustomPageSize(userPageSize);
  }, [userPageSize]);

  const defaultPaginationLimit = 100;
  const totalPages = Math.max(
    1,
    Math.ceil(totalRows / (rowsPerPage || defaultPaginationLimit))
  );

  const clearGridFilter = () => {
    resetGridRef?.current?.api.setFilterModel(null);
  };

    const getTotalItemsString = () => {
        if (totalRows === 0) return "0 to 0"; 
        if (totalRows <= rowsPerPage) return `1 to ${totalRows}`;
        if (currentPage === 1) return `1 to ${rowsPerPage}`;
        const start = (currentPage * rowsPerPage) - rowsPerPage + 1;
        const end = (currentPage) * rowsPerPage;
        // console.debug(end,totalRows)
        if (end >= totalRows) return `${start} to ${totalRows}`;
        return `${start} to ${(currentPage) * rowsPerPage}`;
    }

  const handleOnClick = (newPage: number) => {
    if (newPage === currentPage) return;
    if (newPage > totalPages) return;
    if (newPage < 1) return;
    handleChangePage(newPage);
  };

  const brand = themeUi === 'REGALBLAZE' ? 'REGALBLAZE' : 'DEFAULT';

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className={paginationWrapper} data-testid="vf_pagination">
      <div className={paginationContainer}>
        <div className={gridFilterWrapper}>
          <button
            className={textBtn[brand]}
            onClick={clearGridFilter}
            disabled={isDisabled}
            type="button"
          >
            Clear All Grid Filters
          </button>
        </div>

        <div className={statusBarWrapper}>
          {customPageSizeEnabled && (
            <CustomPageSizeInput
              savePageSize={savePageSize}
              userPageSize={userPageSize}
            />
          )}

          <div className={statusBarLabel} aria-live="polite">
            <div className={statusBarLabelBold}>{getTotalItemsString()}</div>
            <div className={statusBarLabelLight}>of</div>
            <div className={statusBarLabelBold}>{totalRows}</div>
          </div>

          <div className={`${statusBarLabel} ${ml10}`}>
            <img
              className={`${arrowIcon} ${isFirst ? arrowIconDisabled : ''} ${rotate180}`}
              src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
              onClick={() => handleOnClick(1)}
              alt="Go to first page"
            />
            <img
              className={`${arrowIcon} ${isFirst ? arrowIconDisabled : ''} ${rotate180}`}
              src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
              onClick={() => handleOnClick(currentPage - 1)}
              alt="Go to previous page"
            />
            <div className={statusBarLabelLight}>Page</div>
            <div className={statusBarLabelBold}>{currentPage}</div>
            <div className={statusBarLabelLight}>of</div>
            <div className={statusBarLabelBold}>{totalPages}</div>
            <img
              className={`${arrowIcon} ${isLast ? arrowIconDisabled : ''}`}
              src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
              onClick={() => handleOnClick(currentPage + 1)}
              alt="Go to next page"
            />
            <img
              className={`${arrowIcon} ${isLast ? arrowIconDisabled : ''}`}
              src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
              onClick={() => handleOnClick(totalPages)}
              alt="Go to last page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VFPagination;
