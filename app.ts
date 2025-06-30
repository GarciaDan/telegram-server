import express from "express";
import routes from "./src/routes";
import { Logger } from "./src/utils/logger";

const app = express();
const PORT = process.env["PORT"] || "7887";

app.use(express.json({ limit: process.env["MEMORY_LIMIT"] || "250mb" }));
app.use(
  express.urlencoded({
    limit: process.env["MEMORY_LIMIT"] || "250mb",
    extended: true,
  })
);

app.use("/", routes);

// Start the server
app
  .listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
  })
  .on("error", (err: Error) => {
    Logger.error(err, "Error starting server");
  });
