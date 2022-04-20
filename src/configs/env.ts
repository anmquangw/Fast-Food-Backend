import { DEVELOPMENT, PRODUCTION } from "./status";
if (process.env.NODE_ENV !== PRODUCTION) require("dotenv").config();

const NODE_ENV: string = String(process.env.NODE_ENV) || DEVELOPMENT;
const DB_TYPE: string = String(process.env.DB_TYPE);
const DB_HOST: string = String(process.env.DB_HOST);
const DB_USERNAME: string = String(process.env.DB_USERNAME);
const DB_PASSWORD: string = String(process.env.DB_PASSWORD);
const DB_DATABASE: string = String(process.env.DB_DATABASE);

var DB_CONNECT_STRING: string = `${DB_TYPE}://${
  DB_HOST === "localhost" ? DB_HOST : `${DB_USERNAME}:${DB_PASSWORD}${DB_HOST}`
}/${DB_DATABASE}`;

const PORT: number = Number(process.env.PORT);
const SECRET_KEY: string = String(process.env.SECRET_KEY);
const EXPIRES_IN: string = String(process.env.EXPIRED_IN);

const GEN_SALT: number = Number(process.env.GEN_SALT) || 10;

export default {
  NODE_ENV,
  DB_TYPE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,

  DB_CONNECT_STRING,

  PORT,
  SECRET_KEY,
  EXPIRES_IN,

  GEN_SALT,
};
