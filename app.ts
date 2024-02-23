// const Auth = require("./src/routes/auth");
import { router as Auth } from "./src/routes/auth";
import { router as Book } from "./src/routes/booking";
import { router as Slots } from "./src/routes/timeslots";
// const Book = require("./src/routes/booking");
const express = require("express");
const { connectDB } = require("./src/db/connect");
require("dotenv").config();

const app = express();

app.use(express.json());

// app.get("/cool", (req, res) => res.send(cool()));
app.use("/auth", Auth);
app.use("/book", Book);

app.use("/timeslots", Slots);

app.get("/", (req, res) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Coming Soon...</h1></div>'
  );
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`running on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
