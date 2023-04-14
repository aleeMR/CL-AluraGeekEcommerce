import { response } from "express";

import { Category } from "../models/index.js";

export const createCategory = async (req, res = response) => {
  const { name, subcategory_ids } = req.body;

  const category = new Category({ name: name.toUpperCase(), subcategory_ids });

  // Guarda la nueva categoría en la BD
  await category.save();

  res.status(200).json({
    msg: "Categoría registrada exitosamente",
    category,
  });
};

export const listCategories = async (req, res = response) => {
  const categories = await Category.find({ status: true }).populate({
    path: "subcategory_ids",
    select: "_id name",
    match: { status: true },
  });

  res.status(200).json({
    msg: "Categorías listadas exitosamente",
    categories
  });
};

export const getCategory = async (req, res = response) => {
  const category = await Category.findById(req.params.id).populate({
    path: "subcategory_ids",
    select: "_id name",
    match: { status: true },
  });

  if (!category)
    return res.status(400).json({
      msg: "ID inválido, categoría no encontrada",
    });

  if (!category.status)
    return res.status(400).json({
      msg: "Categoría desactivada",
    });

  res.status(200).json({
    msg: "Información de categoría obtenida exitosamente",
    category,
  });
};

export const updateCategory = async (req, res = response) => {
  // Desacopla los campos que no se deberían actualizar
  const { status, ...data } = req.body;
    
  // Convierte el nombre de la categoría a mayúsculas
  data.name = data.name.toUpperCase();

  // Busca la categoría y actualiza su información
  const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });

  res.status(200).json({
    msg: "Información de categoría actualizada exitosamente",
    category,
  });
};

export const deleteCategory = async (req, res = response) => {
  // Cambia el estado de la categoría
  const category = await Category.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

  // Obtiene el usuario autenticado
  const userAuth = req.user;

  res.status(200).json({
    msg: "Categoría desactivada exitosamente",
    category,
    userAuth,
  });
};
