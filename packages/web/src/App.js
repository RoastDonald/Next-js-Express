import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { Layout, SecureRoute } from "@/hoc";
import { Spinner } from "@/components";
import Roles from "@/utils/role";
import { selectCurrentUser } from "@/redux/user/user.selectors";

import NotFound from "@/pages/404";
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/user-dashboard"));
const Shop = lazy(() => import("@/pages/shop/shop.page"));

const App = ({ currentUser }) => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} currentUser={currentUser} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} currentUser={currentUser} />}
          />
          <Route path="/shop" render={(props) => <Shop {...props} />} />
          <SecureRoute
            path={["/user", "/admin"]}
            roles={[Roles.User, Roles.Admin]}
            component={(props) => (
              <Dashboard {...props} currentUser={currentUser} />
            )}
          />
          <SecureRoute
            path="/admin/dashboard"
            roles={[Roles.Admin]}
            component={(props) => (
              <Dashboard {...props} currentUser={currentUser} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
