import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import Home from "./pages/Home";
import Login from "./pages/Login";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="login" component={Login} />
  </Route>
);

export default routes;
