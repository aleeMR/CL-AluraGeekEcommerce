import { response } from "express";

export const validateFile = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).json({
      msg: "No se cargo ningún archivo",
    });

  next();
};

export const checkExtension = (...exts) => {
  return (req, res = response, next) => {
    // Recupera el archivo subido
    const { file } = req.files;
    console.log(file)
    // Obtiene la extensión del archivo
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (!exts.includes(ext))
      return res.status(400).json({
        msg: `Solo se admiten archivos de extensiones ${exts}`,
      });

    next();
  }
};

export const checkSize = (req, res = response, next) => {
  if (req.files.file.size > 5000000)
    return res.status(400).json({
      msg: "El archivo supera el peso máximo de 5MB",
    });

  next();
};