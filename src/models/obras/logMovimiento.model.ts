import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "log_movimientos",
    schema: "obras",
  })
  export default class LogMovimiento extends Model {

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
      field: "usuario_rut"
    })
    usuario_rut?: string;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
      field: "fecha_hora"
    })
    fecha_hora?: Date;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "modulo"
      })
    modulo?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "accion"
      })
    accion?: string;

    @Column({
        type: DataType.STRING,
        field: "comentario"
      })
    comentario?: string;

    @Column({
        type: DataType.JSON,
        field: "datos"
      })
    datos?: JSON;
  
  }
  