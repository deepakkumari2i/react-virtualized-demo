import { useState, useEffect } from "react";
import {
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css"; // Import default styles
import DynamicItem from "./DynamicItem";

const generateData = (count: any) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    text: `Item ${index + 1}`,
    height: Math.floor(Math.random() * 1000) + 50, // Dynamic height between 50 and 150
    itemCount: Math.floor(Math.random() * 5) + 1,
  }));
};

const InfiniteScrollList = () => {
  const [items, setItems] = useState<any>(generateData(1000));
  const [item, setItem] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const isRowLoaded = ({ index }: any) => {
    return !!items?.[index];
  };

  //   useEffect(() => {
  //     //   loadMoreRows(1);
  //     const newItems = generateData(20);
  //     let startIndex = 1;
  //     const itemss: any = newItems.forEach((item) => {
  //       itemss.splice(startIndex, 1, item);
  //       startIndex++;
  //     });
  //     setItems(itemss);
  //   }, []);

  const loadMoreRows = ({ startIndex }: any) => {
    console.log("start index: " + startIndex);
    // return new Promise(() => {
    //   setTimeout(() => {
    //     console.log("items.length", items.length);
    //     if (startIndex >= 1000) {
    //       setHasMore(false);
    //       //   resolve();
    //       return;
    //     }
    //     const newItems = generateData(20);
    //     setItem(newItems);
    //     const itemss = newItems.forEach((item) => {
    //       items.splice(startIndex + 1, 1, item);
    //       startIndex++;
    //     });
    //     setItems(itemss);
    //     // resolve();
    //   }, 1000);
    // });
  };

  const rowRenderer = ({ key, index, parent, style }: any) => {
    const item = items?.[index];

    if (!item) {
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );
    }

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {/* <div
          style={{
            ...style,
            height: item.height,
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {item.text} (Height: {item.height}px)
        </div> */}
        <DynamicItem itemCount={item.itemCount} style={style} />
      </CellMeasurer>
    );
  };

  //   if (items?.length) {
  return (
    // <InfiniteLoader
    //   isRowLoaded={isRowLoaded}
    //   loadMoreRows={loadMoreRows}
    //   rowCount={hasMore ? items?.length + 1 : items?.length}
    // >
    //   {({ onRowsRendered, registerChild }) => (
    <List
      height={600}
      //   onRowsRendered={onRowsRendered}
      //   ref={registerChild}
      rowCount={items?.length}
      rowHeight={cache.rowHeight}
      rowRenderer={rowRenderer}
      width={800}
      deferredMeasurementCache={cache}
    />
  );
};
// </InfiniteLoader>
//   );
//   }
// };

export default InfiniteScrollList;
