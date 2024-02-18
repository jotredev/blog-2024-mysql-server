import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";

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

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  // Verificamos si el usuario existe
  if (!user) {
    return res.status(404).json({
      response: "error",
      msg: "El usuario no se encuentra registrado.",
    });
  }

  // Verificamos si el password es correcto
  const compare = await bcrypt.compare(password, user.password);

  if (!compare) {
    return res.status(403).json({
      response: "error",
      msg: "Email o password incorrectos.",
    });
  }

  try {
    // Generamos el JWT
    const token = await generateJWT(user.id);
    // No retornamos el password
    user.set("password", undefined, { strict: false });

    res.status(201).json({ response: "success", user, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ response: "error", msg: "Error del servidor" });
  }
};

// Obtener perfil del usuario logueado
export const getProfile = async (req, res) => {
  const { auth } = req;
  return res.status(201).json(auth);
};
