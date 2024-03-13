import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "estado_obra",
    schema: "obras",
  })
  export default class EstadoObra extends Model {

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
      allowNull: false,
      field: "color"
    })
    color?: string;
  
  }
  