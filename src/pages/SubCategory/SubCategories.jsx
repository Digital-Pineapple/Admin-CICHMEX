import { useEffect, useLayoutEffect, useState } from "react";
import Titles from "../../components/ui/Titles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import WarningAlert from "../../components/ui/WarningAlert";
import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputSearch1 from "../../components/ui/imputSearch1";
import { useSubCategories } from "../../hooks/useSubCategories";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CC3C5C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const SubCategories = () => {
  const { loadSubCategories,deleteSubCategory} = useSubCategories();
  const { subCategories } = useSelector((state) => state.subCategories);
  const [filteredSubCategories, setFilteredSubCategories] = useState(subCategories);
  const [subCat, setSubCat] = useState(subCategories);
  const navigate = useNavigate();
  
  const handleSubCategoriesChange = (newSubCategories) => {
    setSubCat([]);
    setFilteredSubCategories(newSubCategories);
  };

  useEffect(() => {
    if (subCategories) {
      setSubCat(subCategories);
    }
  }, [subCategories]);
  
  useEffect(() => {
    loadSubCategories();
  }, []);

  
const createSubCategory = () => {
  navigate('/auth/CrearSubCategoria', {replace:true})
}
  return (
    <>
      <Grid marginX={"240px"}>
        <Titles name={<h2 align="center">Sub-Categorias</h2>} />
        <Button
          variant="contained"
          disableElevation
          sx={{ color: "#CC3C5C", my: 5, p: 2, borderRadius: 5 }}
          onClick={createSubCategory}
        >
          Registrar nueva categoria
        </Button>
        {/* <InputSearch1
          subCategories={subCategories}
          values={handleSubCategoriesChange}
        /> */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {filteredSubCategories.length != 0
                ? filteredSubCategories.map((subCategory) => (
                    <TableRow key={subCategory._id}>
                      <TableCell component="th" scope="row">
                        {subCategory.name}
                      </TableCell>
                      <TableCell align="center">{subCategory?.description}</TableCell>
                      <TableCell component="th" scope="row" align="center">{subCategory?.services !== true ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <WarningAlert
                          route={subCategory._id}
                          title="Estas seguro que deseas eliminar la categoria?"
                          callbackToDeleteItem={() =>
                            deleteSubCategory(subCategory._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : 

                subCat.map((subCategory) => (
                    <TableRow key={subCategory._id}>
                      <TableCell component="th" scope="row">
                        {subCategory.name}
                      </TableCell>
                      <TableCell align="center">{subCategory?.description}</TableCell>
                      <TableCell component="th" scope="row" align="center">{subCategory?.services !== true ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <WarningAlert
                          route={subCategory._id}
                          title="¿Estas seguro que deseas eliminar a la subCategoria?"
                          callbackToDeleteItem={() =>
                            deleteSubCategory(subCategory._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      

      <Box display="flex" justifyContent="center" py={10}>
        <Pagination count={10} color="primary" />
      </Box>
    </>
  );
};

export default SubCategories;
