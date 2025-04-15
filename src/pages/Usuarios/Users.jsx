import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import { Avatar, Button, Chip, Grid2, Typography } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import WashIcon from "@mui/icons-material/Wash";
import { saveAs } from "file-saver";
import {
  AirportShuttle,
  Download,
  SupervisorAccount,
} from "@mui/icons-material";
import { redirectPages } from "../../helpers";
import { Workbook } from "exceljs";

import { useUsers } from "../../hooks/useUsers";

import DeleteAlert from "../../components/ui/DeleteAlert";
import EditButton from "../../components/Buttons/EditButton";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

// Componente de paginación personalizada
function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="secondary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

// Iconos personalizados para el ordenamiento de columnas
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

// Componente de paginación para el DataGrid
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function Users() {
  // Hook para cargar usuarios, eliminar usuarios y manejar navegación
  const { loadUsers, deleteUser, navigate, users, loading } = useUsers();
  const { user } = useAuthStore();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, [user]);

  // Preparar filas con IDs para el DataGrid
  const rowsWithIds = users?.map((user) => ({
    id: user._id?.toString(),
    typeUser: user.type_user?.role,
    system: user.type_user?.system,
    ...user,
  }));

  // Función para exportar datos a un archivo Excel
  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Usuarios");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre",
      "Correo",
      "Tipo de usuario",
      "Registro con Google",
      "Telefono",
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.fullname,
        row.email,
        row.typeUser == 1
          ? "Lavador"
          : row.type_user2 == 0
          ? "Cliente"
          : row.type_user2 == 2
          ? "Establecimiento"
          : "usuario",
        row.google === true ? "si" : "no",
        row.phone?.phone_number
          ? row.phone?.phone_number
          : row.phone?.phone_number === undefined
          ? "no tiene numero"
          : null,
      ]);
    });

    // Crear un archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "usuarios.xlsx");
    });
  };

  // Barra de herramientas personalizada para el DataGrid
  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter placeholder="Buscar" variant="outlined" />
      </GridToolbarContainer>
    );
  }

  // Mostrar pantalla de carga si los datos están cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de breadcrumb
  const paths = [{ path: `/usuarios`, name: "Todos los usuarios" }];

  return (
    <Grid2 container paddingX={10}>
      {/* Encabezado de la página */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Todos los usuarios</strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla de usuarios */}
      <Grid2 size={12}>
        <DataGrid
          sx={{
            fontSize: "12px",
            fontFamily: "sans-serif",
            borderRadius: "20px",
            bgcolor: "#fff",
            border: "1px solid rgb(209, 205, 205)", // Borde exterior
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={[
            {
              field: "profile_image",
              hideable: false,
              headerName: "Foto de perfil",
              flex: 1,
              sortable: "false",
              renderCell: (params) =>
                params?.value ? (
                  <Avatar alt={params.value} src={params.value} />
                ) : null,
            },
            {
              field: "fullname",
              hideable: false,
              headerName: "Nombre completo",
              flex: 2,
              sortable: false,
            },
            {
              field: "typeUser",
              headerName: "Tipo de usuario",
              flex: 1,
              align: "center",
            },
            {
              field: "system",
              headerName: "Sistema",
              flex: 1,
              align: "center",
            },
            { field: "email", headerName: "Correo", flex: 1, sortable: false },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex: 1,
              sortable: false,
              type: "actions",
              getActions: (params) => [
                // Botón para eliminar usuario
                <GridActionsCellItem
                  icon={<DeleteAlert />}
                  label="Eliminar"
                  onClick={() => deleteUser(params.row._id)}
                  showInMenu
                />,
                // Botón para editar usuario
                <GridActionsCellItem
                  icon={<EditButton />}
                  label="Editar"
                  onClick={() => navigate(`/usuarios/editar/${params.row._id}`)}
                  showInMenu
                />,
              ],
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          rows={rowsWithIds}
          pagination
          slots={{
            pagination: CustomPagination,
            toolbar: CustomToolbar,
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </Grid2>
    </Grid2>
  );
}
