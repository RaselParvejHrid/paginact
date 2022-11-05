import { useReducer } from "react";
import {
  paginationReducer,
  defaultInitialState,
  calculateDependentStateVariables,
  actionCreators,
} from "./state/pagination.js";

export default function usePagination(
  initialTotalNumberOfItems = 0,
  initialItemsPerPage = 0,
  initialCurrentPageIndex = null
) {
  const initialState = { ...defaultInitialState };

  if (
    initialTotalNumberOfItems > 0 &&
    Number.isSafeInteger(initialTotalNumberOfItems)
  ) {
    initialState.totalNumberOfItems = initialTotalNumberOfItems;
    initialState.itemsPerPage = 1;
    initialState.currentPageIndex = 1;
    if (initialItemsPerPage > 1 && Number.isSafeInteger(initialItemsPerPage)) {
      initialState.itemsPerPage = initialItemsPerPage;
      if (
        initialCurrentPageIndex > 1 &&
        Number.isSafeInteger(initialCurrentPageIndex) &&
        (initialCurrentPageIndex - 1) * initialItemsPerPage <
          initialTotalNumberOfItems
      ) {
        initialState.currentPageIndex = 1;
      }
    }
    calculateDependentStateVariables(initialState);

    console.info(
      "@tarui/paginact",
      "Initialializing Pagination State",
      "totalNumberOfItems: ",
      initialState.totalNumberOfItems,
      "itemsPerPage: ",
      initialState.itemsPerPage,
      "currentPageIndex: ",
      initialState.currentPageIndex
    );
  }

  const [pagination, dispatch] = useReducer(paginationReducer, initialState);

  const {
    totalNumberOfItems,
    itemsPerPage,
    numberOfPages,
    firstPageIndex,
    lastPageIndex,
    currentPageIndex,
    offset,
    startItemIndexOnCurrentPage,
    endItemIndexOnCurrentPage,
    previousPageIndex,
    nextPageIndex,
  } = pagination;

  const setTotalNumberOfItems = (total) => {
    if (total >= 0 && Number.isSafeInteger(total)) {
      dispatch(actionCreators.totalNumberOfItems(total));
    } else {
      throw new Error("totalNumberOfItems must be a non-negative integer.");
    }
  };

  const setItemsPerPage = (itemsPerPage) => {
    if (itemsPerPage >= 1 && Number.isSafeInteger(itemsPerPage)) {
      dispatch(actionCreators.itemsPerPage(itemsPerPage));
    } else {
      throw new Error("itemsPerPage must be a positive integer.");
    }
  };

  const setCurrentPageIndex = (currentPageIndex) => {
    if (
      currentPageIndex >= 1 &&
      Number.isSafeInteger(currentPageIndex) &&
      currentPageIndex <= pagination.numberOfPages
    ) {
      dispatch(actionCreators.currentPageIndex(currentPageIndex));
    } else {
      throw new Error(
        "currentPageIndex must be a positive integer, and not greater than numberOfPages."
      );
    }
  };
  return {
    totalNumberOfItems,
    itemsPerPage,
    numberOfPages,
    firstPageIndex,
    lastPageIndex,
    currentPageIndex,
    offset,
    startItemIndexOnCurrentPage,
    endItemIndexOnCurrentPage,
    previousPageIndex,
    nextPageIndex,
    setTotalNumberOfItems,
    setItemsPerPage,
    setCurrentPageIndex,
  };
}
