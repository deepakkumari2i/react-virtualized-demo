import React, { useState, useEffect, useCallback } from "react";
import {
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css";

const InfiniteScrollList = () => {
  const [items, setItems] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState(100);
  const PAGE_LIMIT = 20;
  const [totalCount, setCount] = useState<number>(0);

  const generateData = (count: any) => {
    setCount(totalCount + count);
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      text: `Item ${index + 1}`,
      productsLength: Math.floor(Math.random() * 5) + 1,
      height: Math.floor(Math.random() * 100) + 50,
    }));
  };

  const fetchItems = async (page: any, limit: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = generateData(limit);
        resolve(newItems);
      }, 1000);
    });
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  useEffect(() => {
    // Initial fetch
    fetchItems(1, PAGE_LIMIT).then((data: any) => setItems(data));
  }, []);

  const isRowLoaded = ({ index }: any) => !!items[index];

  const loadMoreRows = ({ startIndex, stopIndex }: any) => {
    const page = Math.floor(startIndex / PAGE_LIMIT) + 1;
    return fetchItems(page, PAGE_LIMIT).then((newItems: any) => {
      setItems((prevItems: any) => [...prevItems, ...newItems]);
    });
  };

  const rowRenderer = ({ key, index, parent, style }: any) => {
    const item = items[index];

    const products = Array.from({ length: item.productsLength });
    // console.log(products);

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style} className="item" ref={measure}>
            {item ? (
              <div className="card p-3">
                <div className="text-bold">Bin: {item.text}</div>
                <div className="m-3">
                  {products.map((product: any, idx: any) => (
                    <div key={idx} className="border-1 border-round-md mt-3">
                      <div className="p-3">
                        <span className="text-bold">Display Name: </span>
                        {item.text}
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
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </CellMeasurer>
    );
  };

  const onScroll = ({ clientHeight, scrollHeight, scrollTop }: any) => {
    console.log("onScroll", clientHeight, scrollHeight, scrollTop);
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={totalRecords}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          height={600}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={items.length}
          onScroll={onScroll}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          width={1000}
          deferredMeasurementCache={cache}
        />
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScrollList;
