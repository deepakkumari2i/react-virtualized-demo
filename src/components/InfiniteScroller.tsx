import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { InfiniteLoader, List } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import DynamicItem from "./DynamicItem";

// This example assumes you have a way to know/load this information
const remoteRowCount = 100;

const list: any = ["test"];

function isRowLoaded({ index }: any) {
  return !!list[index];
}

function rowRenderer({ key, index, style }: any) {
  return <DynamicItem data={list[index]} index={index} style={style} />;
}

// Render your list
const InfiniteScroller = () => {
  const [lazyItems, setLazyItems] = useState<any>(
    Array.from({ length: 10000 })
  );
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_LIMIT = 20;

  useEffect(() => {
    if (currentPage) {
      // fetchMoreItems(currentPage);
      // setCurrentPage((prevPage: any) => prevPage + 1);
    }
  }, [currentPage]);

  const fetchMoreItems = async (startIndex: any) => {
    let nextPage = Math.ceil(startIndex / PAGE_LIMIT) + 1;
    const start = (nextPage - 1) * PAGE_LIMIT;
    let position = start;

    const response = await fetch(
      `http://localhost:3002/getProducts?page=${startIndex}&limit=${PAGE_LIMIT}`
    );
    const { data, pagination }: any = await response.json();
    lazyItems.length = pagination.total;
    if (!totalRecords) setTotalRecords(pagination.total);
    console.log("data", data);
    setLazyItems((prevItems: any) => [...prevItems, ...data]);
    data?.forEach((item: any) => {
      lazyItems.splice(position, 1, item);
      position++;
    });
    // Store response data in list...
  };

  const loadMoreRows = async ({ startIndex, stopIndex }: any) => {
    console.log("star", startIndex, stopIndex);

    if (
      lazyItems[startIndex + PAGE_LIMIT] === undefined ||
      lazyItems[startIndex + PAGE_LIMIT / 2] === undefined
    ) {
      // fetchMoreItems(startIndex);
    }
    // fetchMoreItems(startIndex);
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={remoteRowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          height={700}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={totalRecords}
          rowHeight={100}
          rowRenderer={rowRenderer}
          width={1300}
        />
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScroller;
