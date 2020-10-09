import React, { Fragment } from "react";
import HomeSlider from "./components/slider/slider.component";
import BestBySelling from "./components/best-selling/best-selling.component";

const Home = () => {
  return (
    <Fragment>
      <HomeSlider />
      <BestBySelling />
    </Fragment>
  );
};

export default Home;
