import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "segmento",
    schema: "obras",
  })
  export default class Segmento extends Model {

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
  
    @Column({
      type: DataType.STRING(255),
      field: "descripçion"
    })
    descripçion?: string;
  
  }