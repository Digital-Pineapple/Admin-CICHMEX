import { Add, CarCrash, Edit, Verified } from "@mui/icons-material";

export const LinksBreadCrumb = [
    {
      title: "Editar Usuario",
      path: "/auth/usuarios",
      Icon: <Edit/>,
    },
    {
      title: "Verificar Usuario",
      path: "/auth/servicios",
      Icon: <Verified/>,
    },
    {
      title: "Servicios",
      path: "/auth/typeCar",
      Icon: <Add />,
    },
    {
      title: "Mis Autos",
      path: "/auth/CategoriaServicios",
      Icon: <CarCrash />,
    },
  ];