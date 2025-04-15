import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { useServices } from "../../hooks/useServices";
import { useServicesCustomer } from "../../hooks/useServicesCustomer";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import CustomButtonNavigation from "../../components/Buttons/CustomButtonNavigation";
import { useLayoutEffect } from "react";
import { useTypeCars } from "../../hooks/UseTypeCars";

const ServicesCustomer = () => {
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL
  const { services, loadServices } = useServices(); // Hook para manejar los servicios
  const { serviceCustomer, loadCuServ } = useServicesCustomer(); // Hook para manejar los servicios del cliente
  const { subCategories, loadSubCategories } = useSubCategories(); // Hook para manejar las subcategorías
  const { categories, loadCategories } = useCategories(); // Hook para manejar las categorías
  const { loadTypeCars } = useTypeCars(); // Hook para manejar los tipos de autos

  // Efecto para cargar datos iniciales cuando el componente se monta o cambia el "id"
  useLayoutEffect(() => {
    if (id) {
      loadServices(); // Carga los servicios
      loadSubCategories(); // Carga las subcategorías
      loadCategories(); // Carga las categorías
      loadCuServ(id); // Carga los servicios del cliente específico
      loadTypeCars(); // Carga los tipos de autos
    }
  }, [id]);

  const services_id = serviceCustomer?._id; // Obtiene el ID del servicio del cliente

  // Mapea los servicios para enriquecerlos con información de subcategorías y categorías
  const CardIn1 = services?.map((service) => {
    const subCategory = subCategories?.find(
      (item) => item?._id === service.subCategory
    );
    const Category = categories?.find(
      (item) => item?._id === subCategory?.category
    );
    return {
      nameSubCategory: subCategory ? subCategory.name : "", // Nombre de la subcategoría
      idCat: subCategory ? subCategory.category : "", // ID de la categoría
      nameCategory: Category ? Category.name : "", // Nombre de la categoría
      ...service,
    };
  });

  // Filtra los servicios disponibles que no están asignados al cliente
  const CardInfoAvailable = CardIn1?.filter((item) => {
    const match = serviceCustomer?.services?.find(
      (item2) => item2?._id === item._id
    );
    return !match; // Retorna los servicios que no están en los servicios del cliente
  });

  return (
    <>
      {/* Contenedor principal */}
      <Grid container mx={"10%"} minHeight={"100%"}></Grid>

      {/* Sección de administración de servicios */}
      <Grid paddingX="10%">
        <Typography variant="h2" color="secondary">
          Administración de servicios
        </Typography>
        <>
          {/* Componente de navegación personalizado */}
          <CustomButtonNavigation
            myServices={serviceCustomer?.services} // Servicios del cliente
            available={CardInfoAvailable} // Servicios disponibles
            id={id} // ID del cliente
            services_id={services_id} // ID del servicio del cliente
          />
        </>
      </Grid>
    </>
  );
};

export default ServicesCustomer;
