import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Grid,
  Box,
  FormHelperText,
  InputBase,
  Fab,
  FilledInput,
  OutlinedInput,
} from "@mui/material";
import { useProductOrder } from "../../hooks/useProductOrder";
import { useFormik, useFormikContext } from "formik";
import { localDate } from "../../Utils/ConvertIsoDate";
import {
  AssistantDirection,
  Clear,
  Close,
  Delete,
  UploadFile,
} from "@mui/icons-material";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { name } from "dayjs/locale/es";
import { ref } from "yup";
import PDFViewer from "../../Utils/PDFViewer";

const AssignRoute = ({ productOrder, handleClose }) => {
  let info = productOrder.data;
  const { loading, loadAssignRoute } = useProductOrder();

  const shippingCompanies = ["Fedex", "DHL", "Estafeta", "Paquete Express"];

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: info?.route_detail?.user ? info.route_detail?.user : "",
      order_id: info?._id,
      guide: "",
      shipping_company: "",
      guide_pdf: {file:'', filePreview:''},
    },
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length) {
      onChangeImages({ target: { files: droppedFiles } }, index);
    }
  };

  const onChangePDF = (file) => {
    if (!file) return;
    const current = watch(`guide_pdf`) || [];
    if (current.length >= 2) return;
    const filePreview = URL.createObjectURL(file);
    setValue(`guide_pdf.filePreview`, filePreview);
    setValue(`guide_pdf.file`, file);
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }
  const document = watch("guide_pdf");

  const handleSubmitForm = (data) => {
   loadAssignRoute(data, handleClose)
  };

  return (
    <Grid2
      container
      component={"form"}
      padding={2}
      onSubmit={handleSubmit(handleSubmitForm)}
      display={"flex"}
      justifyContent={"center"}
      gap={2}
    >
      <Grid2
        item
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Asignar compañia de envio
        </Typography>
      </Grid2>

      <Grid2 item size={{ xs: 12, sm: 5.7 }}>
        <Card sx={{ height: "100%" }} variant="outlined">
          <CardHeader title={`Id de orden:${info?.order_id}`} />
          <CardContent>
            <Typography fontSize={"14px"}>
              Fecha de empaque: <strong>{info?.supply_date}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6 }}>
        <Card variant="outlined">
          <CardContent>
            {info.branch ? (
              <>
                <Typography variant="h5">Sucursal de Entrega:</Typography>

                <Typography>
                  Nombre de la sucursal: {info?.branch?.name}
                </Typography>
                <Typography>Estado: {info?.branch?.location?.state}</Typography>
                <Typography>
                  Municipio: {info?.branch?.location?.municipality}
                </Typography>
                <Typography>
                  Dirección: {info?.branch?.location?.direction}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h5">Dirección de entrega:</Typography>
                <Typography fontSize={"14px"}>
                  Código Postal:{" "}
                  <strong>{info?.deliveryLocation?.zipcode}</strong>
                  <br />
                  Estado: <strong>{info?.deliveryLocation?.state}</strong>
                  <br />
                  Municipio:{" "}
                  <strong>{info?.deliveryLocation?.municipality}</strong>
                  <br />
                  Localidad:{" "}
                  <strong>{info?.deliveryLocation?.neighborhood}</strong>
                  <br />
                  Calle: <strong>{info?.deliveryLocation?.street}</strong>
                  <br />
                  No: <strong>{info?.deliveryLocation?.numext}</strong>
                  <br />
                  {info?.deliveryLocation?.reference
                    ? `Referencia: ${info?.deliveryLocation?.reference}`
                    : ""}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 item size={{ xs: 12, sm: 5.7 }}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Campo requerido",
            },
          }}
          name="guide_pdf"
          render={({ field: { name, ref, onBlur, onChange } }) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                component="label"
                htmlFor={`guide_pdf`}
                sx={{ cursor: "pointer" }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {document?.filePreview ? (
                  document && (
                    <Grid2>
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
                    </Grid2>
                  )
                ) : (
                  <Box
                    sx={{
                      position: "relative",
                      backgroundColor: isDragging ? "#bbdefb" : "#e1f5fe",
                      width: "100%",
                      minHeight: "150px",
                      padding: "30px 70px",
                      borderRadius: "20px",
                      border: !!errors.guide_pdf ? "2px dashed rgb(228, 12, 12)" :  "2px dashed #bbdefb",
                      boxShadow: "0px 0px 200px -50px #90caf9",
                      textAlign: "center",
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor:"#bbdefb",
                        border: "2px dashed #42a5f5",
                      },
                    }}
                  >
                    <Typography variant="body2" color="inherit">
                      <UploadFile style={{ color: "#42a5f5" }} />{" "}
                      <strong style={{ color: "#42a5f5" }}>
                        Seleccionar o arrastrar archivo aquí
                      </strong>
                      <br />
                      Sube archivo PDF aquí.
                    </Typography>
                    <input
                      id="guide_pdf"
                      accept="application/pdf"
                      style={{ display: "none" }}
                      type="file"
                      ref={ref}
                      onBlur={onBlur}
                      name={name}
                      onChange={(e) => onChangePDF(e.target.files[0])} // Aquí se maneja el archivo al ser seleccionado
                    />
                  </Box>
                )}
                <FormHelperText error={!!errors.guide_pdf}>{errors?.guide_pdf?.message}</FormHelperText>
              </Box>
            );
          }}
        />
      </Grid2>

      <Grid2 item size={{ xs: 12, sm: 6 }}>
        <Controller
          name="shipping_company"
          control={control}
          rules={{
            required: { value: true, message: "Seleccione compañía de envíos" },
          }}
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
          rules={{
            required: { value: true, message: "Agrege una guía" },
          }}
          render={({field}) => {
            return (
              <FormControl fullWidth variant="outlined">
                <FormLabel>No. de guía</FormLabel>
                <OutlinedInput
                {...field}
                  size="small"
                  error={!!errors.guide}
                  placeholder="Ej. 30000"
                  name={'guide'}
                  id='guide'
                />
                <FormHelperText error={!!errors.guide}>{errors?.guide?.message}</FormHelperText>
              </FormControl>
            );
          }}
        />
      </Grid2>
      <Grid2 item xs={12} display={"flex"} gap={2} justifyContent={"center"}>
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
  );
};

export default AssignRoute;
