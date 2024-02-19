import { sequelize } from "../db/config.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Post;
