import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  validateToken,
  checkRole,
} from "../middlewares/index.js";
import { 
  validateCreateProduct,
  validateExistsProductById,
  validateExistsProductByIdWithBody,
} from "../validators/index.js";

export const routerProduct = Router();

routerProduct.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateProduct,
  createProduct
);

routerProduct.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsProductByIdWithBody,
  updateProduct
);

routerProduct.get("/", 
  listProducts
);

routerProduct.get("/:id",
  getProduct
);

routerProduct.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsProductById,
  deleteProduct
);
