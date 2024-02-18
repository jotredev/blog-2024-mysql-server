import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.auth = await User.findOne({
        where: { id: decoded.id },
      });

      // No retornamos el password
      req.auth.set("password", undefined, { strict: false });

      return next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ response: "error", msg: "Sin autorización, token no válido." });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({
        response: "error",
        msg: "Sin autorización, el token no existe.",
      });
  }

  next();
};
