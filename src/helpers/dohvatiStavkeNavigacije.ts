export const dohvatiStavke = (uloga?: string) => {
  const baza = [
    {
      key: "termini",
      label: "Termini",
    },
  ];

  const stavkeKorisnika = [
    {
      key: "mojeRezervacije",
      label: "Moje rezervacije",
    },
  ];

  const stavkeTrenera = [
    {
      key: "mojiTermini",
      label: "Moji termini",
    },
    {
      key: "pregledRezervacija",
      label: "Pregled rezervacija"
    }
  ];

  const odjaviKorisnika = [
    {
      key: "odjava",
      label: "Odjava",
    },
  ];

  if (!uloga) return baza;

  if (uloga === "Trener") {
    return [...baza, ...stavkeTrenera, ...odjaviKorisnika];
  }

  return [...baza, ...stavkeKorisnika, ...odjaviKorisnika];
};