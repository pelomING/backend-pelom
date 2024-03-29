import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "login_historial",
    schema: "_auth",
  })
  export default class LoginHistorial extends Model {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
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
      field: "email"
    })
    email?: string

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "accion"
    })
    accion?: string

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "fecha_hora"
    })
    fecha_hora?: string

    @Column({
      type: DataType.STRING,
      field: "comentario"
    })
    comentario?: string

  }
  