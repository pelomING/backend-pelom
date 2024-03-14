import { Model, Table, Column, DataType } from "sequelize-typescript";
import { IMensajeHome, IHomePage } from "../../interfaces/auth.interface";

@Table({
    tableName: "ver_homepage",
    schema: "_frontend",
  })
  export default class VerHomepage extends Model {

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      field: "id"
    })
    id?: number;

    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "mensaje_id"
    })
    mensajeId?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "rol_id"
      })
    rolId?: number;
  
    @Column({
      type: DataType.JSON,
      allowNull: false,
      field: "mensaje"
    })
    mensaje?: IMensajeHome;

    @Column({
        type: DataType.STRING(255),
        field: "rol"
      })
    rol?: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
        field: "homepage"
    })
    homepage?: IHomePage;
  
  }