import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import { handleResError } from "./utils/ResError.js";
import { app } from "./app.js";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("App is connected");
    app.listen(PORT, () => {
      console.log(`App is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    handleResError(res, 500, "MongoDB couldn't connect");
  });
