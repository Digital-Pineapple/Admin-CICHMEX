import React from 'react'
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import Typography from "@mui/material/Typography";


const UploadImage = () => {
    return (
        <div>
            <Avatar
                sx={{ width: 100, height: 100, bgcolor: grey[200] }}
            >
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Avatar>
            <Typography variant="h8" color="black">
                Elige una foto
            </Typography>
        </div>


    )
}

export default UploadImage
