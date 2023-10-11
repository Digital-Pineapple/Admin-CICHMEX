import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const ListCheck = ({items}) => {
  return (
    <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items ? items?.map((item) => {
        const labelId =`${item.name}`;
        return (
          <>
          <ListItem key={item._id} >
            <ListItemAvatar>
              <Avatar
                alt={`${item.name}`}
                src={`${item.service_image}`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${item.name}`} />
          </ListItem>
          <Divider variant="inset" component="li" />
          </>
        );
      }):'No hay servicios agregados'}
    </List>
   
    </>
  );
}



export default ListCheck
