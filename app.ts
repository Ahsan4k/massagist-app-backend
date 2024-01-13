const Auth = require("./src/routes/auth");
const express = require("express")
const {connectDB} = require("./src/db/connect");
const showTimes = require("./src/controllers/times");
require("dotenv").config();

const app = express();

app.use(express.json());

// app.get("/cool", (req, res) => res.send(cool()));

app.get("/times", (req, res) => res.send(showTimes()));

app.get("/", (req, res) => {
  res.send('<div style="display:flex;align-self:center"><h1>Coming Soon...</h1></div>');
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