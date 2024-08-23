export const validate = (formData: any) => {
  const errors: { [key: string]: string } = {};

  // Expresiones regulares para validación
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
  const passwordConfirmationRegex = new RegExp(`^${formData.password}$`); // Debe coincidir con el password

  // Validación de cada campo
  if (!emailRegex.test(formData.email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }
  if (!passwordRegex.test(formData.password)) {
    errors.password =
      "La contraseña debe tener al menos 6 caracteres y contener al menos un número, una letra mayúscula y una minúscula";
  }
  if (!phoneRegex.test(formData.phone)) {
    errors.phone = "Ingrese un número de teléfono válido de 10 dígitos";
  }
  if (!nameRegex.test(formData.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }
  if (!passwordConfirmationRegex.test(formData.passwordConfirmation)) {
    errors.passwordConfirmation =
      "La confirmación de la contraseña no coincide";
  }

  return errors;
};

export default validate;
