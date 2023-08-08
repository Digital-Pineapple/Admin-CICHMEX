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
import { useServices } from "../../hooks/useServices";
import MuiPagination from "@mui/material/Pagination";
import { Edit } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { Button } from "@mui/material";

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

const Services = () => {
  const { loadServices, deleteService  } = useServices();
  const { services } = useSelector((state) => state.services);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const rowsWithIds = services.map((service, _id) => ({
    id: _id.toString(),
    ...service,
  }));
  const createService = () => {
    navigate('/auth/createService')
  }


  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Title>Servicios</Title>
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
          onClick={createService}
        >
          Registrar nuevo servicio
        </Button>
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
            field: "name",
            hideable: false,
            headerName: "Nombre del servicio",
            flex: 2,
            sortable: false,
          },
          {
            field: "description",
            headerName: "Descripción",
            flex: 1,
            align: "center",
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
                title="¿Estas seguro que deseas eliminar el servicio?"
                callbackToDeleteItem={() => deleteService(params.row._id)}
              />,
              <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar servicio" showInMenu />,
                             
            ],
          },
        ]}
        
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

export default Services
