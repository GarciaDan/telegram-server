import express from "express";
import routes from "./src/routes";

const app = express();
const PORT = process.env.PORT || 7887;

app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ 
    limit: '250mb', 
    extended: true 
}));

app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
