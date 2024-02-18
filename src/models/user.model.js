import { sequelize } from "../db/config.js";
import { DataTypes } from "sequelize";

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

// User.hasMany(Post, {
//   foreignKey: "author",
//   sourceKey: "id",
//   onDelete: "CASCADE",
// });

export default User;
