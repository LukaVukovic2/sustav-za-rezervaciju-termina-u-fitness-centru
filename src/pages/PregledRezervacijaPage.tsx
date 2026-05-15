import { Table } from "antd";
import { useAuth } from "../hooks/useAuth";
import { useDohvatiRezervacijePoTreneru } from "../hooks/useDohvatiRezervacijePoTreneru";
import type { RezervacijaKorisnik } from "../types";
import { pregledRezervacijaStupci } from "../components/stupciTablice/pregledRezervacijeStupci";

const PregledRezervacijaPage = () => {
  const { korisnik } = useAuth();
  const { data: rezervacije, isLoading} = useDohvatiRezervacijePoTreneru(korisnik?._id);
  
  if (isLoading) return <div>Učitavanje rezervacija...</div>

  return (
    <Table<RezervacijaKorisnik>
      dataSource={rezervacije}
      locale={{ emptyText: "Ne postoje rezervacije za vaše termine" }}
      columns={pregledRezervacijaStupci()}
      rowKey="_id"
    />
  )
}

export default PregledRezervacijaPage;