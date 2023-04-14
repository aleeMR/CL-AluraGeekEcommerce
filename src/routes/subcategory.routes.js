import { Router } from "express";

import {
  createSubcategory,
  deleteSubcategory,
  getSubcategory,
  listSubcategories,
  updateSubcategory,
} from "../controllers/subcategory.controller.js";
import {
  validateToken,
  checkRole,
} from "../middlewares/index.js";
import { 
  validateCreateSubcategory,
  validateExistsSubcategoryById,
  validateExistsSubcategoryByIdWithBody,
} from "../validators/index.js";

export const routerSubcategory = Router();

routerSubcategory.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateSubcategory,
  createSubcategory
);

routerSubcategory.get("/",
  listSubcategories
);

routerSubcategory.get("/:id",
  getSubcategory
);

routerSubcategory.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsSubcategoryByIdWithBody,
  updateSubcategory
);

routerSubcategory.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsSubcategoryById,
  deleteSubcategory
);