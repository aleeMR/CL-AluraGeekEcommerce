import { check } from "express-validator";

import {
  existsCategoryById,
  existsProductById,
  validateResult
} from "../middlewares/index.js";

export const validateCreateProduct = [
  check("name", "Ingrese un nombre de producto válido")
    .notEmpty(),
  check("description", "Ingrese una descripción válida")
    .notEmpty(),
  check("price", "Ingrese un precio válido")
    .isDecimal(),
  check("stock", "Ingrese un valor de stock válido")
    .isInt(),
  check("category_id", "Asocie el producto a una categoría válida")
    .isMongoId()
    .custom(existsCategoryById),
  validateResult,
];

export const validateExistsProductByIdWithBody = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsProductById),
  check("name", "Ingrese un nombre de producto válido")
    .notEmpty(),
  check("description", "Ingrese una descripción válida")
    .notEmpty(),
  check("price", "Ingrese un precio válido")
    .isDecimal(),
  check("stock", "Ingrese un valor de stock válido")
    .isInt(),
  check("category_id", "Asocie el producto a una categoría válida")
    .isMongoId()
    .custom(existsCategoryById),
  validateResult,
];

export const validateExistsProductById = [
    check("id", "ID inválido")
      .isMongoId()
      .custom(existsProductById),
    validateResult,
  ];
  