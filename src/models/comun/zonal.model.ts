import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "zonal",
    schema: "_comun",
  })
  export default class Zonal extends Model {

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    })
    id: number = 0; //se inicializa en cero
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      unique: true,
      field: "nombre"
    })
    nombre?: string;
  
  }