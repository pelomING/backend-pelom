import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "obras_cierres",
    schema: "obras",
  })
  export default class ObrasCierres extends Model {

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
        field: "supervisor_responsable"
      })
    supervisor_responsable?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "coordinador_responsable"
      })
    coordinador_responsable?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "ito_mandante"
      })
    ito_mandante?: string;

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
  