import { useReducer } from "react";

export default function usePagination(initialTotalNumberOfItems, initialItems) {
  const [pagination, dispatch] = useReducer({});

  return pagination;
}
