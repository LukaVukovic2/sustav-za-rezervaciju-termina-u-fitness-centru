import { Flex } from "antd";
import { useDohvatiTermine } from "../../hooks/useDohvatiTermine";
import TerminCard from "./Termin";

export default function ListaTermina() {
  const { data: termini, isLoading } = useDohvatiTermine();
  if (isLoading) return <div>Učitavanje termina...</div>;

  return (
    <Flex
      gap={10}
      wrap
    >
      {termini?.map((i) => (
        <TerminCard
          key={i._id}
          termin={i}
        />
      ))}
    </Flex>
  );
}
