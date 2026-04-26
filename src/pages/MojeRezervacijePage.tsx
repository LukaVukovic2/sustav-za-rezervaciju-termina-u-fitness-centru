import { Table } from "antd";
import { useDohvatiRezervacijePoID } from "../hooks/useDohvatiRezervacijePoID";
import { formatirajVrijemeTreninga } from "../helpers/formatirajVrijemeTreninga";

const userId = "123"

const columns = [
  {
    title: 'Naziv termina',
    dataIndex: 'naziv',
    key: 'nazivTermina',
  },
  {
    title: 'Vrijeme',
    dataIndex: 'vrijeme',
    key: 'vrijeme',
  },
  {
    title: 'Trajanje',
    dataIndex: 'trajanjeMin',
    key: 'trajanjeMin',
  },
];

const MojeRezervacijePage = () => {
  const { data: rezervacije, isLoading } = useDohvatiRezervacijePoID(userId);

  const mapiraneRezervacije = rezervacije?.map(rezervacija => ({
    ...rezervacija,
    trajanjeMin: rezervacija.trajanjeMin + " min",
    vrijeme: formatirajVrijemeTreninga(rezervacija.vrijeme)
  }));
  
  if (isLoading) return <div>Dohvaćanje rezervacija...</div>
  
  return <Table dataSource={mapiraneRezervacije} columns={columns} />;
}

export default MojeRezervacijePage;