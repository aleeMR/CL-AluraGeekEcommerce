import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import {
  validateToken,
  checkRole,
} from "../middlewares";
import { 
  validateCreateUser,
  validateExistsUserById,
} from "../validators";

const userController: UserController = new UserController();

export const routerUser = Router();

routerUser.post("/",
  validateCreateUser,
  userController.createUser
);

routerUser.put("/:id",
  validateToken,
  checkRole("ADMIN_ROLE", "USER_ROLE"),
  validateExistsUserById,
  userController.updateUser
);

routerUser.get("/", 
  userController.listUsers
);

routerUser.delete("/:id",
  validateToken,
  checkRole("ADMIN_ROLE"),
  validateExistsUserById,
  userController.deleteUser
);
