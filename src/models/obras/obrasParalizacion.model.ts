import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "obras_paralizacion",
    schema: "obras",
  })
  export default class ObrasParalizacion extends Model {

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
        field: "responsable"
      })
      responsable?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "motivo"
      })
      motivo?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "observacion"
      })
    observacion?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "usuario_rut"
      })
    usuario_rut?: string;
  
  }
  