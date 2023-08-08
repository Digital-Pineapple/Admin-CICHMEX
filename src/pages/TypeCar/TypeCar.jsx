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
import MuiPagination from "@mui/material/Pagination";
import { Button, Chip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router-dom";
import { redirectPages } from '../../helpers';
import { useTypeCars } from "../../hooks/UseTypeCars";

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

const TypeCar = () => {
  const { loadTypeCars, deleteTypeCar } = useTypeCars();
  const { typeCars } = useSelector((state) => state.typeCars);
  const navigate = useNavigate();

  useEffect(() => {
    loadTypeCars()
  }, []);

  const rowsWithIds = typeCars.map((typeCars, _id) => (
    {
    id: _id.toString(),
    ...typeCars,
  }));

  const createTypeCar = () => {
    navigate('/auth/createTypeCar')
  }


  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <Title>Tipos de Autos</Title>
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
          onClick={createTypeCar}
        >
          Registrar nuevo tipo de auto
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
          // {
          //   field: "service_image",
          //   hideable: false,
          //   headerName: "Foto de perfil",
          //   flex: 0.2,
          //   sortable: "false",
          //   renderCell: (params) => params.value.service_image ?<Avatar src={params.value.service_image}/>: null
          // },
          {
            field: "name",
            hideable: false,
            headerName: "Nombre",
            flex: 2,
            sortable: false,
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
                title="¿Estas seguro que deseas eliminar el tipo de auto?"
                callbackToDeleteItem={() => deleteTypeCar(params.row._id)}
                titleEdit="¿Quieres editar este servicio?"
                callbackEditItem={()=> editTypeCar(params.row._id)}
              />,
              <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar tipo de auto" showInMenu />,
                             
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

export default TypeCar
