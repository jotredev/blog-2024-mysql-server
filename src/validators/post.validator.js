import { check, validationResult } from "express-validator";

// Validator create posts
export const validatorCreatePost = [
  check("title").exists().withMessage("El título es obligatorio"),
  check("shortDescription")
    .exists()
    .withMessage("La descripción corta es obligatoria")
    .isLength({ max: 70 })
    .withMessage("La descripción corta no debe pasar los 70 caracteres"),
  check("content").exists().withMessage("El contenido es obligatorio"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
