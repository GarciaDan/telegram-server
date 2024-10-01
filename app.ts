import express, { Request, Response } from "express";
import routes from "./src/routes";

const app = express();
const PORT = process.env.PORT || 7887;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
