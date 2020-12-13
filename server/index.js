import express from "express";
import logger from "./logger";
const port = 9999;

import homeRoute from "./routes/home.route";
import blogRoute from "./routes/blog.route";

const app = express();
app.locals.port = port;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.set("trust proxy", 1);

app.use(express.static(__dirname + "/"));

app.use("/blog", blogRoute);
app.use("/", homeRoute);

app.listen(port, () => logger.info(`Server is listening on port ${port}!`));
