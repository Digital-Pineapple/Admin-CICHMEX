import Inbox from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export const Links = [
  {
    title: "Usuarios",
    path: "/auth/usuarios",
    Icon: <Inbox />,
  },
  {
    title: "Servicios",
    path: "/auth/servicios",
    Icon: <CleaningServicesIcon />,
  },
  {
    title: "Tipo de automovil",
    path: "/auth/typeCar",
    Icon: <DriveEtaIcon />,
  },
  {
    title: "Categorías",
    path: "/auth/CategoriaServicios",
    Icon: <CategoryIcon />,
  },
  {
    title: "Sub-Categorias",
    path: "/auth/SubCategorias",
    Icon: <KeyboardTabIcon />,
  },
  {
    title : "Comisiones",
    path : "/auth/comisiones",
    Icon : <CurrencyExchangeIcon/>

  },
 
];
