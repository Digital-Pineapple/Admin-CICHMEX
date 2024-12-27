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
import { Avatar, Button, Chip, Grid, Typography } from "@mui/material";
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
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function Users() {
  const { loadUsers, deleteUser, navigate, users, loading } = useUsers();
  const {user} =useAuthStore()
  useEffect(() => {
    loadUsers();
  }, [user]);

  const rowsWithIds = users?.map((user) => ({
    id: user._id?.toString(),
    typeUser: user.type_user?.role,
    system: user.type_user?.system,
    ...user,
  }));
  
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
      // "cuenta Verificada",
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
        // row.accountVerify === true
        // ? "si":"no",
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "usuarios.xlsx");
    });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleGoToPage1 = () => apiRef.current.setPage(1);

    return (
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        <Button onClick={handleGoToPage1}>Regresa a la pagina 1</Button>
        <GridToolbarQuickFilter />
        <Button
          variant="text"
          startIcon={<Download />}
          disableElevation
          sx={{ color: "secondary" }}
          onClick={exportToExcel}
        >
          Descargar Excel
        </Button>
      </GridToolbarContainer>
    );
  }
  if (loading) {
    return(
      <LoadingScreenBlue/>
    )
  }

  return (
    <Grid container maxWidth={'85vw'} style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Usuarios
        </Typography>
      </Grid>
      <DataGrid
        sx={{ fontSize: "12px", fontFamily: "sans-serif" }}
        columns={[
          {
            field: "profile_image",
            hideable: false,
            headerName: "Foto de perfil",
            flex: 0.2,
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
              <GridActionsCellItem
                icon={<DeleteAlert />}
                label="Eliminar"
                onClick={() => deleteUser(params.row._id)}
                showInMenu
              />,
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
          sorting: {
            sortModel: [{ field: "type_customer", sort: "desc" }],
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
    </Grid>
  );
}
