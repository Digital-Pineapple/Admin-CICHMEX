import Inbox from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StoreIcon from '@mui/icons-material/Store';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MuseumIcon from '@mui/icons-material/Museum';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Home } from "@mui/icons-material";

export const Links = [
  {
    title : "Inicio",
    path : "/",
    Icon : <Home/>

  },
  {
    title : "Almacen",
    path : "/auth/MiAlmacen",
    Icon : <MuseumIcon/>

  },
  {
    title : "Puntos de entrega",
    path : "/auth/Puntos-de-entrega",
    Icon : <StoreIcon/>

  },
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
    path: "/auth/Categorias",
    Icon: <CategoryIcon />,
  },
  {
    title: "Sub-Categorias",
    path: "/auth/SubCategorias",
    Icon: <KeyboardTabIcon />,
  },
  {
    title : "Membresias",
    path : "/auth/Membresias",
    Icon : <CardMembershipIcon/>

  },
  {
    title : "Tipos de usuario",
    path : "/auth/Tipos-Usuario",
    Icon : <PeopleIcon/>

  },
  {
    title : "Transportistas",
    path : "/auth/Transportistas",
    Icon : <LocalShippingIcon/>

  },
  // {
  //   title : "Productos",
  //   path : "/auth/Productos",
  //   Icon : <StorefrontIcon/>

  // },
  // {
  //   title : "Almacenes",
  //   path : "/auth/Almacenes",
  //   Icon : <MuseumIcon/>

  // },

  

 
];
