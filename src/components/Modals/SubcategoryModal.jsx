import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material';
import { cloneElement, forwardRef } from 'react';

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

const SubcategoryModal = ({subCategory, open, handleClose}) => {    
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
            <Card sx={style} variant="outlined">
             <CardHeader
               action={
                 <IconButton onClick={()=> handleClose()} aria-label="Cerrar">
                   <Close/>
                 </IconButton>
               }
               title={`Nombre: ${subCategory.name}`}
               subheader={`Categoria: ${subCategory.category_id?.name}`}  
             />
             <CardMedia sx={{borderRadius:'10px'}} component={'img'} title="Imagen" image={subCategory.subCategory_image} />
            </Card>
         
        </Fade>
      </Modal>
    </div>
  );
}

export default SubcategoryModal
