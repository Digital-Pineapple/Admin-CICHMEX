import React, { useState } from 'react';
import { Typography, CardMedia } from '@mui/material';
import Image from 'mui-image';

function ProfileImageUploader({ formik, previewImage }) {

  const [profileImage, setProfileImage] = useState({
    previewProfileImage: previewImage,
    image: null,
  });

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage({
          previewProfileImage: reader.result,
          image: file,
        });
        formik.setFieldValue('profile_image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const { previewProfileImage } = profileImage;

  return (
    <div>
        
        {previewProfileImage ? (
       <Image
        alt="image-profile" 
        src={previewImage}
        width={'200px'}
        style={{borderRadius:'10px'}}
        />
      ):''}
      <input
        id="profile_image"
        name="profile_image"
        onChange={handleProfileImage}
        type="file"
        accept="image/*"
        hidden
      />
      <label htmlFor="profile_image">
        <Typography color="primary" sx={{ cursor: 'pointer' }}>
          Editar
        </Typography>
      </label>
      
    </div>
  );
}

export default ProfileImageUploader;
