import { Request, Response } from "express";

import { UserModel } from "../models";

export class UserController {
  createUser = async (req: Request, res: Response) => {
    const { 
      name,
      surname,
      email,
      password,
      role,
    } = req.body;
    
    const user = new UserModel({
      name,
      surname,
      email,
      password,
      role,
    });

    // Guarda el nuevo usuario en la BD
    await user.save();

    res.status(200).json({
      msg: "Usuario registrado exitosamente",
      user,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    // Busca el usuario y actualiza sus datos
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      msg: "Usuario actualizado exitosamente",
      user,
    });
  };

  listUsers = async (req: Request, res: Response) => {
    // Obtiene los parámetros de límite y salto
    const { limit, skip } = req.query;

    const [ total, users ] = await Promise.all([
      // Cuenta el total de usuarios
      UserModel.countDocuments({ status: true }),
      // Busca los usuarios delimitados por el salto y límite
      UserModel.find({ status: true }).skip(Number(skip)).limit(Number(limit))
    ]);

    res.status(200).json({
      msg: "Usuarios listados exitosamente",
      total,
      users,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    // Cambia el estado del usuario
    const user = await UserModel.findByIdAndUpdate(req.params.id, { status: false }, { new: true });

    // Obtiene el usuario autenticado
    const userAuth = req.user;

    res.status(200).json({
      msg: "Usuario desactivado exitosamente",
      user,
      userAuth,
    });
  };
}