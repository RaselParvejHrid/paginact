const actionTypes = {
  TOTAL_NUMBER_OF_ITEMS: "Total Changed",
  ITEMS_PER_PAGE: "Items per Page Changed",
  CURRENT_PAGE_INDEX: "Current Page Index Changed",
};

export const actionCreators = {
  totalNumberOfItems: (total) => {
    return {
      type: actionTypes.TOTAL_NUMBER_OF_ITEMS,
      payload: {
        totalNumberOfItems: total,
      },
    };
  },
  itemsPerPage: (itemsPerPage) => {
    return {
      type: actionTypes.ITEMS_PER_PAGE,
      payload: {
        itemsPerPage: itemsPerPage,
      },
    };
  },
  currentPageIndex: (currentPageIndex) => {
    return {
      type: actionTypes.CURRENT_PAGE_INDEX,
      payload: {
        currentPageIndex: currentPageIndex,
      },
    };
  },
};

export const defaultInitialState = {
  totalNumberOfItems: 0,
  itemsPerPage: 0,
  numberOfPages: 0,
  firstPageIndex: null,
  lastPageIndex: null,
  currentPageIndex: null,
  offset: 0,
  startItemIndexOnCurrentPage: null,
  endItemIndexOnCurrentPage: null,
  previousPageIndex: null,
  nextPageIndex: null,
};

export function paginationReducer(state, action) {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case actionTypes.TOTAL_NUMBER_OF_ITEMS:
      if (payload.totalNumberOfItems === 0) {
        return defaultInitialState;
      }
      newState.totalNumberOfItems = payload.totalNumberOfItems;
    //Intentionally omitting break statement
    case actionTypes.ITEMS_PER_PAGE:
      if (type === actionTypes.ITEMS_PER_PAGE) {
        newState.itemsPerPage = payload.itemsPerPage;
      }
    //Intentionally omitting break statement
    case actionTypes.CURRENT_PAGE_INDEX:
      if (type === actionTypes.CURRENT_PAGE_INDEX) {
        newState.currentPageIndex = payload.currentPageIndex;
      }
    //Intentionally omitting break statement
    default:
      return calculateDependentStateVariables(newState);
  }
}

export function calculateDependentStateVariables(state) {
  /*
        totalNumberOfItems is a Non-Negative Integer here.
        itemsPerPage is a Positive Integer here.
        currentPageIndex is a Positive Integer here.
        Above three are independent state variables,
        meaning they can change independently.
    */
  state.numberOfPages = Math.ceil(
    state.totalNumberOfItems / state.itemsPerPage
  );
  /* Pages are 1-indexed */
  state.firstPageIndex = 1;
  state.lastPageIndex = state.numberOfPages;
  state.previousPageIndex =
    state.currentPageIndex === state.firstPageIndex
      ? null
      : state.currentPageIndex - 1;
  state.lastPageIndex =
    state.currentPageIndex === state.lastPageIndex
      ? null
      : state.currentPageIndex + 1;

  state.offset =
    (state.previousPageIndex ? state.previousPageIndex : 0) *
    state.itemsPerPage;

  state.startItemIndexOnCurrentPage = state.offset + 1;
  state.endItemIndexOnCurrentPage =
    state.currentPageIndex === state.lastPageIndex
      ? state.totalNumberOfItems
      : state.offset + state.itemsPerPage;

  return state;
}
