import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "tipo_actividad",
    schema: "obras",
  })
  export default class TipoActividad extends Model {

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
      field: "descripcion"
    })
    descripcion?: string;
  
  }
  