import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {
  DataGrid,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  Download,
  Edit,
  Info,
  InfoRounded,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import Title from "antd/es/typography/Title";

import { useNavigate } from "react-router-dom";
import { Workbook } from "exceljs";
import { Button } from "antd";
import { useBranches } from "../../hooks/useBranches";
import { Tooltip } from "@mui/material";
import { replace } from "formik";

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

export const BranchesToVerified = () => {
  const { branches, pendingBranches, loadBranches } = useBranches();
  const navigate = useNavigate();
  useEffect(() => {
    loadBranches();
  }, []);

  const bran = pendingBranches(branches);

  const rowsWithIds = bran.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));
 

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Puntos de Entrega");

    // Agregar encabezados de columna
    const headerRow = worksheet.addRow(["ID", "Nombre", "Telefono"]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });
    // Agregar datos de las filas
    rowsWithIds.forEach((row) => {
      worksheet.addRow([
        row._id,
        row.name,
        row.phone_number === undefined ? "no tiene numero" : null,
      ]);
    });

    // Crear un Blob con el archivo Excel y guardarlo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Puntos de entrega.xlsx");
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
      <Title>Puntos de entrega pendientes por validar </Title>
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
            flex: 1,
            sortable: "false",
          },
          {
            field: "phone_number",
            hideable: false,
            headerName: "Telefono",
            flex: 1,
            sortable: "false",
          },

          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <Stack direction="row" spacing={1}>
                <Tooltip title="Verificar">
                  <IconButton onClick={()=>{navigate(`/auth/Puntos-de-entrega/${params.row?._id}`, {replace:true})}} aria-label="Info" color="success">
                    <InfoRounded />
                  </IconButton>
                </Tooltip>
              </Stack>,
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
};
