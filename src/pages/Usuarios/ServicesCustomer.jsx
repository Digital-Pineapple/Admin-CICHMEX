import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import ServicesCard from "../../components/ui/ServicesCard";
import { useServices } from "../../hooks/useServices";
import { useServicesCustomer } from "../../hooks/useServicesCustomer";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { render } from "react-dom";
import { enqueueSnackbar } from "notistack";
import WarningAlert from "../../components/ui/WarningAlert";
import AlertDelete from "../../components/ui/AlertDelete";
import { number } from "yup";
import ListCheck from "../../components/ui/ListCheck";
import SaveButton from "../../components/Buttons/SaveButton";
import { SafetyCertificateFilled } from "@ant-design/icons";

const ServicesCustomer = () => {
  const { id } = useParams();
  const { services, loadServices } = useServices();
  const {
    loadCuServ,
    addServiceCustomer,
    deleteOneServiceCustomer,
  } = useServicesCustomer();
  const { loadSubCategories, subCategories } = useSubCategories();
  const { loadCategories, categories } = useCategories();
  const [cuServ, setCuServ] = useState([]);
  const [newValues, setNewValues] = useState("");
  const [newServices, setNewServices] = useState([]);
  const [deleteI, setDeleteI] = useState("");
  const [save, setSave] = useState(false);
  const { serviceCustomer } = useSelector((state) => state.servicesCustomer);

  useEffect(() => {
    loadServices();
    loadSubCategories();
    loadCategories();
    loadCuServ(id);
  }, [id]);
  useEffect(() => {
    if (newValues) {
      const addObjects = (data) => {
        if (!noRepeat && !noRepeat2) {
          let {
            idCat,
            updatedAt,
            createdAt,
            nameCategory,
            nameSubCategory,
            ...copia
          } = data;
          const updatedValues = [...newServices, copia];
          setNewServices(updatedValues);
          storage();
        } else {
          return enqueueSnackbar("ya existe este servicio", {
            variant: "error",
          });
        }
      };
      newValues ? addObjects(newValues) : "";
    }
  }, [newValues]);

  useEffect(() => {
    if (serviceCustomer.services) {
      // Filtrar los elementos con status igual a true
      const filteredServices = serviceCustomer?.services.filter(item => item.status === true);
      // Establecer la nueva matriz en cuServ
      setCuServ(filteredServices);
    } else {
      // Si serviceCustomer es falsy, establecer cuServ en una matriz vacía
      setCuServ([]);
    }
    
  }, [serviceCustomer]);

  useEffect(() => {
    if (deleteI?.length > 0) {
      deleteServ(serviceCustomer?._id, deleteI);
    }
    if (save === true) {
      try {
       let services_id = serviceCustomer._id 
        addServiceCustomer(services_id,newServices)
        setSave(false)
      
      } catch (error) {
        
      }
    }
  }, [deleteI, save]);

  const storage = () => {
    localStorage.setItem("services", newServices);
  };

  const CardIn1 = services?.map((service) => {
    const subCategory = subCategories?.find(
      (item) => item?._id === service.subCategory
    );

    return {
      nameSubCategory: subCategory ? subCategory.name : "",
      idCat: subCategory ? subCategory.category : "",
      ...service,
    };
  });
  const CardIn2 = CardIn1.map((item1) => {
    const Category = categories?.find((item) => item?._id === item1.idCat);
    return {
      nameCategory: Category ? Category.name : "",
      ...item1,
    };
  });
  const deleteItem = (num) => {
    const result = newServices.filter((item, index) => index !== num);
    setNewServices(result);
  };
  const totalItems = ( val )=>{
    const match1 = cuServ?.filter((item) => !val.includes(item._id));
    const match2 = cuServ?.filter((item) => val.includes(item._id));
    const status = match2?.map((item) => ({ ...item, status: false })) || [];
    match1.push(...status);
    return match1
  }

  const deleteServ = (services_id, deleteI) => {
    try {
      deleteOneServiceCustomer(services_id, totalItems(deleteI));
      loadCuServ(id);
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: "Error xd" });
    }
  };

  const noRepeat = serviceCustomer?.services?.some(function (services) {
    if (services?._id === newValues._id) {
      return true;
    }
  });
  const noRepeat2 = newServices
    ? newServices &&
      newServices.some(function (id) {
        if (id._id === newValues._id) {
          return true;
        }
      })
    : false;
  const changeSave = () => {
    setSave(true);
  };

  return (
    <Grid
      container
      paddingX="10%"
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      <Typography variant="h2" color="secondary">
        Administración de servicios
      </Typography>
      <Grid container spacing={2} columns={20}>
        <Grid item xs={20}>
          <Typography variant="h4" color="primary">
            Servicios disponibles
          </Typography>
        </Grid>
        {CardIn2?.map((item) => (
          <Grid key={item._id} item xs={200} md={10} lg={6} xl={4}>
            <ServicesCard
              item={item}
              key={item._id}
              services_id={serviceCustomer?._id}
              setNew={setNewValues}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{ backgroundColor: "grey", padding: 2, borderRadius: 5, m: 2 }}
        spacing={2}
        columns={20}
      >
        <Typography variant="h4" color="secondary">
          Mis servicios
        </Typography>
        <Grid item xs={20}></Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="primary">
            Servicios dados de alta:
          </Typography>
          <ListCheck setDelete={setDeleteI} values={cuServ}></ListCheck>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="primary">
            Servicios que quiero agregar:
          </Typography>
          <Paper>
            {newServices !== (undefined || null) ? (
              newServices && (
                <List dense={false}>
                  {newServices?.map((item, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <AlertDelete
                          title="Estas seguro de eliminar el servicio"
                          callbackToDeleteItem={() => deleteItem(index)}
                        />
                      }
                    >
                      <ListItemText primary={item?.name} />
                      <ListItemText primary={item?.price} />
                    </ListItem>
                  ))}
                </List>
              )
            ) : (
              <Typography>No hay servicios agregados</Typography>
            )}
            {newServices.length > 0 ? (
              <SaveButton
                title={"Estas seguro de guardar estos servicios"}
                list={newServices}
                setSave={changeSave}
              />
            ) : (
              ""
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServicesCustomer;
