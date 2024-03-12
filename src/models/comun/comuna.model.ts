import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "comunas",
    schema: "_comun",
  })
  export default class Comuna extends Model {

    @Column({
      type: DataType.STRING(255),
      primaryKey: true,
      field: "codigo"
    })
    codigo?: string;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "nombre"
    })
    nombre?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "provincia"
      })
      provincia?: string;
  
  }