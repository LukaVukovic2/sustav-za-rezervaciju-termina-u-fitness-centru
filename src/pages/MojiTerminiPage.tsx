import { Table } from "antd";
import { useDohvatiTreneroveTermine } from "../hooks/useDohvatiTreneroveTermine";
import type { ColumnsType } from "antd/es/table";
import type { Termin } from "../types";
import { formatirajVrijemeTreninga } from "../helpers/formatirajVrijemeTreninga";

const columns: ColumnsType<Termin> = [
  {
    title: "Naziv",
    dataIndex: "naziv",
    key: "naziv"
  },
  {
    title: "Vrijeme",
    dataIndex: "vrijeme",
    key: "vrijeme",
    render: value => formatirajVrijemeTreninga(value)
  },
  {
    title: "Broj mjesta",
    dataIndex: "brojMjesta",
    key: "brojMjesta",
  },
  {
    title: "Trajanje",
    dataIndex: "trajanjeMin",
    key: "trajanjeMin",
    render: value => value + " min"
  },
  {
    title: "Opis",
    dataIndex: "opis",
    key: "opis",
    render: value => value || "-"
  }
]

const MojiTerminiPage = () => {
  const { data, isLoading } = useDohvatiTreneroveTermine();
  if (isLoading) (<div>Učitavanje mojih termina...</div>);

  return <Table dataSource={data} columns={columns} />;
}

export default MojiTerminiPage;