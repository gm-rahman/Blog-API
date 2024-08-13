import express from "express";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();

// app.use(bodyParser.json());
app.use(express.json());

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);

export { app };
