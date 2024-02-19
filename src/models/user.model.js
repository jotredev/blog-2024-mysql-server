import { sequelize } from "../db/config.js";
import { DataTypes } from "sequelize";
import Post from "./post.model.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Un usuario tiene muchos posts
User.hasMany(Post, {
  foreignKey: "author",
  sourceKey: "id",
  onDelete: "CASCADE",
});

// Un post tiene un autor
Post.belongsTo(User, {
  foreignKey: "author",
  targetKey: "id",
});

export default User;
