import React, { Fragment } from "react";
import { Footer, Header } from "./layout";

const Shop = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Shop;
