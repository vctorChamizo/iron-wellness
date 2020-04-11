export const validateForm = (errors) => {
  if (errors.username) {
    errors.username.helperText =
      errors.username.type === "required"
        ? "El campo no puede ser vacio"
        : "Usuario inválido. Debe contener mas de 3 carateres.";
  }

  if (errors.email) {
    errors.email.helperText =
      errors.email.type === "required"
        ? "El campo no puede ser vacio"
        : "Email inválido";
  }

  if (errors.password) {
    errors.password.helperText =
      errors.password.type === "required"
        ? "El campo no puede ser vacio"
        : "Contrasela inválida. Debe contener mas de 6 caracteres, números, mayúsculas y minúsculas.";
  }

  if (errors.name) errors.name.helperText = "El campo no puede ser vacio";

  if (errors.surname) errors.surname.helperText = "El campo no puede ser vacio";

  return errors;
};
