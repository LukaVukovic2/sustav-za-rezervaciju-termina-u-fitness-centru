import { Button, Popover, Slider } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Filteri } from "../../types";

type Props = FilteriProps & {
  sakrij: () => void;
};

const PopoverContent = ({ setFilteri }: Props) => {
  const [trenutneVrijednostiFiltera, setTrenutneVrijednostiFiltera] = useState<Filteri>({vrijeme: [1, 200]});

  const primijeniFiltere = () => {
    setFilteri(prev => ({
      ...prev,
      vrijeme: trenutneVrijednostiFiltera?.vrijeme
    }))
  }

  return (
    <div>
      <div>Vrijeme treninga (u min)</div>
      <Slider
        range
        tooltip={{ placement: "bottom" }}
        defaultValue={[1, 200]}
        max={200}
        onChange={(value) => setTrenutneVrijednostiFiltera(prev => ({...prev, vrijeme: value}))}
      />
      <Button onClick={primijeniFiltere}>
        Primijeni filtere
      </Button>
    </div>
  );
};

type FilteriProps = {
  filteri?: Filteri;
  setFilteri: Dispatch<SetStateAction<Filteri | undefined>>;
};

export default function FilteriTermina({filteri, setFilteri}: FilteriProps) {
  const [otvoreno, setOtvoreno] = useState(false);

  const sakrij = () => {
    setOtvoreno(false);
  };

  const onOtvaranje = (open: boolean) => {
    setOtvoreno(open);
  };

  return (
    <Popover
      content={<PopoverContent sakrij={sakrij} filteri={filteri} setFilteri={setFilteri} />}
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
