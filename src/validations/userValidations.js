import { string, object } from 'yup';

const userEditValidationSchema = object({
    fullname: string().required('El nombre es requerido'),
    email   : string().email('El correo no es valido').required('El correo es requerido'),
})


export {
    userEditValidationSchema
}