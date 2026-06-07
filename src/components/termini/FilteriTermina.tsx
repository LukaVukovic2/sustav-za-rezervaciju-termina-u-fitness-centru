import { Button, Checkbox, Popover, Slider } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { Filteri } from "../../types";

type FilteriProps = {
  filteri?: Filteri;
  setFilteri: Dispatch<SetStateAction<Filteri | undefined>>;
};

type Props = FilteriProps & {
  sakrij: () => void;
};

const PopoverContent = ({ sakrij, filteri, setFilteri }: Props) => {
  const [trenutneVrijednostiFiltera, setTrenutneVrijednostiFiltera] =
    useState<Filteri>({
      vrijeme: filteri?.vrijeme || [1, 100],
      viseOd2Slobodna: filteri?.viseOd2Slobodna || false,
    });

  const primijeniFiltere = () => {
    setFilteri((prev) => ({
      ...prev,
      vrijeme: trenutneVrijednostiFiltera.vrijeme,
      viseOd2Slobodna: trenutneVrijednostiFiltera.viseOd2Slobodna,
    }));

    sakrij();
  };

  const resetirajFiltere = () => {
    setTrenutneVrijednostiFiltera({
      vrijeme: [1, 100],
      viseOd2Slobodna: false,
    });

    setFilteri(undefined);
    sakrij();
  };

  return (
    <div style={{ width: 260 }}>
      <div>Vrijeme treninga (u min)</div>

      <Slider
        range
        tooltip={{ placement: "bottom" }}
        value={trenutneVrijednostiFiltera.vrijeme}
        min={1}
        max={100}
        onChange={(value) =>
          setTrenutneVrijednostiFiltera((prev) => ({
            ...prev,
            vrijeme: value as [number, number],
          }))
        }
      />

      <Checkbox
        checked={trenutneVrijednostiFiltera.viseOd2Slobodna}
        onChange={(e: CheckboxChangeEvent) =>
          setTrenutneVrijednostiFiltera((prev) => ({
            ...prev,
            viseOd2Slobodna: e.target.checked,
          }))
        }
      >
        Više od 2 slobodna mjesta
      </Checkbox>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Button type="primary" onClick={primijeniFiltere}>
          Primijeni filtere
        </Button>

        <Button onClick={resetirajFiltere}>
          Resetiraj
        </Button>
      </div>
    </div>
  );
};

export default function FilteriTermina({ filteri, setFilteri }: FilteriProps) {
  const [otvoreno, setOtvoreno] = useState(false);

  const sakrij = () => {
    setOtvoreno(false);
  };

  const onOtvaranje = (open: boolean) => {
    setOtvoreno(open);
  };

  return (
    <Popover
      content={
        <PopoverContent
          sakrij={sakrij}
          filteri={filteri}
          setFilteri={setFilteri}
        />
      }
      title="Filtriraj rezultate"
      trigger="click"
      open={otvoreno}
      onOpenChange={onOtvaranje}
      placement="right"
    >
      <Button>Filteri</Button>
    </Popover>
  );
}