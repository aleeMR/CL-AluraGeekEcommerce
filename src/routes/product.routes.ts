import { Router } from "express";

import { ProductController } from "../controllers/product.controller";
import {
  validateToken,
  checkRole,
} from "../middlewares";
import { 
  validateCreateProduct,
  validateExistsProductById,
  validateExistsProductByIdWithBody,
} from "../validators";

const productController = new ProductController();

export const routerProduct = Router();

routerProduct.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateProduct,
  productController.createProduct
);

routerProduct.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsProductByIdWithBody,
  productController.updateProduct
);

routerProduct.get("/", 
  productController.listProducts
);

routerProduct.get("/:id",
  productController.getProduct
);

routerProduct.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsProductById,
  productController.deleteProduct
);
