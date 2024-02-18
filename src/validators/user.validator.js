import { check, validationResult } from "express-validator";

export const validatorCreateUser = [
  check("name").exists().withMessage("El nombre es obligatorio"),
  check("email")
    .exists()
    .isEmail()
    .withMessage("El email no es válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("El password debe contener al menos 6 caracteres"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorLogin = [
  check("email")
    .exists()
    .isEmail()
    .withMessage("El email no es válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("El password es obligatorio"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
