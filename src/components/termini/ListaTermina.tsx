import { Flex, Input, Switch } from "antd";
import { useDohvatiTermine } from "../../hooks/useDohvatiTermine";
import TerminCard from "./Termin";
import type { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import FilteriTermina from "./FilteriTermina";
import type { Filteri } from "../../types";
import { useAuth } from "../../hooks/useAuth";

export default function ListaTermina() {
  const { korisnik } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [filteri, setFilteri] = useState<Filteri>();
  const [trenutnoVrijeme] = useState(() => Date.now());
  const [prikaziArhivu, setPrikaziArhivu] = useState<boolean>(false);

  const { data: termini, isLoading } = useDohvatiTermine(
    debouncedSearch,
    filteri,
    korisnik?._id,
  );

  const provjeriJeLiProslo = (vrijeme: Date) =>
    new Date(vrijeme).getTime() < trenutnoVrijeme;

  const aktivniTermini = termini?.filter((t) => !provjeriJeLiProslo(t.vrijeme));
  const prosliTermini = termini?.filter((t) => provjeriJeLiProslo(t.vrijeme));

  const onSearch: SearchProps["onSearch"] = (value) => setSearch(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const onChange = (checked: boolean) => setPrikaziArhivu(checked);

  return (
    <Flex
      vertical
      align="start"
      gap={10}
    >
      <Flex style={{ margin: "10px" }}>
        <Input.Search
          placeholder="Pretraži termine ili trenere"
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <FilteriTermina
          filteri={filteri}
          setFilteri={setFilteri}
        />
      </Flex>

      <Flex
        gap={10}
        wrap
      >
        {isLoading && <div>Učitavanje termina...</div>}
        {aktivniTermini?.length ? (
          aktivniTermini?.map((termin) => (
            <TerminCard
              key={termin._id}
              termin={termin}
            />
          ))
        ) : (
          <div>Nema pronađenih termina</div>
        )}
      </Flex>
      {prosliTermini?.length && <Switch
        onChange={onChange}
        checkedChildren="Sakrij arhivu"
        unCheckedChildren="Prikaži arhivu"
      />}

      <Flex
        gap={10}
        wrap
      >
        {prikaziArhivu &&
          prosliTermini?.length &&
          prosliTermini?.map((termin) => (
            <TerminCard
              key={termin._id}
              termin={termin}
              className="arhivirani-termin"
            />
          ))}
      </Flex>
    </Flex>
  );
}
