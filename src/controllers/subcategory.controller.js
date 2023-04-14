import { response } from "express";

import { Subcategory } from "../models/index.js";

export const createSubcategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const subcategory = new Subcategory({ name });

  // Guarda la nueva subcategoría en la BD
  await subcategory.save();

  res.status(200).json({
    msg: "Subcategoría registrada exitosamente",
    subcategory,
  });
};

export const listSubcategories = async (req, res = response) => {
  const subcategories = await Subcategory.find({ status: true });

  res.status(200).json({
    msg: "Subcategorías listadas exitosamente",
    subcategories
  });
};

export const getSubcategory = async (req, res = response) => {
  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory)
    return res.status(400).json({
      msg: "ID inválido, subcategoría no encontrada",
    });

  if (!subcategory.status)
    return res.status(400).json({
      msg: "Subcategoría desactivada",
    });

  res.status(200).json({
    msg: "Información de subcategoría obtenida exitosamente",
    subcategory,
  });
};

export const updateSubcategory = async (req, res = response) => {
  // Desacopla los campos que no se deberían actualizar
  const { status, ...data } = req.body;
  
  // Convierte el nombre de la subcategoría a mayúsculas
  data.name = data.name.toUpperCase();

  // Busca la subcategoría y actualiza su información
  const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, data, { new: true });

  res.status(200).json({
    msg: "Información de subcategoría actualizada exitosamente",
    subcategory,
  });
};

export const deleteSubcategory = async (req, res = response) => {
  // Cambia el estado de la subcategoría
  const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

  // Obtiene el usuario autenticado
  const userAuth = req.user;

  res.status(200).json({
    msg: "Subcategoría desactivada exitosamente",
    subcategory,
    userAuth,
  });
};
