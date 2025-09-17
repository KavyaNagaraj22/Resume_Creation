// models/Resume.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Resume = sequelize.define(
  "Resume",
  {
    userId: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.JSONB, allowNull: true },  // ✅ allow null
    templateId: { type: DataTypes.STRING },
    sections: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    customization: { type: DataTypes.JSONB, allowNull: true },
  },
  { timestamps: true }
);

export default Resume;