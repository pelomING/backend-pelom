import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "usuarios_funciones",
    schema: "_auth",
  })
  export default class UsuariosFunciones extends Model {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      field: "id"
    })
    id?: number;

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "username"
    })
    username?: string;

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "password"
    })
    password?: string;

    @Column({
      type: DataType.STRING(255),
      field: "email"
    })
    email?: string;

    @Column({
      type: DataType.STRING(255),
      field: "funcion"
    })
    funcion?: string;

    @Column({
      type: DataType.STRING(255),
      field: "nombres"
    })
    nombres?: string;

  }
  