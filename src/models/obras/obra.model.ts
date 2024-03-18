import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "obras",
    schema: "obras",
  })
  export default class Obra extends Model {

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
      field: "codigo_obra"
    })
    codigo_obra?: string;
  
    @Column({
      type: DataType.STRING(255),
      unique: true,
      field: "numero_ot"
    })
    numero_ot?: string;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "nombre_obra"
    })
    nombre_obra?: string;

    @Column({
        type: DataType.INTEGER,
        field: "zona"
      })
    zona: number = 0;

    @Column({
        type: DataType.INTEGER,
        field: "delegacion"
      })
    delegacion: number = 0;

    @Column({
        type: DataType.STRING(255),
        field: "gestor_cliente"
      })
    gestor_cliente?: string;

    @Column({
        type: DataType.INTEGER,
        field: "numero_aviso"
      })
    numero_aviso?: number;
  
    @Column({
      type: DataType.STRING(255),
      field: "numero_oc"
    })
    numero_oc?: string;

    @Column({
        type: DataType.FLOAT,
        field: "monto"
      })
    monto?: number;

    @Column({
        type: DataType.FLOAT,
        field: "cantidad_uc"
      })
    cantidad_uc?: number;

    @Column({
        type: DataType.DATE,
        field: "fecha_llegada"
      })
    fecha_llegada?: Date;

    @Column({
        type: DataType.DATE,
        field: "fecha_inicio"
      })
    fecha_inicio?: Date;

    @Column({
        type: DataType.DATE,
        field: "fecha_termino"
      })
    fecha_termino?: Date;

    @Column({
        type: DataType.INTEGER,
        field: "fecha_retorno"
      })
    tipo_trabajo?: number;

    @Column({
        type: DataType.STRING(255),
        field: "persona_envia_info"
      })
    persona_envia_info?: string;

    @Column({
        type: DataType.STRING(255),
        field: "cargo_persona_envia_info"
      })
    cargo_persona_envia_info?: string;

    @Column({
        type: DataType.INTEGER,
        field: "empresa_contratista"
      })
    empresa_contratista?: number;

    @Column({
        type: DataType.INTEGER,
        field: "coordinador_contratista"
      })
    coordinador_contratista?: number;

    @Column({
        type: DataType.STRING(255),
        field: "comuna"
      })
    comuna?: string;

    @Column({
        type: DataType.STRING(255),
        field: "ubicacion"
      })
    ubicacion?: string;

    @Column({
        type: DataType.INTEGER,
        field: "estado"
      })
    estado?: number = 0;

    @Column({
        type: DataType.INTEGER,
        field: "tipo_obra"
      })
    tipo_obra?: number = 0;

    @Column({
        type: DataType.INTEGER,
        field: "segmento"
      })
    segmento?: number;

    @Column({
        type: DataType.BOOLEAN,
        field: "eliminada"
      })
    eliminada?: boolean = false;

    @Column({
        type: DataType.STRING(255),
        field: "jefe_delegacion"
      })
    jefe_delegacion?: string;

    @Column({
        type: DataType.INTEGER,
        field: "oficina"
      })
    oficina?: number = 0;

    @Column({
        type: DataType.INTEGER,
        field: "recargo_distancia"
      })
    recargo_distancia?: number;
  }
  