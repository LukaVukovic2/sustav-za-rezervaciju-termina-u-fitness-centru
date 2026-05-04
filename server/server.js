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

const Termin = mongoose.model(
  "Termin",
  {
    naziv: String,
    idTrenera: String,
    vrijeme: Date,
    trajanjeMin: Number,
    rezervirano: Number,
    brojMjesta: Number,
    opis: String
  },
  "termini",
);

const Rezervacija = mongoose.model(
  "Rezervacija",
  {
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
  },
  "rezervacije",
);

app.get("/termini", async (req, res) => {
  try {
    const { userId, search } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { naziv: { $regex: search, $options: "i" } },
        { idTrenera: { $regex: search, $options: "i" } },
      ];
    }

    const termini = await Termin.find(filter);
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

app.get("/termini/:id", async (req, res) => {
  try {
    const termin = await Termin.findById(req.params.id);
    if (!termin) {
      return res.status(404).json({ message: "Termin nije pronađen" });
    }
    const brojRezervacija = await Rezervacija.countDocuments({
      terminId: req.params.id,
    });
    res.json({
      ...termin.toObject(),
      brojRezervacija,
    });
  } catch (error) {
    res.status(500).json({ message: "Greška na serveru", error });
  }
});

app.post("/termini", async (req, res) => {
  const item = new Termin(req.body);
  await item.save();
  res.json(item);
});

app.patch("/termini/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTermin = await Termin.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!updatedTermin) {
      return res.status(404).json({ message: "Termin nije pronađen" });
    }

    res.json(updatedTermin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Došlo je do greške pri uređivanju termina" });
  }
});

app.delete("/termini/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const termin = await Termin.findOneAndDelete({
      _id,
    });

    if (!termin) {
      return res.status(404).json({
        message: "Termin nije pronađen",
      });
    }
    return res.status(200).json({
      message: "Termin uspješno obrisan",
    });
  } catch (error) {
    res.status(500).json({ message: "Greška na serveru", error });
  }
});

app.get("/termini/moji-termini/:id", async (req, res) => {
  try {
    const termini = await Termin.find({
      idTrenera: req.params.id
    });
    res.json(termini);
  } catch (error) {
    res.status(500).json({ message: "Greška na serveru", error });
  }
});

app.delete("/rezervacije", async (req, res) => {
  try {
    const { terminId, userId } = req.body;
    const rezervacija = await Rezervacija.findOneAndDelete({
      terminId,
      userId,
    });

    if (!rezervacija) {
      return res.status(404).json({
        message: "Rezervacija nije pronađena",
      });
    }

    return res.status(200).json({
      message: "Rezervacija uspješno otkazana",
      data: rezervacija,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Greška na serveru",
    });
  }
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

app.get("/rezervacije", async (req, res) => {
  try {
    const { userId } = req.query;

    const rezervacije = await Rezervacija.find({ userId });

    if (!rezervacije.length) return res.json([]);

    const termini = await Termin.find();

    const rezultat = rezervacije
      .map((rezervacija) => {
        const termin = termini.find(
          (t) => t._id.toString() === rezervacija.terminId.toString(),
        );
        return {
          ...termin.toObject(),
          ...rezervacija.toObject(),
        };
      })
      .sort(
        (a, b) => new Date(b.vrijeme).getTime() - new Date(a.vrijeme).getTime(),
      );

    return res.json(rezultat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška na serveru" });
  }
});

app.listen(process.env.PORT, () => console.log("Server running"));
