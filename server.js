const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");
const app = express();
app.use(express.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

//USE ROUTES

app.use("/api/items", items);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${5000}`));
