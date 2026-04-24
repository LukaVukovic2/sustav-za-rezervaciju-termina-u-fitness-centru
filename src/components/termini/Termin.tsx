import { Avatar, Button, Card, Flex } from "antd";
import type { Termin } from "../../types";
import { formatirajVrijemeTreninga } from "../../helpers/formatirajVrijemeTreninga";
import { CiClock1 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { IconWrapper } from "../shared/IconWrapper";
import { useRezervirajTermin } from "../../hooks/useRezervirajTermin";

type TerminProps = {
  termin: Termin;
};

export default function TerminCard({ termin }: TerminProps) {
  const { mutate, isPending } = useRezervirajTermin();
  const rezervirajTermin = () => {
    mutate({
      terminId: termin._id,
      userId: "123",
    });
  };

  const popunjenTermin = termin.brojRezervacija >= termin.brojMjesta;
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
          <Avatar size={30}>{termin.idTrenera}</Avatar>
          <p>{termin.idTrenera}</p>
        </IconWrapper>
        <Flex
          gap={10}
          align="center"
        >
          <IconWrapper>
            <CiClock1 size={15} />
            {termin.trajanjeMin} min
          </IconWrapper>
          <IconWrapper>
            <FaPeopleGroup size={15} />
            {termin.brojRezervacija}/{termin.brojMjesta}
          </IconWrapper>
        </Flex>
        <Flex
          align="center"
          gap={5}
        >
          <IconWrapper>
            <IoCalendarOutline size={15} />
            {formatirajVrijemeTreninga(termin.vrijeme)}
          </IconWrapper>
        </Flex>
        <Button
          onClick={rezervirajTermin}
          loading={isPending}
          disabled={popunjenTermin || termin.userRezervirao}
        >
          {termin.userRezervirao
            ? "Rezervirano"
            : !popunjenTermin
              ? "Rezerviraj"
              : "Popunjeno"}
        </Button>
      </Flex>
    </Card>
  );
}
