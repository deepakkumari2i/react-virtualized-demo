import React, { useEffect, useRef } from "react";

const DynamicItem = ({ itemCount, style }: any) => {
  const itemRef = useRef<any>(null);

  // useEffect(() => {
  //   if (itemRef.current) {
  //     const height = itemRef.current.getBoundingClientRect().height;
  //     updateSize(index, height);
  //   }
  // }, [index, data, updateSize]);

  const products = Array.from({ length: itemCount });
  // const products = data?.products?.split(",");

  const item = {
    displayName: "Generic Name",
    ndc: "1987654321",
    distributor: "XXXXXXXXXXXXXXXXXX",
    quantity: "5 vials / 100 mg / 100 ml",
  };

  return (
    <div
      ref={itemRef}
      className="m-4 w-90 border-1 border-round-md"
      style={{ ...style }}
    >
      <div className="card p-3">
        <div className="text-bold">Bin: {item.distributor}</div>
        <div className="m-3">
          {products?.map((_: any, index: any) => (
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

export default DynamicItem;
