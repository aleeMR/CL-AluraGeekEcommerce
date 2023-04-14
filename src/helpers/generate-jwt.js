import jwt from "jsonwebtoken";

export const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "72h",
    }, (err, token) => {
      if (err) {
        console.error(err);
        reject("Error al generar el token");
      } else {
        resolve(token);
      }
    });
  });
};
