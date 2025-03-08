import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import React from "react";
import SalesTransfer from "./SalesTransfer";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

export default function VerifySales() {

  const paths = [
    { path: `/contaduria/verificar-ventas`, name: "Verificar ventas" },
  ];
  return (
    <Grid2 container paddingX={10} display={"flex"} gap={2}>
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
          <strong>Verificar ventas</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
              <BreadcrumbCustom paths={paths} />
            </Grid2>
      <SalesTransfer />
    </Grid2>
  );
}
