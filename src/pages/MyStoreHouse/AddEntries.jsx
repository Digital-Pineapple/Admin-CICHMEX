import {
  Grid,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  MenuItem,
  Grid2,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormSearch from "../../components/Filters/FormSearch";
import { useAuthStore, useProducts } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import TableQuantity from "../../components/Tables/TableQuantity";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

const AddEntries = () => {
  const { loadAllProductsForSearch, addMultipleEntries, navigate, loadProduct, loading } =
    useProducts();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      // user_delivery: "",
      // user_received: "",
      products: [],
    },
  });

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ' ]{8,}$/;

  const validateQuantities = (rows) => {
    // Verificamos si hay alguna fila con cantidad vacía
    return rows.every((row) => row.quantity !== "");
  };

  const handleSelectedItem = async (value) => {
    try {
      const product = await loadProduct(value._id); // Cargar el producto por ID
      const variants = product?.variants || []; // Asegurarse de que variants sea un array válido

      if (variants.length > 0) {
        // Si hay variantes, procesarlas
        const productVariants = variants.map((item) => {
          return {
            ...item,
            name:
              product.name +
              "-" +
              item.attributes.color +
              "-" +
              item.attributes.size, // Ejemplo: agregar un campo del producto
          };
        });
        setProductVariants(productVariants); // Configurar las variantes procesadas
      } else {
        // Si no hay variantes, configurar el producto directamente
        setProduct(product);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const onSubmit = async (data) => {
    if (!validateQuantities(rowsIds)) {
      Swal.fire("Por favor, completa todas las cantidades.", "", "error");
      return;
    }
    setValue("products", allProducts);
    const values = getValues();
    addMultipleEntries(values);
  };

  useEffect(() => {
    loadAllProductsForSearch();
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

  const paths = [
    { path: `/mi-almacen/productos/entradas`, name: "Todas mis entradas" },
    { path: `/mi-almacen/agregar-entrada`, name: "Crear entrada de producto" },
  ];


  return (
    <Grid2
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a tu función de envío
      }}
      container
      gap={2}
      paddingX={{xs:0, lg:10}}
    >
     <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{fontSize:{xs:"16px", lg:"25px"}}}>
          <strong>Crear entrada de producto</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2
        container
        padding={{ xs: 2, lg: 4 }}
        gap={2}
        justifyContent={"center"}
      >
        <Grid2 size={6}>
          <Typography variant="h6" textAlign={"center"} color="initial">
            Introduzca el nombre o código de barras del producto
          </Typography>
          {loading ? (
            <>
            <CircularProgress variant="indeterminate" color="secondary" />
            <Typography>Cargando productos...</Typography>
            </>
            ) : (<FormSearch
            setSelected={handleSelectedItem}
            allValues={allProducts}
            titleAlert={"Ya se agrego este producto"}

          />)}

        </Grid2>
        <Grid2 size={{ xs: 12, md: 5.8 }}>
          <Typography variant="h6" textAlign={"center"} color="initial">
            Variantes
          </Typography>
          <FormControl fullWidth>
            <FormLabel>
              {productVariants.length > 0 ? " Selecciona una variante" : ""}
            </FormLabel>
            <Select
              id="variant"
              name="variant"
              disabled={loading}
              onChange={(e) => {
                setProduct(e.target.value);
                setProductVariants([]);
              }}
              sx={{

                border: productVariants.length > 0 ? "2px solid #00897b" : "",
                borderRadius: "4px",
                overflowY: "auto"
              }}
            >
              {productVariants?.map((variant) => (
                <MenuItem
                  sx={{
                    backgroundColor: "success.main",
                    color: 'primary.contrastText',

                    transition: "border-color 0.3s ease-in-out", // Efecto de transición
                    "&:hover": {
                      backgroundColor: "secondary.main",

                    },
                  }}
                  key={variant._id}
                  value={variant}
                >
                  {variant.name}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>Selecciona una variante</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <TableQuantity
            values={rowsIds}
            setValues={setAllProducts}
            allValues={allProducts}
            type={"entries"}
          />
        </Grid2>
        <Grid2 display={"flex"} gap={2} size={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/mi-almacen/productos/entradas")}
            color="error"
          >
            Salir
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            color="success"
          >
            Subir entrada
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default AddEntries;
