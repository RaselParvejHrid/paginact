const actionTypes = {
  TOTAL_NUMBER_OF_ITEMS: "Total Changed",
  ITEMS_PER_PAGE: "Items per Page Changed",
  CURRENT_PAGE_INDEX: "Current Page Index Changed",
};

export const actionCreators = {
  totalNumberOfItems: (total) => {
    if (total < 0 || !Number.isSafeInteger(total)) {
      throw new Error("totalNumberOfItems must be a non-negative integer.");
    }
    return {
      type: actionTypes.TOTAL_NUMBER_OF_ITEMS,
      payload: {
        totalNumberOfItems: total,
      },
    };
  },
  itemsPerPage: (itemsPerPage) => {
    if (itemsPerPage <= 0 || !Number.isSafeInteger(itemsPerPage)) {
      throw new Error("itemsPerPage must be a positive integer.");
    }
    return {
      type: actionTypes.ITEMS_PER_PAGE,
      payload: {
        itemsPerPage: itemsPerPage,
      },
    };
  },
  currentPageIndex: (currentPageIndex) => {
    if (currentPageIndex <= 0 || !Number.isSafeInteger(currentPageIndex)) {
      throw new Error("currentPageIndex must be a positive integer.");
    }
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
  switch (action.type) {
    case actionTypes.TOTAL_NUMBER_OF_ITEMS:
      return { ...state, items: [...state.items, action.payload] };
    case actionTypes.ITEMS_PER_PAGE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case actionTypes.CURRENT_PAGE_INDEX:
      return AudioListener;
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
