import { Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];

const stavke: MenuItem[] = [
  {
    key: 'termini',
    label: 'Termini'
  },
  {
    key: 'mojeRezervacije',
    label: 'Moje rezervacije'
  },
  {
    key: 'noviTermin',
    label: 'Dodaj termin'
  }
];
export default function Navigacija() {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'termini':
        navigate("/");
        break;
      case 'mojeRezervacije':
        navigate("/moje-rezervacije");
        break;
      case 'noviTermin':
        navigate("/termin/kreiraj");
        break;
      default:
        break;
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={stavke}
    />
  );
};