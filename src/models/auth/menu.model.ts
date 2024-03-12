import { Model, Table, Column, DataType } from "sequelize-typescript";
import { IMenuItem } from "../../interfaces/auth.interface";


@Table({
    tableName: "ver_menu",
    schema: "_frontend",
})
export default class Menu extends Model {

    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;


   @Column({
        type: DataType.INTEGER,
        field: "rol_id"
    })
    rol_id?: number;

    @Column({
        type: DataType.INTEGER,
        field: "rol_modulo_id"
    })
    rol_modulo_id?: number;

    @Column({
        type: DataType.STRING,
        field: "label"
    })
    label?: string;

    @Column({
        type: DataType.ARRAY(DataType.JSON),
        field: "items"
    })
    items?: Array<IMenuItem>;
}