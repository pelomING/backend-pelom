import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "obras_historial_cambios",
    schema: "obras",
  })
  export default class ObrasHistorialCambios extends Model {

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    })
    id: number = 0; //se inicializa en cero
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "id_obra"
    })
    id_obra?: number;
  
    @Column({
      type: DataType.DATE,
      field: "fecha_hora"
    })
    fecha_hora?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "usuario_rut"
      })
    usuario_rut?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "estado_obra"
      })
    estado_obra?: number;

    @Column({
        type: DataType.JSON,
        field: "datos"
      })
    datos?: JSON;
  
    @Column({
      type: DataType.STRING(255),
      field: "observacion"
    })
    observacion?: string;
  
  }
  