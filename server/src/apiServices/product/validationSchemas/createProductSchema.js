import yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(200, "El nombre no puede exceder 200 caracteres")
    .required("El campo 'name' es obligatorio."),
  description: yup
    .string()
    .trim()
    .max(1000, "La descripción no puede exceder 1000 caracteres")
    .required("El campo 'description' es obligatorio."),
  price: yup
    .number()
    .positive("El precio debe ser un número positivo")
    .required("El campo 'price' es obligatorio."),
  sku: yup
    .string()
    .trim()
    .min(3, "El SKU debe tener al menos 3 caracteres")
    .max(50, "El SKU no puede exceder 50 caracteres")
    .required("El campo 'sku' es obligatorio."),
  inventory: yup
    .number()
    .integer("El inventario debe ser un número entero")
    .min(0, "El inventario no puede ser negativo")
    .required("El campo 'inventory' es obligatorio."),
  image: yup
    .string()
    .trim()
    .max(255, "La URL de la imagen no puede exceder 255 caracteres")
    .min(0, "El inventario no puede ser negativo")
    .required("El campo 'image' es obligatorio."),
});
