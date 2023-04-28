import { Box, Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { Input } from '../ui';
import { loginValidationSchema } from '../../validations/loginValidations';
import { useAuth } from '../../hooks/useAuth';

const initialValues = {
    email   : '',
    password: '',
}

const FormLogin = () => {

    const { login } = useAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: loginValidationSchema,
        onSubmit: (values) => login(values)
    })
    return (
        <Box mt={15} p={2} bgcolor={'white'}>
                <Typography component="h1" variant="h5" sx={{ mt: 9,textAlign: 'center' }}>
                    Iniciar Sesión
                </Typography>
                <hr color='#CC3C5C' size='3px' />
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 9,px: 4 }}>
                    <Input
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3,mb: 15 }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
        </Box>
    )
}

export default FormLogin