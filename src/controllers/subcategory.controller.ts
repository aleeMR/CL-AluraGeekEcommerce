import { Request, Response } from "express";

import { SubcategoryModel } from "../models";

export class SubcategoryController {
  createSubcategory = async (req: Request, res: Response) => {
    const name = req.body.name.toUpperCase();

    const subcategory = new SubcategoryModel({ name });

    // Guarda la nueva subcategoría en la BD
    await subcategory.save();

    res.status(200).json({
      msg: "Subcategoría registrada exitosamente",
      subcategory,
    });
  };

  listSubcategories = async (req: Request, res: Response) => {
    const subcategories = await SubcategoryModel.find({ status: true });

    res.status(200).json({
      msg: "Subcategorías listadas exitosamente",
      subcategories
    });
  };

  getSubcategory = async (req: Request, res: Response) => {
    const subcategory = await SubcategoryModel.findById(req.params.id);

    if (!subcategory?.status)
      return res.status(400).json({
        msg: "ID inválido, subcategoría no encontrada o desactivada",
      });

    res.status(200).json({
      msg: "Información de subcategoría obtenida exitosamente",
      subcategory,
    });
  };

  updateSubcategory = async (req: Request, res: Response) => {
    // Desacopla los campos que no se deberían actualizar
    const { status, ...data } = req.body;
    
    // Convierte el nombre de la subcategoría a mayúsculas
    data.name = data.name.toUpperCase();

    // Busca la subcategoría y actualiza su información
    const subcategory = await SubcategoryModel.findByIdAndUpdate(req.params.id, data, { new: true });

    res.status(200).json({
      msg: "Información de subcategoría actualizada exitosamente",
      subcategory,
    });
  };

  deleteSubcategory = async (req: Request, res: Response) => {
    // Cambia el estado de la subcategoría
    const subcategory = await SubcategoryModel.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

    // Obtiene el usuario autenticado
    const userAuth = req.user;

    res.status(200).json({
      msg: "Subcategoría desactivada exitosamente",
      subcategory,
      userAuth,
    });
  };
}
