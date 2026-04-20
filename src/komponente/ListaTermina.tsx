import { useDohvatiTermine } from "../hooks/useDohvatiTermine";

export default function ListaTermina() {
  const { data: termini, isLoading } = useDohvatiTermine();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Termini:</h1>
      {termini?.map((i) => <p key={i._id}>{i.naziv}</p>)}
    </>
  )
}
