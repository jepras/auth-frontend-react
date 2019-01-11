import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Mfa from "./pages/Mfa";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="login" component={LoginPage} />
    <Route path="mfa" component={Mfa} />
  </Route>
);

export default routes;
