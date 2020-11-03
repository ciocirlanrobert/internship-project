import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useUserContext } from "./context/UserContext";
import MyProfile from "./pages/MyProfile";
import Admin from "./pages/Admin Dashboard/Admin";
import Company from "./pages/Company Dashboard/Company";
import JobDetail from "./pages/JobDetail/JobDetail";
import UserJobApplications from "./pages/UserJobApplications/UserJobApplications";
import CompanyJobApplications from "./pages/CompanyJobApplications/CompanyJobApplications";

export default function RouteHandler() {
  const { user } = useUserContext();

  const commonRoutes = [
    {
      path: "/myProfile",
      component: MyProfile,
    },
  ];

  const adminRoutes = [
    {
      path: "/admin",
      component: Admin,
    },
  ];

  const simpleUserRoutes = [
    {
      path: "/applications",
      component: UserJobApplications,
    },
  ];

  const companyUserRoutes = [
    {
      path: "/company",
      component: Company,
    },
    {
      path: "/applicants",
      component: CompanyJobApplications,
    },
  ];

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/landingPage" component={LandingPage} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={WelcomePage} />
        <Route path="/jobs/:id" component={JobDetail} />
        {user.userRoleId > 0 &&
          commonRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        {user.userRoleId === 3 &&
          adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        {user.userRoleId === 2 &&
          companyUserRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        {user.userRoleId === 1 &&
          simpleUserRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact
            />
          ))}
        ;
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
