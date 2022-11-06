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
//Pagination, initialized for 97 items, and 10 items per page with current page number 1.

```
**Note**:  Both `Page Indices` and `Item Indices` here `start from  1`, not 0.


## API Reference

### usePagination()

```javascript

usePagination(
  initialTotalNumberOfItems = 0,
  initialItemsPerPage = 0,
  initialCurrentPageIndex = null
)

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `initialTotalNumberOfItems` | `number` |  Must be a non-negative integer|
| `initialItemsPerPage` | `number` |  Must be a non-negative integer. If `initialTotalNumberOfItems` is non-zero, this must be non-zero too, and if not provided accordingly, this is set to `1` by default|
| `initialCurrentPageIndex` | `number` |  Must be a positive integer or `null` by default. If invalid against `initialTotalNumberOfItems` and `initialItemsPerPage`, this is set to `1`.|

This hook returns a single object. In the [Usage](#usage) section above is a comprehensive destructuring of the object, showing all the keys of the object. 



### The case when `totalNumberOfItems` is `0`
Either through `initialTotalNumberOfItems` parameter of `usePagination()` hook, or through `setTotalNumberOfItems`, whenever `totalNumberOfItems` is `0`, here is what we get—

```javascript

{
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
}

```

###  Keys of the Object returned by `usePagination()` hook

| Key| Type     | Description                |
| :-------- | :------- | :------------------------- |
| `totalNumberOfItems` | `number` |  A non-negative integer|
| `setTotalNumberOfItems` | `function` |  Takes a single non-negative integer `number` type argument as the new value of `totalNumberOfItems`. Throws error on invalid argument.|
| `itemsPerPage` | `number` |  A non-negative integer. `0` only when `totalNumberOfItems` is `0`.|
| `setItemsPerPage` | `function` |  Takes a single positive integer `number` type argument as the new value of `itemsPerPage`. Throws error on invalid argument.|
| `currentPageIndex` | `number` or `null` |  A positive integer, or `null` only when `totalNumberOfItems` is `0`.|
| `setCurrentPageIndex` | `function` |  Takes a single positive integer `number` type argument as the new value of `currentPageIndex`. The argument must not be greater than `numberOfPages` described below. Throws error on invalid argument.|
| `numberOfPages` | `number` |  A non-negative integer, or `0` only when `totalNumberOfItems` is `0`.|
| `firstPageIndex` | `number` or `null` |  `1`, or `null` only when `totalNumberOfItems` is `0`.|
| `lastPageIndex` | `number` or `null` |  Equal to `numberOfPages`,  or `null` only when `totalNumberOfItems` is `0`.|
| `offset` | `number` |  A non-negative integer. This is the total number of items under the pages before the current page (`currentPageIndex`).|
| `startItemIndexOnCurrentPage` | `number` or `null` |  A positive integer,  or `null` when `totalNumberOfItems` is `0`.|
| `endItemIndexOnCurrentPage` | `number` or `null`|  A positive integer,  or `null` when `totalNumberOfItems` is `0`.|
| `previousPageIndex` | `number` or `null`|  A positive integer, or `null` there is no previous page.|
| `nextPageIndex` | `number` or `null` |  A positive integer, or `null` there is no next page.|


**Note**:  Both `Page Indices` and `Item Indices` here `start from  1`, not 0.


## FAQ

#### Can I use it in React Native?

Only pure React here, so, yes, you can use it in your React Native project, too.
