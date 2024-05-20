import React, { useState, useEffect, useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
// import axios from "axios";
// import DynamicItem from "./DynamicItem";

const API_URL = "http://localhost:3002/getProducts";

const DynamicItem = ({ data, index, style }: any) => {
  const item = {
    displayName: "Generic Name",
    ndc: "1987654321",
    distributor: "XXXXXXXXXXXXXXXXXX",
    quantity: "5 vials / 100 mg / 100 ml",
  };
  const products: any = ["test", "test2", "test3"];
  console.log("data", data);

  return (
    <div
      style={{ ...style }}
      className="m-4 w-90 border-1 border-round-md mb-2"
    >
      <div className="card p-3">
        <div className="text-bold">Bin: {data.bin}</div>
        <div className="m-3">
          {products?.map((_: any, index: number) => (
            <div key={index} className="border-1 border-round-md mt-3">
              <div className="p-3">
                <span className="text-bold">Display Name: </span>
                {item.displayName}
              </div>
              <div className="grid dir-col p-3">
                <div className="col">
                  <span className="text-bold">NDC: </span>
                  {item.ndc}
                </div>
                <div className="col">
                  <span className="text-bold">Distributor: </span>
                  {item.distributor}
                </div>
                <div className="col">
                  <span className="text-bold">Quantity: </span>
                  {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualScroller = () => {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  //   const listRef = useRef();
  const PAGE_LIMIT = 20;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    if (!hasMore) return;
    const page = items.length / PAGE_LIMIT;

    try {
      const response = await fetch(
        `http://localhost:3002/getProducts?page=${page}&limit=${PAGE_LIMIT}`
      );
      const { data, pagination } = await response.json();
      const newItems = data;
      setTotalRecords(pagination.total);

      setItems((prevItems: any) => [...prevItems, ...newItems]);
      if (newItems.length < 20) setHasMore(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      //   setLazyLoading(false);
    }
  };

  const getItemSize = useCallback(
    (index: number) => items[index]?.height || 500,
    [items]
  );

  const isItemLoaded = (index: any) => !!items[index];

  const loadMoreItems = (startIndex: any, stopIndex: any) => {
    console.log("sta", startIndex, stopIndex);
    if (stopIndex >= items.length - 1) {
      fetchItems();
    }
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={1000}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }: any) => (
        <List
          height={500}
          itemCount={totalRecords}
          itemSize={getItemSize}
          width="100%"
          ref={ref}
          onItemsRendered={onItemsRendered}
        >
          {({ index, style }) => (
            <DynamicItem data={items} index={index} style={style} />
          )}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default VirtualScroller;
