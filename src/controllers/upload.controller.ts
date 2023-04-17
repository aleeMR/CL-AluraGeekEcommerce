import { Request, Response } from "express";

import cloudinary from "../config/cloudinary.config";
import { UserModel, ProductModel } from "../models";
import { UploadedFile } from "express-fileupload";

export class UploadController {
  updateImage = async (req: Request, res: Response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
      case "users":
        model = await UserModel.findById(id);

        if (!model)
          return res.status(400).json({
            msg: `El usuario con ID ${id} no existe`,
          });
        break;
      case "products":
        model = await ProductModel.findById(id);

        if (!model)
          return res.status(400).json({
            msg: `El producto con ID ${id} no existe`,
          });
        break;
      default:
        return res.status(500).json({
          msg: "No se puede actualizar la imagen de una colección no permitida",
        });
    }
    
    // Verifica si existe una imagen anterior
    if (model.image) {
      const nameFile = model.image.split("/").pop() as string;
      const [ publicId ] = nameFile.split(".");

      // Elimina la imagen anterior de Cloudinary
      await cloudinary.uploader.destroy(`GeekEcommerce/${collection}/${publicId}`);
    }

    // Obtiene la ubicación temporal de la imagen
    const { tempFilePath } = req.files?.file as UploadedFile;

    try {
      // Sube la imagen a Cloudinary y obtiene el URL de acceso
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { 
        quality: "auto", 
        fetch_format: "auto", 
        folder: `GeekEcommerce/${collection}`
      });

      // Asigna el URL de la imagen al modelo
      model.image = secure_url;

      // Guarda el modelo en BD
      await model.save();

      return res.status(200).json({
        msg: "Imagen actualizada exitosamente",
        model,
      });
    } catch (err) {
      res.status(400).json({
        msg: err,
      });
    }
  };

  getImage = async (req: Request, res: Response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
      case "users":
        model = await UserModel.findById(id);

        if (!model)
          return res.status(400).json({
            msg: `El usuario con ID ${id} no existe`,
          });
        break;
      case "products":
        model = await ProductModel.findById(id);

        if (!model)
          return res.status(400).json({
            msg: `El producto con ID ${id} no existe`,
          });
        break;
      default:
        return res.status(500).json({
          msg: "No se puede actualizar la imagen de una colección no permitida",
        });
    }

    // Verifica si existe la imagen
    if (model.image) {
      return res.status(200).json({
        msg: "Imagen cargada exitosamente",
        image: model.image,
      });
    }

    return res.status(400).json({
      msg: "Hubo un error al recuperar la imagen",
    });
  };
}