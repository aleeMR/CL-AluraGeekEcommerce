import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserModel } from "../models";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  // Obtiene el token del header
  const token = req.headers["x-token"];

  // Si no se encuentra el token
  if (!token)
    return res.status(401).json({
      msg: "Token no encontrado",
    });
  
  // Si el token es un array
  if (Array.isArray(token))
    return res.status(401).json({
      msg: "El Token debería ser una cadena de texto",
    });

  try {
    // Si se encuentra el token, se verifica y obtiene su ID
    const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as JwtPayload;
    
    // Busca al usuario por su ID y lo guarda
    const user = await UserModel.findById(id);

    // Si el usuario no existe
    if (!user)
      return res.status(401).json({
        msg: "Usuario no existe",
      });

    // Si el usuario está desactivado
    if (!user.status)
      return res.status(401).json({
        msg: "Usuario inválido",
      });

    // Guarda el usuario en la request
    req.user = user;

    // Si se encuentra al usuario, continua el proceso
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
        msg: "Token inválido"
    });
  }
};
