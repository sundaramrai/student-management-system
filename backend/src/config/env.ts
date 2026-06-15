import dotenv from "dotenv";

dotenv.config();

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

export const env = {
  port: Number.parseInt(process.env["PORT"] ?? "5000", 10),
  clientUrl: process.env["CLIENT_URL"] ?? "http://localhost:5173",
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  databaseUrl: getRequiredEnv("DATABASE_URL"),
} as const;
