import React from "react";
import ReactDOM from "react-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import Home from "./Home";

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

const Page = () => (
  <StyleContext.Provider value={{ insertCss }}>
    <Home />
  </StyleContext.Provider>
);
ReactDOM.hydrate(<Page />, document.getElementById("app"));
