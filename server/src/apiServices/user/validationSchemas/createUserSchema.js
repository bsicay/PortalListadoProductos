import yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .required("El campo 'name' es obligatorio."),
  email: yup
    .string()
    .trim()
    .email("El valor de 'email' no posee el formato de un email válido.")
    .max(100, "El email no puede exceder 100 caracteres")
    .required("El campo 'email' es obligatorio."),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(255, "La contraseña no puede exceder 255 caracteres")
    .required("El campo 'password' es obligatorio."),
  role: yup
    .string()
    .oneOf(['administrador', 'colaborador'], "El rol debe ser 'administrador' o 'colaborador'")
    .default('colaborador'),
});
