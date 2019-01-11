import React from "react";
import Header from "./Header";

const App = ({ children }) => (
  <div key="wrapper">
    {/*     <Header /> */}
    <div key="children-wrapper">{children}</div>
  </div>
);

export default App;
