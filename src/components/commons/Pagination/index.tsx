import ReactPaginate from "react-paginate";
import {
  paginate,
  pageItem,
  prevNextItem,
  selected,
  disabledBtn,
} from "./style.css";
import { useTranslation } from "react-i18next";
export interface PaginationProps {
  page: number;
  handleChangePage: (page: number) => void;
  handleChangePerPage?: (page: number) => void;
  pageCount: number;
}

const Pagination = ({ page, pageCount, handleChangePage }: PaginationProps) => {
  const { t } = useTranslation();

  const handlePageClick = (e: { selected: number }) => {
    handleChangePage(e.selected + 1);
  };

  const prevClasses = `${prevNextItem} ${page === 1 ? disabledBtn : ''}`;
  const nextClasses = `${prevNextItem} ${page === pageCount ? disabledBtn : ''}`;

  return (
    <ReactPaginate
      className={paginate}
      pageClassName={pageItem}
      breakClassName={pageItem}
      previousClassName={prevClasses}
      nextClassName={nextClasses}
      activeClassName={selected}
      nextLabel={t('pagination.next')}
      previousLabel={t('pagination.previous')}
      forcePage={page - 1}
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageCount < 4 ? pageCount : 4}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

