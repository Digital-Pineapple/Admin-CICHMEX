import { Check, Search } from "@mui/icons-material";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography, Card, CardContent, CardActions,
  Grid2,
} from "@mui/material";
import { localDate } from "../../Utils/ConvertIsoDate";
import { purple } from "@mui/material/colors";

const TableBranchDetail = ({branch}) => {
  if (!branch) {
    return null;
  }

  return (
    <TableContainer
      variant="outlined"
      sx={{ borderRadius: "20px", maxWidth: "600px", margin: "auto" }}
      component={Paper}
    >
      <Table aria-label="User Table">
        <TableBody>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell>{branch.name}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Descripción</strong></TableCell>
            <TableCell>{branch.description}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Numero de telefono</strong></TableCell>
            <TableCell>{branch.phone_number}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Dirección</strong></TableCell>
            <TableCell>{`${branch.location.direction}, ${branch.location.neighborhood}, ${branch.location.municipality}, ${branch.location.state}, ${branch.location.cp}`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><strong>Horarios</strong></TableCell>
            <TableCell>
                <Grid2 size={12} display={'flex'} gap={1}>

              {branch.schedules.length > 0 ? (
                branch.schedules.map((i, index) => (
                   <Grid2 size={4}>
                  <Card variant="elevation" key={index}  sx={{ mb: 1, width:'100px', height:'100px' }}>
                    <CardContent>
                      <Typography variant="body1" >
                        <strong>{i.day}</strong><br />
                      </Typography>
                      <Typography sx={{fontSize:'10px'}} variant="body1" color="initial">
                        {`${i.open} - ${i.close}`}

                      </Typography>
                    </CardContent>
                  </Card>
                    </Grid2>
                ))
              ) : (
                "No disponible"
              )}
                </Grid2>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBranchDetail;
