import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import OptionsTable from '../ui/OptionsTable';

const UserTable = ({ users }) => {

    return (
        <TableContainer component={Paper} sx={{ minWidth: '100%', paddingX: 10 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Correo</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.fullname}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user?.phone?.phone_number || 'NA'}</TableCell>
                            <TableCell align="rigth">
                                <OptionsTable title={`¿Esta seguro que desea eleminar el usuario ${user.fullname}?`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable