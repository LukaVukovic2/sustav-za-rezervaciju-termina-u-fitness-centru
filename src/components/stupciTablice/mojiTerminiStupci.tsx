import type { ColumnsType } from "antd/es/table";
import type { Termin } from "../../types";
import { formatirajVrijemeTreninga } from "../../helpers/formatirajVrijemeTreninga";
import { Flex, Popconfirm } from "antd";
import { AkcijskiButton } from "../shared/AkcijskiButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router";

export function mojiTerminiStupci(
  izbrisiTermin: (id: string) => void
): ColumnsType<Termin> {
  return [
    {
      title: "Naziv",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Vrijeme",
      dataIndex: "vrijeme",
      key: "vrijeme",
      render: (value) => formatirajVrijemeTreninga(value),
    },
    {
      title: "Broj mjesta",
      dataIndex: "brojMjesta",
      key: "brojMjesta",
    },
    {
      title: "Trajanje",
      dataIndex: "trajanjeMin",
      key: "trajanjeMin",
      render: (value) => value + " min",
    },
    {
      title: "Opis",
      dataIndex: "opis",
      key: "opis",
      ellipsis: true,
      render: (value) => value || "-",
    },
    {
      title: "Akcije",
      dataIndex: "",
      key: "akcije",
      render: (termin) => (
        <Flex>
          <Popconfirm
            title="Brisanje termina"
            description="Jesi siguran da želiš obrisati ovaj termin?"
            onConfirm={() => izbrisiTermin(termin._id)}
            okText="Da"
            cancelText="Ne"
          >
            <AkcijskiButton>
              <MdOutlineDeleteForever size={25} />
            </AkcijskiButton>
          </Popconfirm>
          <AkcijskiButton>
            <NavLink to={`/termin/uredi/${termin._id}`}>
              <CiEdit size={25} />
            </NavLink>
          </AkcijskiButton>
        </Flex>
      ),
    },
  ];
}
