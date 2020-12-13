import express from "express";
const router = express.Router();
const template = require("../views/index.pug");

import React from "react";
import ReactDOMServer from "react-dom/server";
import StyleContext from "isomorphic-style-loader/StyleContext";

import HomePage from "../../client/pages/home/Home";

router.get("/", (req, res) => {
  const css = new Set();
  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getCss()));
  const markup = ReactDOMServer.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <HomePage />
    </StyleContext.Provider>
  );
  res.send(
    template({
      main: markup,
      styles: [...css].join(""),
      title: `Home`,
    })
  );
});

export default router;
