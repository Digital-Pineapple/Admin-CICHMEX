import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Box,
  FormHelperText,
  OutlinedInput,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { AssistantDirection, ChangeCircle, Close, Group, LocalShipping, UploadFile } from "@mui/icons-material";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { Controller, useForm } from "react-hook-form";
import { useState, useMemo, useCallback } from "react";
import { blueGrey } from "@mui/material/colors";

const shippingCompanies = ["Fedex", "DHL", "Estafeta", "Paquete Express"];

// Componente que muestra la información de la orden y la dirección de entrega o sucursal
const CardComponent = ({ info }) => {
  return (
    <>
      {/* Información básica de la orden */}
      <Grid2 size={{xs:12, sm:5.7}}>
        <Card sx={{ height: "100%" }} variant="outlined">
          <CardHeader title={`Id de orden:${info?.order_id}`} />
          <CardContent>
            <Typography fontSize={"14px"}>
              Fecha de empaque: <strong>{info?.supply_date}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      {/* Información de la sucursal o dirección de entrega */}
      <Grid2 size={{xs:12, sm:6}} >
        <Card variant="outlined">
          <CardContent>
            {info.branch ? (
              <>
                <Typography variant="h5">Sucursal de Entrega:</Typography>
                <Typography>Nombre de la sucursal: {info?.branch?.name}</Typography>
                <Typography>Estado: {info?.branch?.location?.state}</Typography>
                <Typography>Municipio: {info?.branch?.location?.municipality}</Typography>
                <Typography>Dirección: {info?.branch?.location?.direction}</Typography>
              </>
            ) : (
              <>
                <Typography variant="h5">Dirección de entrega:</Typography>
                <Typography fontSize={"14px"}>
                  Código Postal: <strong>{info?.deliveryLocation?.zipcode}</strong>
                  <br />
                  Estado: <strong>{info?.deliveryLocation?.state}</strong>
                  <br />
                  Municipio: <strong>{info?.deliveryLocation?.municipality}</strong>
                  <br />
                  Localidad: <strong>{info?.deliveryLocation?.neighborhood}</strong>
                  <br />
                  Calle: <strong>{info?.deliveryLocation?.street}</strong>
                  <br />
                  No: <strong>{info?.deliveryLocation?.numext}</strong>
                  <br />
                  {info?.deliveryLocation?.reference && `Referencia: ${info?.deliveryLocation?.reference}`}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
};

// Componente para subir archivos PDF (guía de envío)
const FileUploadComponent = ({ control, errors, onChangePDF, isDragging, handleDragOver, handleDragLeave, document }) => {
  return (
    <Controller
      control={control}
      rules={{ required: { value: true, message: "Campo requerido" } }}
      name="guide_pdf"
      render={({ field: { name, ref, onBlur } }) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          component="label"
          htmlFor="guide_pdf"
          sx={{ cursor: "pointer" }}
          onDragOver={handleDragOver} // Maneja el evento de arrastrar sobre el área
          onDragLeave={handleDragLeave} // Maneja el evento de salir del área de arrastre
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const droppedFiles = e.dataTransfer.files;
            if (droppedFiles.length) {
              onChangePDF(droppedFiles[0]); // Actualiza el archivo seleccionado
            }
          }}
        >
          {document?.filePreview ? (
            <Grid2 size={12} >
              {/* Vista previa del archivo PDF */}
              <object
                data={document?.filePreview}
                type="application/pdf"
                width="100%"
                height="100%"
                title="Embedded PDF Viewer"
              >
                <iframe
                  src={document?.filePreview}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title="Embedded PDF Viewer, iframe fallback"
                >
                  <p>Your browser does not support PDFs.</p>
                </iframe>
              </object>
              <Controller
                rules={{ required: { value: true, message: "Campo requerido" } }}
                name="guide_pdf.file"
                control={control}
                render={({ field: { name, ref, onBlur } }) => (
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<ChangeCircle />}
                  >
                    Cambiar
                    <input
                      accept="application/pdf"
                      style={{ display: "none" }}
                      type="file"
                      ref={ref}
                      id="guide_pdf"
                      onBlur={onBlur}
                      name={name}
                      onChange={(e) => onChangePDF(e.target.files[0])} // Cambia el archivo seleccionado
                    />
                  </Button>
                )}
              />
            </Grid2>
          ) : (
            <Box
              sx={{
                position: "relative",
                backgroundColor: isDragging ? "#bbdefb" : "#e1f5fe",
                width: "100%",
                minHeight: "150px",
                padding: "30px 70px",
                borderRadius: "20px",
                border: !!errors.guide_pdf ? "2px dashed rgb(228, 12, 12)" : "2px dashed #bbdefb",
                boxShadow: "0px 0px 200px -50px #90caf9",
                textAlign: "center",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                  border: "2px dashed #42a5f5",
                },
              }}
            >
              {/* Mensaje para subir archivo */}
              <Typography variant="body2" color="inherit">
                <UploadFile style={{ color: "#42a5f5" }} />{" "}
                <strong style={{ color: "#42a5f5" }}>Seleccionar o arrastrar archivo aquí</strong>
                <br />
                Sube archivo PDF aquí.
              </Typography>
              <Controller
                rules={{ required: { value: true, message: "Campo requerido" } }}
                name="guide_pdf.file"
                control={control}
                render={({ field: { name, ref, onBlur } }) => (
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    ref={ref}
                    id="guide_pdf"
                    onBlur={onBlur}
                    name={name}
                    onChange={(e) => onChangePDF(e.target.files[0])} // Cambia el archivo seleccionado
                  />
                )}
              />
            </Box>
          )}
          <FormHelperText error={!!errors.guide_pdf?.file}>
            {errors?.guide_pdf?.file?.message}
          </FormHelperText>
        </Box>
      )}
    />
  );
};

