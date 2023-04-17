import { Router } from "express";

import { 
  validateLogin,
  validateTokenGoogle,
} from "../validators";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();

export const routerAuth = Router();

routerAuth.post("/login", 
  validateLogin,
  authController.signin
);

routerAuth.post("/google",
  validateTokenGoogle,
  authController.googleSignin
);
