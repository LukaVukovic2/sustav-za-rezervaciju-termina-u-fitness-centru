import { Table } from "antd";
import { useDohvatiTreneroveTermine } from "../hooks/useDohvatiTreneroveTermine";
import { useIzbrisiTermin } from "../hooks/useIzbrisiTermin";
import { mojiTerminiStupci } from "../components/stupciTablice/mojiTerminiStupci";

const MojiTerminiPage = () => {
  const { data, isLoading } = useDohvatiTreneroveTermine();
  const { mutate: izbrisiTermin } = useIzbrisiTermin();
  
  if (isLoading) return <div>Učitavanje mojih termina...</div>;

  const stupci = mojiTerminiStupci(izbrisiTermin);

  return (
    <Table
      dataSource={data}
      locale={{ emptyText: "Niste još uvijek izradili nijedan termin" }}
      columns={stupci}
      rowKey="_id"
    />
  );
};

export default MojiTerminiPage;
