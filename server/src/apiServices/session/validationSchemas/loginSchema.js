import yup from 'yup';

export default yup
  .object()
  .shape({
    password: yup.string().required("El campo 'password' es obligatorio."),
    email: yup.string().email("El email no tiene un formato válido").required("El campo 'email' es obligatorio."),
  });
