import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Crear usuario
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificamos si el email existe
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    return res.status(404).json({
      response: "error",
      msg: "El email ya se encuentra registrado",
    });
  }

  try {
    // Hasheamos el password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Guardamos el usuario en la base de datos
    await user.save();

    res.status(201).json({
      response: "success",
      msg: "Usuario creado.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "error", msg: "Error del servidor" });
  }
};
