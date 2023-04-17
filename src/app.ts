import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";

import { mongodbConnection } from "./config/mongodb.config";
import {
  routerAuth,
  routerCategory,
  routerProduct,
  routerSearch,
  routerSubcategory,
  routerUpload,
  routerUser,
} from "./routes";

interface Path {
  [key: string]: string,
};

export default class App {
  private app: Application;
  private port: string;
  private paths: Path;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    
    // Path de rutas
    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      products: "/api/products",
      categories: "/api/categories",
      subcategories: "/api/subcategories",
      search: "/api/search",
      upload: "/api/upload",
    };

    // Middlewares
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  async databases() {
    await mongodbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Pasrseo y lectura del body
    this.app.use(express.json());
    // Define el directorio público
    this.app.use(express.static("public"));
    // Configuración de la carga de archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }));
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.users, routerUser);
    this.app.use(this.paths.products, routerProduct);
    this.app.use(this.paths.categories, routerCategory);
    this.app.use(this.paths.subcategories, routerSubcategory);
    this.app.use(this.paths.search, routerSearch);
    this.app.use(this.paths.upload, routerUpload);
  }

  listen() {
    // Conexión a la base de datos
    this.databases();
    
    return this.app.listen(this.port, () => {
      console.log(`Server initialized on port ${this.port}`);
    });
  }
}
