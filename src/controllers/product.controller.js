import { response } from "express";

import { Product } from "../models/index.js";

export const createProduct = async (req, res = response) => {
  const { 
    name,
    description,
    price,
    stock,
    image,
    available,
    category_id,
    subcategory_id,
  } = req.body;
  
  const product = new Product({
    name: name.toUpperCase(),
    description,
    price: Number(price).toFixed(2),
    stock,
    image,
    available,
    category_id,
    subcategory_id,
  });

  // Guarda el nuevo producto en la BD
  await product.save();

  res.status(200).json({
    msg: "Producto registrado exitosamente",
    product,
  });
};

export const updateProduct = async (req, res = response) => {
  // Desacopla los campos que no se deberían actualizar
  const { status, ...data } = req.body;

  // Convierte el nombre del producto a mayúsculas
  data.name = data.name.toUpperCase();
  // Convierte el precio del producto a decimales de dos dígitos
  data.price = Number(data.price).toFixed(2);

  // Busca el producto y actualiza su información
  const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

  res.status(200).json({
    msg: "Producto actualizado exitosamente",
    product,
  });
};

export const listProducts = async (req, res = response) => {
  // Obtiene los parámetros de límite y salto
  const { limit, skip } = req.query;

  const [ total, products ] = await Promise.all([
    // Cuenta el total de productos
    Product.countDocuments({ status: true }),
    // Busca los productos delimitados por el salto y límite
    Product.find({ status: true }).skip(skip).limit(limit).populate({
      path: "category_id",
      select: "id name"
    }).populate({
      path: "subcategory_id",
      select: "id name"
    })
  ]);

  res.status(200).json({
    msg: "Productos listados exitosamente",
    total,
    products,
  });
};

export const getProduct = async (req, res = response) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category_id",
    select: "id name"
  }).populate({
    path: "subcategory_id",
    select: "id name"
  });

  if (!product)
    return res.status(400).json({
      msg: "ID inválido, producto no encontrado",
    });

  if (!product.status)
    return res.status(400).json({
      msg: "Producto desactivado",
    });

  res.status(200).json({
    msg: "Información de producto obtenida exitosamente",
    product,
  });
};

export const deleteProduct = async (req, res = response) => {
  // Cambia el estado del producto
  const product = await Product.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

  // Obtiene el usuario autenticado
  const userAuth = req.user;

  res.status(200).json({
    msg: "Producto desactivado exitosamente",
    product,
    userAuth,
  });
};
