import { useEffect, useReducer } from "react";
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
  const [pagination, dispatch] = useReducer(
    paginationReducer,
    defaultInitialState
  );

  useEffect(() => {
    const initialPayload = {};
    if (
      initialTotalNumberOfItems > 0 &&
      Number.isSafeInteger(initialTotalNumberOfItems)
    ) {
      initialPayload.totalNumberOfItems = initialTotalNumberOfItems;
      initialPayload.itemsPerPage = 1;
      initialPayload.currentPageIndex = 1;
      if (
        initialItemsPerPage > 1 &&
        Number.isSafeInteger(initialItemsPerPage)
      ) {
        initialPayload.itemsPerPage = initialItemsPerPage;
        if (
          initialCurrentPageIndex > 1 &&
          Number.isSafeInteger(initialCurrentPageIndex) &&
          (initialCurrentPageIndex - 1) * initialItemsPerPage <
            initialTotalNumberOfItems
        ) {
          initialPayload.currentPageIndex = 1;
        }
      }
      calculateDependentStateVariables(initialState);
      dispatch(actionCreators.initialize(initialPayload));
    }
  }, []);

  useEffect(() => {
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
  }, [totalNumberOfItems, itemsPerPage]);

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