// Componente de navegación inferior para cambiar entre "Compañía" y "Usuario"
const NavigationComponent = ({ valueNav, setValueNav, reset, updateGuide, updateUser }) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomRightRadius: "15px",
        borderBottomLeftRadius: "15px",
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          bgcolor: blueGrey[100],
          borderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
        }}
        value={valueNav}
        onChange={(event, newValue) => {
          setValueNav(newValue); // Cambia la pestaña activa
          reset(); // Reinicia el formulario
        }}
      >
        {updateGuide && (
          <BottomNavigationAction key={"Compañia"} label="Compañía" icon={<LocalShipping />} />
        )}
        {updateUser && (
          <BottomNavigationAction key={"Usuario"} label="Usuario" icon={<Group />} />
        )}
        {!updateGuide && !updateUser && [
          <BottomNavigationAction key={"Compañia"} label="Compañía" icon={<LocalShipping />} />,
          <BottomNavigationAction key={"Usuario"} label="Usuario" icon={<Group />} />,
        ]}
      </BottomNavigation>
    </Paper>
  );
};

// Componente principal para asignar rutas, compañía de envío o usuario
const AssignRoute = ({ productOrder, handleClose, carrierDrivers = [], updateUser = false, updateGuide = false }) => {
  const info = productOrder.data;
  const { loading, loadAssignRoute } = useProductOrder();
  const [valueNav, setValueNav] = useState(updateUser ? 1 : updateGuide ? 0 : 0);
  const [isDragging, setIsDragging] = useState(false);

  const { control, watch, reset, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      user: info?.route_detail?.user || "",
      order_id: info?._id,
      guide: info?.route_detail?.guide || "",
      shipping_company: info?.route_detail?.shipping_company || "",
      guide_pdf: {
        file: info?.route_detail?.guide_pdf || "",
        filePreview: info?.route_detail?.guide_pdf || "",
      },
    },
  });

  const document = watch("guide_pdf");

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true); // Activa el estado de arrastre
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false); // Desactiva el estado de arrastre
  }, []);

  const onChangePDF = useCallback((file) => {
    if (!file) return;
    const current = watch("guide_pdf") || [];
    if (current.length >= 2) return;
    const filePreview = URL.createObjectURL(file); // Genera una vista previa del archivo
    setValue("guide_pdf.filePreview", filePreview);
    setValue("guide_pdf.file", file);
  }, [setValue, watch]);

  const handleSubmitForm = useCallback((data) => {
    loadAssignRoute(data, handleClose); // Envía los datos del formulario
  }, [loadAssignRoute, handleClose]);

  if (loading) {
    return <LoadingScreenBlue />; // Muestra una pantalla de carga si está cargando
  }

  return (
    <Grid2>
      {/* Componente de navegación */}
      <NavigationComponent
        valueNav={valueNav}
        setValueNav={setValueNav}
        reset={reset}
        updateGuide={updateGuide}
        updateUser={updateUser}
      />
      {valueNav === 0 ? (
        <Grid2
          container
          component="form"
          padding={2}
          onSubmit={handleSubmit(handleSubmitForm)}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Grid2
            size={12}
          >
            <Typography
              variant="h2"
              fontSize={{ xs: "15px", sm: "20px", lg: "30px" }}
            >
            <strong>Asignar compañia de envio</strong>  
            </Typography>
          </Grid2>

          {/* Componente de información de la orden */}
          <CardComponent info={info} />

          {/* Componente para subir archivo PDF */}
          <Grid2 size={{xs:12, md:6}}>
          <FileUploadComponent
            control={control}
            errors={errors}
            onChangePDF={onChangePDF}
            isDragging={isDragging}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            document={document}
          />
          </Grid2>

          {/* Selección de compañía de envío y número de guía */}
          <Grid2 size={{ xs: 12, sm: 5.7 }}>
            <Controller
              name="shipping_company"
              control={control}
              rules={{ required: { value: true, message: "Seleccione compañía de envíos" } }}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <FormLabel>Asigne la compañia de envio</FormLabel>
                  <Select
                    {...field}
                    id="shipping_company"
                    name="shipping_company"
                    error={!!errors?.shipping_company}
                  >
                    {shippingCompanies.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors?.shipping_company}>
                    {errors?.shipping_company?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="guide"
              control={control}
              rules={{ required: { value: true, message: "Agrege una guía" } }}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <FormLabel>No. de guía</FormLabel>
                  <OutlinedInput
                    {...field}
                    size="small"
                    error={!!errors.guide}
                    placeholder="Ej. 30000"
                    name="guide"
                    id="guide"
                  />
                  <FormHelperText error={!!errors.guide}>
                    {errors?.guide?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid2>

          {/* Botones de acción */}
          <Grid2
            size={12}
            display="flex"
            gap={2}
            marginBottom={3}
            justifyContent="center"
          >
            <Button
              onClick={handleClose}
              variant="contained"
              color="warning"
              startIcon={<Close />}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<AssistantDirection />}
              type="submit"
            >
              Asignar compañia
            </Button>
          </Grid2>
        </Grid2>
      ) : (
        <Grid2
          container
          component="form"
          padding={2}
          onSubmit={handleSubmit(handleSubmitForm)}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Grid2
            marginTop={{ xs: "-30px" }}
            size={12}
            minHeight="70px"
            className="Titles"
          >
            <Typography
              textAlign="center"
              variant="h2"
              fontSize={{ xs: "15px", sm: "20px", lg: "30px" }}
            >
              Asignar usuario
            </Typography>
          </Grid2>
          {/* Selección de usuario */}
          <Controller
            name="user"
            control={control}
            rules={{ required: { value: true, message: "Seleccione usuario" } }}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <FormLabel>Asignar usuario</FormLabel>
                <Select {...field} id="user" name="user" error={!!errors?.user}>
                  {carrierDrivers.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.fullname}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors?.user}>
                  {errors?.user?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          {/* Botones de acción */}
          <Grid2
            size={12}
            display="flex"
            gap={2}
            marginBottom={3}
            justifyContent="center"
          >
            <Button
              onClick={handleClose}
              variant="contained"
              color="warning"
              startIcon={<Close />}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<AssistantDirection />}
              type="submit"
            >
              Asignar usuario
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default AssignRoute;