import { check } from "express-validator";

import { validateResult } from "../middlewares/index.js";

export const validateLogin = [
  check("email", "Ingrese un correo válido")
    .isEmail(),
  check("password", "La contraseña es obligatoria")
    .notEmpty(),
  validateResult,
];

export const validateTokenGoogle = [
  check("id_token", "El ID token de Google es necesario")
    .notEmpty(),
  validateResult,
];
