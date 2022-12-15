import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { maxMobileMediaWidth } from "config/constants";

import PaginationInput from "components/Pagination/components/PaginationInput";
import VectorIcon from "components/Icons/VectorIcon";

import animateScrollTo from "utils/animateScrollTo";

import { PaginatedItemsProps } from "./types";

const Pagination: FC<PaginatedItemsProps> = ({ limit, count, pageClick, page }) => {
  const { t } = useTranslation();
  const [inputValue , setInputValue] = useState<number|null>(null);

  const [pageCount, setPageCount] = useState(0);
  const isMobile = useMediaQuery({
    query: `(max-width: ${maxMobileMediaWidth}px)`,
  });
  useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(count / limit));
  }, [limit]);

  const changePage = (selected: number) => {
    if (page === selected+1) {
      animateScrollTo(0, 500);
      return;
    }
    setInputValue(null);
    pageClick(selected + 1);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    changePage(selected);
  };

  return (
    <div className="bn-pagination">
      <ReactPaginate
        disabledLinkClassName={'disabledLinkClassName'}
        disabledClassName={'disabledClassName'}
        className="pagination"
        breakLabel="..."
        previousLabel={<VectorIcon/>}
        nextLabel={<VectorIcon/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 3 : 5}
        pageCount={pageCount}
        forcePage={page-1}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={1}
        containerClassName="pagination"
        activeClassName="active"
      />
      <div className="bn-pagination__search_wrapper">
        {!isMobile && t("naming.on")} <PaginationInput
          type="number"
          className="bn-pagination__search"
          onChange={changePage}
          lastPage={pageCount}
          value={inputValue}
          setValue={setInputValue}
        />
      </div>
    </div>
  );
};

export default Pagination;