import * as yup from 'yup';

export const postUserTokenValidator: yup.AnyObjectSchema = yup.object({
    user_token: yup.string().required('Campo obrigatório'),
})