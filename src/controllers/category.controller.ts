import { Request, Response } from "express";

import { CategoryModel } from "../models";

export class CategoryController {
  createCategory = async (req: Request, res: Response) => {
    const { name, subcategory_ids } = req.body;

    const category = new CategoryModel({ name: name.toUpperCase(), subcategory_ids });

    // Guarda la nueva categoría en la BD
    await category.save();

    res.status(200).json({
      msg: "Categoría registrada exitosamente",
      category,
    });
  };

  listCategories = async (req: Request, res: Response) => {
    const categories = await CategoryModel.find({ status: true }).populate({
      path: "subcategory_ids",
      select: "_id name",
      match: { status: true },
    });

    res.status(200).json({
      msg: "Categorías listadas exitosamente",
      categories
    });
  };

  getCategory = async (req: Request, res: Response) => {
    const category = await CategoryModel.findById(req.params.id).populate({
      path: "subcategory_ids",
      select: "_id name",
      match: { status: true },
    });

    if (!category?.status)
      return res.status(400).json({
        msg: "ID inválido, categoría no encontrada o desactivada",
      });

    res.status(200).json({
      msg: "Información de categoría obtenida exitosamente",
      category,
    });
  };

  updateCategory = async (req: Request, res: Response) => {
    // Desacopla los campos que no se deberían actualizar
    const { status, ...data } = req.body;
      
    // Convierte el nombre de la categoría a mayúsculas
    data.name = data.name.toUpperCase();

    // Busca la categoría y actualiza su información
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, data, { new: true });

    res.status(200).json({
      msg: "Información de categoría actualizada exitosamente",
      category,
    });
  };

  deleteCategory = async (req: Request, res: Response) => {
    // Cambia el estado de la categoría
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

    // Obtiene el usuario autenticado
    const userAuth = req.user;

    res.status(200).json({
      msg: "Categoría desactivada exitosamente",
      category,
      userAuth,
    });
  };
}
