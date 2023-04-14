import { response } from "express";
import { Types } from "mongoose";

import { User, Product } from "../models/index.js";

const searchUsers = async (term = "", res = response) => {
  // Verifica si el término es un ID de Mongo válido
  if (Types.ObjectId.isValid(term)) {
    const user = await User.findById(term);
    
    res.json({
      // Si existe el usuario, muestra sus datos
      // de lo contrario, muestra un arreglo vacío
      results: (user) ? [user] : [],
    });
  }

  // Expresión regular insensible a las mayúsculas y minúsculas
  const regex = new RegExp(term, 'i');
  const users = await User.find({ 
    $or: [{ name: regex }, { surname: regex }, { email: regex}],
    $and: [{ status: true }],
  });

  res.json({
    results: users,
  });
};

const searchProducts = async (term = "", res = response) => {
  // Verifica si el término es un ID de Mongo válido
  if (Types.ObjectId.isValid(term)) {
    const product = await Product.findById(term);
    
    res.json({
      // Si existe el producto, muestra sus datos
      // de lo contrario, muestra un arreglo vacío
      results: (product) ? [product] : [],
    });
  }

  // Expresión regular insensible a las mayúsculas y minúsculas
  const regex = new RegExp(term, 'i');
  const products = await Product.find({ name: regex, status: true }).populate({
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

export const search = async (req, res = response) => {
  const { collection, term } = req.params;

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        msg: "Búsqueda incorrecta",
      });
  }
};
