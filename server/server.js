const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.server") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Korisnik, Termin, Rezervacija } = require("./modeli");

const app = express();
app.use(cors());
app.use(express.json());
const autentificirajToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Nema tokena" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token nije valjan" });
  }
};

const samoAdmin = (req, res, next) => {
  if (req.user.uloga !== "Admin") {
    return res.status(403).json({ message: "Nemaš admin ovlasti" });
  }

  next();
};

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("Connected to DB:", mongoose.connection.name);
});

app.post("/registracija", async (req, res) => {
  try {
    const { ime, email, lozinka, uloga, specijalnost = null } = req.body;

    const hashLozinka = await bcrypt.hash(lozinka, 10);

    const korisnik = new Korisnik({
      ime,
      email,
      lozinka: hashLozinka,
      uloga,
      specijalnost,
    });

    await korisnik.save();

    const token = jwt.sign(
      {
        id: korisnik._id,
        uloga: korisnik.uloga,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "Uspješna korisnička registracija",
      token,
      korisnik: {
        _id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        uloga: korisnik.uloga,
        specijalnost: korisnik.specijalnost,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/prijava", async (req, res) => {
  try {
    const { email, lozinka } = req.body;

    const korisnik = await Korisnik.findOne({ email });

    if (!korisnik) {
      return res.status(400).json({
        message: "Korisnik ne postoji",
      });
    }

    const validnaLozinka = await bcrypt.compare(lozinka, korisnik.lozinka);

    if (!validnaLozinka) {
      return res.status(400).json({
        message: "Pogrešna lozinka",
      });
    }

    const token = jwt.sign(
      {
        id: korisnik._id,
        uloga: korisnik.uloga,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Uspješna prijava",
      token,
      korisnik: {
        _id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        uloga: korisnik.uloga,
        specijalnost: korisnik.specijalnost,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/termini", async (req, res) => {
  try {
    const { userId, search, vrijemeOd, vrijemeDo, viseOd2Slobodna } = req.query;

    const termini = await Termin.find();
    const korisnici = await Korisnik.find();
    const rezervacije = await Rezervacija.find();

    let rezultat = termini.map((t) => {
      const korisnik = korisnici.find(
        (k) => k._id.toString() === t.idTrenera.toString()
      );

      const rezervacijeTermina = rezervacije.filter(
        (r) => r.terminId.toString() === t._id.toString()
      );

      return {
        ...t.toObject(),
        imeTrenera: korisnik ? korisnik.ime : null,
        brojRezervacija: rezervacijeTermina.length,
        userRezervirao: userId
          ? rezervacijeTermina.some((r) => r.userId === userId)
          : false,
      };
    });

    if (search) {
      rezultat = rezultat.filter(
        (t) =>
          t.naziv.toLowerCase().includes(search.toLowerCase()) ||
          (t.imeTrenera &&
            t.imeTrenera.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (vrijemeOd || vrijemeDo) {
      rezultat = rezultat.filter((t) => {
        const trajanje = Number(t.trajanjeMin);

        if (vrijemeOd && trajanje < Number(vrijemeOd)) {
          return false;
        }

        if (vrijemeDo && trajanje > Number(vrijemeDo)) {
          return false;
        }

        return true;
      });
    }

    if (viseOd2Slobodna === "true") {
      rezultat = rezultat.filter((t) => {
        const slobodnaMjesta =
          Number(t.brojMjesta) - Number(t.brojRezervacija);

        return slobodnaMjesta > 2;
      });
    }

    res.json(
      rezultat.sort(
        (a, b) => new Date(b.vrijeme).getTime() - new Date(a.vrijeme).getTime()
      )
    );
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
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedTermin) {
      return res.status(404).json({ message: "Termin nije pronađen" });
    }

    res.json(updatedTermin);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Došlo je do greške pri uređivanju termina" });
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
      idTrenera: req.params.id,
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

app.get("/pregled-rezervacija", async (req, res) => {
  try {
    const { idTrenera } = req.query;
    const termini = await Termin.find({ idTrenera });
    const rezervacije = await Rezervacija.find();
    const korisnici = await Korisnik.find();

    const rezultat = rezervacije
      .map((rezervacija) => {
        const termin = termini.find(
          (t) => t._id.toString() === rezervacija.terminId.toString(),
        );
        const korisnik = korisnici.find(
          (k) => k._id.toString() === rezervacija.userId.toString(),
        );

        if (!termin) return;

        return {
          naziv: termin.naziv,
          ime: korisnik.ime,
          vrijemeRezervacije: rezervacija.vrijemeRezervacije,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.vrijemeRezervacije).getTime() -
          new Date(a.vrijemeRezervacije).getTime(),
      );
    return res.status(200).json(rezultat);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/korisnici", autentificirajToken, samoAdmin, async (req, res) => {
  try {
    const korisnici = await Korisnik.find().select("-lozinka");
    res.status(200).json(korisnici);
  } catch (error) {
    res.status(500).json({ message: "Greška kod dohvaćanja korisnika", error });
  }
});

app.delete("/korisnici/:id", autentificirajToken, samoAdmin, async (req, res) => {
  try {
    const korisnik = await Korisnik.findById(req.params.id);

    if (!korisnik) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    if (korisnik.email === "admin@a") {
      return res.status(400).json({ message: "Main admin se ne može obrisati" });
    }

    await Korisnik.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Korisnik uspješno obrisan" });
  } catch (error) {
    res.status(500).json({ message: "Greška kod brisanja korisnika", error });
  }
});

app.patch("/korisnici/:id/lozinka", autentificirajToken, samoAdmin, async (req, res) => {
  try {
    const { novaLozinka } = req.body;

    if (!novaLozinka) {
      return res.status(400).json({ message: "Nova lozinka je obavezna" });
    }

    const hashLozinka = await bcrypt.hash(novaLozinka, 10);

    const korisnik = await Korisnik.findByIdAndUpdate(
      req.params.id,
      { lozinka: hashLozinka },
      { new: true }
    ).select("-lozinka");

    if (!korisnik) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    res.status(200).json({
      message: "Lozinka uspješno promijenjena",
      korisnik,
    });
  } catch (error) {
    res.status(500).json({ message: "Greška kod promjene lozinke", error });
  }
});

app.listen(process.env.PORT, () => console.log("Server running"));
