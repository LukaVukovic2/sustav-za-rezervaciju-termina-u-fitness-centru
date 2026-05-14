import { Table } from "antd";
import { useDohvatiRezervacijePoID } from "../hooks/useDohvatiRezervacijePoID";
import { mojeRezervacijeStupci } from "../components/stupciTablice/mojeRezervacijeStupci";
import type { RezervacijaMapped } from "../types";
import { useAuth } from "../hooks/useAuth";

const MojeRezervacijePage = () => {
  const { korisnik } = useAuth();
  const { data: rezervacije, isLoading } = useDohvatiRezervacijePoID(korisnik?._id);
  if (isLoading) return <div>Dohvaćanje rezervacija...</div>;

  return (
    <Table<RezervacijaMapped>
      dataSource={rezervacije}
      locale={{ emptyText: "Niste još uvijek napravili nijednu rezervaciju" }}
      columns={mojeRezervacijeStupci()}
      rowKey="_id"
    />
  );
};

export default MojeRezervacijePage;
