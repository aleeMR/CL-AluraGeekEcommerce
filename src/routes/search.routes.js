import { Router } from "express";

import { search } from "../controllers/search.controller.js";
import { validateSearch } from "../validators/index.js";

export const routerSearch = Router();

routerSearch.get("/:collection/:term",
  validateSearch,
  search,
);