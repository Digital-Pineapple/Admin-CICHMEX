import Inbox from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StoreIcon from '@mui/icons-material/Store';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Add, CarCrash, CasesSharp, CurrencyExchange, Delete, Face6, Grading, Home, HomeMax, MarkEmailUnread, Place, ProductionQuantityLimits, Receipt, Remove, Send, SimCardAlert, SimCardAlertOutlined } from "@mui/icons-material";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

export const Links = [
  {
    title : "Inicio",
    Icon : <Home/>,
    pathMain:'/'
  },
  {
    title: "Mi almacen",
    Icon: <LocalConvenienceStoreIcon/>,
    subRoutes:[
      {
        title:'Categorías',
        path:`/auth/Categorias`,
        Icon: <CategoryIcon/>
      },
      {
        title:'Subcategorías',
        path:`/auth/SubCategorias`,
        Icon: <KeyboardTabIcon/>
      },
      {
        title:'Productos',
        path:`/auth/Productos`,
        Icon: <Receipt/>
      },
      {
        title:'Stock',
        path:`/auth/MiAlmacen/stock`,
        Icon: <Grading/>
      },
      {
        title:'Entradas',
        path:'/auth/MiAlmacen/entradas',
        Icon: <Add/>
      },
      {
        title:'Salidas',
        path:'/auth/MiAlmacen/salidas',
        Icon: <Remove/>
      }
    ]
  },
  {
    title: "Ventas",
    Icon: <SimCardAlert/>,
    subRoutes:[
      {
        title:'Contaduría',
        path:`/auth/validar-ventas`,
        Icon: <SimCardAlertOutlined/>
      },
      
    ]
  },
  {
    title : "Membresias",
    Icon : <CardMembershipIcon/>,
    subRoutes:[
      {
        title:'Todos las Membresías',
        path:'/auth/Membresias',
        Icon: <Grading/>
      },
      {
        title:'Crear Membresia',
        path:'/auth/CrearMembresia',
        Icon: <Add/>
      }
    ]

  },
  {
    title : "Almacenistas",
    Icon : <ProductionQuantityLimits/>,
    subRoutes:[
      {
        title:'Mi almacén',
        path:'/auth/Ordenes-de-producto',
        Icon: <Grading/>
      }
    ]
  },
  {
    title : "Puntos de entrega",
    Icon : <StoreIcon/>,
    subRoutes:[
      {
        title:'Todos los puntos de entrega',
        path:'/auth/Puntos-de-entrega',
        Icon: <Grading/>
      },
    ]


  },
  {
    title: "Servicios Globales",
    Icon: <CleaningServicesIcon />,
    subRoutes:[
      {
        title:'Todos los servicios',
        path:'/auth/servicios',
        Icon: <Grading/>
      },
      {
        title:'Crear servicio global',
        path:'/auth/crearServicio',
        Icon: <Add/>
      }
    ]
  },
  {
    title: "Costos de envío",
    Icon: <CurrencyExchange />,
    subRoutes:[
      {
        title:'Todos los costos de envío',
        path:'/auth/Costos-de-envio',
        Icon: <Grading/>
      },
      {
        title:'Crear costo de envío',
        path:'/auth/Crear-costo-de-envio',
        Icon: <Add/>
      }
    ]
  },
 
  {
    title : "Transportistas",
    Icon : <LocalShippingIcon/>,
    subRoutes:[
      {
        title:'Todos los Transportistas',
        path:'/auth/Transportistas',
        Icon: <Grading/>
      },
      {
        title:'Cargar Paquetes',
        path:'/auth/cargar-paquetes',
        Icon: <CarCrash/>
      },
      {
        title:'Entrega de paquetes',
        path:'/auth/entregar-paquetes',
        Icon: <MarkEmailUnread/>
      },
    ]

  },
  {
    title: "Tipo de automovil",
    Icon: <DriveEtaIcon />,
    subRoutes:[
      {
        title:'Todos los tipos de auto',
        path:'/auth/Tipo-de-Auto',
        Icon: <Grading/>
      },
      {
        title:'Crear tipo de Auto',
        path:'/auth/crear-tipo-de-auto',
        Icon: <Add/>
      }
    ]
  },
  {
    title : "Tipos de usuario",
    Icon : <PeopleIcon/>,
    subRoutes:[
      {
        title:'Todos los tipos de usuario',
        path:'/auth/Tipos-Usuario',
        Icon: <Grading/>
      },
      // {
      //   title:'Crear tipo de usuario',
      //   path:'/auth/crear-tipo-usuario',
      //   Icon: <Add/>
      // }
    ]

  },
  
  
  {
    title: "Usuarios",
    path: "/auth/usuarios",
    Icon: <Inbox />,
  },
  
 
 
  



];
export const LinksAdminCichmex = [
  {
    title : "Inicio",
    Icon : <Home/>,
    pathMain:'/'
  },
  {
    title: "Mi almacen",
    Icon: <LocalConvenienceStoreIcon/>,
    subRoutes:[
      {
        title:'Categorías',
        path:`/auth/Categorias`,
        Icon: <CategoryIcon/>
      },
      {
        title:'Subcategorías',
        path:`/auth/SubCategorias`,
        Icon: <KeyboardTabIcon/>
      },
      {
        title:'Productos',
        path:`/auth/Productos`,
        Icon: <Receipt/>
      },
      {
        title:'Stock',
        path:`/auth/MiAlmacen/stock`,
        Icon: <Grading/>
      },
      {
        title:'Entradas',
        path:'/auth/MiAlmacen/entradas',
        Icon: <Add/>
      },
      {
        title:'Salidas',
        path:'/auth/MiAlmacen/salidas',
        Icon: <Remove/>
      }
    ]
  },
  {
    title : "Almacenistas",
    Icon : <ProductionQuantityLimits/>,
    subRoutes:[
      {
        title:'Mi almacén',
        path:'/auth/Ordenes-de-producto',
        Icon: <Grading/>
      }
    ]
  },
  {
    title: "Costos de envío",
    Icon: <CurrencyExchange />,
    subRoutes:[
      {
        title:'Todos los costos de envío',
        path:'/auth/Costos-de-envio',
        Icon: <Grading/>
      },
      {
        title:'Crear costo de envío',
        path:'/auth/Crear-costo-de-envio',
        Icon: <Add/>
      }
    ]
  },
  {
    title : "Transportistas",
    Icon : <LocalShippingIcon/>,
    subRoutes:[
      {
        title:'Todos los Transportistas',
        path:'/auth/Transportistas',
        Icon: <Grading/>
      },
      {
        title:'Cargar Paquetes',
        path:'/auth/cargar-paquetes',
        Icon: <CarCrash/>
      },
      {
        title:'Entrega de paquetes',
        path:'/auth/entregar-paquetes',
        Icon: <MarkEmailUnread/>
      },
    ]

  },
 
];

