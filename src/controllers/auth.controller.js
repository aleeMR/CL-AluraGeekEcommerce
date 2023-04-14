import { response } from "express";

import {
  generateJWT,
  googleVerify,
} from "../helpers/index.js";
import { User } from "../models/index.js";

export const signin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por su correo electrónico
    const user = await User.findOne({ email });

    // Si el usuario no está registrado
    if (!user)
      return res.status(400).json({
        msg: "Correo electrónico o contraseña incorrectas",
      });
    
    // Si el usuario no está activo
    if (!user.status)
      return res.status(400).json({
        msg: "Correo electrónico o contraseña incorrectas",
      });
    
    // Si el usuario está registrado, Verifica la contraseña
    const match = await user.checkPassword(password);

    // Si la contraseña no coincide
    if (!match)
      return res.status(400).json({
        msg: "Correo electrónico o contraseña incorrectas",
      });

    // Si la contraseña coincide
    const token = await generateJWT(user.id);

    res.status(200).json({
      msg: "Usuario logeado exitosamente",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Ocurrió un problema, comuníquese con su administrador",
    });
  }
};

export const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, surname, image } = await googleVerify(id_token);

    // Valida al usuario por su correo electrónico
    let user = await User.findOne({ email });

    // Si el usuario no está registrado
    if (!user) {
      const data = {
        name,
        surname,
        email,
        password: "",
        role: "USER_ROLE",
        image,
        google: true,
      };

      // Asigna los datos al nuevo usuario
      user = new User(data);

      // Guarda el usuario en la BD
      await user.save();
    }
    
    // Si el usuario no está activo
    if (!user.status)
      return res.status(401).json({
        msg: "Usuario bloqueado, comuníquese con su administrador",
      });

    // Genera el JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "Inicio de sesión con Google satisfactorio",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      msg: "ID Token de Google inválido",
    });
  }
};
