import Post from "../models/post.model.js";

// Crear nuevo post
export const createPost = async (req, res) => {
  const { auth } = req;
  const { title, content } = req.body;

  try {
    // Creamos el post
    const post = new Post({
      title,
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
