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
  const { id } = useParams();
  const { services, loadServices } = useServices();
  const { serviceCustomer, loadCuServ } = useServicesCustomer();
  const { subCategories, loadSubCategories } = useSubCategories();
  const { categories, loadCategories } = useCategories();
  const {loadTypeCars} =  useTypeCars()
  

  useLayoutEffect(() => {
    if (id) {
      loadServices();
      loadSubCategories();
      loadCategories();
      loadCuServ(id);
      loadTypeCars()

    }
  }, [id]);
const services_id = serviceCustomer?._id

  const CardIn1 = services?.map((service) => {
    const subCategory = subCategories?.find(
      (item) => item?._id === service.subCategory
    );
    const Category = categories?.find(
      (item) => item?._id === subCategory?.category
    );
    return {
      nameSubCategory: subCategory ? subCategory.name : "",
      idCat: subCategory ? subCategory.category : "",
      nameCategory: Category ? Category.name : "",
      ...service,
    };
  });
  const CardInfoAvailable = CardIn1?.filter((item) => {
    const match = serviceCustomer?.services?.find(
      (item2) => item2?._id === item._id,
    );
    return !match;
  });

  return (
    <>
      <Grid container mx={"10%"} minHeight={'100%'}>
      </Grid>

      <Grid paddingX="10%">
        <Typography variant="h2" color="secondary">
          Administración de servicios
        </Typography>
        <>
          <CustomButtonNavigation 
           myServices ={serviceCustomer?.services} 
           available={CardInfoAvailable} 
           id={id}
           services_id={services_id}
           />
        </>
      </Grid>
    </>
  );
};

export default ServicesCustomer;
