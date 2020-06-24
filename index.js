require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

mongoose.connect(
  `mongodb+srv://rronjakupi:${process.env.MONGO_ATLASS_PW}@${process.env.DATABASE_NAME}-ny5dc.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/charge", (req, res) => {
  res.status(200).json("Welcome to payment microservice!");
});

const PORT = process.env.port || 8004;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
