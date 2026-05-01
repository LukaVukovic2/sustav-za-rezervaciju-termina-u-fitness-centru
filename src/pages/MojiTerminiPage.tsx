import { Table } from "antd";
import { useDohvatiTreneroveTermine } from "../hooks/useDohvatiTreneroveTermine";
import { useIzbrisiTermin } from "../hooks/useIzbrisiTermin";
import { mojiTerminiStupci } from "../components/stupciTablice/MojiTerminiStupci";

const MojiTerminiPage = () => {
  const { data, isLoading } = useDohvatiTreneroveTermine();
  const { mutate } = useIzbrisiTermin();
  if (isLoading) return <div>Učitavanje mojih termina...</div>;

  const stupci = mojiTerminiStupci(mutate);

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
