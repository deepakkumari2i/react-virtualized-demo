import "./App.css";
import InfiniteScroller from "./components/InfiniteScroller";
import InfiniteScrollerAPI from "./components/InfiniteScrollerAPI";
import InfiniteScrollerDynamic from "./components/InfiniteScrollerDynamic";
import VirtualizedListWithDynamicHeights from "./components/VirutualizedScroller";

function App() {
  return (
    <>
      {/* <VirtualizedListWithDynamicHeights /> */}
      {/* <InfiniteScroller /> */}
      {/* <InfiniteScrollerDynamic /> */}
      <InfiniteScrollerAPI />
    </>
  );
}

export default App;
