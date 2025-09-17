// config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ✅ Debug check (safe, no secrets printed except username/host/DB)
console.log("🔑 Loaded env:", {
  PG_USER: process.env.PG_USER,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PORT: process.env.PG_PORT,
});

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,   // Database name
  process.env.PG_USER,       // Username
  process.env.PG_PASSWORD,   // Password
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT || 5432,
    logging: false, // disable SQL logging in console
  }
);
