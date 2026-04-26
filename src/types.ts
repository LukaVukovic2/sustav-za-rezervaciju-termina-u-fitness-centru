export type Termin = {
  _id: string;
  vrijeme: Date;
  naziv: string;
  opis: string;
  brojMjesta: number;
  brojRezervacija: number;
  trajanjeMin: number;
  idTrenera: string;
  userRezervirao: boolean;
}

export type Rezervacija = {
  _id: string,
  terminId: string,
  userId: string,
  vrijemeRezervacije?: Date
}

export type RezervacijaMapped = Termin & Rezervacija;

export type Korisnik = {
  _id: string,
  ime: string
}