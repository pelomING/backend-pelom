import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "reservas_obras",
    schema: "obras",
  })
  export default class ReservasObras extends Model {

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    })
    id: number = 0; //se inicializa en cero
  
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
      field: "id_obra"
    })
    id_obra?: number;


    @Column({
      type: DataType.BIGINT,
      allowNull: false,
      field: "reserva"
    })
    reserva?: number
  
  }