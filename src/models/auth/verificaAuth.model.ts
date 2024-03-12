import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "verifica_auth",
    schema: "_auth",
  })
  export default class VerificaAuth extends Model {
    @Column({
      type: DataType.BIGINT,
      primaryKey: true,
      field: "id"
    })
    id?: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "user_id"
    })
    user_id?: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "codigo"
      })
      codigo?: string;
  
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      field: "crear"
    })
    crear?: boolean;

    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      field: "leer"
    })
    leer?: boolean;

    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      field: "actualizar"
    })
    actualizar?: boolean;

    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      field: "borrar"
    })
    borrar?: boolean;

    @Column({
      type: DataType.STRING(255),
      field: "comentario"
    })
    comentario?: string;

  }
  