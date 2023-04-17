import { Request, Response } from "express";
import { Types } from "mongoose";

import { UserModel, ProductModel } from "../models";

export class SearchController {
  searchUsers = async (term: string, res: Response) => {
    // Verifica si el término es un ID de Mongo válido
    if (Types.ObjectId.isValid(term)) {
      const user = await UserModel.findById(term);
      
      res.json({
        // Si existe el usuario, muestra sus datos
        // de lo contrario, muestra un arreglo vacío
        results: (user) ? [user] : [],
      });
    }

    // Expresión regular insensible a las mayúsculas y minúsculas
    const regex = new RegExp(term, 'i');
    const users = await UserModel.find({ 
      $or: [{ name: regex }, { surname: regex }, { email: regex}],
      $and: [{ status: true }],
    });

    res.json({
      results: users,
    });
  };

  searchProducts = async (term: string, res: Response) => {
    // Verifica si el término es un ID de Mongo válido
    if (Types.ObjectId.isValid(term)) {
      const product = await ProductModel.findById(term);
      
      res.json({
        // Si existe el producto, muestra sus datos
        // de lo contrario, muestra un arreglo vacío
        results: (product) ? [product] : [],
      });
    }

    // Expresión regular insensible a las mayúsculas y minúsculas
    const regex = new RegExp(term, 'i');
    const products = await ProductModel.find({ name: regex, status: true }).populate({
      path: "category_id",
      select: "id name"
    }).populate({
      path: "subcategory_id",
      select: "id name"
    });

    res.json({
      results: products,
    });
  };

  search = async (req: Request, res: Response) => {
    const { collection, term } = req.params;

    switch (collection) {
      case "users":
        this.searchUsers(term, res);
        break;
      case "products":
        this.searchProducts(term, res);
        break;
      default:
        res.status(500).json({
          msg: "Búsqueda incorrecta",
        });
    }
  };
}
