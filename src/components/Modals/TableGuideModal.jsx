import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const TableGuideModal = ({ openModal, handleClose, sizeGuide = {} }) => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const formattedRows = sizeGuide?.dimensions?.map((dimension, index) => ({
          id: dimension.id,
          label: dimension.label,
          equivalence: dimension.equivalence,
          bust: dimension.bust || '-',
          waist: dimension.waist || '-',
          hips: dimension.hips || '-',
          inseam: dimension.inseam || '-',
          shoulder: dimension.shoulder || '-',
          sleeveLength: dimension.sleeveLength || '-',
          footLength: dimension.footLength || '-',
          footWidth: dimension.footWidth || '-',
          neckCircumference: dimension.neckCircumference || '-',
          height: dimension.height || '-',
          thigh: dimension.thigh || '-',
          calf: dimension.calf || '-',
          cupSize: dimension.cupSize || '-',
          bandSize: dimension.bandSize || '-',
          headCircumference: dimension.headCircumference || '-',
          beltLength: dimension.beltLength || '-',
          usaSize: dimension.usaSize || '-',
          ukSize: dimension.ukSize || '-',
          euroSize: dimension.euroSize || '-',
          cmSize: dimension.cmSize || '-',
          weight: dimension.weight || '-',
          units: dimension.units || '-',
          flavor: dimension.flavor || '-',
          typeContainer: dimension.typeContainer || '-',
        }));
        
        setRows(formattedRows);
      }, [sizeGuide]);
      const columns = [
        { field: 'label', headerName: 'Etiqueta', width: 150 },
        { field: 'equivalence', headerName: 'Equivalencia', width: 150 },
        { field: 'bust', headerName: 'Busto(ropa)', width: 100 },
        { field: 'waist', headerName: 'Cintura(ropa)', width: 100 },
        { field: 'hips', headerName: 'Caderas(ropa)', width: 100 },
        { field: 'inseam', headerName: 'Largo int pierna (ropa)', width: 100 },
        { field: 'shoulder', headerName: 'Hombros(ropa)', width: 100 },
        { field: 'sleeveLength', headerName: 'Largo de mangas(ropa)', width: 130 },
        { field: 'footLength', headerName: 'Longitud del pie (zapatos)', width: 120 },
        { field: 'footWidth', headerName: 'Ancho del pie (zapatos)', width: 120 },
        { field: 'neckCircumference', headerName: 'Contorno del cuello (ropa)', width: 180 },
        { field: 'height', headerName: 'Altura', width: 120 },
        { field: 'usaSize', headerName: 'USA Size', width: 100 },
        { field: 'ukSize', headerName: 'UK Size', width: 100 },
        { field: 'euroSize', headerName: 'Euro Size', width: 100 },
        { field: 'cmSize', headerName: 'CM Size', width: 100 },
        { field: 'weight', headerName: 'Peso', width: 100 },
        { field: 'units', headerName: 'Unidades', width: 100 },
        { field: 'flavor', headerName: 'Sabor', width: 120 },
        { field: 'typeContainer', headerName: 'Tipo de contenedor', width: 150 },
      ];
    
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { timeout: 500 },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
          <Typography variant="h6">{sizeGuide.name}</Typography>
          <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};



export default TableGuideModal
