import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect } from 'react';
import { useState } from 'react';
import Item from 'antd/es/list/Item';
import { Button } from '@mui/material';
import AlertDelete from './AlertDelete';
import { enqueueSnackbar } from 'notistack';

const ListCheck = ({values, setDelete}) => {
  const [checked, setChecked] = React.useState([]);
  const [info, setInfo] = useState([])

  useEffect(() => {
    setInfo(values)
  }, [values])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value._id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

const deleteI = () =>{
  try {
    setDelete(checked)
  } catch (error) {
    return enqueueSnackbar("Error", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
}

  return (
    <>

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {info?.map((value, index) => {
        const labelId = `${index}`;
        return (
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId}  primary={`${value.name}`} secondary={`Precio: ${value.price}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    {checked.length > 0 ? <AlertDelete
               title= "Estas seguro de eliminar los servicios"
               callbackToDeleteItem={()=>deleteI(checked)}
               />:""}
    
    </>
)
}

export default ListCheck
