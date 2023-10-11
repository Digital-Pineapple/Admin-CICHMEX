import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useServiceAdd } from '../../providers/ServicesProvider';
import { useServicesCustomer } from '../../hooks/useServicesCustomer';

const ModalAdd = ({items, myServices, setValue}) => {
  const [open, setOpen] = React.useState(false);
  const{loadCuServ, addServiceCustomer}= useServicesCustomer()
  
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const add = useServiceAdd()
  
const handleAdd = () => {
    console.log([...items, ...myServices]);
    setOpen(false);
    setValue(1)
    loadCuServ(id)
    
}

  return (
    <div>
        {items? items && (
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar
      </Button>
        ):null}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id={add}>
          {"Esta seguro que desea agregar?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAdd} autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalAdd
