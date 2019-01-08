import React from "react";
import { Helmet } from "react-helmet";
import SignIn from "../containers/SignIn";

const Login = () => [
  <Helmet>
    <meta
      name="description"
      content="React Redux example demonstrates how to implement todo list!"
    />
  </Helmet>,
  <main className="p-todo">
    <h3 className="p-todo__title">Login mofo</h3>
    <SignIn />
  </main>
];
export default Login;
