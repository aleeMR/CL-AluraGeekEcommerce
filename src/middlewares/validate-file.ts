import { NextFunction, Request, Response } from "express";

export const validateFile = (...exts: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
      return res.status(400).json({
        msg: "No se cargo ningún archivo",
      });

    if (Array.isArray(req.files.file))
      return res.status(400).json({
        msg: "Se cargo más de un archivo",
      });

    // Recupera el archivo subido
    const file = req.files.file;
    
    // Obtiene la extensión del archivo
    const ext = file.name.split(".").pop() as string;
    
    if (!exts.includes(ext.toLowerCase()))
      return res.status(400).json({
        msg: `Solo se admiten archivos de extensiones ${exts}`,
      });

    if (file.size > 5000000)
      return res.status(400).json({
        msg: "El archivo supera el peso máximo de 5MB",
      });

    next();
  }
};
