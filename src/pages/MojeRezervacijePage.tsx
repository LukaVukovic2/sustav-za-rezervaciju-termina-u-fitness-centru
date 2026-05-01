import { Table } from "antd";
import { useDohvatiRezervacijePoID } from "../hooks/useDohvatiRezervacijePoID";
import { mojeRezervacijeStupci } from "../components/stupciTablice/mojeRezervacijeStupci";
import type { RezervacijaMapped } from "../types";

const userId = "123";

const MojeRezervacijePage = () => {
  const { data: rezervacije, isLoading } = useDohvatiRezervacijePoID(userId);
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
