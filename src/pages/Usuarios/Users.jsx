import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCustomers } from "../../hooks/useCustomers";
import MuiPagination from "@mui/material/Pagination";
import { Chip } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import WashIcon from "@mui/icons-material/Wash";
import { DoneAllOutlined, Edit } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
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
  const { loadCustomers, deleteCustomer,  } = useCustomers();
  const { customers } = useSelector((state) => state.customers);
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const rowsWithIds = customers.map((customer, _id) => ({
    id: _id.toString(),
    ...customer,
  }));


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
            flex: 0.2,
            sortable: "false",
            renderCell: (params) => params.value.profile_image ?<Avatar src={params.value.profile_image}/>: null
          },
          {
            field: "fullname",
            hideable: false,
            headerName: "Nombre completo",
            flex: 2,
            sortable: false,
          },
          {
            field: "type_customer",
            headerName: "Tipo de usuario",
            flex: 1,
            align: "center",
            renderCell: (params) =>
              params.value === "0" ? (
                <>
                  <Chip
                    icon={<PermIdentityIcon />}
                    label="cliente"
                    variant="outlined"
                    color="primary"
                  />
                </>
              ) : params.value === "1" ? (
                <>
                  <Chip
                    icon={<WashIcon />}
                    label="lavador independiente"
                    variant="outlined"
                    color="success"
                  />
                </>
              ) : (
                <>
                  <Chip
                    icon={<LocalCarWashIcon />}
                    label="Establecimiento"
                    variant="outlined"
                    color="info"
                  />
                </>
              ),
          },

          { field: "email", headerName: "Correo", flex: 1, sortable: false },
          {
            field: "accountVerify",
            headerName: "Estatus de verificación",
            align: "center",
            flex: 1,
            sortable: false,
            renderCell: (params) =>
              params.value === true ? (
                <CheckCircleOutlineIcon />
              ) : (
                <HighlightOffIcon color="error" />
              ),
          },
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
                callbackToDeleteItem={() => deleteCustomer(params.row._id)}
                titleEdit="¿Quieres editar este usuario?"
                callbackEditItem={()=> editUser(params.row._id)}
              />,
              <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar usuario" showInMenu />,
              <GridActionsCellItem
                icon={< DoneAllOutlined />}
                label="Verificar Usuario"
                onClick={() => redirectPages(navigate, `validate/${params.row._id}`)}
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
          toolbar: GridToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
        }}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
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
