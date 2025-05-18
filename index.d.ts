declare module "paginact" {
  export interface PaginationState {
    totalNumberOfItems: number;
    itemsPerPage: number;
    numberOfPages: number;
    firstPageIndex: number | null;
    lastPageIndex: number | null;
    currentPageIndex: number | null;
    offset: number;
    startItemIndexOnCurrentPage: number | null;
    endItemIndexOnCurrentPage: number | null;
    previousPageIndex: number | null;
    nextPageIndex: number | null;
  }

  export interface UsePaginationReturn extends PaginationState {
    setTotalNumberOfItems: (total: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    setCurrentPageIndex: (currentPageIndex: number) => void;
  }

  /**
   * React hook for handling pagination logic in UI.
   * @param initialTotalNumberOfItems Initial total number of items.
   * @param initialItemsPerPage Initial items per page.
   * @param initialCurrentPageIndex Initial page index.
   * @returns Pagination state and setters.
   */
  export default function usePagination(
    initialTotalNumberOfItems: number,
    initialItemsPerPage: number,
    initialCurrentPageIndex: number
  ): UsePaginationReturn;
}
