import React from "react";
import useStyles from "isomorphic-style-loader/useStyles";
import style from "./style.scss";

const Home = () => {
  useStyles(style);
  return <h1 className="home">This is HomePage!</h1>;
};

export default Home;
