import React from "react";

import Header from "../components/header/header.component";
import Footer from "../components/footer/footer.component";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
