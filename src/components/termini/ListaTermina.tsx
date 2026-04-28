import { Flex, Input } from "antd";
import { useDohvatiTermine } from "../../hooks/useDohvatiTermine";
import TerminCard from "./Termin";
import type { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";

export default function ListaTermina() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const { data: termini, isLoading } = useDohvatiTermine(debouncedSearch);

  const onSearch: SearchProps["onSearch"] = (value) => setSearch(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Flex
      vertical
      align="start"
    >
      <Input.Search
        placeholder="Pretraži termine ili trenere"
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 300, margin: "10px" }}
      />

      <Flex
        gap={10}
        wrap
      >
        {isLoading && <div>Učitavanje termina...</div>}
        {termini?.map((i) => (
          <TerminCard
            key={i._id}
            termin={i}
          />
        ))}
      </Flex>
    </Flex>
  );
}
