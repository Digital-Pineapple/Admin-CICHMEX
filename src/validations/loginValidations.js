import { string, object } from 'yup';

const loginValidationSchema = object({
    email: string().email('El correo no es valido')
        .required('El correo es requerido'),
    password: string().min(8, 'La contraseña debe contener al menos 8 caracteres')
        .required('La contraseña es requerida'),

})


export {
    loginValidationSchema
}