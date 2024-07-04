import React, { useEffect, useState } from "react";
import { Button, Grid, styled, Typography } from "@mui/material";
import Image from "mui-image";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function ProfileImageUploader({ formik, previewImage1, id, name }) {
  const [profileImage, setProfileImage] = useState({
    previewProfileImage: "",
    image: null,
  });
  useEffect(() => {
    setProfileImage({ previewProfileImage: previewImage1 });
  }, [previewImage1]);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage({
          previewProfileImage: URL.createObjectURL(file),
          image: file,
        });
        formik.setFieldValue("profile_image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const { previewProfileImage } = profileImage;
  
  return (
    <Grid
      container
      display={'flex'}
      justifyContent={'center'}
    >
      <Grid item xs={12} padding={1} display={'flex'} justifyContent={'center'}>
        {previewProfileImage ? (
        <Image
          alt="image-profile"
          src={previewProfileImage}
          width="200px"
          height='200px'
          style={{ borderRadius: "10px" }}
        />
      ) : previewImage1 ? (
        <Image
          alt="image-profile"
          src={previewImage1}
          width="200px"
          height='200px'
          style={{ borderRadius: "10px" }}
        />
      ) : (
        <NoPhotographyIcon sx={{ minWidth: "200px", minHeight: "200px" }} />
      )}
      </Grid>
    
        <Button
      variant="contained"
      tabIndex={-1}
      component='label'
      fullWidth
      startIcon={<CloudUpload/>}
      sx={{maxWidth:'350px'}}
      >
        Subir
        <VisuallyHiddenInput id={id} name={name} type="file" accept="image/*" hidden onChange={handleProfileImage}/>
      </Button>
     
      

      
    </Grid>
  );
}

export default ProfileImageUploader;
