import { Router } from "express";

import { CategoryController } from "../controllers/category.controller";
import {
  validateToken,
  checkRole,
} from "../middlewares";
import { 
  validateCreateCategory,
  validateExistsCategoryById,
  validateExistsCategoryByIdWithBody,
} from "../validators";

const categoryController = new CategoryController();

export const routerCategory = Router();

routerCategory.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateCategory,
  categoryController.createCategory
);

routerCategory.get("/",
  categoryController.listCategories
);

routerCategory.get("/:id",
  categoryController.getCategory
);

routerCategory.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsCategoryByIdWithBody,
  categoryController.updateCategory
);

routerCategory.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsCategoryById,
  categoryController.deleteCategory
);