import { Router } from "express";

import { SearchController } from "../controllers/search.controller";
import { validateSearch } from "../validators";

const searchController = new SearchController();

export const routerSearch = Router();

routerSearch.get("/:collection/:term",
  validateSearch,
  searchController.search,
);