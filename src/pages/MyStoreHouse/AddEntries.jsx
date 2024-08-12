import { Grid, Typography, TextField, Button, ButtonGroup } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormSearch from "../../components/Filters/FormSearch";
import { useAuthStore, useProducts } from "../../hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableQuantity from "../../components/Tables/TableQuantity";

const AddEntries = () => {
  const { loadProducts,addMultipleEntries, navigate } = useProducts();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      user_delivery: "",
      user_received: "",
      products: [],
    },
  });

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ' ]{8,}$/;

  const validateQuantities = (rows) => {
    // Verificamos si hay alguna fila con cantidad vacía
    return rows.every((row) => row.quantity !== "");
  };
  

  const onSubmit = async (data) => {

    if (!validateQuantities(rowsIds)) {
      Swal.fire("Por favor, completa todas las cantidades.", '','error');
      return;
    }
    setValue('products', allProducts)
    const values = getValues()
    addMultipleEntries(values)
    
  };
  
  useEffect(() => {
    loadProducts()
  }, [user]);
  
  useEffect(() => {
    if (product) {
      setAllProducts((prevProducts) => [...prevProducts, product]);
    }
  }, [product]);

  const rowsIds = allProducts?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Grid
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a tu función de envío
      }}
      container
      gap={2}
    >
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Agregar entrada
        </Typography>
      </Grid>

      <Grid item xs={12} display={"flex"} gap={2} justifyContent={"center"}>
        <Controller
          control={control}
          name="user_delivers"
          rules={{
            required: { message: "Campo requerido", value: true },
            pattern: { message: "Ingrese un nombre válido", value: regexName },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="user_delivery"
              name="user_delivery"
              label="Usuario que entrega el producto"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.user_delivery}
              helperText={errors.user_delivery && errors.user_delivery.message}
              autoComplete="off"
            />
          )}
        />
        <Controller
          control={control}
          name="user_received"
          rules={{
            required: { message: "Campo requerido", value: true },
            pattern: { message: "Ingrese un nombre válido", value: regexName },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="user_received"
              name="user_received"
              label="Usuario que recibe el producto"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!errors.user_received}
              helperText={errors.user_received && errors.user_received.message}
              autoComplete="off"
            />
          )}
        />
      </Grid>
      <Grid container padding={{xs:2,lg:4}} gap={2} justifyContent={'center'} >
        <Typography variant="h4" textAlign={"center"} color="initial">
          Introduzca el nombre o código de barras del producto
        </Typography>
        <Grid item xs={10}>
        <FormSearch setSelected={setProduct} allValues ={allProducts} titleAlert={'Ya se agrego este producto'} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TableQuantity values={rowsIds} setValues={setAllProducts} allValues={allProducts} />
      </Grid>
      <Grid item xs={12} lg={6}>
      <ButtonGroup fullWidth variant="text" color="primary" aria-label="">
      <Button  variant="contained" onClick={()=>navigate('/auth/MiAlmacen/entradas')} color="error">
        Salir
      </Button>
         <Button  variant="contained" onClick={handleSubmit(onSubmit)} color="success">
        Subir entrada
      </Button>

      </ButtonGroup>
      </Grid>

          
        </Grid>
     
    </Grid>
  );
};

export default AddEntries;
 