import { Button, Space, Table } from "antd";
import { useDohvatiTreneroveTermine } from "../hooks/useDohvatiTreneroveTermine";
import { useIzbrisiTermin } from "../hooks/useIzbrisiTermin";
import { mojiTerminiStupci } from "../components/stupciTablice/mojiTerminiStupci";
import { useNavigate } from "react-router";

const MojiTerminiPage = () => {
  const { data, isLoading } = useDohvatiTreneroveTermine();
  const { mutate: izbrisiTermin } = useIzbrisiTermin();
  const navigate = useNavigate();
  
  if (isLoading) return <div>Učitavanje mojih termina...</div>;

  const stupci = mojiTerminiStupci(izbrisiTermin);

  const onDodajTermin = () => navigate("/termin/kreiraj");

  return (
    <Space wrap style={{ padding: "10px" }}>
      <Button onClick={onDodajTermin} type="primary">
        Dodaj termin
      </Button>
      <Table
        dataSource={data}
        locale={{ emptyText: "Niste još uvijek izradili nijedan termin" }}
        columns={stupci}
        rowKey="_id"
      />
    </Space>
  );
};

export default MojiTerminiPage;
