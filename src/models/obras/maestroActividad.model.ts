import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "maestro_actividades",
    schema: "obras",
  })
  export default class MaestroActividad extends Model {

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
      field: "actividad"
    })
    actividad?: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "id_tipo_actividad"
    })
    id_tipo_actividad?: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
        field: "uc_instalacion"
      })
    uc_instalacion?: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
        field: "uc_retiro"
      })
    uc_retiro?: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
        field: "uc_traslado"
      })
    uc_traslado?: number;
  
    @Column({
      type: DataType.STRING(255),
      field: "descripcion"
    })
    descripcion?: string;
  
  }
  