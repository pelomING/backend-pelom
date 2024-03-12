export const config = {
  HOST: "localhost",
  USER: "admin_pelom",
  PASSWORD: "admin_pelom",
  DB: "pelom-db",
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
  freezeTableName: true,  // deshabilita el agregar una 's' al final del nombre de tabla
  createdAt: false, // disable createdAt
  updatedAt: false  // disable updatedAt
}
