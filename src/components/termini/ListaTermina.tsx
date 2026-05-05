import { Flex, Input } from "antd";
import { useDohvatiTermine } from "../../hooks/useDohvatiTermine";
import TerminCard from "./Termin";
import type { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import FilteriTermina from "./FilteriTermina";
import type { Filteri } from "../../types";

export default function ListaTermina() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [filteri, setFilteri] = useState<Filteri>()
  const { data: termini, isLoading } = useDohvatiTermine(debouncedSearch, filteri);

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
      <Flex style={{ margin: "10px" }}>
        <Input.Search
          placeholder="Pretraži termine ili trenere"
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <FilteriTermina filteri={filteri} setFilteri={setFilteri} />
      </Flex>

      <Flex
        gap={10}
        wrap
      >
        {isLoading && <div>Učitavanje termina...</div>}
        {termini?.length ? termini?.map((i) => (
          <TerminCard
            key={i._id}
            termin={i}
          />
        )) : <div>Nema pronađenih termina</div>}
      </Flex>
    </Flex>
  );
}
