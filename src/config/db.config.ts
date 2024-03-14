import { ConnectionString } from "connection-string";

const database_url = process.env.DATABASE_URL;
const write_uri = new ConnectionString(database_url);

export const config = {
  HOST: write_uri.hostname,
  USER: write_uri.user,
  PASSWORD: write_uri.password,
  PORT: write_uri.port,
  DB: process.env.DATABASE_NAME,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "postgres";
export const define = {
  id: false,  // disable default id
  noPrimaryKey: true,
  freezeTableName: true,  // deshabilita el agregar una 's' al final del nombre de tabla
  createdAt: false, // disable createdAt
  updatedAt: false  // disable updatedAt
}
