import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import WelcomePage from "./Components/WelcomePage";
import LandingPage from "./Components/LandingPage";
import { useUserContext } from "./context/UserContext";
import Restricted from "./Components/Restricted";
import MyProfile from "./pages/MyProfile";

export default function RouteHandler() {
  const { user } = useUserContext();

  const simpleUserRoutes = [
    {
      path: "/landingPage",
      component: LandingPage,
    },
    {
      path: "/myProfile",
      component: MyProfile,
    },
  ];

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/restricted" component={Restricted} />
        {
          // &&
          true &&
            simpleUserRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact
              />
            ))
        }
        ;
        <Redirect to="/restricted" />
      </Switch>
    </Router>
  );
}
