import { Add, CarCrash, Edit, Verified } from "@mui/icons-material";

export const LinksBreadCrumb = [
    {
      title: "Editar Usuario",
      path: "/auth/usuarios/",
      Icon: <Edit/>,
    },
    {
      title: "Verificar Usuario",
      path: "/auth/usuarios/validate/",
      Icon: <Verified/>,
    },
    {
      title: "Servicios",
      path: "/auth/usuarios/services/",
      Icon: <Add />,
    },
    {
      title: "Mis Autos",
      path: "/auth/usuarios/myCars/",
      Icon: <CarCrash />,
    },
  ];