import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "tipo_obra",
    schema: "obras",
  })
  export default class TipoObra extends Model {

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
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "bg_color"
    })
    bg_color?: string;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "txt_color"
    })
    txt_color?: string;
  
  }
  