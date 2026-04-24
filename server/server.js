const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.server") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

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

const Rezervacija = mongoose.model("Rezervacija", {
  terminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Termin",
    required: true,
  },
  userId: String,
  vrijemeRezervacije: {
    type: Date,
    default: Date.now,
  },
}, "rezervacije");

app.get("/termini", async (req, res) => {
  try {
    const userId = req.query.userId;

    const termini = await Termin.find();
    const rezervacije = await Rezervacija.find();

    const rezultat = termini.map((t) => {
      const rezervacijeTermina = rezervacije.filter(
        (r) => r.terminId.toString() === t._id.toString(),
      );

      const brojRezervacija = rezervacijeTermina.length;

      const userRezervirao = userId
        ? rezervacijeTermina.some((r) => r.userId === userId)
        : false;

      return {
        ...t.toObject(),
        brojRezervacija,
        userRezervirao,
      };
    });

    res.json(rezultat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/termini", async (req, res) => {
  const item = new Termin(req.body);
  await item.save();
  res.json(item);
});

app.post("/rezervacije", async (req, res) => {
  try {
    const { terminId, userId } = req.body;
    const termin = await Termin.findById(terminId);
    const broj = await Rezervacija.countDocuments({ terminId });

    if (broj >= termin.brojMjesta) {
      return res.status(400).json({ message: "Termin je popunjen" });
    }
    const vecPostoji = await Rezervacija.findOne({ terminId, userId });

    if (vecPostoji) {
      return res.status(400).json({ message: "Već rezervirano" });
    }
    const nova = await Rezervacija.create({ terminId, userId });

    res.json(nova);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => console.log("Server running"));
