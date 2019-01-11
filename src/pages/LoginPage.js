import React from "react";
import { Helmet } from "react-helmet";
import Login from "../containers/Login";

const LoginPage = () => [
  <Helmet>
    <meta
      name="description"
      content="React Redux example demonstrates how to implement todo list!"
    />
  </Helmet>,
  <main className="p-todo">
    <Login />
  </main>
];
export default LoginPage;
