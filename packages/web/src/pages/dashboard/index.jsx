import React, { Fragment } from "react";
import { Header, Panel, Main } from "./layout";


const Wrapper = ({ children }) => (
  <div style={{ marginTop: '12vh' }}>
    {children}
  </div>
);


const Dashboard = (props) => {
  return (
    <Fragment>
      <Header />
      <Wrapper>
        <Panel />
        <Main />
      </Wrapper>

    </Fragment>
  );
};

export default Dashboard;
