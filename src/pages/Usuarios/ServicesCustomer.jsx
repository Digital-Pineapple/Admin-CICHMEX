import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { useServices } from "../../hooks/useServices";
import { useServicesCustomer } from "../../hooks/useServicesCustomer";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import CustomBreadcrumb from "../../components/ui/CustomBreadcrumb";
import CustomButtonNavigation from "../../components/Buttons/CustomButtonNavigation";
import ServicesProvider from "../../providers/ServicesProvider";
import { useLayoutEffect } from "react";

const ServicesCustomer = () => {
  const { id } = useParams();
  const { services, loadServices  } = useServices();
  const {servicesCustomer, loadCuServ} = useServicesCustomer();
  const {  subCategories, loadSubCategories } = useSubCategories();
  const { categories, loadCategories } = useCategories();

  useLayoutEffect(() => {
    if (id) {
      loadServices();
      loadSubCategories();
      loadCategories();
      loadCuServ(id);
    }
  }, [id]);

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
  });;
  const CardInfoAvailable = CardIn1?.filter((item) => {
    const match = servicesCustomer?.find((item2) => item2._id === item._id);
    return !match;
  });

  return (
    <>
    <ServicesProvider>
      <Grid container mx={"10%"}>
        <CustomBreadcrumb id={id} />
      </Grid>

      <Grid container paddingX="10%">
        <Typography variant="h2" color="secondary">
          Administración de servicios
        </Typography>
        <Grid container spacing={2} columns={20}>
          <Grid item xs={20}>
            
            <CustomButtonNavigation available={CardInfoAvailable}
            />
          </Grid>
        </Grid>
      </Grid>
    </ServicesProvider>
    </>
  );
};

export default ServicesCustomer;
