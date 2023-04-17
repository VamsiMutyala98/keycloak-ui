import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export const GridLoading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="three-circles-rotating"
        outerCircleColor="#1d5b8e"
        innerCircleColor="#81ba56"
        middleCircleColor="#D0232A"
      />
    </div>
  );
};
