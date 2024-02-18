import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import userRoutes from "./routes/v1/user.routes.js";

// Database
import { sequelize } from "./db/config.js";
import "./models/user.model.js";

// Inicializamos express
const app = express();

// Configuración de express
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

// Configuración de las variables de entorno
dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to database
(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Conexión establecida con la base de datos");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

// Cors
app.use(cors());

// Routing
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
