# Paginact

This package offers only one thing— a custom React hook—  **usePagination()** hook. This hook handles all the stateful logic needed to implement (Offset-based) ***Pagination***  in your **React/React Native** app. 
## Installation 

```bash
npm install paginact
```
Or,

```bash
yarn add paginact
```
## Usage

```javascript
import usePagination from "paginact";

function App() {
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
    setTotalNumberOfItems, //Use it to set Total Number of Items
    setItemsPerPage, //Use it to set Number of Items per Page
    setCurrentPageIndex, //Use it to set the Index of Current Page
  } = usePagination(97, 10, 1);
// Pagination for 97 items, and 10 items per page with current page number 1.
```
**Note**:  Both Page Indices and Item Indices here start from 1, not 0.


## API Reference

#### usePagination()

```javascript
  usePagination(
  initialTotalNumberOfItems = 0,
  initialItemsPerPage,
  initialCurrentPageIndex
)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.
## FAQ

#### Can I use it in React Native?

Only pure React here, so, yes, you can use it in your React Native project, too.
