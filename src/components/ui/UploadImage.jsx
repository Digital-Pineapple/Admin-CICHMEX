import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const UploadImage = (handleSubmit, id, name, initialImage) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image={selectedFile ? previewImage : initialImage}
            title={selectedFile ? selectedFile.name : "Selecciona imagen"}
            component={"input"}
            type={"file"}
            id={id}
            name={name}
            accept={"image/png, image/jpeg"}
            onChange={handleImage}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedFile ? selectedFile.name : "Select Image"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleSubmit()} color="primary">
            Guardar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UploadImage;
