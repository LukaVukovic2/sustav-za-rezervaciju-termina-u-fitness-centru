import { Avatar, Button, Card, Flex } from "antd";
import type { Termin } from "../../types";
import { formatirajVrijemeTreninga } from "../../helpers/formatirajVrijemeTreninga";
import { CiClock1 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { IconWrapper } from "../shared/IconWrapper";

type TerminProps = {
  termin: Termin;
};

export default function TerminCard({ termin }: TerminProps) {
  const rezervirajTermin = () => {
    if (termin.rezervirano < termin.kapacitet) {
      console.log("Uspješno ste rezervirali termin!");
      return;
    }
    console.log("Rezervacija nije uspjela");
  }
  return (
    <Card
      title={termin.naziv}
      variant="borderless"
      style={{ width: 300 }}
    >
      <Flex
        vertical
        align="start"
        gap={5}
      >
        <IconWrapper>
          <Avatar size={30}>{termin.trener}</Avatar>
          <p>{termin.trener}</p>
        </IconWrapper>
        <Flex gap={10} align="center">
          <IconWrapper>
            <CiClock1 size={15} /> 
            {termin.trajanjeMin} min
          </IconWrapper>
          <IconWrapper>
            <FaPeopleGroup size={15}/> 
            {termin.rezervirano}/{termin.kapacitet}
          </IconWrapper>
        </Flex>
        <Flex align="center" gap={5}>
          <IconWrapper>
            <IoCalendarOutline size={15} />
            {formatirajVrijemeTreninga(termin.vrijeme)}
          </IconWrapper>
        </Flex>
        <Button onClick={rezervirajTermin}>
          Rezerviraj
        </Button>
      </Flex>
    </Card>
  );
}
