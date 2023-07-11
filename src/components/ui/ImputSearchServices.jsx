import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import { useServices } from "../../hooks/useServices";

export const ImputSearchServices = (value) => {
const { searchService } = useServices();

  const formik = useFormik({
    initialValues: {
      value: value,
    },
    onSubmit: (value) => {
      try {
        searchService(value);
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id="value"
        name="value"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Buscar servicio"
        inputProps={{ "aria-label": "Buscar servicio" }}
      />
      <IconButton type='submit' sx={{ p: "20px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

