import { Avatar, Badge, Box, IconButton } from "@mui/material";
import Image from "mui-image";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  // height: 300,
  borderColor: "#bdbdbd",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  // display: 'inline-flex',
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
  // boxSizing: 'border-box'
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 19,
    top: 18,
  },
}));

export default function StyledDropzone({ callback, files, onDelete = () => null }) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        if(files.length === 3){
          return;
        }
        // if (acceptedFiles.length > 0) {
        //   callback(acceptedFiles[0]);
        // }
        callback(acceptedFiles[0]);
      },
      maxFiles: 3,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const images = files.map((file) => (
    <StyledBadge
      badgeContent={
        <IconButton
          sx={{
            backgroundColor: "black",
            color: "black",
          }}
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(file.id);
          }}
        >          
          <DeleteIcon sx={{ color: "white", fontSize: "20px" }} />
        </IconButton>
      }
    >
      <Avatar       
        src={URL.createObjectURL(file.file)}
        style={{ objectFit: "contain" }}             
        variant="square"
        sx={{ width: "150px", height: "150px" }}
      />
    </StyledBadge>
    // <Box height={300}>
    //   <Image
    //     duration={200}
    //     src={URL.createObjectURL(file)}
    //     style={{ objectFit: "contain" }}
    //     width={"100%"}
    //   />
    // </Box>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files.length === 0 && (
          <p>Arrastra la imagen aqui o haz click sobre el recuadro </p>
        )}
        <div style={{display:"flex", flexWrap:"wrap"}}>
         {images}
        </div>
      </div>
    </div>
  );
}
