const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://dbAdmin:admin@sustav-za-rezervaciju-t.eiznzbz.mongodb.net/sustav-za-rezervaciju-termina");

mongoose.connection.once("open", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});

const Termin = mongoose.model("Termin", {
  naziv: String,
  trener: String,
  vrijeme: Date,
  trajanjeMin: Number,
  kapacitet: Number,
  rezervirano: Number
}, "termini");

app.get("/termini", async (req, res) => {
  res.json(await Termin.find());
});

app.post("/termini", async (req, res) => {
  const item = new Termin(req.body);
  await item.save();
  res.json(item);
});

app.listen(5000, () => console.log("Server running"));