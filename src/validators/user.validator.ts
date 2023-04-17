import { check } from "express-validator";

import { 
  existsUserById,
  validateEmail,
  validateRole,
  validateResult
} from "../middlewares";

export const validateCreateUser = [
  check("name", "Ingrese un nombre válido")
    .notEmpty(),
  check("surname", "Ingrese un apellido válido")
    .notEmpty(),
  check("email", "Ingrese un correo válido")
    .isEmail()
    .custom(validateEmail),
  check("password", "Ingrese una contraseña válida")
    .isLength({ min: 6 }),
  check("role", "Ingrese un rol válido")
    .notEmpty()
    .custom(validateRole),
  validateResult,
];

export const validateExistsUserById = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsUserById),
  validateResult,
];
