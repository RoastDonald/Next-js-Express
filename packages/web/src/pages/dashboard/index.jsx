import React, { Suspense } from "react";
import { Spinner } from '@/components';
import { Header, Panel, Main } from "./layout";
import { Outlet } from 'react-router-dom';


const Dashboard = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Panel />
        <div style={{ marginTop: 88, width: 'calc(100% - 254px)' }}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
