import { Router } from "express";

import { 
  validateLogin,
  validateTokenGoogle,
} from "../validators/index.js";
import {
  googleSignin,
  signin,
} from "../controllers/auth.controller.js";

export const routerAuth = Router();

routerAuth.post("/login", 
  validateLogin,
  signin
);

routerAuth.post("/google",
  validateTokenGoogle,
  googleSignin
);
