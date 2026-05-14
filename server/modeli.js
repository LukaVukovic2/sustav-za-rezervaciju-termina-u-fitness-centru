const mongoose = require("mongoose");

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

const Korisnik = mongoose.model(
  "Korisnik",
  {
    ime: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    lozinka: {
      type: String,
      required: true
    },
    uloga: {
      type: String,
      required: true
    },
    specijalnost: {
      type: String
    }
  },
  "korisnici"
);

module.exports = {
  Termin,
  Rezervacija,
  Korisnik
};