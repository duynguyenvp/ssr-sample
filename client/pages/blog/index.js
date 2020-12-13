import React from "react";
import ReactDOM from "react-dom";
import Blog from "./Blog";

const Page = () => <Blog />;
ReactDOM.hydrate(<Page />, document.getElementById("app"));
