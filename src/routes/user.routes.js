import { Router } from "express";

import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "../controllers/user.controller.js";
import {
  validateToken,
  checkRole,
} from "../middlewares/index.js";
import { 
  validateCreateUser,
  validateExistsUserById,
} from "../validators/index.js";

export const routerUser = Router();

routerUser.post("/",
  validateCreateUser,
  createUser
);

routerUser.put("/:id",
  validateToken,
  checkRole("USER_ROLE"),
  validateExistsUserById,
  updateUser
);

routerUser.get("/", 
  listUsers
);

routerUser.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsUserById,
  deleteUser
);
