import React, {
  lazy,
  Suspense
} from "react";
import Layout from "./hoc/layout";
import {
  Switch,
  Route
} from "react-router-dom";
import NotFound from "./pages/404";
import Spinner from "./components/spinner";
import SecureRoute from "./hoc/secure-route";
import Roles from "./utils/role";
import {
  connect
} from "react-redux";
import {
  createStructuredSelector
} from "reselect";
import {
  selectCurrentUser
} from "./redux/user/user.selectors";

const HomeLazy = lazy(() => import("./pages/home"));
const LoginLazy = lazy(() => import("./pages/login"));
const UserDashboardLazy = lazy(() => import("./pages/user-dashboard"));
const ShopLazy = lazy(() => import("./pages/shop/shop.page"));
const App = ({
    currentUser
  }) => {
    return ( <
      Layout >
      <
      Suspense fallback = {
        <
        Spinner / >
      } >
      <
      Switch >
      <
      Route exact path = "/"
      render = {
        (props) => ( <
          HomeLazy {
            ...props
          }
          currentUser = {
            currentUser
          }
          />
        )
      }
      /> <
      Route path = "/login"
      render = {
        (props) => ( <
          LoginLazy {
            ...props
          }
          currentUser = {
            currentUser
          }
          />
        )
      }
      />

      <
      Route path = "/shop"
      render = {
        (props) => < ShopLazy {
          ...props
        }
        />} / >

        <
        SecureRoute
        path = {
          ['/user', '/admin']
        }
        roles = {
          [Roles.User, Roles.Admin]
        }
        component = {
          (props) => ( <
            UserDashboardLazy {
              ...props
            }
            currentUser = {
              currentUser
            }
            />
          )
        }
        /> <
        SecureRoute
        path = "/admin/dashboard"
        roles = {
          [Roles.Admin]
        }
        component = {
          (props) => ( <
            UserDashboardLazy {
              ...props
            }
            currentUser = {
              currentUser
            }
            />
          )
        }
        /> <
        Route component = {
          NotFound
        }
        /> < /
        Switch > <
        /Suspense> < /
        Layout >
      );
    };

    const mapStateToProps = createStructuredSelector({
      currentUser: selectCurrentUser,
    });

    export default connect(mapStateToProps)(App);