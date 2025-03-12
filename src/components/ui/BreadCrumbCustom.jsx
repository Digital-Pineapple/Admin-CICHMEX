import { ArrowForward, ArrowForwardIos, ArrowRight, PointOfSale } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function BreadcrumbCustom({ paths = [] }) {
  return (
    <Breadcrumbs sx={{fontSize:{xs:"8px", lg:"14px"}, marginY:{xs:0, lg:2}}} separator={<ArrowRight color="secondary"/>} aria-label="breadcrumb">
      <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        Principal
      </RouterLink>
      {paths.map((value, index) => {
        const last = index === paths.length - 1; // Verifica si es el último breadcrumb
        const to = value.path;

        return last ? (
          <Typography  sx={{fontSize:{xs:"8px", lg:"14px"}, color: "success.main"}} key={to} >
            <strong>{value.name}</strong>
          </Typography>
        ) : (
          <RouterLink
            key={to}
            to={to}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {value.name}
          </RouterLink>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbCustom;
