import { useState, useEffect } from "react";
import { InfiniteLoader, List } from "react-virtualized";
import DynamicItem from "./DynamicItem";

const generateSampleData = (start: any, end: any) => {
  const data = [];
  for (let i = start; i <= end; i++) {
    data.push({ id: i, content: `Item ${i}` });
  }
  return data;
};

const fetchSampleData = (start: any, end: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateSampleData(start, end));
    }, 1000);
  });
};

const VirtualizedListWithDynamicHeights = () => {
  const [items, setItems] = useState<any>([]);
  const [heights, setHeights] = useState<any>({});
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchMoreItems();
  }, []);

  const fetchMoreItems = async () => {
    if (!hasMore) return;

    try {
      const start = items.length;
      const newItems: any = await fetchSampleData(start, start + 19);
      setItems((prevItems: any) => [...prevItems, ...newItems]);
      if (newItems.length < 20) setHasMore(false);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const updateSize = (index: number, height: any) => {
    setHeights((prevHeights: any) => ({ ...prevHeights, [index]: height }));
  };

  const getRowHeight = ({ index }: any) => heights[index] || 50;

  const isRowLoaded = ({ index }: any) => !!items[index];

  // const loadMoreRows = ({ startIndex }: any) => {
  //   if (stopIndex >= items.length - 1) {
  //     fetchMoreItems();
  //   }
  // };

  const loadMoreRows = async ({ startIndex, stopIndex }: any) => {
    return await fetch(
      `path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`
    ).then((response) => {
      // Store response data in list...
    });
  };

  const rowRenderer = ({ index, key, style }: any) => {
    if (!isRowLoaded({ index })) {
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );
    }

    return (
      <DynamicItem
        key={key}
        data={items[index]}
        index={index}
        updateSize={updateSize}
        style={style}
      />
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      // rowCount={remoteRowCount}
    >
      {() => (
        <List
          height={100}
          rowCount={items.length}
          rowHeight={getRowHeight}
          rowRenderer={rowRenderer}
          width={100}
          onRowsRendered={({ overscanStopIndex }) => {
            if (overscanStopIndex >= items.length - 1 && hasMore) {
              fetchMoreItems();
            }
          }}
        />
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedListWithDynamicHeights;