export const LinksAdminCarWash = [
  {
    title : "Inicio",
    Icon : <Home/>,
    pathMain:'/'
  },
  {
    title : "Membresias",
    Icon : <CardMembershipIcon/>,
    subRoutes:[
      {
        title:'Todos las Membresías',
        path:'/auth/Membresias',
        Icon: <Grading/>
      },
      {
        title:'Crear Membresia',
        path:'/auth/CrearMembresia',
        Icon: <Add/>
      }
    ]

  },
  
  
  
  {
    title : "Puntos de entrega",
    Icon : <StoreIcon/>,
    subRoutes:[
      {
        title:'Todos los puntos de entrega',
        path:'/auth/Puntos-de-entrega',
        Icon: <Grading/>
      },
    ]


  },
  {
    title: "Servicios Globales",
    Icon: <CleaningServicesIcon />,
    subRoutes:[
      {
        title:'Todos los servicios',
        path:'/auth/servicios',
        Icon: <Grading/>
      },
      {
        title:'Crear servicio global',
        path:'/auth/crearServicio',
        Icon: <Add/>
      }
    ]
  },
 

  {
    title: "Tipo de automovil",
    Icon: <DriveEtaIcon />,
    subRoutes:[
      {
        title:'Todos los tipos de auto',
        path:'/auth/Tipo-de-Auto',
        Icon: <Grading/>
      },
      {
        title:'Crear tipo de Auto',
        path:'/auth/crear-tipo-de-auto',
        Icon: <Add/>
      }
    ]
  }
  
 
 
  



];
