import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "recargos",
    schema: "obras",
  })
  export default class Recargos extends Model {

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
      field: "nombre"
    })
    nombre?: string;


    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "id_tipo_recargo"
    })
    id_tipo_recargo?: number
  
    @Column({
      type: DataType.FLOAT,
      field: "porcentaje"
    })
    porcentaje?: string;
  
  }