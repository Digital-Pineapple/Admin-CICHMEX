import React,{ useEffect } from 'react'
import Titles from '../../components/ui/Titles'
import UploadImage from '../../components/ui/UploadImage';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';

import { useCustomers } from '../../hooks/useCustomers';

const Edit = () => {

  const { id } = useParams();
  const { loadCustomer, customer } = useCustomers()

  useEffect(() => {
    loadCustomer(id);
  },[])


  return (
    <>
      <Titles
        name={<h2 align='center'>Editar usuario</h2>}
      />
      <Box color='#F7BFBF' borderRadius={5} mt={3} sx={{ border: 3,p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} backgroundColor="#D7B3C6" color="common.black" sx={{ display: 'flex',justifyContent: 'center' }}>
            <Typography variant='h5' align='center'>Datos Generales</Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex',justifyContent: 'center' }}>
            <UploadImage />
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex',flexDirection: 'column',justifyContent: 'flex-start' }}>
            <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth="true" value={customer.fullname} />
            <Grid item sx={{ display: 'flex',py: 2 }}>
              <TextField id="outlined-basic" label="Telefono" variant="outlined" fullWidth="true" sx={{ pr: 2 }} value={customer?.phone?.phone_number || 'NA'}/>
              <TextField id="outlined-basic" label="Correo" variant="outlined" fullWidth="true" value={customer?.email}  />
            </Grid>
          </Grid>
          <Grid item xs={12} backgroundColor="#D7B3C6" color="common.black" sx={{ display: 'flex',justifyContent: 'center' }}>
            <Typography variant='h5' align='center'>Dirección</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Calle" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Numero interior" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Numero exterior" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Codigo postal" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={4}>
            <TextField id="outlined-basic" label="Colonia" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={4}>
            <TextField id="outlined-basic" label="Municipio" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={4}>
            <TextField id="outlined-basic" label="Ciudad" variant="outlined" fullWidth="true" />
          </Grid>
          <Grid item xs={12} backgroundColor="#D7B3C6" color="common.black" sx={{ display: 'flex',justifyContent: 'center',mt: 2 }}>
            <Typography variant='h5' align='center'>Documentos</Typography>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Edit
