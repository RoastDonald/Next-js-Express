import React, { Fragment } from "react";

import Header from "../components/header/header.component";
import Footer from "../components/footer/footer.component";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
