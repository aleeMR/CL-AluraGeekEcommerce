import { response } from "express";

import { User } from "../models/index.js";

export const createUser = async (req, res = response) => {
  const { 
    name,
    surname,
    email,
    password,
    role,
  } = req.body;
  
  const user = new User({
    name,
    surname,
    email,
    password: await User().encryptPassword(password),
    role,
  });

  // Guarda el nuevo usuario en la BD
  await user.save();

  res.status(200).json({
    msg: "Usuario registrado exitosamente",
    user,
  });
};

export const updateUser = async (req, res = response) => {
  // Busca el usuario y actualiza sus datos
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    msg: "Usuario actualizado exitosamente",
    user,
  });
};

export const listUsers = async (req, res = response) => {
  // Obtiene los parámetros de límite y salto
  const { limit, skip } = req.query;

  const [ total, users ] = await Promise.all([
    // Cuenta el total de usuarios
    User.countDocuments({ status: true }),
    // Busca los usuarios delimitados por el salto y límite
    User.find({ status: true }).skip(skip).limit(limit)
  ]);

  res.status(200).json({
    msg: "Usuarios listados exitosamente",
    total,
    users,
  });
};

export const deleteUser = async (req, res = response) => {
  // Cambia el estado del usuario
  const user = await User.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

  // Obtiene el usuario autenticado
  const userAuth = req.user;

  res.status(200).json({
    msg: "Usuario desactivado exitosamente",
    user,
    userAuth,
  });
};
