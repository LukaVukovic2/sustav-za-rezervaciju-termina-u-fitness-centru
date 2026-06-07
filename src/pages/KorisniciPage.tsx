import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, message, Table } from "antd";

type Korisnik = {
  _id: string;
  ime: string;
  email: string;
  uloga: string;
  specijalnost?: string | null;
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const KorisniciPage = () => {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [lozinke, setLozinke] = useState<Record<string, string>>({});

  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null;

  const ucitajKorisnike = async () => {
    try {
      const res = await axios.get(`${baseUrl}/korisnici`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setKorisnici(res.data);
    } catch {
      message.error("Greška kod učitavanja korisnika");
    }
  };

  useEffect(() => {
    ucitajKorisnike();
  }, []);

  const promijeniLozinku = async (id: string) => {
    const novaLozinka = lozinke[id];

    if (!novaLozinka) {
      message.warning("Upiši novu lozinku");
      return;
    }

    try {
      await axios.patch(
        `${baseUrl}/korisnici/${id}/lozinka`,
        { novaLozinka },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Lozinka je promijenjena");
      setLozinke({ ...lozinke, [id]: "" });
    } catch {
      message.error("Greška kod promjene lozinke");
    }
  };

  const obrisiKorisnika = async (id: string) => {
    const novaLozinka = lozinke[id];

    if (novaLozinka) {
      message.warning("Ako želiš obrisati korisnika, polje za lozinku mora biti prazno");
      return;
    }

    try {
      await axios.delete(`${baseUrl}/korisnici/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Korisnik je obrisan");
      ucitajKorisnike();
    } catch {
      message.error("Greška kod brisanja korisnika");
    }
  };

  const columns = [
    {
      title: "Ime",
      dataIndex: "ime",
      key: "ime",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Uloga",
      dataIndex: "uloga",
      key: "uloga",
    },
    {
      title: "Nova lozinka",
      key: "novaLozinka",
      render: (_: unknown, record: Korisnik) => (
        <Input.Password
          placeholder="Nova lozinka"
          value={lozinke[record._id] || ""}
          onChange={(e) =>
            setLozinke({
              ...lozinke,
              [record._id]: e.target.value,
            })
          }
        />
      ),
    },
    {
      title: "Promijeni lozinku",
      key: "promijeniLozinku",
      render: (_: unknown, record: Korisnik) => (
        <Button onClick={() => promijeniLozinku(record._id)}>
          Promijeni lozinku
        </Button>
      ),
    },
    {
      title: "Obriši",
      key: "obrisi",
      render: (_: unknown, record: Korisnik) => (
        <Button danger onClick={() => obrisiKorisnika(record._id)}>
          Obriši
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Korisnici</h1>

      <Table
        rowKey="_id"
        dataSource={korisnici}
        columns={columns}
      />
    </div>
  );
};

export default KorisniciPage;