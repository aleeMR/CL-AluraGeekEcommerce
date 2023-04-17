import { Router } from "express";

import { SubcategoryController } from "../controllers/subcategory.controller";
import {
  validateToken,
  checkRole,
} from "../middlewares";
import { 
  validateCreateSubcategory,
  validateExistsSubcategoryById,
  validateExistsSubcategoryByIdWithBody,
} from "../validators";

const subcatecoryController = new SubcategoryController();

export const routerSubcategory = Router();

routerSubcategory.post("/",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateCreateSubcategory,
  subcatecoryController.createSubcategory
);

routerSubcategory.get("/",
  subcatecoryController.listSubcategories
);

routerSubcategory.get("/:id",
  subcatecoryController.getSubcategory
);

routerSubcategory.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsSubcategoryByIdWithBody,
  subcatecoryController.updateSubcategory
);

routerSubcategory.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsSubcategoryById,
  subcatecoryController.deleteSubcategory
);