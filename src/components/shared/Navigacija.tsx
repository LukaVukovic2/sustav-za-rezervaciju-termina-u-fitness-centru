import { Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { dohvatiStavke } from "../../helpers/dohvatiStavkeNavigacije";

export default function Navigacija() {
  const { odjaviKorisnika, korisnik } = useAuth();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'termini':
        navigate("/");
        break;
      case 'mojeRezervacije':
        navigate("/moje-rezervacije");
        break;
      case 'mojiTermini':
        navigate("/moji-termini");
        break;
      case 'odjava':
        odjaviKorisnika();
        navigate("/autentifikacija/forma");
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, margin: "20px 0" }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={dohvatiStavke(korisnik?.uloga)}
    />
  );
};