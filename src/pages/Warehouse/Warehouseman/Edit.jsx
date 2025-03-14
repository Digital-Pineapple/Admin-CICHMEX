import { useParams } from "react-router-dom";
import { useStoreHouse } from "../../../hooks/useStoreHouse";
import { useUsers } from "../../../hooks/useUsers";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import { Button, ButtonGroup, Card, CardContent, FormControl, FormHelperText, Grid2, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import BreadcrumbCustom from "../../../components/ui/BreadCrumbCustom";
import { AttachMoney, Percent } from "@mui/icons-material";
import { lightGreen } from "@mui/material/colors";

const EditWarehouseman = () => {
  const { StoreHouses, loadStoreHouse } = useStoreHouse();
  const {
    oneWarehouseman,
    loading,
    navigate,
    loadWarehouseman,
    loadUpdateWarehouseman
  } = useUsers();
 
  const { id } = useParams();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      type: "",
      employee_detail: {
        salary: "",
        sales_commission_porcent: "",
        store_house: [],
      },
    },
  });

  useEffect(() => {
    if (!StoreHouses.length) {
      loadStoreHouse();
    }
    loadWarehouseman(id);
  }, [id]);

  useEffect(() => {
    if (oneWarehouseman) {
      reset({
        fullname: oneWarehouseman.fullname || "",
        email: oneWarehouseman.email || "",
        type: oneWarehouseman.type_user?.role[0] || "",
        employee_detail: {
          salary: oneWarehouseman.employee_detail?.salary || "",
          sales_commission_porcent:
            oneWarehouseman.employee_detail?.sales_commission_porcent || "",
          store_house: oneWarehouseman.employee_detail?.store_house || [],
        },
      })

    }
  }, [oneWarehouseman, reset]);
 

  const onSubmit = (data) => {
      loadUpdateWarehouseman(id, data);
  };

  const TypesUser = [
    { value: "WAREHOUSE-MANAGER", name: "Encargado de almacén" },
    { value: "WAREHOUSEMAN", name: "Almacenista" },
  ]; 

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const watchField = watch("employee_detail.store_house", false);

  const paths = [
    { path: `/usuarios/almacenistas`, name: "Mis almacenistas" },
    { path: `/usuarios/almacenistas/editar/:id`, name: "Editar almacenista" },
  ];

  return (
    <Grid2 container paddingX={{ xs: 10 }}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Crear almacenista</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2
        component={"form"}
        container
        sx={{
          backgroundColor:'#fff',
          borderRadius:'20px',
          padding:4
        }}
        gap={2}
        display={"flex"}
        textAlign={"center"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 size={{xs:12, lg:6}} >
          <Controller
            name="fullname"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Campo inválido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Nombre completo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
              />
            )}
          />
        </Grid2>

        <Grid2 size={{xs:12, lg:5.8}}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Correo inválido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                disabled
                size="small"
                label="Correo"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
              />
            )}
          />
        </Grid2>

        <Grid2 size={{xs:12, lg:6}} >
          <Controller
            name="employee_detail.salary"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Solo números" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                label="Salario"
                type="number"
                size="small"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid2>

        <Grid2 size={{xs:12, lg:5.8}}>
          <Controller
            name="employee_detail.sales_commission_porcent"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: {
                value: /^(\d|[1-9]\d)$/,
                message: "Valor solo menor de 100",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                label="Comisiones"
                fullWidth
                type="number"
                size="small"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Percent />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Controller
            name="employee_detail.store_house"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                select
                variant="outlined"
                label="Almacen"
                fullWidth
                size="small"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                {...field}
                onChange={(e) =>
                  setValue("employee_detail.store_house", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                {StoreHouses?.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {watchField.name ? (
            <Card
              sx={{ bgcolor: lightGreen[200], marginTop: 2 }}
              variant="elevation"
            >
              <CardContent>
                <Typography variant="h1" fontSize={{ xs: "20px" }}>
                  Almacen Seleccionado: {watchField.name}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            ""
          )}
        </Grid2>

        <Grid2
          container
          size={12}
          gap={1}
          display={"flex"}
          justifyContent={"center"}
        >
          <Controller
            name="type"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <FormControl error={fieldState.invalid} fullWidth size="small">
                <Select {...field} variant="outlined">
                  {TypesUser.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {fieldState.error ? <b>{fieldState.error.message}</b> : ""}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid2>

        <Grid2 size={12} display={'flex'} gap={1}>
          
            <Button
              variant="contained"
              onClick={() =>
                navigate("/usuarios/almacenistas", { replace: true })
              }
              color="error"
              fullWidth
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="success" fullWidth>
              Editar
            </Button>
  
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default EditWarehouseman;
