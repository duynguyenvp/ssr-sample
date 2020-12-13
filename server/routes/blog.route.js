import express from "express";
const router = express.Router();
const template = require("../views/blog.pug");

import React from "react";
import ReactDOMServer from "react-dom/server";
import StyleContext from "isomorphic-style-loader/StyleContext";

import Blog from "../../client/pages/blog/Blog";

router.get("/", (req, res) => {
  let markup = ReactDOMServer.renderToString(<Blog />);
  res.send(
    template({
      main: markup,
      title: `Blog`
    })
  );
});

export default router;
