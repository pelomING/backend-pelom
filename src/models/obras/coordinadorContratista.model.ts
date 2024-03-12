import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "coordinadores_contratista",
    schema: "obras",
  })
  export default class CoordinadorContratista extends Model {

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
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_empresa"
      })
    id_empresa?: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "rut"
      })
    rut?: string;
  
  }