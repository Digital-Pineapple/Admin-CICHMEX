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
import { Avatar, Chip } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import WashIcon from "@mui/icons-material/Wash";
import { DoneAllOutlined, Download, Edit, SupervisorAccount } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { redirectPages } from "../../helpers";
import { Workbook } from "exceljs";
import { Button } from "antd";
import { useUsers } from "../../hooks/useUsers";

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
  const { loadUsers, deleteUser, navigate, users } = useUsers();
  useEffect(() => {
    loadUsers();
  }, []);

  const rowsWithIds = users?.map((user, _id) => ({
    id: _id.toString(),
    typeUser : user.type_user?.type,
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
          : row.type_user2  == 2
          ? "Establecimiento"
          : "usuario",
        row.google === true 
        ? "si":"no",
        row.phone?.phone_number ? row.phone?.phone_number: 
        row.phone?.phone_number === undefined ? 'no tiene numero': null,
        // row.accountVerify === true 
        // ? "si":"no",
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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

  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Title>Usuarios</Title>
      <DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "_id",
            hideable: false,
            headerName: "Id",
            flex: 1,
            sortable: "false",
          },
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
            renderCell: (params) =>
              params.value === 0 ? (
                <>
                  <Chip
                    icon={<PermIdentityIcon />}
                    label="cliente"
                    variant="outlined"
                    color="primary"
                  />
                </>
              ) : params.value === 1 ? (
                <>
                  <Chip
                    icon={<WashIcon />}
                    label="lavador independiente"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) : params.value ===  2? (
                <>
                  <Chip
                    icon={<LocalCarWashIcon />}
                    label="Establecimiento"
                    variant="outlined"
                    color="info"
                  />
                </>
              ):params.value === 3  ?(
                <>
                  <Chip
                    icon={<SupervisorAccount />}
                    label="Administrador principal"
                    variant="outlined"
                    color="info"
                  />
                </>
              ):'',
          },

          { field: "email", headerName: "Correo", flex: 1, sortable: false },
          // {
          //   field: "accountVerify",
          //   headerName: "Estatus de verificación",
          //   align: "center",
          //   flex: 1,
          //   sortable: false,
          //   renderCell: (params) =>
          //     params.value === true ? (
          //       <CheckCircleOutlineIcon />
          //     ) : (
          //       <HighlightOffIcon color="error" />
          //     ),
          // },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <WarningAlert
                title="¿Estas seguro que deseas eliminar el usuario?"
                callbackToDeleteItem={() => deleteUser(params.row._id)}
                titleEdit="¿Quieres editar este usuario?"
                callbackEditItem={() => editUser(params.row._id)}
              />,
              <GridActionsCellItem
                icon={<Edit />}
                onClick={() => redirectPages(navigate, params.row._id )}
                label="Editar usuario"
                showInMenu
              />,
              <GridActionsCellItem
                icon={<DoneAllOutlined />}
                label="Verificar Usuario"
                onClick={() =>
                  redirectPages(navigate, `validate/${params.row._id}`)
                }
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
    </div>
  );
}
