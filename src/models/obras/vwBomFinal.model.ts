import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "view_bom_final",
    schema: "obras",
  })
  export default class VwBomFinal extends Model {

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
        type: DataType.BIGINT,
        allowNull: false,
        field: "cod_reserva"
      })
    cod_reserva?: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        field: "codigo_sap_material"
      })
    codigo_sap_material?: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        field: "cantidad_requerida"
      })
    cantidad_requerida?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "fecha_ingreso"
      })
    fecha_ingreso?: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "rut_usuario"
      })
    rut_usuario?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "persona"
      })
    persona?: string;
  
  }
  