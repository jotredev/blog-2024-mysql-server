import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// Crear nuevo post
export const createPost = async (req, res) => {
  const { auth } = req;
  const { title, shortDescription, content } = req.body;

  try {
    // Creamos el post
    const post = new Post({
      title,
      shortDescription,
      content,
      author: auth.id,
    });

    // Guardamos el post
    const savedPost = await post.save();

    // Respuesta
    res.status(201).json({ response: "success", post: savedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "error", msg: "Error del servidor" });
  }
};

// Obtener todos los posts
export const getPosts = async (req, res) => {
  try {
    // Obtener todos los post con los autores
    const posts = await Post.findAll({
      attributes: { exclude: ["author"] },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    // Respuesta
    res.status(201).json({ response: "success", posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "error", msg: "Error del servidor" });
  }
};

// Obtener post por id
export const getPostById = async (req, res) => {
  const { id } = req.params;

  // Get post
  const post = await Post.findOne({
    where: { id },
    attributes: { exclude: ["author"] },
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });

  if (!post) {
    return res.status(404).json({
      response: "error",
      msg: "Post no encontrado",
    });
  }

  try {
    // Respuesta
    res.status(201).json({ response: "success", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "error", msg: "Error del servidor" });
  }
};
