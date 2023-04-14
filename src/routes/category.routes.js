import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  listCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  validateToken,
  checkRole,
} from "../middlewares/index.js";
import { 
  validateCreateCategory,
  validateExistsCategoryById,
  validateExistsCategoryByIdWithBody,
} from "../validators/index.js";

export const routerCategory = Router();

routerCategory.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateCategory,
  createCategory
);

routerCategory.get("/",
  listCategories
);

routerCategory.get("/:id",
  getCategory
);

routerCategory.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsCategoryByIdWithBody,
  updateCategory
);

routerCategory.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsCategoryById,
  deleteCategory
);