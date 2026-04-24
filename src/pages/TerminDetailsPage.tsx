import { useParams } from "react-router";
import { useDohvatiDetaljeTermina } from "../hooks/useDohvatiDetaljeTermina";
import { Descriptions } from "antd";
import { vrijemeDo } from "../helpers/vrijemeDo";
import { formatirajVrijemeTreninga } from "../helpers/formatirajVrijemeTreninga";

const TerminDetaljiPage = () => {
  const { id } = useParams();
  const { data: termin, isLoading } = useDohvatiDetaljeTermina(String(id));

  if (isLoading) return "Učitavanje detalja...";
  return (
    <Descriptions title={termin?.naziv}>
      <Descriptions.Item label="Opis">{termin?.opis}</Descriptions.Item>
      <Descriptions.Item label="Trajanje">
        {termin?.trajanjeMin} min
      </Descriptions.Item>
      <Descriptions.Item label="Broj slobodnih mjesta">
        {Number(termin?.brojMjesta) - Number(termin?.brojRezervacija)}
      </Descriptions.Item>
      <Descriptions.Item label="Početak">
        {vrijemeDo(String(termin?.vrijeme))} (
        {termin?.vrijeme && formatirajVrijemeTreninga(termin.vrijeme)})
      </Descriptions.Item>
      <Descriptions.Item label="Podaci o treneru">
        {termin?.idTrenera}
      </Descriptions.Item>
      <Descriptions.Item label="Ostale aktivnosti od trenera">
        ...
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TerminDetaljiPage;
