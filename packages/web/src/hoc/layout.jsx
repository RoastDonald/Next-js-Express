import React, { Fragment } from "react";
import { Footer, Header } from '@/components/layout';

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
