"use client";

import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

// Безпечне розпакування експорту для Next.js
const ReactPaginate =
  typeof ReactPaginateModule === "function"
    ? ReactPaginateModule
    : (ReactPaginateModule as unknown as { default: typeof ReactPaginateModule })
        .default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  if (!ReactPaginate) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={(event) => onPageChange(event.selected)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
    />
  );
}