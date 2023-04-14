import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403).json({ errors: err.array() });
  }
};
