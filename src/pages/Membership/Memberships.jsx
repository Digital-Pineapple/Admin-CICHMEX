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
import { Avatar, Chip, Grid } from "@mui/material";
import { Download, Edit } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router-dom";
import { redirectPages } from "../../helpers";
import { Workbook } from "exceljs";
import { Button, Typography } from "antd";
import { useMembership } from "../../hooks/useMembership";

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

export default function Memberships() {
  const { loadMemberships, deleteMembership, memberships, navigate } = useMembership();

  useEffect(() => {
    loadMemberships()
  }, []);

  const rowsWithIds = memberships.map((membership, _id) => ({
    id: _id.toString(),
    ...membership,
  }));

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("membership");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow([
      "ID",
      "Nombre",
      "Precio estándar",
      "Descuento",
      "Precio con descuento",
      "Descuento en productos"
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });
    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.email,
        row.price_standard,
        row.discount_porcent,
        row.price_discount,
        row.discount_products

      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "membresias.xlsx");
    });
  };

  const RenderPorcent = ({params}) => {
    return (
      <Typography style={{fontSize:'20px'}} >{params.value} % </Typography>
    );
  };
  const Rendered = ({params}) => {
    return (
      <Typography style={{fontSize:'20px'}} > $ {params.value}  </Typography>
    );
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
      <Title>Membresías</Title>
      <Grid container my={2} >
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 10, p: 2, borderRadius: 5 }}
          onClick={()=>navigate('/auth/CrearMembresia', {replace:true})}
        >
          Registrar nueva membresía
        </Button>
        
      </Grid>
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
            headerName: "Nombre",
            flex: 2,
            sortable: "false",
          },
          {
            field: "price_standard",
            hideable: false,
            headerName: "Precio estándar",
            flex: 1,
            sortable: false,
            renderCell:(params)=><Rendered params ={params}/>

          },
          {
            field: "discount_porcent",
            headerName: "Descuento",
            flex: 1,
            align: "center",
            sortable:false,
            renderCell:(params)=><RenderPorcent params ={params}/>
          },
          {
            field: "discount_products",
            headerName: "Descuento en productos",
            flex: 1.5,
            align: "center",
            sortable:false,
            renderCell:(params)=><RenderPorcent params ={params}/>
          },
          {
            field: "price_discount",
            headerName: "Precio con descuento",
            flex: 1.5,
            align: "center",
            sortable:false,
            renderCell:(params)=><Rendered params ={params}/>

           
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
                title="¿Estas seguro que deseas eliminar esta membresía?"
                callbackToDeleteItem={() => deleteMembership(params.row._id)}
               
              />,
              <GridActionsCellItem
                icon={<Edit />}
                onClick={() => redirectPages(navigate, params.row._id )}
                label="Editar membresía"
                showInMenu
              />,
            ],
          },
        ]}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "desc" }],
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
